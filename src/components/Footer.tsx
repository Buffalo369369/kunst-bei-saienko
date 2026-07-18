import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-black/5 bg-[#f8f8f6]"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-8 lg:grid-cols-4 lg:gap-16 lg:px-10 lg:py-20">
        {/* Logo */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block text-[16px] leading-[0.9] font-medium tracking-tight transition-opacity hover:opacity-70"
          >
            KUNST
            <br />
            BEI
            <br />
            SAIENKO
          </Link>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Navigation
          </h3>

          <nav className="flex flex-col gap-3 text-sm">
            <Link
              href="/kunst"
              className="transition-opacity hover:opacity-60"
            >
              Kunst
            </Link>

            <Link
              href="/shop"
              className="transition-opacity hover:opacity-60"
            >
              Shop
            </Link>

            <Link
              href="/#about"
              className="transition-opacity hover:opacity-60"
            >
              Über mich
            </Link>

            <Link
              href="/#contact"
              className="transition-opacity hover:opacity-60"
            >
              Kontakt
            </Link>
          </nav>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Rechtliches
          </h3>

          <nav className="flex flex-col gap-3 text-sm">
            <Link
              href="/impressum"
              className="transition-opacity hover:opacity-60"
            >
              Impressum
            </Link>

            <Link
              href="/datenschutz"
              className="transition-opacity hover:opacity-60"
            >
              Datenschutz
            </Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Kontakt
          </h3>

          <div className="space-y-3 text-sm leading-7 text-neutral-600">
            <p>kunst.bei.saienko@gmail.com</p>
            <p>+49 163 4016519</p>
            <p>Solingen, Deutschland</p>
          </div>
        </div>
      </div>
    </footer>
  );
}