"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

export type AdvisorText = {
  advisor_label: string;
  advisor_headline_1: string;
  advisor_headline_2: string;
  advisor_sub: string;
  advisor_problem_label: string;
  advisor_solution_label: string;
  advisor_bottom_note: string;
  advisor_area_0_title: string;
  advisor_area_0_problem: string;
  advisor_area_0_solution: string;
  advisor_area_1_title: string;
  advisor_area_1_problem: string;
  advisor_area_1_solution: string;
  advisor_area_2_title: string;
  advisor_area_2_problem: string;
  advisor_area_2_solution: string;
  advisor_area_3_title: string;
  advisor_area_3_problem: string;
  advisor_area_3_solution: string;
};

export default function AdvisorSection({ text }: { text: AdvisorText }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const areas = [
    { number: "01", title: text.advisor_area_0_title, problem: text.advisor_area_0_problem, solution: text.advisor_area_0_solution },
    { number: "02", title: text.advisor_area_1_title, problem: text.advisor_area_1_problem, solution: text.advisor_area_1_solution },
    { number: "03", title: text.advisor_area_2_title, problem: text.advisor_area_2_problem, solution: text.advisor_area_2_solution },
    { number: "04", title: text.advisor_area_3_title, problem: text.advisor_area_3_problem, solution: text.advisor_area_3_solution },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div ref={ref} className="text-center mb-16 max-w-3xl mx-auto">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          >
            {text.advisor_label}
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display text-white leading-none mb-8"
          >
            {text.advisor_headline_1}{" "}
            <span className="text-[#C8D400]">{text.advisor_headline_2}</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/50 text-base leading-relaxed"
          >
            {text.advisor_sub}
          </m.p>
        </div>

        {/* Advisory areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {areas.map((area, i) => (
            <m.div
              key={area.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0a0a0a] p-8 lg:p-10 flex flex-col gap-5 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[#C8D400]/30 text-sm tabular-nums mt-1 shrink-0">
                  {area.number}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-white leading-tight">
                  {area.title}
                </h3>
              </div>

              <div className="pl-8 flex flex-col gap-4">
                <div>
                  <p className="text-white/20 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
                    {text.advisor_problem_label}
                  </p>
                  <p className="text-white/35 text-sm leading-relaxed border-l border-white/10 pl-4">
                    {area.problem}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-4 h-px bg-[#C8D400]/50" />
                  <span className="text-[#C8D400]/50 text-xs font-semibold tracking-widest uppercase">
                    {text.advisor_solution_label}
                  </span>
                </div>

                <p className="text-white/70 text-sm leading-relaxed">
                  {area.solution}
                </p>
              </div>
            </m.div>
          ))}
        </div>

        {/* Bottom note */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-white/25 text-sm text-center max-w-xl mx-auto leading-relaxed"
        >
          {text.advisor_bottom_note}
        </m.p>

      </div>
    </section>
  );
}
