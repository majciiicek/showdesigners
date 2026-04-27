import { sendGTMEvent } from "@next/third-parties/google";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

type ConsentState = "granted" | "denied";

const CONSENT_KEY = "sd-cookie-consent";

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      (window.dataLayer as unknown[]).push(args);
    };
}

export function initConsentDefaults() {
  ensureDataLayer();
  window.gtag("consent", "default", {
    analytics_storage: "denied" as ConsentState,
    ad_storage: "denied" as ConsentState,
    ad_user_data: "denied" as ConsentState,
    ad_personalization: "denied" as ConsentState,
    wait_for_update: 500,
  });
}

export function updateConsent(granted: boolean) {
  ensureDataLayer();
  const state: ConsentState = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export function getStoredConsent(): "accepted" | "rejected" | null {
  try {
    return localStorage.getItem(CONSENT_KEY) as "accepted" | "rejected" | null;
  } catch {
    return null;
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  sendGTMEvent({ event: name, ...params });
}
