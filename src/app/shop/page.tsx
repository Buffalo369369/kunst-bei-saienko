import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const products = [
	{
  title: "Handbemalte Tasche №1",
		price: "50 €",
		image: "/images/bag-10.jpg",
		cta: "Anfragen",
	},
	{
		title: "Handbemalte Tasche №2",
		price: "50 €",
		image: "/images/bag-20.jpg",
		cta: "Anfragen",
	},
	{
		title: "Handbemalte Tasche №3",
		price: "50 €",
		image: "/images/bag-30.jpg",
		cta: "Anfragen",
	},
	{
		title: "Handbemalte Tasche №4",
		price: "50 €",
		image: "/images/bag-40.jpg",
		cta: "Anfragen",
	},
	{
		title: "Handbemalte Tasche №5",
		price: "50 €",
		image: "/images/bag-50.jpg",
		cta: "Anfragen",
	},
];

export default function ShopPage() {
	return (
		<>
			<Navbar />

			<main className="min-h-screen bg-[#f8f8f6] text-black">
				<section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
					<div className="mx-auto max-w-2xl text-center">
						<p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
							Shop
						</p>

						<h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-tight tracking-tight">
							Kunst zum Entdecken,<br />Verschenken & Mitnehmen.
						</h1>

						<p className="mx-auto mt-5 max-w-xl text-[clamp(0.95rem,1.5vw,1.05rem)] leading-7 text-neutral-600">
							Im Shop findest du besondere Werke und Produkte von Anastasiia Saienko – von handgefertigten Unikaten und kleinen Kunstobjekten bis hin zu Büchern, Art-Merch und weiteren ausgewählten Kreationen.
              </p>

<p className="mx-auto mt-5 max-w-xl text-[clamp(0.95rem,1.5vw,1.05rem)] leading-7 text-neutral-600">
Jedes Stück trägt ein Teil meiner Kunst und meiner Geschichte in sich.
</p>

<p className="mx-auto mt-5 max-w-xl text-[clamp(0.95rem,1.5vw,1.05rem)] leading-7 text-neutral-1000">
Entdecke dein Lieblingsstück. 
						</p>
					</div>

					<div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
<Link href="/kunst/anastasia-im-wunderland" className="group">
						<article className="flex flex-col">
							<div className="relative aspect-square overflow-hidden bg-neutral-200">
								<Image
									src="/images/project-404.jpg"
									alt="Anastasia im Wunderland"
									fill
									sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 1.5rem), (max-width: 1279px) calc(33vw - 1.25rem), calc(25vw - 1rem)"
									className="object-cover transition duration-500 group-hover:scale-[1.03]"
								/>
							</div>

							<div className="mt-3">
								<p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
									Buch
								</p>
								<h2 className="mt-3 text-lg leading-tight tracking-tight">
									Anastasia im Wunderland
								</h2>
								<p className="mt-2 text-sm text-neutral-700">29,90 €</p>
							</div>
						</article>
					</Link>

						{products.map((product) => (
							<article key={product.title} className="group flex flex-col">
								<div className="relative aspect-square overflow-hidden bg-neutral-200">
									<Image
										src={product.image}
										alt={product.title}
										fill
										sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 1.5rem), (max-width: 1279px) calc(33vw - 1.25rem), calc(25vw - 1rem)"
										className="object-cover transition duration-500 group-hover:scale-[1.03]"
									/>
								</div>

								<div className="mt-3">
									<h2 className="text-lg leading-tight tracking-tight">
										{product.title}
									</h2>

									<p className="mt-2 text-sm text-neutral-700">
										{product.price}
									</p>

									<button
										type="button"
										className="mt-4 inline-flex border border-black bg-white px-3.5 py-2 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
									>
										{product.cta}
									</button>
								</div>
							</article>
						))}
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}