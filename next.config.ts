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
  // Ochrana proti XSS útokům (starší prohlížeče)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy — povoluje pouze vlastní zdroje + Google Fonts
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com",
      "media-src 'self'",
      "connect-src 'self' https://api.sanity.io https://*.apicdn.sanity.io wss://*.sanity.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.google-analytics.com",
      "frame-src https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Skryje hlavičku X-Powered-By: Next.js — omezí únik informací o tech stacku
  poweredByHeader: false,

  // Maps EN and DE URL slugs to the CS file-system paths.
  // Locale is detected from hostname (middleware), so the right language is
  // still served even though the underlying route is the CS folder.
  async rewrites() {
    return [
      // English slugs
      { source: "/about",            destination: "/o-nas"     },
      { source: "/services",         destination: "/sluzba"    },
      { source: "/references",       destination: "/reference" },
      { source: "/references/:slug", destination: "/reference/:slug" },
      { source: "/contact",          destination: "/kontakt"   },
      { source: "/privacy",          destination: "/zasady"    },
      // German slugs
      { source: "/ueber-uns",        destination: "/o-nas"     },
      { source: "/leistungen",       destination: "/sluzba"    },
      { source: "/referenzen",       destination: "/reference" },
      { source: "/referenzen/:slug", destination: "/reference/:slug" },
      { source: "/datenschutz",      destination: "/zasady"    },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Studio route — bez CSP omezení (Sanity Studio potřebuje volný přístup)
        source: "/studio/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        // Hlavičky platí pro všechny ostatní stránky
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
