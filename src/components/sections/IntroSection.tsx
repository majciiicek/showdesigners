"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function IntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — big label */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Kdo jsme
            </p>
            <h2 className="font-display text-display text-white leading-none">
              ENTERTAINMENT
              <br />
              NA NEJVYŠŠÍ
              <br />
              <span className="text-[#C8D400]">ÚROVNI.</span>
            </h2>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-white/80 text-lg leading-relaxed">
              Showdesigners není agentura, která vám nabídne jen katalog umělců. Je to partner, který vezme vaši vizi — a přetaví ji do dramaturgicky uceleného příběhu, který hosté prožijí naplno a budou o něm rádi mluvit.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              Každé akci přidělíme <span className="text-white">show designera</span> — jedinou kontaktní osobu, která rozumí vaší akci jako celku. Není to koordinátor. Je to dramaturg, poradce a producent v jednom.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              Za Showdesigners stojí zázemí agentury <a href="https://www.aliatrix.show" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2 hover:text-[#C8D400] transition-colors duration-200">Aliatrix</a> — 15 let v oboru, vlastní produkce a umělci, kteří bavili diváky na třech kontinentech.
            </p>

            {/* Differentiators */}
            <ul className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-6">
              {[
                "Jeden kontakt pro celý projekt — nemusíte nic vysvětlovat dvakrát.",
                "Neprodáváme show. Navrhujeme komplexní program — s veškerým naším know-how na míru vaší akce.",
                "Neposkládáme jen čísla za sebou. Postavíme večer, který má spád.",
                "Jen umělci, které jsme sami prověřili a s nimiž máme zkušenost.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="text-[#C8D400] mt-1 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
