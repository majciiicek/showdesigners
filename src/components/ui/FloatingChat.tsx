"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import AiChat, { type ChatText } from "./AiChat";
import { trackEvent } from "@/lib/gtm";

const AUTO_OPEN_KEY = "sd_chat_auto_opened";

export type FloatingText = {
  floating_label: string;
  floating_close_label: string;
  floating_open_label: string;
  floating_close_aria: string;
  floating_open_aria: string;
};

export default function FloatingChat({ text, chatText, locale = "cs" }: { text: FloatingText; chatText: ChatText; locale?: "cs" | "en" | "de" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sd-cookie-consent")) setCookieBannerVisible(true);
    const handler = (e: Event) => setCookieBannerVisible((e as CustomEvent<boolean>).detail);
    window.addEventListener("sd-cookie-banner", handler);
    return () => window.removeEventListener("sd-cookie-banner", handler);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    try {
      if (sessionStorage.getItem(AUTO_OPEN_KEY)) return;
    } catch { return; }

    const t = setTimeout(() => {
      setIsOpen(true);
      trackEvent("ai_chat_opened", { chat_trigger: "auto_open" });
      try { sessionStorage.setItem(AUTO_OPEN_KEY, "1"); } catch { /* ignore */ }
    }, 20000);

    return () => clearTimeout(t);
  }, []);

  // Cookie banner takes priority; footer pushes button up by ~80px
  const bottomOffset = cookieBannerVisible ? "bottom-44" : footerVisible ? "bottom-20" : "bottom-6";

  return (
    <div className={`fixed ${bottomOffset} right-4 sm:right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300`}>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[380px] max-w-[calc(100vw-32px)] rounded-sm overflow-hidden shadow-2xl"
            style={{
              background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,212,0,0.06)",
              maxHeight: "calc(100vh - 120px)",
            }}
          >
            {/* Inner panel header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8D400] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8D400]" />
                </span>
                <span className="text-white/60 text-xs font-medium tracking-[0.15em] uppercase">
                  {text.floating_label}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={text.floating_close_aria}
                className="w-6 h-6 flex items-center justify-center text-white/25 hover:text-white/70 transition-colors duration-200 rounded-full hover:bg-white/5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* AiChat */}
            <div className="overflow-hidden px-5">
              <AiChat hideLabel autoStartMessage="__AUTO_OPEN__" text={chatText} locale={locale} />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* FAB toggle button */}
      <m.button
        onClick={() => {
          setIsOpen((v) => {
            if (!v) trackEvent("ai_chat_opened", { chat_trigger: "fab_click" });
            return !v;
          });
        }}
        aria-label={isOpen ? text.floating_close_aria : text.floating_open_aria}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-[#C8D400] text-black font-semibold text-sm px-5 py-3.5 rounded-full shadow-lg"
        style={{ boxShadow: "0 8px 32px rgba(200,212,0,0.35)" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.svg
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </m.svg>
          ) : (
            <m.svg
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </m.svg>
          )}
        </AnimatePresence>
        <span>{isOpen ? text.floating_close_label : text.floating_open_label}</span>
      </m.button>

    </div>
  );
}
