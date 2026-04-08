"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useInView } from "framer-motion";

export type ProjectsText = {
  projects_label: string;
  projects_headline: string;
  projects_link: string;
  project_0_title: string;
  project_0_category: string;
  project_1_title: string;
  project_1_category: string;
  project_2_title: string;
  project_2_category: string;
  project_3_title: string;
  project_3_category: string;
  project_4_title: string;
  project_4_category: string;
  project_5_title: string;
  project_5_category: string;
};

// Image/size data only — titles and categories come from text prop
const PROJECT_DATA = [
  { image: "/images/parovaakrobacie/partnerska-akrobacie1.webp", size: "large" },
  { image: "/images/fireshow/tribal-fireshow1.webp",             size: "small" },
  { image: "/images/geisha/geisha.webp",                         size: "small" },
  { image: "/images/lightshow/lightshow1.webp",                  size: "large" },
  { image: "/images/lollipop/lollipop.webp",                     size: "small" },
  { image: "/images/plesovashow/plesova-show2.webp",             size: "large" },
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

export default function ProjectsSection({ text, referencesHref }: { text: ProjectsText; referencesHref: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const projects = PROJECT_DATA.map((data, i) => ({
    ...data,
    title:    text[`project_${i}_title`    as keyof ProjectsText],
    category: text[`project_${i}_category` as keyof ProjectsText],
  }));

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
              {text.projects_label}
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-white leading-none">
              {text.projects_headline}
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href={referencesHref}
              className="text-white/60 text-sm hover:text-[#C8D400] transition-colors duration-200 flex items-center gap-2"
            >
              {text.projects_link}
              <span aria-hidden="true">→</span>
            </Link>
          </m.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
