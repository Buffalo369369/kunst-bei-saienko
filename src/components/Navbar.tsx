"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Блокировка прокрутки страницы при открытом меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f8f6]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8 lg:px-10">
          <Link
            href="/"
            className="text-[15px] leading-[0.9] font-medium tracking-tight transition-opacity hover:opacity-70 sm:text-[16px]"
          >
            KUNST
            <br />
            BEI
            <br />
            SAIENKO
          </Link>

          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] lg:flex xl:gap-10">
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

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="text-3xl transition-opacity hover:opacity-60 lg:hidden"
          >
            ☰
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[100] bg-[#f8f8f6] px-8 py-10"
          >
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-3xl transition-transform duration-300 hover:rotate-90"
              >
                ×
              </button>
            </div>

            <div className="mt-24 flex flex-col gap-8 text-[clamp(2rem,7vw,3rem)]">
              <Link
                href="/kunst"
                onClick={closeMenu}
                className="transition-opacity hover:opacity-60"
              >
                Kunst
              </Link>

              <Link
                href="/shop"
                onClick={closeMenu}
                className="transition-opacity hover:opacity-60"
              >
                Shop
              </Link>

              <Link
                href="/#about"
                onClick={closeMenu}
                className="transition-opacity hover:opacity-60"
              >
                Über mich
              </Link>

              <Link
                href="/#contact"
                onClick={closeMenu}
                className="transition-opacity hover:opacity-60"
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