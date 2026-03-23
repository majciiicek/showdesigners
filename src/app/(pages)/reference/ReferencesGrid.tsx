"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityReference } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const typeColors: Record<string, string> = {
  "Korporátní akce": "bg-blue-700/75 text-white backdrop-blur-sm",
  "Soukromá akce": "bg-purple-700/75 text-white backdrop-blur-sm",
  "Kulturní akce": "bg-orange-700/75 text-white backdrop-blur-sm",
  "Hotel / resort": "bg-teal-700/75 text-white backdrop-blur-sm",
  "Festival": "bg-pink-700/75 text-white backdrop-blur-sm",
  "Family day": "bg-green-700/75 text-white backdrop-blur-sm",
  "Městská akce": "bg-yellow-700/75 text-white backdrop-blur-sm",
};

const INITIAL_COUNT = 6;

interface Props {
  references: SanityReference[];
}

export default function ReferencesGrid({ references }: Props) {
  const allTypes = ["Vše", ...Array.from(new Set(references.map((r) => r.type)))];
  const [active, setActive] = useState("Vše");
  const [showAll, setShowAll] = useState(false);

  const filtered = active === "Vše" ? references : references.filter((r) => r.type === active);
  const visible = active !== "Vše" || showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = active === "Vše" && !showAll && filtered.length > INITIAL_COUNT;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => { setActive(type); setShowAll(false); }}
            className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 ${
              active === type
                ? "bg-[#C8D400] text-black border-[#C8D400] font-semibold"
                : "border-white/15 text-white/50 hover:text-white hover:border-white/30"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((cs) => {
          const imageUrl = urlFor(cs.image).width(800).height(500).format("webp").url();

          const card = (
            <article className="group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden hover:border-white/10 transition-colors duration-300 h-full">
              <div className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={imageUrl}
                  alt={cs.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      typeColors[cs.type] ?? "bg-black/70 text-white/70 border border-white/20"
                    }`}
                  >
                    {cs.type}
                  </span>
                </div>
                {cs.hasDetail && (
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/70 text-white/70 border border-white/20">
                      Case study →
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 p-6 flex-1">
                <h2 className="font-display text-2xl text-white leading-tight">{cs.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{cs.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {cs.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[#C8D400]/70 text-xs border border-[#C8D400]/20 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );

          return cs.hasDetail ? (
            <Link key={cs._id} href={`/reference/${cs.slug.current}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={cs._id}>{card}</div>
          );
        })}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm px-8 py-3 rounded-full transition-all duration-200"
          >
            Další reference
          </button>
        </div>
      )}
    </>
  );
}
