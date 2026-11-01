import { NextResponse } from "next/server";
import {
  hashNewsletterToken,
  removeNewsletterContactFromBrevo,
} from "@/lib/server/newsletter";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

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

  const { data, error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("id, email, status")
    .eq("unsubscribe_token_hash", hashNewsletterToken(token))
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Der Abmeldelink ist ungültig." }, { status: 400 });
  }

  if (data.status === "confirmed") {
    try {
      await removeNewsletterContactFromBrevo(data.email);
    } catch {
      return NextResponse.json(
        { error: "Die Abmeldung konnte gerade nicht abgeschlossen werden." },
        { status: 503 }
      );
    }
  }

  const now = new Date().toISOString();
  const { error: updateError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: now,
      confirmation_token_hash: null,
      confirmation_token_expires_at: null,
      updated_at: now,
    })
    .eq("id", data.id);

  if (updateError) {
    return NextResponse.json(
      { error: "Die Abmeldung konnte gerade nicht abgeschlossen werden." },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true });
}
