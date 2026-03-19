import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReferencesGrid from "./ReferencesGrid";

export const metadata: Metadata = {
  title: "Reference — Showdesigners",
  description:
    "Case studies a reference klientů. Ukázky reálných realizací — korporátní gala, soukromé oslavy, festivaly.",
};

export default function ReferencePage() {
  return (
    <>
      {/* Hero — foto pozadí */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        <Image
          src="/images/kvetiny/GCAs_RedNight_Show_004.webp"
          alt=""
          fill
          className="object-cover object-top"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwYFCP/EACAQAAIBBAMBAAAAAAAAAAAAAAECAAMEERIhMUFh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMoW+wj1KOx5k9tPiVKvuNvZyRcpDsxJJPlk7SxzljX2iIAiIgCIiAP/2Q=="
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pb-20 lg:pb-28">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Reference
          </p>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            NAŠE
            <br />
            <span className="text-[#C8D400]">REALIZACE.</span>
          </h1>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ReferencesGrid />
        </div>
      </section>

      {/* CTA — lime */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-5xl lg:text-6xl text-black leading-none mb-3">
              VÁŠE AKCE MŮŽE BÝT DALŠÍ.
            </h2>
            <p className="text-black/50 text-sm">Připravíme program přesně pro vás.</p>
          </div>
          <Link
            href="/kontakt"
            className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark"
          >
            Nezávazná poptávka
          </Link>
        </div>
      </section>
    </>
  );
}
