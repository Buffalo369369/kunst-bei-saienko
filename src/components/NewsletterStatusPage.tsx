import Link from "next/link";

type Props = {
  title: string;
  text: string;
};

export default function NewsletterStatusPage({ title, text }: Props) {
  return (
    <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">
      <div className="mx-auto max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Kunst bei Saienko
        </p>
        <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-8 leading-8 text-neutral-600">{text}</p>
        <Link
          href="/"
          className="mt-10 inline-block bg-black px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
