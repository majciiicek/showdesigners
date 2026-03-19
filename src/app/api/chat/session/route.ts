import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Rate limiting — ochrana před enumerací emailů (GET) a spamem (POST/PATCH)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

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

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Validační schémata
const patchSchema = z.object({
  token: z.string().uuid(),
  name: z.string().max(200).optional(),
  email: z.string().email().optional(),
  inquiry_sent: z.boolean().optional(),
});

// GET /api/chat/session?token=xxx  — load conversation by session token
// GET /api/chat/session?email=xxx  — find conversation by email
export async function GET(request: NextRequest) {
  if (isRateLimited(getIp(request))) {
    return NextResponse.json({ error: "Příliš mnoho požadavků." }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token && !email) {
    return NextResponse.json({ error: "Chybí token nebo email." }, { status: 400 });
  }

  // Validace formátu vstupů
  if (token && !z.string().uuid().safeParse(token).success) {
    return NextResponse.json({ conversation: null, messages: [] });
  }
  if (email && !z.string().email().safeParse(email).success) {
    return NextResponse.json({ conversation: null, messages: [] });
  }

  try {
    // Find conversation
    const query = supabase.from("conversations").select("*");
    const { data: conversation, error: convError } = token
      ? await query.eq("session_token", token).single()
      : await query.eq("email", email).order("created_at", { ascending: false }).limit(1).single();

    if (convError || !conversation) {
      return NextResponse.json({ conversation: null, messages: [] });
    }

    // Load messages
    const { data: messages, error: msgError } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true });

    if (msgError) throw msgError;

    return NextResponse.json({ conversation, messages: messages ?? [] });
  } catch (err) {
    console.error("[session] Error:", err);
    return NextResponse.json({ error: "Chyba při načítání konverzace." }, { status: 500 });
  }
}

// POST /api/chat/session — create new conversation, returns session_token
export async function POST() {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .insert({})
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ session_token: data.session_token });
  } catch (err) {
    console.error("[session] Create error:", err);
    return NextResponse.json({ error: "Chyba při vytváření konverzace." }, { status: 500 });
  }
}

// PATCH /api/chat/session — update name/email/inquiry_sent on conversation
export async function PATCH(request: NextRequest) {
  if (isRateLimited(getIp(request))) {
    return NextResponse.json({ error: "Příliš mnoho požadavků." }, { status: 429 });
  }

  const body = await request.json() as unknown;
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data." }, { status: 400 });
  }

  const { token: sessionToken, ...updates } = parsed.data;

  try {
    const { error } = await supabase
      .from("conversations")
      .update({
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.email !== undefined && { email: updates.email }),
        ...(updates.inquiry_sent !== undefined && { inquiry_sent: updates.inquiry_sent }),
      })
      .eq("session_token", sessionToken);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[session] Update error:", err);
    return NextResponse.json({ error: "Chyba při ukládání." }, { status: 500 });
  }
}
