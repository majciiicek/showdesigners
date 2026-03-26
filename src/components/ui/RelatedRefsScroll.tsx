"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface Ref {
  _id: string;
  slug: { current: string };
  title: string;
  type: string;
}

// Card width (w-72 = 288px) + gap (gap-4 = 16px)
const CARD_STEP = 288 + 16;

export default function RelatedRefsScroll({ refs }: { refs: Ref[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Total width of one full copy of the list
  const realWidth = refs.length * CARD_STEP;

  // On mount: scroll to the start of the middle (real) copy
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = realWidth;
  }, [realWidth]);

  // When user scrolls into the clone zones → silently teleport back to real zone
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft } = el;

    if (scrollLeft >= realWidth * 2) {
      // Entered trailing clones → jump to same position in real items
      el.scrollLeft = scrollLeft - realWidth;
    } else if (scrollLeft <= 0) {
      // Entered leading clones → jump forward
      el.scrollLeft = scrollLeft + realWidth;
    }
  }, [realWidth]);

  function scrollCards(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? CARD_STEP * 3 : -CARD_STEP * 3,
      behavior: "smooth",
    });
  }

  // Render three copies: [clones] + [real] + [clones]
  // Using index suffix to make keys unique across copies
  const items = [
    ...refs.map((r) => ({ ...r, key: `a-${r._id}` })),
    ...refs.map((r) => ({ ...r, key: `b-${r._id}` })),
    ...refs.map((r) => ({ ...r, key: `c-${r._id}` })),
  ];

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scrollCards("left")}
        aria-label="Předchozí realizace"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/80 border border-white/10 rounded-full text-white/60 hover:text-[#C8D400] hover:border-[#C8D400]/40 transition-colors duration-200"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto px-6 lg:px-8 pb-4 scrollbar-none"
      >
        {items.map((r) => (
          <Link
            key={r.key}
            href={`/reference/${r.slug.current}`}
            className="group flex-shrink-0 w-72 bg-black/40 border border-white/5 rounded-sm p-6 hover:border-[#C8D400]/30 transition-colors duration-200"
          >
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{r.type}</p>
            <p className="font-display text-xl text-white group-hover:text-[#C8D400] transition-colors duration-200 leading-tight">
              {r.title.toUpperCase()}
            </p>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scrollCards("right")}
        aria-label="Další realizace"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/80 border border-white/10 rounded-full text-white/60 hover:text-[#C8D400] hover:border-[#C8D400]/40 transition-colors duration-200"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
