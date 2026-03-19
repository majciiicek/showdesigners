"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// 6 items with sizes that fill 3-column grid cleanly:
// Row 1: large(2) + small(1) = 3
// Row 2: small(1) + large(2) = 3
// Row 3: small(1) + large(2) = 3
const projects = [
  {
    title: "Partnerská akrobacie",
    category: "Artistika",
    image: "/images/akrobacie/20250226-IMG_7112-2.jpg",
    size: "large",
  },
  {
    title: "Fire show",
    category: "Oheň & světlo",
    image: "/images/fireshow/0IMG0244-1.jpg",
    size: "small",
  },
  {
    title: "Geisha",
    category: "Walking act",
    image: "/images/geisha/Geisha_by matess.jpg",
    size: "small",
  },
  {
    title: "Light show",
    category: "Oheň & světlo",
    image: "/images/lightshow/5209_REPORTAZ_2025_10_09_UNIS_COMPUTER_BESEDNI_DUM_BRNO_OSLAVA_VYROCI_30LET_UNIS_COMPUTER_A_AXENTA_SA901928.jpg",
    size: "large",
  },
  {
    title: "Lollipop show",
    category: "Artistika",
    image: "/images/lollipop/Foto-03499.jpg",
    size: "small",
  },
  {
    title: "Plesová show",
    category: "Taneční vystoupení",
    image: "/images/plesovashow/IMG_6317_foto_Jiří_Balát_edit.jpg",
    size: "large",
  },
];

type ProjectCardProps = {
  title: string;
  category: string;
  image: string;
  size: string;
  index: number;
};

function ProjectCard({ title, category, image, size, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-sm bg-[#111] ${
        size === "large" ? "md:col-span-2" : "md:col-span-1"
      }`}
      style={{ aspectRatio: size === "large" ? "16/9" : "3/4" }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={size === "large" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[#C8D400] text-xs font-semibold tracking-widest uppercase mb-1">
          {category}
        </p>
        <h3 className="text-white font-display text-2xl leading-none">{title}</h3>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-36 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Naše práce
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-white leading-none">
              UKÁZKY REALIZACÍ
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/reference"
              className="text-white/60 text-sm hover:text-[#C8D400] transition-colors duration-200 flex items-center gap-2"
            >
              Všechny reference
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
