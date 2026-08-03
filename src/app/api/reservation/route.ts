import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/env";
import {
  supabaseServiceRoleKey,
  telegramChatId,
  telegramToken,
} from "@/lib/server/env";

const supabase = createClient(

  supabaseUrl,

  supabaseServiceRoleKey

);

export async function POST(req: Request) {
  const body = await req.json();
  

  const message = `
🎨 Neue Reservierung

Bild:
${body.artwork}

Preis:
${body.price}

Vorname:
${body.firstName}

Nachname:
${body.lastName}

E-Mail:
${body.email}

Telefon:
${body.phone}

Nachricht:
${body.message}
`;

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

const data = await response.json();

const reservedUntil = new Date(
  Date.now() + 24 * 60 * 60 * 1000
).toISOString();

const { error: reservationError } = await supabase
  .from("reservations")
  .insert({
    artwork_slug: body.slug,
    artwork_title: body.artwork,

    first_name: body.firstName,
    last_name: body.lastName,

    email: body.email,
    phone: body.phone,

    message: body.message,
  });

if (reservationError) {
  console.error(reservationError);
}

const { error } = await supabase
  .from("artworks")
  .update({
    status: "Reserviert",
    reserved_until: reservedUntil,
  })
  .eq("slug", body.slug);

if (error) {
  console.error(error);
}

console.log(data);

return NextResponse.json(data);
}
