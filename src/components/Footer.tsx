import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-black/5">

      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-16 md:grid-cols-4">

        <div className="space-y-4">

          <div className="text-[18px] leading-[0.9] font-medium tracking-tight">
            KUNST
            <br />
            BEI
            <br />
            SAIENKO
          </div>

        </div>

        <div className="space-y-4">

          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Navigation
          </h3>

          <div className="flex flex-col gap-2 text-sm">

  <Link href="/kunst" className="transition hover:opacity-50">

    Kunst

  </Link>

  <Link href="/shop" className="transition hover:opacity-50">

    Shop

  </Link>

  <Link href="/#about" className="transition hover:opacity-50">

    Über mich

  </Link>

  <Link href="/#contact" className="transition hover:opacity-50">

    Kontakt

  </Link>

</div>

        </div>

        <div className="space-y-4">

          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Rechtliches
          </h3>

          <div className="flex flex-col gap-2 text-sm">

  <Link

    href="/impressum"

    className="transition hover:opacity-50"

  >

    Impressum

  </Link>

  <Link

    href="/datenschutz"

    className="transition hover:opacity-50"

  >

    Datenschutz

  </Link>

</div>

        </div>

        <div className="space-y-4">

          <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Kontakt
          </h3>

          <div className="space-y-2 text-sm">
            <p>kunst.bei.saienko@gmail.com</p>
            <p>+49 163 4016519</p>
            <p>Solingen, Deutschland</p>
          </div>

        </div>

      </div>

    </footer>
  );
}