"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sd-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Check localStorage after mount — avoids SSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    // TODO: Enable Google Analytics or other tracking here
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Souhlas s cookies"
      className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:bottom-6 md:max-w-md z-50"
    >
      <div className="bg-[#111111] border border-white/10 rounded-lg p-5 shadow-2xl">
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          Používáme cookies pro analýzu návštěvnosti a zlepšení webu.{" "}
          <Link
            href="/zasady"
            className="text-[#C8D400] hover:underline"
          >
            Více informací
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-[#C8D400] text-black text-sm font-semibold py-2.5 px-4 rounded-sm btn-hover-lime"
          >
            Přijmout
          </button>
          <button
            onClick={reject}
            className="flex-1 bg-white/10 text-white text-sm font-medium py-2.5 px-4 rounded-sm hover:bg-white/15 transition-colors duration-200"
          >
            Odmítnout
          </button>
        </div>
      </div>
    </div>
  );
}
