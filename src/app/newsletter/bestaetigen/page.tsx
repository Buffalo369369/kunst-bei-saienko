import NewsletterTokenAction from "@/components/NewsletterTokenAction";

export default async function NewsletterConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <NewsletterTokenAction action="confirm" token={token} />;
}
