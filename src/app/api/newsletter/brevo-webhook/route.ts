import { NextResponse } from "next/server";
import { isValidBrevoWebhookSecret } from "@/lib/server/newsletter";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

type BrevoWebhookPayload = {
  event?: unknown;
  email?: unknown;
};

function isBrevoUnsubscribe(
  payload: BrevoWebhookPayload
): payload is { email: string } {
  const event = typeof payload.event === "string" ? payload.event.toLowerCase() : "";

  return (
    (event === "unsubscribed" || event === "unsubscribe") &&
    typeof payload.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(payload.email)
  );
}

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!isValidBrevoWebhookSecret(secret)) {
    return new NextResponse(null, { status: 401 });
  }

  let payload: BrevoWebhookPayload;
  try {
    payload = (await request.json()) as BrevoWebhookPayload;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!isBrevoUnsubscribe(payload)) {
    return new NextResponse(null, { status: 204 });
  }

  const now = new Date().toISOString();
  const { error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: now,
      confirmation_token_hash: null,
      confirmation_token_expires_at: null,
      updated_at: now,
    })
    .eq("email", payload.email.toLowerCase());

  if (error) {
    console.error("Brevo newsletter webhook update failed", { code: error.code });
    return new NextResponse(null, { status: 503 });
  }

  return new NextResponse(null, { status: 204 });
}
