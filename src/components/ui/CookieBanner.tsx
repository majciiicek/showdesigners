"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sd-cookie-consent";

export type CookieText = {
  cookie_aria: string;
  cookie_text: string;
  cookie_more: string;
  cookie_accept: string;
  cookie_reject: string;
};

export default function CookieBanner({ text, privacyHref }: { text: CookieText; privacyHref: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
      window.dispatchEvent(new CustomEvent("sd-cookie-banner", { detail: true }));
    }
  }, []);

  const dismiss = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("sd-cookie-banner", { detail: false }));
    window.dispatchEvent(new CustomEvent("sd-consent-update", { detail: value }));
  };

  const accept = () => dismiss("accepted");
  const reject = () => dismiss("rejected");

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={text.cookie_aria}
      className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:bottom-6 md:max-w-md z-50"
    >
      <div className="bg-[#111111] border border-white/10 rounded-lg p-5 shadow-2xl">
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          {text.cookie_text}{" "}
          <Link href={privacyHref} className="text-[#C8D400] hover:underline">
            {text.cookie_more}
          </Link>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-[#C8D400] text-black text-sm font-semibold py-2.5 px-4 rounded-sm btn-hover-lime"
          >
            {text.cookie_accept}
          </button>
          <button
            onClick={reject}
            className="flex-1 bg-white/10 text-white text-sm font-medium py-2.5 px-4 rounded-sm hover:bg-white/15 transition-colors duration-200"
          >
            {text.cookie_reject}
          </button>
        </div>
      </div>
    </div>
  );
}
