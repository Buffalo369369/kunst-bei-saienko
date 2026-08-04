import "server-only";

function getRequiredServerEnv(
  name:
    | "SUPABASE_SERVICE_ROLE_KEY"
    | "TELEGRAM_TOKEN"
    | "TELEGRAM_CHAT_ID"
    | "CRON_SECRET"
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
