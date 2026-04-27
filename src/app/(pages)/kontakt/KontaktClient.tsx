"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ContactForm, { type FormText } from "@/components/sections/ContactForm";
import AiChat, { type ChatText } from "@/components/ui/AiChat";
import { trackEvent } from "@/lib/gtm";

type Mode = "form" | "ai";

export type KontaktText = {
  kontakt_label: string;
  kontakt_headline_1: string;
  kontakt_headline_2: string;
  kontakt_headline_3: string;
  kontakt_sub: string;
  kontakt_email_label: string;
  kontakt_phone_label: string;
  kontakt_tab_ai: string;
  kontakt_tab_form: string;
};

export default function KontaktClient({
  text,
  formText,
  chatText,
  privacyHref,
  locale = "cs",
}: {
  text: KontaktText;
  formText: FormText;
  chatText: ChatText;
  privacyHref: string;
  locale?: "cs" | "en" | "de";
}) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>(
    searchParams.get("mode") === "form" ? "form" : "ai"
  );

  return (
    <section className="bg-black pt-32 pb-24 lg:pt-40 lg:pb-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              {text.kontakt_label}
            </p>
            <h1
              className="font-display text-white leading-none mb-8"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              {text.kontakt_headline_1}
              <br />
              {text.kontakt_headline_2}
              <br />
              <span className="text-[#C8D400]">{text.kontakt_headline_3}</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-sm mb-12">
              {text.kontakt_sub}
            </p>

            {/* Direct contacts */}
            <div className="flex flex-col gap-6">
              <a href="mailto:booking@showdesigners.cz" className="group flex flex-col">
                <span className="text-white/30 text-xs uppercase tracking-widest mb-1">{text.kontakt_email_label}</span>
                <span className="text-[#C8D400] text-lg group-hover:text-[#d9e600] transition-colors duration-200">
                  booking@showdesigners.cz
                </span>
              </a>

              <div className="flex flex-col gap-3">
                <span className="text-white/30 text-xs uppercase tracking-widest">{text.kontakt_phone_label}</span>
                <div className="flex flex-col gap-1">
                  <a href="tel:+420777668694" className="text-white/80 hover:text-white transition-colors duration-200">
                    Alžběta Grée — +420 777 668 694
                  </a>
                  <a href="tel:+420774297349" className="text-white/80 hover:text-white transition-colors duration-200">
                    Michal Halačka — +420 774 297 349
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — mode toggle + form/chat */}
          <div className="flex flex-col gap-6">
            {/* Toggle */}
            <div className="flex items-center gap-1 bg-white/5 rounded-sm p-1 self-start">
              <button
                onClick={() => { setMode("ai"); trackEvent("contact_mode_toggle", { contact_mode: "ai" }); }}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  mode === "ai"
                    ? "bg-[#C8D400] text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {text.kontakt_tab_ai}
              </button>
              <button
                onClick={() => { setMode("form"); trackEvent("contact_mode_toggle", { contact_mode: "form" }); }}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  mode === "form"
                    ? "bg-[#C8D400] text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {text.kontakt_tab_form}
              </button>
            </div>

            {/* Content */}
            {mode === "ai" ? (
              <AiChat text={chatText} locale={locale} />
            ) : (
              <ContactForm text={formText} privacyHref={privacyHref} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
