"use client";

import Link from "next/link";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#C8D400] relative overflow-hidden">
      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Left — headline */}
          <div className="flex flex-col justify-center py-20 lg:py-28 lg:pr-16 border-b lg:border-b-0 lg:border-r border-black/10">
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-black/40 text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            >
              Začněte dnes
            </m.p>
            <m.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-black leading-none"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              JEDEN PARTNER.
              <br />
              KOMPLETNÍ
              <br />
              PROGRAM.
            </m.h2>
          </div>

          {/* Right — contact */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center py-20 lg:py-28 lg:pl-16 gap-8"
          >
            <p className="text-black/70 text-base leading-relaxed max-w-xs">
              Řekněte nám, jaký večer chcete vytvořit. Zbytek je naše práce.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center bg-black text-[#C8D400] font-semibold text-base px-8 py-4 rounded-sm btn-hover-dark self-start"
              >
                Nezávazná poptávka
              </Link>
              <a
                href="mailto:booking@showdesigners.cz"
                className="text-black/60 text-sm hover:text-black transition-colors duration-200 flex items-center gap-2"
              >
                booking@showdesigners.cz ↗
              </a>
            </div>

            {/* Direct phones */}
            <div className="pt-4 border-t border-black/10 flex flex-col gap-1">
              <a href="tel:+420777668694" className="text-black/50 text-sm hover:text-black transition-colors duration-200">
                Alžběta Grée — +420 777 668 694
              </a>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
