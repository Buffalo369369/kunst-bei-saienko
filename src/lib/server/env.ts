import "server-only";

function getRequiredServerEnv(
  name:
    | "SUPABASE_SERVICE_ROLE_KEY"
    | "TELEGRAM_TOKEN"
    | "TELEGRAM_CHAT_ID"
    | "CRON_SECRET"
    | "BREVO_API_KEY"
    | "BREVO_SENDER_EMAIL"
    | "BREVO_NEWSLETTER_LIST_ID"
    | "BREVO_WEBHOOK_SECRET"
    | "NEWSLETTER_TOKEN_SECRET"
    | "NEWSLETTER_SITE_URL"
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const supabaseServiceRoleKey = getRequiredServerEnv(
  "SUPABASE_SERVICE_ROLE_KEY"
);
export const telegramToken = getRequiredServerEnv("TELEGRAM_TOKEN");
export const telegramChatId = getRequiredServerEnv("TELEGRAM_CHAT_ID");

export function getCronSecret() {
  return getRequiredServerEnv("CRON_SECRET");
}

export function getBrevoApiKey() {
  return getRequiredServerEnv("BREVO_API_KEY");
}

export function getBrevoSenderEmail() {
  return getRequiredServerEnv("BREVO_SENDER_EMAIL");
}

export function getBrevoNewsletterListId() {
  return getRequiredServerEnv("BREVO_NEWSLETTER_LIST_ID");
}

export function getBrevoWebhookSecret() {
  return getRequiredServerEnv("BREVO_WEBHOOK_SECRET");
}

export function getNewsletterTokenSecret() {
  return getRequiredServerEnv("NEWSLETTER_TOKEN_SECRET");
}

export function getNewsletterSiteUrl() {
  return getRequiredServerEnv("NEWSLETTER_SITE_URL");
}
