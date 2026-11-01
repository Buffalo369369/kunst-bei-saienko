import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import {
  getBrevoApiKey,
  getBrevoNewsletterListId,
  getBrevoSenderEmail,
  getBrevoWebhookSecret,
  getNewsletterSiteUrl,
  getNewsletterTokenSecret,
  telegramChatId,
  telegramToken,
} from "@/lib/server/env";

const BREVO_API_URL = "https://api.brevo.com/v3";

export const NEWSLETTER_CONSENT_VERSION = "newsletter-v1-2026-11-01";
export const CONFIRMATION_TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

export type NewsletterSubscriber = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: "pending" | "confirmed" | "unsubscribed";
  confirmation_sent_at: string | null;
  confirmation_token_expires_at: string | null;
};

export function createNewsletterToken() {
  return randomBytes(32).toString("base64url");
}

export function hashNewsletterToken(token: string) {
  return createHmac("sha256", getNewsletterTokenSecret())
    .update(token)
    .digest("hex");
}

export function hashNewsletterRateLimitKey(value: string) {
  return createHmac("sha256", getNewsletterTokenSecret())
    .update(value)
    .digest("hex");
}

export function isValidBrevoWebhookSecret(value: string | null) {
  if (!value) return false;

  const expected = Buffer.from(getBrevoWebhookSecret());
  const received = Buffer.from(value);

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export function getNewsletterUrl(path: string, token: string) {
  const url = new URL(path, getNewsletterSiteUrl());
  url.searchParams.set("token", token);
  return url.toString();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/gu, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

async function brevoRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${BREVO_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": getBrevoApiKey(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error("Brevo newsletter request failed", { status: response.status });
    throw new Error("Brevo newsletter request failed");
  }
}

export async function sendNewsletterConfirmationEmail(
  email: string,
  confirmationUrl: string,
  unsubscribeUrl: string,
  deletionUrl: string
) {
  const safeConfirmationUrl = escapeHtml(confirmationUrl);
  const safeUnsubscribeUrl = escapeHtml(unsubscribeUrl);
  const safeDeletionUrl = escapeHtml(deletionUrl);

  await brevoRequest("/smtp/email", {
    sender: {
      name: "Kunst bei Saienko",
      email: getBrevoSenderEmail(),
    },
    to: [{ email }],
    subject: "Bitte bestätigen Sie Ihre Newsletter-Anmeldung",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6; max-width: 560px; margin: 0 auto;">
        <p>Vielen Dank für Ihr Interesse an Kunst bei Saienko.</p>
        <p>Bitte bestätigen Sie Ihre Anmeldung, damit wir Ihnen künftig Neuigkeiten zu Kunstwerken, Ausstellungen und Veranstaltungen per E-Mail senden dürfen.</p>
        <p style="margin: 32px 0;">
          <a href="${safeConfirmationUrl}" style="display: inline-block; background: #111111; color: #ffffff; padding: 14px 20px; text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; font-size: 12px;">Anmeldung bestätigen</a>
        </p>
        <p>Wenn Sie sich nicht selbst angemeldet haben, können Sie diese E-Mail einfach ignorieren.</p>
        <p style="font-size: 12px; color: #666666; margin-top: 32px;">Sie können sich jederzeit wieder abmelden: <a href="${safeUnsubscribeUrl}" style="color: #666666;">Newsletter abmelden</a>. Ihre Newsletter-Daten können Sie <a href="${safeDeletionUrl}" style="color: #666666;">hier löschen</a>.</p>
      </div>
    `,
    textContent: `Vielen Dank für Ihr Interesse an Kunst bei Saienko.\n\nBitte bestätigen Sie Ihre Anmeldung: ${confirmationUrl}\n\nWenn Sie sich nicht selbst angemeldet haben, können Sie diese E-Mail einfach ignorieren.\n\nNewsletter abmelden: ${unsubscribeUrl}\nNewsletter-Daten löschen: ${deletionUrl}`,
  });
}

export async function addNewsletterContactToBrevo(email: string) {
  const listId = Number.parseInt(getBrevoNewsletterListId(), 10);

  if (!Number.isSafeInteger(listId) || listId < 1) {
    throw new Error("BREVO_NEWSLETTER_LIST_ID must be a positive integer");
  }

  await brevoRequest("/contacts", {
    email,
    listIds: [listId],
    // A new double opt-in confirmation is explicit consent to subscribe again,
    // including after a previous Brevo campaign unsubscribe.
    emailBlacklisted: false,
    updateEnabled: true,
  });
}

export async function removeNewsletterContactFromBrevo(email: string) {
  const listId = Number.parseInt(getBrevoNewsletterListId(), 10);

  if (!Number.isSafeInteger(listId) || listId < 1) {
    throw new Error("BREVO_NEWSLETTER_LIST_ID must be a positive integer");
  }

  await brevoRequest("/contacts", {
    email,
    unlinkListIds: [listId],
    updateEnabled: true,
  });
}

export async function notifyTelegramAboutNewsletterConfirmation(
  subscriber: Pick<NewsletterSubscriber, "first_name" | "last_name" | "email">
) {
  const message = `✉️ Neue bestätigte Newsletter-Anmeldung

Vorname: ${subscriber.first_name}
Nachname: ${subscriber.last_name}
E-Mail: ${subscriber.email}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChatId, text: message }),
      }
    );

    if (!response.ok) {
      console.error("Newsletter Telegram notification failed", {
        status: response.status,
      });
    }
  } catch {
    console.error("Newsletter Telegram notification failed");
  }
}
