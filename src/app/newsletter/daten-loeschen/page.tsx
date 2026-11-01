import NewsletterTokenAction from "@/components/NewsletterTokenAction";

export default async function NewsletterDeletePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <NewsletterTokenAction action="delete" token={token} />;
}
