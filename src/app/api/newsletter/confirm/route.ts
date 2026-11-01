import { NextResponse } from "next/server";
import {
  addNewsletterContactToBrevo,
  hashNewsletterToken,
  notifyTelegramAboutNewsletterConfirmation,
} from "@/lib/server/newsletter";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

type PendingSubscriber = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: "pending";
  confirmation_token_expires_at: string | null;
};

function readToken(value: unknown) {
  return typeof value === "string" && value.length >= 32 && value.length <= 256
    ? value
    : null;
}

export async function POST(request: Request) {
  let body: { token?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const token = readToken(body.token);
  if (!token) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const tokenHash = hashNewsletterToken(token);
  const { data, error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select(
      "id, first_name, last_name, email, status, confirmation_token_expires_at"
    )
    .eq("confirmation_token_hash", tokenHash)
    .eq("status", "pending")
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Der Bestätigungslink ist ungültig." }, { status: 400 });
  }

  const subscriber = data as PendingSubscriber;
  const expiresAt = subscriber.confirmation_token_expires_at
    ? Date.parse(subscriber.confirmation_token_expires_at)
    : Number.NaN;

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return NextResponse.json(
      { error: "Der Bestätigungslink ist abgelaufen." },
      { status: 400 }
    );
  }

  try {
    await addNewsletterContactToBrevo(subscriber.email);
  } catch {
    return NextResponse.json(
      { error: "Die Anmeldung konnte gerade nicht bestätigt werden." },
      { status: 503 }
    );
  }

  const confirmedAt = new Date().toISOString();
  const { data: confirmedData, error: updateError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({
      status: "confirmed",
      confirmed_at: confirmedAt,
      confirmation_token_hash: null,
      confirmation_token_expires_at: null,
      updated_at: confirmedAt,
    })
    .eq("id", subscriber.id)
    .eq("status", "pending")
    .eq("confirmation_token_hash", tokenHash)
    .select("first_name, last_name, email")
    .maybeSingle();

  if (updateError || !confirmedData) {
    return NextResponse.json(
      { error: "Der Bestätigungslink wurde bereits verwendet." },
      { status: 400 }
    );
  }

  await notifyTelegramAboutNewsletterConfirmation(confirmedData);

  return NextResponse.json({ success: true });
}
