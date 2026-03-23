"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const statements = [
  { line1: "NÁVRH", line2: "NA MÍRU." },
  { line1: "PŘÍBĚH,", line2: "NE PROGRAM." },
  { line1: "VÁŠ SHOW DESIGNER.", line2: "CELÁ AKCE." },
  { line1: "SHOW", line2: "V KONTEXTU." },
];

export default function StatsSection() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10">
          {statements.map((s, i) => (
            <motion.div
              key={s.line2}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#C8D400] py-12 px-8 flex flex-col justify-center"
            >
              <p className="font-display text-black leading-none"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}>
                {s.line1}
                <br />
                {s.line2}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
