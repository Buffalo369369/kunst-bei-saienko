import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { telegramChatId, telegramToken } from "@/lib/server/env";

const MAX_LENGTHS = {
  slug: 160,
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  message: 2_000,
};

const ALLOWED_FIELDS = new Set([
  "slug",
  "firstName",
  "lastName",
  "email",
  "phone",
  "message",
  "website",
]);

type ReservationInput = {
  slug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string | null;
};

type ReservationResult = {
  outcome: "reserved" | "not_found" | "unavailable";
  id?: number;
  slug?: string;
  title?: string;
  price?: string;
  status?: string;
  reserved_until?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRequiredString(
  value: unknown,
  maxLength: number
): string | null {
  if (typeof value !== "string") return null;

  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength
    ? normalized
    : null;
}

function readOptionalString(
  value: unknown,
  maxLength: number
): string | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") return undefined;

  const normalized = value.trim();
  return normalized.length <= maxLength ? normalized || null : undefined;
}

function parseReservationInput(body: unknown): ReservationInput | null {
  if (!isRecord(body)) return null;
  if (Object.keys(body).some((key) => !ALLOWED_FIELDS.has(key))) return null;

  const honeypot = body.website;

  if (honeypot !== undefined && typeof honeypot !== "string") {
    return null;
  }

  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return null;
  }

  const slug = readRequiredString(body.slug, MAX_LENGTHS.slug);
  const firstName = readRequiredString(body.firstName, MAX_LENGTHS.firstName);
  const lastName = readRequiredString(body.lastName, MAX_LENGTHS.lastName);
  const email = readRequiredString(body.email, MAX_LENGTHS.email);
  const phone = readOptionalString(body.phone, MAX_LENGTHS.phone);
  const message = readOptionalString(body.message, MAX_LENGTHS.message);

  if (
    !slug ||
    !firstName ||
    !lastName ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email) ||
    phone === undefined ||
    message === undefined
  ) {
    return null;
  }

  return {
    slug,
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    message,
  };
}

async function notifyTelegram(
  reservation: ReservationInput,
  artwork: Required<Pick<ReservationResult, "title" | "price">>
) {
  const message = `
🎨 Neue Reservierung

Bild:
${artwork.title}

Preis:
${artwork.price}

Vorname:
${reservation.firstName}

Nachname:
${reservation.lastName}

E-Mail:
${reservation.email}

Telefon:
${reservation.phone ?? ""}

Nachricht:
${reservation.message ?? ""}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
        }),
      }
    );

    if (!response.ok) {
      console.error("Telegram notification failed", { status: response.status });
    }
  } catch {
    console.error("Telegram notification failed");
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const reservation = parseReservationInput(body);

  if (!reservation) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.rpc("reserve_artwork", {
    p_artwork_slug: reservation.slug,
    p_first_name: reservation.firstName,
    p_last_name: reservation.lastName,
    p_email: reservation.email,
    p_phone: reservation.phone,
    p_message: reservation.message,
  });

  if (error || !data || typeof data !== "object") {
    console.error("Reservation database operation failed", { code: error?.code });
    return NextResponse.json({ error: "Reservation failed" }, { status: 500 });
  }

  const result = data as ReservationResult;

  if (result.outcome === "not_found") {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  if (result.outcome === "unavailable") {
    return NextResponse.json({ error: "Artwork unavailable" }, { status: 409 });
  }

  if (
    result.outcome !== "reserved" ||
    typeof result.title !== "string" ||
    typeof result.price !== "string"
  ) {
    console.error("Reservation database operation returned an invalid outcome");
    return NextResponse.json({ error: "Reservation failed" }, { status: 500 });
  }

  await notifyTelegram(reservation, {
    title: result.title,
    price: result.price,
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
