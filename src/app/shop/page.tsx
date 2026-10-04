import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const products = [
	{
		title: "Handbemalte Tasche №01",
		price: "50 €",
		image: "/images/bag-10.jpg",
		slug: "handbemalte-tasche-1",
	},
	{
		title: "Handbemalte Tasche №02",
		price: "50 €",
		image: "/images/bag-20.jpg",
		slug: "handbemalte-tasche-2",
	},
	{
		title: "Handbemalte Tasche №03",
		price: "50 €",
		image: "/images/bag-30.jpg",
		slug: "handbemalte-tasche-3",
	},
	{
		title: "Handbemalte Tasche №04",
		price: "50 €",
		image: "/images/bag-40.jpg",
		slug: "handbemalte-tasche-4",
	},
	{
		title: "Handbemalte Tasche №05",
		price: "50 €",
		image: "/images/bag-50.jpg",
		slug: "handbemalte-tasche-5",
	},
];

const book = {
	title: "Anastasia im Wunderland",
	price: "29,90 €",
	image: "/images/project-404.jpg",
	href: "/kunst/anastasia-im-wunderland",
};

export default function ShopPage() {
	return (
		<>
			<Navbar />

			<main className="min-h-screen bg-[#f8f8f6] text-black">
				<section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10 lg:py-20">
					<div className="mx-auto max-w-2xl text-center">
						<p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
							Shop
						</p>

						<h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-tight tracking-tight">
							Kunst zum Entdecken,
							<br />
							Verschenken &amp; Mitnehmen.
						</h1>

						<p className="mx-auto mt-5 max-w-xl text-[clamp(0.95rem,1.5vw,1.05rem)] leading-7 text-neutral-600">
							Besondere Werke, Bücher und Produkte von Anastasiia Saienko. Jedes
							Stück trägt einen Teil meiner Kunst und meiner Geschichte in sich.
						</p>
					</div>

					<div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
						<Link href={book.href} className="group block h-full">
							<article className="flex h-full flex-col">
								<div className="relative aspect-square overflow-hidden bg-neutral-200">
									<Image
										src={book.image}
										alt={book.title}
										fill
										sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
										className="object-cover transition duration-500 group-hover:scale-[1.03]"
									/>
								</div>

								<div className="mt-3 space-y-2">
									<p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
										Buch
									</p>
									<h2 className="text-base leading-tight tracking-tight md:text-lg">
										{book.title}
									</h2>
									<p className="text-sm text-neutral-700">{book.price}</p>
								</div>
							</article>
						</Link>

						{products.map((product) => (
							<Link
								key={product.slug}
								href={`/shop/${product.slug}`}
								className="group block h-full"
							>
								<article className="flex h-full flex-col">
									<div className="relative aspect-square overflow-hidden bg-neutral-200">
										<Image
											src={product.image}
											alt={product.title}
											fill
											sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
											className="object-cover transition duration-500 group-hover:scale-[1.03]"
										/>
									</div>

									<div className="mt-3 space-y-2">
										<h2 className="text-base leading-tight tracking-tight md:text-lg">
											{product.title}
										</h2>

										<p className="text-sm text-neutral-700">
											{product.price}
										</p>
									</div>
								</article>
							</Link>
						))}
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}