"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/gtm";

export type FormText = {
  form_name_label: string;
  form_name_placeholder: string;
  form_name_error: string;
  form_email_label: string;
  form_email_placeholder: string;
  form_email_error: string;
  form_phone_label: string;
  form_company_label: string;
  form_company_placeholder: string;
  form_eventtype_label: string;
  form_eventtype_placeholder: string;
  form_eventtype_error: string;
  form_eventtype_1: string;
  form_eventtype_2: string;
  form_eventtype_3: string;
  form_eventtype_4: string;
  form_eventtype_5: string;
  form_date_label: string;
  form_budget_label: string;
  form_budget_unknown: string;
  form_budget_1: string;
  form_budget_2: string;
  form_budget_3: string;
  form_message_label: string;
  form_message_placeholder: string;
  form_message_error: string;
  form_gdpr_text: string;
  form_gdpr_link: string;
  form_gdpr_error: string;
  form_error_message: string;
  form_submit: string;
  form_loading: string;
  form_success_headline: string;
  form_success_sub: string;
  form_success_reset: string;
};

// Shared input class
const inputClass =
  "w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C8D400] transition-colors duration-200";

const labelClass = "block text-white/50 text-xs uppercase tracking-widest mb-2";

const errorClass = "text-red-400 text-xs mt-1";

export default function ContactForm({ text, privacyHref }: { text: FormText; privacyHref: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Build schema with translated error messages
  const schema = z.object({
    name: z.string().min(2, text.form_name_error),
    email: z.string().email(text.form_email_error),
    phone: z.string().optional(),
    company: z.string().optional(),
    eventType: z.enum(["korporatni", "soukroma", "festival", "hotel", "jine"]).refine(
      (v) => v !== undefined,
      { message: text.form_eventtype_error }
    ),
    eventDate: z.string().optional(),
    budget: z.enum(["50-150k", "150-500k", "500k-plus"]).optional(),
    message: z.string().min(10, text.form_message_error),
    gdprConsent: z.literal(true, { message: text.form_gdpr_error }),
    // Honeypot — humans leave this empty, bots fill it automatically
    website: z.string().max(0, "").optional(),
  });

  type FormData = z.infer<typeof schema>;

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
        trackEvent("contact_form_submit", {
          form_event_type: data.eventType,
          form_budget: data.budget || "not_specified",
        });
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
          <m.div
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
            <h2 className="font-display text-4xl text-white mb-3">{text.form_success_headline}</h2>
            <p className="text-white/60 text-base mb-8">
              {text.form_success_sub}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-white/40 text-sm hover:text-white transition-colors duration-200"
            >
              {text.form_success_reset}
            </button>
          </m.div>
        ) : (
          // Form
          <m.form
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
                <label htmlFor="name" className={labelClass}>{text.form_name_label} *</label>
                <input id="name" type="text" placeholder={text.form_name_placeholder} className={inputClass} {...register("name")} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>{text.form_email_label} *</label>
                <input id="email" type="email" placeholder={text.form_email_placeholder} className={inputClass} {...register("email")} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>

            {/* Row: phone + company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className={labelClass}>{text.form_phone_label}</label>
                <input id="phone" type="tel" placeholder="+420 777 000 000" className={inputClass} {...register("phone")} />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>{text.form_company_label}</label>
                <input id="company" type="text" placeholder={text.form_company_placeholder} className={inputClass} {...register("company")} />
              </div>
            </div>

            {/* Event type */}
            <div>
              <label htmlFor="eventType" className={labelClass}>{text.form_eventtype_label} *</label>
              <select id="eventType" className={`${inputClass} cursor-pointer`} {...register("eventType")}>
                <option value="" disabled hidden>{text.form_eventtype_placeholder}</option>
                <option value="korporatni">{text.form_eventtype_1}</option>
                <option value="soukroma">{text.form_eventtype_2}</option>
                <option value="festival">{text.form_eventtype_3}</option>
                <option value="hotel">{text.form_eventtype_4}</option>
                <option value="jine">{text.form_eventtype_5}</option>
              </select>
              {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
            </div>

            {/* Row: date + budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDate" className={labelClass}>{text.form_date_label}</label>
                <input id="eventDate" type="date" className={`${inputClass} [color-scheme:dark]`} {...register("eventDate")} />
              </div>
              <div>
                <label htmlFor="budget" className={labelClass}>{text.form_budget_label}</label>
                <select id="budget" className={`${inputClass} cursor-pointer`} {...register("budget")}>
                  <option value="">{text.form_budget_unknown}</option>
                  <option value="50-150k">{text.form_budget_1}</option>
                  <option value="150-500k">{text.form_budget_2}</option>
                  <option value="500k-plus">{text.form_budget_3}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>{text.form_message_label} *</label>
              <textarea
                id="message"
                rows={5}
                placeholder={text.form_message_placeholder}
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
                {text.form_gdpr_text}{" "}
                <a href={privacyHref} className="text-[#C8D400] hover:underline">
                  {text.form_gdpr_link}
                </a>
                . *
              </label>
            </div>
            {errors.gdprConsent && <p className={errorClass}>{errors.gdprConsent.message}</p>}

            {/* Error message */}
            {status === "error" && (
              <p className="text-red-400 text-sm border border-red-400/30 rounded-sm px-4 py-3 bg-red-400/5">
                {text.form_error_message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 bg-[#C8D400] text-black font-semibold text-base px-8 py-4 rounded-sm btn-hover-lime disabled:opacity-50 disabled:cursor-not-allowed self-start"
            >
              {status === "loading" ? text.form_loading : text.form_submit}
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
