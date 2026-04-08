"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

interface IntroSectionText {
  intro_label: string;
  intro_headline_1: string;
  intro_headline_2: string;
  intro_headline_3: string;
  intro_body_1: string;
  intro_body_2: string;
  intro_body_3: string;
  intro_diff_1: string;
  intro_diff_2: string;
  intro_diff_3: string;
  intro_diff_4: string;
}

interface IntroSectionProps {
  text: IntroSectionText;
}

export default function IntroSection({ text }: IntroSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    text.intro_diff_1,
    text.intro_diff_2,
    text.intro_diff_3,
    text.intro_diff_4,
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — big label */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              {text.intro_label}
            </p>
            <h2 className="font-display text-display text-white leading-none">
              <span className="text-[#C8D400]">{text.intro_headline_1}</span>
              <br />
              {text.intro_headline_2}
              <br />
              {text.intro_headline_3}
            </h2>
          </m.div>

          {/* Right — text */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-white/80 text-lg leading-relaxed">
              {text.intro_body_1}
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              {text.intro_body_2}
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              {text.intro_body_3}
            </p>

            {/* Differentiators */}
            <ul className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-6">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="text-[#C8D400] mt-1 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </div>
    </section>
  );
}
