"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Vize",
    description:
      "Řeknete nám, co chcete, aby hosté cítili. Náš obchodní tým vás provede od prvního hovoru až po podpis — žádné formuláře, žádné katalogy.",
  },
  {
    number: "02",
    title: "Příběh",
    description:
      "Kreativní tým sestaví dramaturgii celé akce — ne jen program za programem, ale příběh s napětím a vrcholy, které společně ladí.",
  },
  {
    number: "03",
    title: "Den D",
    description:
      "Poprvé se potkáte se svým show designerem. Je fyzicky na místě, řídí celý program a řeší vše operativně. Vy si užíváte akci.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/parovaakrobacie/67FC50CA-DBE7-4CF0-A0AB-5989867906E7.webp"
          alt="Partnerská akrobacie na firemním večírku — show designer Showdesigners na místě"
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/80" />
        {/* Gradient fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className="mb-16">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Jak to funguje
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl lg:text-7xl text-white leading-none"
          >
            OD VIZE
            <br />
            <span className="text-white/30">K PŘÍBĚHU.</span>
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {steps.map((step, i) => (
            <m.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/60 backdrop-blur-sm p-8 lg:p-12 flex flex-col gap-6"
            >
              <span
                className="font-display text-[#C8D400]/30 leading-none"
                style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
              >
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-3xl text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-base leading-relaxed">{step.description}</p>
              </div>
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <Link
            href="/kontakt"
            className="bg-[#C8D400] text-black font-semibold text-base px-8 py-4 rounded-sm btn-hover-lime"
          >
            Začít první krok
          </Link>
          <span className="text-white/40 text-sm">
            Náš obchodní tým se ozve do 24 hodin.
          </span>
        </m.div>

      </div>
    </section>
  );
}
