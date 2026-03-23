"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const areas = [
  {
    number: "01",
    title: "Harmonogram večera",
    problem: "Špatně sestavený timing ruinuje flow. Program začíná pozdě, přechody jsou příliš dlouhé, hosté ztrácejí pozornost.",
    solution: "Sestavíme realistický dramaturgický plán celého večera — kdy přidat energii, kdy zpomalit, kde je správný moment na hlavní číslo.",
  },
  {
    number: "02",
    title: "Koordinace s dodavateli",
    problem: "Umělce nikdo nevidí, protože catering ještě servíruje. Technici neví, kdy a co pustit. Každý řeší jen svou část.",
    solution: "Hlídáme, aby catering, technika, zvuk a program šly ruku v ruce. Komunikujeme za vás se všemi stranami — vy se nemusíte starat.",
  },
  {
    number: "03",
    title: "Vítání hostů & první dojem",
    problem: "Příchod hostů je nejčastěji opomíjená část večera. Přitom první dojem nastavuje celou atmosféru.",
    solution: "Poradíme, jak uvítat hosty s charakterem — walking acts, ambient hudba, scénografie vstupu. Večer začíná dřív, než si klient myslí.",
  },
  {
    number: "04",
    title: "Záložní scénáře",
    problem: "Umělec onemocní, program se zpozdí, nebo klient na poslední chvíli změní plán. Na akcích se vždy něco stane — a ne vše je v našich rukou.",
    solution: "Vždy připravujeme záložní varianty v rámci entertainmentu a máme síť prověřených umělců. Část situací zvládneme operativně řešit — a tam kde to nejde, budeme s vámi otevření.",
  },
];

export default function AdvisorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 lg:py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header — centered, full width */}
        <div ref={ref} className="text-center mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          >
            Víc než show
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display text-white leading-none mb-8"
          >
            VÍME, CO DĚLÁ VEČER{" "}
            <span className="text-[#C8D400]">VÝJIMEČNÝM.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/50 text-base leading-relaxed"
          >
            Za 15 let jsme byli u stovek akcí. Viděli jsme, co funguje — a kde se to komplikuje.
            Váš show designer je od začátku poradce, ne jen dodavatel show.
          </motion.p>
        </div>

        {/* Advisory areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {areas.map((area, i) => (
            <motion.div
              key={area.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0a0a0a] p-8 lg:p-10 flex flex-col gap-5 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              {/* Number + title */}
              <div className="flex items-start gap-4">
                <span className="font-mono text-[#C8D400]/30 text-sm tabular-nums mt-1 shrink-0">
                  {area.number}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-white leading-tight">
                  {area.title}
                </h3>
              </div>

              {/* Problem */}
              <div className="pl-8 flex flex-col gap-4">
                <p className="text-white/35 text-sm leading-relaxed border-l border-white/10 pl-4">
                  {area.problem}
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-px bg-[#C8D400]/50" />
                  <span className="text-[#C8D400]/50 text-xs font-semibold tracking-widest uppercase">
                    Jak to řešíme
                  </span>
                </div>

                {/* Solution */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {area.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-white/25 text-sm text-center max-w-xl mx-auto leading-relaxed"
        >
          Toto není součástí žádného balíčku. Je to standardní součást každé spolupráce se Showdesigners.
        </motion.p>

      </div>
    </section>
  );
}
