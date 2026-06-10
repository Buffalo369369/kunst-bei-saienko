import { NextResponse } from "next/server";

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
  `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    }),
  }
);

const data = await response.json();

console.log(data);

return NextResponse.json(data);
}