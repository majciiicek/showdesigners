import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Rate limiting — max 3 poptávky za hodinu z jedné IP adresy
// Používá Map v paměti (funguje per-instance, dostačující pro marketing web)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hodina

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  eventType: z.enum(["korporatni", "soukroma", "festival", "hotel", "jine"]),
  eventDate: z.string().optional(),
  budget: z.enum(["50-150k", "150-500k", "500k-plus"]).optional(),
  message: z.string().min(10),
  gdprConsent: z.literal(true),
  // Honeypot — must be empty; bots that fill it are silently rejected
  website: z.string().max(0).optional(),
});

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Guard — selže okamžitě pokud chybí API klíč (nezasekne se až při odesílání)
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Chyba konfigurace serveru. Kontaktujte nás přímo na booking@showdesigners.cz." },
      { status: 503 }
    );
  }

  // Rate limiting podle IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Příliš mnoho požadavků. Zkuste to prosím za hodinu, nebo nás kontaktujte přímo." },
      { status: 429 }
    );
  }

  // Validace vstupu
  const body = await request.json() as unknown;
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Neplatná data formuláře." },
      { status: 400 }
    );
  }

  // Honeypot check — if the hidden "website" field is filled, it's a bot
  if (parsed.data.website && parsed.data.website.length > 0) {
    // Return 200 so bots think the submission succeeded
    return NextResponse.json({ success: true });
  }

  // Odeslání emailu
  const data = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Showdesigners web <noreply@showdesigners.cz>",
    to: ["booking@showdesigners.cz"],
    replyTo: data.email,
    subject: `Nová poptávka — ${data.name} (${data.eventType})`,
    text: `
Nová poptávka ze showdesigners.cz

Jméno: ${data.name}
Email: ${data.email}
Telefon: ${data.phone ?? "—"}
Firma: ${data.company ?? "—"}
Typ akce: ${data.eventType}
Datum akce: ${data.eventDate ?? "—"}
Rozpočet: ${data.budget ?? "—"}

Zpráva:
${data.message}
    `.trim(),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Chyba při odesílání. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
