"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
  setMenuOpen(false);
};

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f8f6]/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-6">

          <Link
            href="/"
            className="text-[16px] leading-[0.9] font-medium tracking-tight"
          >
            KUNST
            <br />
            BEI
            <br />
            SAIENKO
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em]">

            <Link href="/kunst">Kunst</Link>

            <Link href="/shop">Shop</Link>

            <Link href="/#about">Über mich</Link>

            <Link href="/#contact">Kontakt</Link>

          </nav>

          <button
            className="text-2xl md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

        </div>

      </header>

      <AnimatePresence>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#f8f8f6] p-8"
          >
            <div className="flex justify-end">

              <button
                onClick={() => setMenuOpen(false)}
                className="text-3xl"
              >
                ×
              </button>

            </div>

            <div className="mt-24 flex flex-col gap-8 text-4xl">

  <Link
    href="/kunst"
    onClick={closeMenu}
  >
    Kunst
  </Link>

  <Link
    href="/shop"
    onClick={closeMenu}
  >
    Shop
  </Link>

  <Link
    href="/#about"
    onClick={closeMenu}
  >
    Über mich
  </Link>

  <Link
    href="/#contact"
    onClick={closeMenu}
  >
    Kontakt
  </Link>

</div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}