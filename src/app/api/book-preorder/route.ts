import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { telegramChatId, telegramToken } from "@/lib/server/env";

const BOOK_TITLE = "Anastasia im Wunderland";

const MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  street: 200,
  postalCode: 20,
  city: 100,
  message: 2_000,
};

const ALLOWED_FIELDS = new Set([
  "firstName",
  "lastName",
  "email",
  "quantity",
  "deliveryMethod",
  "street",
  "postalCode",
  "city",
  "paymentMethod",
  "message",
  "website",
]);

const deliveryMethods = new Set([
  "presentation",
  "pickup_solingen",
  "shipping_de",
]);

const paymentMethods = new Set(["paypal", "bank_transfer"]);

type DeliveryMethod = "presentation" | "pickup_solingen" | "shipping_de";
type PaymentMethod = "paypal" | "bank_transfer";

type BookPreorderInput = {
  firstName: string;
  lastName: string;
  email: string;
  quantity: number;
  deliveryMethod: DeliveryMethod;
  street: string | null;
  postalCode: string | null;
  city: string | null;
  paymentMethod: PaymentMethod;
  message: string | null;
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

function parseBookPreorderInput(body: unknown): BookPreorderInput | null {
  if (!isRecord(body)) return null;
  if (Object.keys(body).some((key) => !ALLOWED_FIELDS.has(key))) return null;

  if (typeof body.website !== "string" || body.website.trim().length > 0) {
    return null;
  }

  const firstName = readRequiredString(body.firstName, MAX_LENGTHS.firstName);
  const lastName = readRequiredString(body.lastName, MAX_LENGTHS.lastName);
  const email = readRequiredString(body.email, MAX_LENGTHS.email);
  const street = readOptionalString(body.street, MAX_LENGTHS.street);
  const postalCode = readOptionalString(body.postalCode, MAX_LENGTHS.postalCode);
  const city = readOptionalString(body.city, MAX_LENGTHS.city);
  const message = readOptionalString(body.message, MAX_LENGTHS.message);
  const quantity = body.quantity;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email) ||
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 20 ||
    typeof body.deliveryMethod !== "string" ||
    !deliveryMethods.has(body.deliveryMethod) ||
    typeof body.paymentMethod !== "string" ||
    !paymentMethods.has(body.paymentMethod) ||
    street === undefined ||
    postalCode === undefined ||
    city === undefined ||
    message === undefined
  ) {
    return null;
  }

  const deliveryMethod = body.deliveryMethod as DeliveryMethod;

  if (deliveryMethod === "shipping_de") {
    if (!street || !postalCode || !city) return null;
  } else {
    return {
      firstName,
      lastName,
      email: email.toLowerCase(),
      quantity,
      deliveryMethod,
      street: null,
      postalCode: null,
      city: null,
      paymentMethod: body.paymentMethod as PaymentMethod,
      message,
    };
  }

  return {
    firstName,
    lastName,
    email: email.toLowerCase(),
    quantity,
    deliveryMethod,
    street,
    postalCode,
    city,
    paymentMethod: body.paymentMethod as PaymentMethod,
    message,
  };
}

function getDeliveryLabel(deliveryMethod: DeliveryMethod) {
  const labels: Record<DeliveryMethod, string> = {
    presentation: "Buchpräsentation · 09.10.2026 · Stadtbibliothek Solingen",
    pickup_solingen: "Persönliche Abholung in Solingen",
    shipping_de: "Postversand innerhalb Deutschlands (+ 10,00 € Versand)",
  };

  return labels[deliveryMethod];
}

function getPaymentLabel(paymentMethod: PaymentMethod) {
  const labels: Record<PaymentMethod, string> = {
    paypal: "PayPal",
    bank_transfer: "Banküberweisung",
  };

  return labels[paymentMethod];
}

async function notifyTelegram(preorder: BookPreorderInput) {
  const address = preorder.deliveryMethod === "shipping_de"
    ? `${preorder.street}\n${preorder.postalCode} ${preorder.city}`
    : "—";

  const message = `
📚 Neue Buchvorbestellung

Buch:
${BOOK_TITLE}

Vorname:
${preorder.firstName}

Nachname:
${preorder.lastName}

E-Mail:
${preorder.email}

Anzahl:
${preorder.quantity}

Abholung / Versand:
${getDeliveryLabel(preorder.deliveryMethod)}

Adresse:
${address}

Zahlungsart:
${getPaymentLabel(preorder.paymentMethod)}

Nachricht:
${preorder.message ?? ""}
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
      console.error("Book preorder Telegram notification failed", {
        status: response.status,
      });
    }
  } catch {
    console.error("Book preorder Telegram notification failed");
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const preorder = parseBookPreorderInput(body);

  if (!preorder) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("book_preorders").insert({
    first_name: preorder.firstName,
    last_name: preorder.lastName,
    email: preorder.email,
    quantity: preorder.quantity,
    delivery_method: preorder.deliveryMethod,
    street: preorder.street,
    postal_code: preorder.postalCode,
    city: preorder.city,
    payment_method: preorder.paymentMethod,
    message: preorder.message,
  });

  if (error) {
    console.error("Book preorder database insert failed", { code: error.code });
    return NextResponse.json({ error: "Preorder failed" }, { status: 500 });
  }

  await notifyTelegram(preorder);

  return NextResponse.json({ success: true }, { status: 201 });
}
