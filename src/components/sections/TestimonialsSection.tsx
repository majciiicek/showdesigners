"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Výborná show, perfektní osvětlení a profesionální přístup. Byli jsme velmi spokojeni.",
    author: "Michaela Šperová",
    role: "Firemní akce",
  },
  {
    quote:
      "Na firemní akce jsme měli laserové bludiště a akrobatické vystoupení. Naprosto skvělé a profesionální. Milá komunikace, samostatnost a profesionální úroveň. Za celou firmu doporučuji.",
    author: "Barbora Váhalíková",
    role: "Firemní akce",
  },
  {
    quote:
      "Velká spokojenost! Díky světelné taneční show a LED hosteskám se naše firemní akce stala nezapomenutelnou.",
    author: "Šárka Matoušková",
    role: "Firemní akce",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-36 bg-[#0d0d0d] relative overflow-hidden">
      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Co říkají klienti
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-7xl text-white leading-none"
          >
            REFERENCE
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 border border-white/8 rounded-sm p-8 bg-white/[0.02]"
            >
              <span className="font-display text-[#C8D400] text-6xl leading-none">&ldquo;</span>
              <blockquote className="text-white/80 text-base leading-relaxed flex-1">
                {t.quote}
              </blockquote>
              <footer className="pt-4 border-t border-white/8">
                <p className="text-white font-medium text-sm">{t.author}</p>
                <p className="text-white/40 text-xs mt-0.5">{t.role}</p>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
