import type { NextConfig } from "next";

const securityHeaders = [
  // Zakazuje načítání webu v iframu — ochrana proti clickjackingu
  { key: "X-Frame-Options", value: "DENY" },
  // Prohlížeč nesmí hádat typ souboru — ochrana proti MIME sniffingu
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer se posílá jen na stejnou doménu
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Povoluje pouze HTTPS po dobu 1 roku
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Omezuje přístup ke kameře, mikrofonu a dalším API prohlížeče
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Content Security Policy — povoluje pouze vlastní zdroje + Google Fonts
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval potřebuje Next.js/Framer Motion
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "connect-src 'self'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Hlavičky platí pro všechny stránky
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
