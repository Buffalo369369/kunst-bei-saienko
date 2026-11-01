import { NextResponse } from "next/server";
import {
  CONFIRMATION_TOKEN_TTL_MS,
  createNewsletterToken,
  getNewsletterUrl,
  hashNewsletterRateLimitKey,
  hashNewsletterToken,
  NEWSLETTER_CONSENT_VERSION,
  sendNewsletterConfirmationEmail,
} from "@/lib/server/newsletter";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

const MAX_LENGTH = {
  firstName: 80,
  lastName: 80,
  email: 254,
};
const RESEND_DELAY_MS = 15 * 60 * 1000;

type NewsletterInput = {
  firstName: string;
  lastName: string;
  email: string;
};

type ExistingSubscriber = {
  id: string;
  status: "pending" | "confirmed" | "unsubscribed";
  confirmation_sent_at: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRequiredString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength
    ? normalized
    : null;
}

function parseInput(value: unknown): NewsletterInput | null {
  if (!isRecord(value)) return null;

  const allowedFields = new Set([
    "firstName",
    "lastName",
    "email",
    "consent",
    "website",
  ]);

  if (Object.keys(value).some((key) => !allowedFields.has(key))) return null;
  if (typeof value.website !== "string" || value.website.trim().length > 0) {
    return null;
  }

  const firstName = readRequiredString(value.firstName, MAX_LENGTH.firstName);
  const lastName = readRequiredString(value.lastName, MAX_LENGTH.lastName);
  const email = readRequiredString(value.email, MAX_LENGTH.email)?.toLowerCase();

  if (
    !firstName ||
    !lastName ||
    !email ||
    value.consent !== true ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)
  ) {
    return null;
  }

  return { firstName, lastName, email };
}

function confirmationWasRecentlySent(date: string | null) {
  if (!date) return false;
  const sentAt = Date.parse(date);
  return Number.isFinite(sentAt) && Date.now() - sentAt < RESEND_DELAY_MS;
}

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const input = parseInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "Bitte überprüfen Sie Ihre Eingaben." },
      { status: 400 }
    );
  }

  const { data: allowed, error: rateLimitError } = await supabaseAdmin.rpc(
    "consume_newsletter_rate_limit",
    {
      p_key_hash: hashNewsletterRateLimitKey(
        `${getRequestIp(request)}:${Math.floor(Date.now() / 600_000)}`
      ),
      p_limit: 5,
    }
  );

  if (rateLimitError) {
    console.error("Newsletter rate limit check failed", {
      code: rateLimitError.code,
    });
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }

  if (allowed !== true) {
    return NextResponse.json(
      { error: "Bitte versuchen Sie es später erneut." },
      { status: 429 }
    );
  }

  const { data: existingData, error: lookupError } = await supabaseAdmin
    .from("newsletter_subscribers")
    .select("id, status, confirmation_sent_at")
    .eq("email", input.email)
    .maybeSingle();

  if (lookupError) {
    console.error("Newsletter subscriber lookup failed", {
      code: lookupError.code,
    });
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }

  const existing = existingData as ExistingSubscriber | null;

  // The response is intentionally identical for confirmed and recently pending
  // addresses so the endpoint cannot be used to enumerate subscribers.
  if (
    existing?.status === "confirmed" ||
    (existing?.status === "pending" &&
      confirmationWasRecentlySent(existing.confirmation_sent_at))
  ) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const confirmationToken = createNewsletterToken();
  const unsubscribeToken = createNewsletterToken();
  const now = new Date();
  const confirmationExpiresAt = new Date(
    now.getTime() + CONFIRMATION_TOKEN_TTL_MS
  ).toISOString();
  const values = {
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    status: "pending",
    consent_at: now.toISOString(),
    consent_text_version: NEWSLETTER_CONSENT_VERSION,
    signup_source: "newsletter_modal",
    confirmation_token_hash: hashNewsletterToken(confirmationToken),
    confirmation_token_expires_at: confirmationExpiresAt,
    confirmation_sent_at: now.toISOString(),
    unsubscribe_token_hash: hashNewsletterToken(unsubscribeToken),
    unsubscribed_at: null,
    updated_at: now.toISOString(),
  };

  const { error: writeError } = existing
    ? await supabaseAdmin
        .from("newsletter_subscribers")
        .update(values)
        .eq("id", existing.id)
    : await supabaseAdmin.from("newsletter_subscribers").insert(values);

  if (writeError) {
    console.error("Newsletter subscriber write failed", { code: writeError.code });
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }

  try {
    await sendNewsletterConfirmationEmail(
      input.email,
      getNewsletterUrl("/newsletter/bestaetigen", confirmationToken),
      getNewsletterUrl("/newsletter/abmelden", unsubscribeToken),
      getNewsletterUrl("/newsletter/daten-loeschen", unsubscribeToken)
    );
  } catch {
    await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ confirmation_sent_at: null })
      .eq("email", input.email)
      .eq("status", "pending");

    return NextResponse.json(
      { error: "Die Anmeldung konnte gerade nicht versendet werden." },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
