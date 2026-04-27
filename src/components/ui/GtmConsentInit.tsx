"use client";

import { useEffect } from "react";
import { initConsentDefaults, updateConsent, getStoredConsent } from "@/lib/gtm";

export default function GtmConsentInit({ locale }: { locale: "cs" | "en" | "de" }) {
  useEffect(() => {
    initConsentDefaults();

    const stored = getStoredConsent();
    if (stored === "accepted") {
      updateConsent(true);
    }

    window.dataLayer = window.dataLayer || [];
    (window.dataLayer as Record<string, unknown>[]).push({
      site_locale: locale,
      site_domain: window.location.hostname,
    });

    const handler = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      updateConsent(value === "accepted");
    };
    window.addEventListener("sd-consent-update", handler);
    return () => window.removeEventListener("sd-consent-update", handler);
  }, [locale]);

  return null;
}
