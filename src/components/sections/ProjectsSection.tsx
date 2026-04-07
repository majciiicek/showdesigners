"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useInView } from "framer-motion";

// 6 items with sizes that fill 3-column grid cleanly:
// Row 1: large(2) + small(1) = 3
// Row 2: small(1) + large(2) = 3
// Row 3: small(1) + large(2) = 3
const projects = [
  {
    title: "Partnerská akrobacie",
    category: "Artistika",
    image: "/images/parovaakrobacie/partnerska-akrobacie1.webp",
    size: "large",
  },
  {
    title: "Fire show",
    category: "Oheň & světlo",
    image: "/images/fireshow/tribal-fireshow1.webp",
    size: "small",
  },
  {
    title: "Geisha",
    category: "Walking act",
    image: "/images/geisha/geisha.webp",
    size: "small",
  },
  {
    title: "Light show",
    category: "Oheň & světlo",
    image: "/images/lightshow/lightshow1.webp",
    size: "large",
  },
  {
    title: "Lollipop show",
    category: "Artistika",
    image: "/images/lollipop/lollipop.webp",
    size: "small",
  },
  {
    title: "Plesová show",
    category: "Taneční vystoupení",
    image: "/images/plesovashow/plesova-show2.webp",
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
    <m.div
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
        width={size === "large" ? 1200 : 600}
        height={size === "large" ? 675 : 800}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
    </m.div>
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
          <m.div
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
          </m.div>
          <m.div
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
          </m.div>
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
