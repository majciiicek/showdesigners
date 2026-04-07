"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import AiChat from "./AiChat";

const AUTO_OPEN_KEY = "sd_chat_auto_opened";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  // Track cookie banner visibility to avoid overlapping it
  useEffect(() => {
    if (!localStorage.getItem("sd-cookie-consent")) setCookieBannerVisible(true);
    const handler = (e: Event) => setCookieBannerVisible((e as CustomEvent<boolean>).detail);
    window.addEventListener("sd-cookie-banner", handler);
    return () => window.removeEventListener("sd-cookie-banner", handler);
  }, []);

  // Auto-open once per session after 20 seconds — desktop only
  useEffect(() => {
    if (window.innerWidth < 768) return;
    try {
      if (sessionStorage.getItem(AUTO_OPEN_KEY)) return;
    } catch { return; }

    const t = setTimeout(() => {
      setIsOpen(true);
      try { sessionStorage.setItem(AUTO_OPEN_KEY, "1"); } catch { /* ignore */ }
    }, 20000);

    return () => clearTimeout(t);
  }, []);

  // Cookie banner is ~130px tall + 16px bottom offset = ~146px from bottom
  const bottomOffset = cookieBannerVisible ? "bottom-44" : "bottom-6";

  return (
    <div className={`fixed ${bottomOffset} right-4 sm:right-6 sm:bottom-6 z-50 flex flex-col items-end gap-3 transition-all duration-300`}>

      {/* Chat panel — slides up from button */}
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
                  Virtuální Alžběta
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Zavřít"
                className="w-6 h-6 flex items-center justify-center text-white/25 hover:text-white/70 transition-colors duration-200 rounded-full hover:bg-white/5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* AiChat */}
            <div className="overflow-hidden px-5">
              <AiChat hideLabel autoStartMessage="__AUTO_OPEN__" />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* FAB toggle button */}
      <m.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Zavřít Virtuální Alžbětu" : "Otevřít Virtuální Alžbětu"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-[#C8D400] text-black font-semibold text-sm px-5 py-3.5 rounded-full shadow-lg"
        style={{
          boxShadow: "0 8px 32px rgba(200,212,0,0.35)",
        }}
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
        <span>{isOpen ? "Zavřít" : "Alžběta"}</span>
      </m.button>

    </div>
  );
}
