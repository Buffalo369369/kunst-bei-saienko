import NewsletterTokenAction from "@/components/NewsletterTokenAction";

export default async function NewsletterUnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <NewsletterTokenAction action="unsubscribe" token={token} />;
}
