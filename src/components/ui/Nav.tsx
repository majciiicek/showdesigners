"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

interface NavProps {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

export default function Nav({ links, ctaLabel, ctaHref }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Add background blur after scrolling 60px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 py-3 pr-4"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Image
              src="/logo/Show-designers_final-04.png"
              alt="Showdesigners"
              width={220}
              height={56}
              className="h-11 lg:h-13 w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#C8D400] ${
                    pathname === link.href ? "text-[#C8D400]" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={ctaHref}
              className="bg-[#C8D400] text-black text-sm font-semibold px-5 py-2.5 rounded-sm btn-hover-lime"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-center items-center transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-8 mb-12">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-5xl text-white hover:text-[#C8D400] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={ctaHref}
          className="bg-[#C8D400] text-black font-semibold text-lg px-8 py-4 rounded-sm"
        >
          {ctaLabel}
        </Link>
      </div>
    </>
  );
}
