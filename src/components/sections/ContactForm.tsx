"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Zadejte jméno"),
  email: z.string().email("Neplatná e-mailová adresa"),
  phone: z.string().optional(),
  company: z.string().optional(),
  eventType: z.enum(["korporatni", "soukroma", "festival", "hotel", "jine"]).refine(
    (v) => v !== undefined,
    { message: "Vyberte typ akce" }
  ),
  eventDate: z.string().optional(),
  budget: z.enum(["50-150k", "150-500k", "500k-plus"]).optional(),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
  gdprConsent: z.literal(true, { message: "Souhlas je povinný" }),
  // Honeypot — humans leave this empty, bots fill it automatically
  website: z.string().max(0, "").optional(),
});

type FormData = z.infer<typeof schema>;

// Shared input class
const inputClass =
  "w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C8D400] transition-colors duration-200";

const labelClass = "block text-white/50 text-xs uppercase tracking-widest mb-2";

const errorClass = "text-red-400 text-xs mt-1";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          // Success state
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start justify-center min-h-[400px] py-16"
          >
            <div className="w-16 h-16 rounded-full border-2 border-[#C8D400] flex items-center justify-center mb-8">
              <svg
                className="w-7 h-7 text-[#C8D400]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-4xl text-white mb-3">ODESLÁNO.</h2>
            <p className="text-white/60 text-base mb-8">
              Váš show designer se ozve do 24 hodin.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-white/40 text-sm hover:text-white transition-colors duration-200"
            >
              Odeslat další poptávku →
            </button>
          </motion.div>
        ) : (
          // Form
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Row: name + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelClass}>Jméno *</label>
                <input id="name" type="text" placeholder="Jan Novák" className={inputClass} {...register("name")} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>E-mail *</label>
                <input id="email" type="email" placeholder="jan@firma.cz" className={inputClass} {...register("email")} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>

            {/* Row: phone + company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className={labelClass}>Telefon</label>
                <input id="phone" type="tel" placeholder="+420 777 000 000" className={inputClass} {...register("phone")} />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>Firma</label>
                <input id="company" type="text" placeholder="Název firmy" className={inputClass} {...register("company")} />
              </div>
            </div>

            {/* Event type */}
            <div>
              <label htmlFor="eventType" className={labelClass}>Typ akce *</label>
              <select id="eventType" className={`${inputClass} cursor-pointer`} {...register("eventType")}>
                <option value="" disabled hidden>Vyberte typ akce</option>
                <option value="korporatni">Korporátní akce</option>
                <option value="soukroma">Soukromá oslava</option>
                <option value="festival">Festival / kulturní akce</option>
                <option value="hotel">Hotel / resort</option>
                <option value="jine">Jiné</option>
              </select>
              {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
            </div>

            {/* Row: date + budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDate" className={labelClass}>Datum akce</label>
                <input id="eventDate" type="date" className={`${inputClass} [color-scheme:dark]`} {...register("eventDate")} />
              </div>
              <div>
                <label htmlFor="budget" className={labelClass}>Orientační rozpočet</label>
                <select id="budget" className={`${inputClass} cursor-pointer`} {...register("budget")}>
                  <option value="">Nevím / nechci uvádět</option>
                  <option value="50-150k">50 000 – 150 000 Kč</option>
                  <option value="150-500k">150 000 – 500 000 Kč</option>
                  <option value="500k-plus">500 000 Kč a více</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>Zpráva *</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Popište akci, atmosféru, co si přejete…"
                className={`${inputClass} resize-none`}
                {...register("message")}
              />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            {/* Honeypot — hidden from humans, bots fill it and get silently rejected */}
            <div aria-hidden="true" className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" type="text" autoComplete="off" tabIndex={-1} {...register("website")} />
            </div>

            {/* GDPR */}
            <div className="flex items-start gap-3">
              <input
                id="gdpr"
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-[#C8D400] cursor-pointer flex-shrink-0"
                {...register("gdprConsent")}
              />
              <label htmlFor="gdpr" className="text-white/50 text-xs leading-relaxed cursor-pointer">
                Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.{" "}
                <a href="/zasady" className="text-[#C8D400] hover:underline">
                  Zásady ochrany osobních údajů
                </a>
                . *
              </label>
            </div>
            {errors.gdprConsent && <p className={errorClass}>{errors.gdprConsent.message}</p>}

            {/* Error message */}
            {status === "error" && (
              <p className="text-red-400 text-sm border border-red-400/30 rounded-sm px-4 py-3 bg-red-400/5">
                Nepodařilo se odeslat poptávku. Zkuste to prosím znovu nebo nás kontaktujte přímo na booking@showdesigners.cz.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 bg-[#C8D400] text-black font-semibold text-base px-8 py-4 rounded-sm btn-hover-lime disabled:opacity-50 disabled:cursor-not-allowed self-start"
            >
              {status === "loading" ? "Odesílám…" : "Odeslat poptávku"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
