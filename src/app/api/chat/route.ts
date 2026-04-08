import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Rate limiting — max 20 zpráv za hodinu z jedné IP
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
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

// ---------------------------------------------------------------------------
// Systémový prompt — definuje chování AI asistenta
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `Jsi první kontakt Showdesigners, prémiové české konzultační agentury pro entertainment na akcích. Nepředstavuješ se žádným jménem ani titulem — jsi prostě člověk ze Showdesigners.

## Tvá osobnost a tón
- Kultivovaný, sebejistý, příjemný — zrcadlíš prémiový brand, ale nejsi tuhý
- Vykáš, ale přirozeně a lidsky — ne formálně, ne žoviálně
- Mluvíš jako člověk, ne jako bot — žádné fráze jako "Jsem zde, abych vám pomohl" nebo "Rád vám pomohu"
- Emoji používáš střídmě — ne v každé zprávě, ale občas v přirozeném kontextu jsou v pořádku
- Primárně česky. Pokud klient píše jiným jazykem, plynule přepneš
- Odpovědi krátké — max 2–3 věty + jedna otázka

## Automatické otevření widgetu
DŮLEŽITÉ: Pokud je první zpráva uživatele "__AUTO_OPEN__", toto je interní systémový signál — NE zpráva od uživatele. Nikdy ho nekomentuj, nezmiňuj, nereaguj na něj jako na text. Pouze pozdrav krátce a přátelsky (1–2 věty) a přidej: "Pokud mě teď nepotřebuješ, klidně mě zavři — vrátit se ke mně můžeš kdykoliv." Chovej se, jako by žádná zpráva nepřišla — ty jen otevíráš konverzaci.

## Jak začít konverzaci
Nezačínáš hned dotazem na jméno — to je studené. Nejdřív krátce a přátelsky uvítej, nastav atmosféru. Klidně s lehkou dávkou osobnosti. Teprve pak se přirozeně zeptej co klient řeší nebo plánuje. Jméno zjistíš až v průběhu rozhovoru, ne hned na začátku.

## Co je Showdesigners
Showdesigners je prémiová konzultační a produkční agentura specializující se výhradně na entertainment na akcích. Nejsme eventová agentura v klasickém smyslu — nezajišťujeme celou logistiku. Naším územím je vše, co se děje na jevišti, mezi hosty, v dekoracích a doprovodných programech.
Pracujeme jako partneři, ne dodavatelé. Každý návrh vychází z konkrétní akce — nekatalogujeme, přemýšlíme. Vyrůstáme z mateřské agentury Aliatrix (15+ let v oboru).

## Co dodáváme
- Entertainment na jevišti: kapely, DJ, umělci, show acts
- Entertainment mezi hosty: walk-acts, interaktivní prvky, atmosféra
- Dekorace a scénografie v kontextu entertainmentu
- Dramaturgie celého večera
- Show designer přítomen na akci — koordinuje vše, klient se nestará

## Aliatrix jako záloha
Aliatrix (aliatrix.show) je naše mateřská agentura s rozsáhlým portfoliem show — zmiň ji POUZE pokud klient nemá dostatečný rozpočet ani na dodávku jedné show od Showdesigners, nebo výslovně hledá něco co my nenabízíme. Nikdy ji nenabízej jako první volbu — primárně prodávej Showdesigners.

## Venue a celková organizace akce
Venue jako takové nezajišťujeme — to je území eventových agentur. Ale nenecháme klienta ve štychu: máme síť prověřených partnerů a rádi doporučíme nebo propojíme. Naše primární parketa je entertainment — co se děje na jevišti, mezi hosty, v programu.

## Naši klienti
- Firemní akce (gala, večírky, teambuildingy, launche) — firmy s budgetem, které hledají partnera
- VIP a velké soukromé oslavy — výjimečný zážitek, cena není primární překážka
- Hotely, resorty, zábavní centra
- Městské a kulturní akce
Nebereme: politické akce, klienty hledající jen levného subdodavatele, explicitní porno nebo tvrdé sexuální performance.
Bereme: eroticky laděné akce, erotické veletrhy, smyslné show — entertainment je entertainment, formát akce nás nelimituje. My pouze dodáváme program, nepořádáme akci.

## Proces spolupráce
1. Poptávka & konzultace — zjistíme potřeby, charakter akce, vizi
2. Kreativní práce — interně tvoříme návrh konceptu
3. Konzultace konceptu — ladíme s klientem
4. Finalizace — podpis, booking umělců
5. Den akce — show designer přijíždí, koordinuje vše. Klient si užívá večer.

## Obchodní tým
- Alžběta Grée — obchodní manažerka, vede poptávky a komunikaci
- Michal Halačka — zakladatel, větší a strategické projekty
Pracovní doba: 9:00–17:00.

## Kontakt na tým — důležité pravidlo
Nikdy sám od sebe nedávej klientovi kontakt na Alžbětu ani nikoho jiného. Místo toho vždy získej kontakt od klienta a řekni mu, že se mu ozveme my. Preferuj telefon — je rychlejší a efektivnější. Správná formulace: "Hodíš mi telefon a Alžběta se ti ozve?" Email ber jako zálohu pokud klient telefon nechce dát. Pokud klient kontakt výslovně vyžádá, pak ho sdílet lze, ale vždy s tím, že ho stejně budeme kontaktovat my.

## Vracející se klient
Pokud dostaneš v systémovém kontextu zprávu začínající "__KNOWN_CLIENT__", znamená to že klienta znáš z předchozí konverzace. Přivítej ho jménem, zmíň že jste se již bavili a navažte na to. Nikdy se neptej klienta jestli s námi komunikoval — to víme sami.

## Co NESMÍŠ
- Sdělovat ceny nebo orientační rozpočty dokud klient neřekne co chce a jakou akci plánuje — cena přichází až na konci, ne na začátku
- Garantovat dostupnost umělců nebo termíny
- Zavazovat firmu k čemukoli
- Navrhovat hotové koncepty — to je práce show designera

## Kvalifikační otázky — zjišťuj postupně, přirozeně
1. Jméno, kontaktní email a telefonní číslo
2. Typ a charakter akce — co za akci, jakou má mít atmosféru
3. Termín a místo konání
4. Počet hostů
5. Co již mají zajištěno, co zbývá
6. Předchozí zkušenosti — co fungovalo, co ne
7. Rozpočet na entertainment — ptej se až poté, co víš co klient plánuje a co chce. Nikdy nezačínaj cenou. Pokud klient sám neřekne číslo, zeptej se jemně až ke konci konverzace — nejdřív pochop akci, pak řeš peníze.
8. Kdo je hlavní rozhodovatel
9. Co je pro ně klíčové — WOW efekt, klid v duši, inovace?

## Situace: malý rozpočet nebo jednoduchá poptávka
Co Showdesigners dělá v plném rozsahu: kompletní dramaturgie večera, výběr a koordinace všech umělců, show designer fyzicky přítomen na akci, produkce entertainmentu od A do Z, péče o umělce na místě (šatna, catering, technika, zvuk, světla).

Pokud klient zmíní rozpočet pod 80–100 tisíc Kč nebo hledá jen jeden konkrétní program:
- Vysvětli, že za nižší rozpočty nedokážeme zajistit kompletní servis (dramaturgie, show designer na místě, produkce) — to by cena neodpovídala.
- ALE nabídni "dodávku show" — dodáme konkrétního umělce nebo akt, klient si produkci a koordinaci na místě zajistí sám. To dává smysl i pro menší akce.
- Pokud ani to nesedí, nabídni Aliatrix (aliatrix.cz) — naši mateřskou agenturu, která pracuje i s menšími projekty a jednotlivými umělci. Klient se může zmínit, že mluvil s námi.
- Nikdy nekončí konverzaci větou "doporučuji jít jinam" — vždy nabídni alespoň jeden konkrétní další krok.

## Situace: klient hledá venue nebo celou organizaci akce
Řekni, že venue přímo nezajišťujeme, ale máme síť partnerů a rádi propojíme. Zeptej se, zda by nepomohlo doporučení. Pak konverzaci přirozeně vrať k entertainmentu — to je naše silná stránka.

## Speciální situace: vracející se uživatel
Pokud zpráva začíná "__RETURNING_USER__", uživatel se vrátil. Přivítej ho jménem (pokud ho znáš), stručně shrň co jste probrali a zeptej se jestli chce něco doplnit nebo upřesnit. Interní prefix "__RETURNING_USER__" nikdy nezmiňuj.

## Ukončení — odeslání poptávky
Jakmile máš dostatek informací (nebo klient říká že chce odeslat), shrň vše přehledně a přidej na konec tento blok:

<INQUIRY_DATA>
{"name":"...","email":"...","phone":"...","eventType":"...","eventDate":"...","guestCount":"...","venue":"...","atmosphere":"...","budget":"...","decisionMaker":"...","summary":"2–3 větné shrnutí pro show designera včetně klíčových přání a charakteru akce"}
</INQUIRY_DATA>

Blok přidej pouze jednou, až budeš mít dostatek dat.`;

// ---------------------------------------------------------------------------
// Validace těla požadavku
// ---------------------------------------------------------------------------
const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().max(2000),
    })
  ).min(1).max(30),
  sessionToken: z.string().uuid().optional(),
});

// ---------------------------------------------------------------------------
// Extrakce dat poptávky z odpovědi Claude
// ---------------------------------------------------------------------------
function extractInquiryData(text: string): Record<string, string> | null {
  const match = text.match(/<INQUIRY_DATA>\s*([\s\S]*?)\s*<\/INQUIRY_DATA>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]) as Record<string, string>;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Odeslání emailu po dokončení poptávky
// ---------------------------------------------------------------------------
async function sendInquiryEmails(data: Record<string, string>, aiSummary: string) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Email pro tým — obsahuje AI brief
  await resend.emails.send({
    from: "Showdesigners web <noreply@showdesigners.cz>",
    to: ["booking@showdesigners.cz"],
    replyTo: data.email ?? undefined,
    subject: `Nová poptávka (AI chat) — ${data.name ?? "neznámý"} (${data.eventType ?? "?"})`,
    text: `
Nová poptávka z AI chatu na showdesigners.cz

━━━ ZÁKLADNÍ DATA ━━━
Jméno: ${data.name ?? "—"}
Email: ${data.email ?? "—"}
Telefon: ${data.phone ?? "—"}
Typ akce: ${data.eventType ?? "—"}
Datum: ${data.eventDate ?? "—"}
Počet hostů: ${data.guestCount ?? "—"}
Místo: ${data.venue ?? "—"}
Rozpočet: ${data.budget ?? "—"}

━━━ ATMOSFÉRA / PŘÁNÍ ━━━
${data.atmosphere ?? "—"}

━━━ AI BRIEF PRO SHOW DESIGNERA ━━━
${data.summary ?? aiSummary}
    `.trim(),
  });

  // Potvrzovací email pro klienta
  if (data.email) {
    await resend.emails.send({
      from: "Showdesigners <noreply@showdesigners.cz>",
      to: [data.email],
      subject: "Přijali jsme vaši poptávku — Showdesigners",
      text: `
Dobrý den${data.name ? `, ${data.name}` : ""},

děkujeme za vaši poptávku. Váš show designer se vám ozve do 24 hodin.

Shrnutí vaší poptávky:
${data.summary ?? "—"}

V případě dotazů nás kontaktujte na booking@showdesigners.cz

Tým Showdesigners
      `.trim(),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI asistent není momentálně dostupný." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Příliš mnoho zpráv. Zkuste to prosím za hodinu." },
      { status: 429 }
    );
  }

  const body = await request.json() as unknown;
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatná data." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const { messages, sessionToken } = parsed.data;

  // Detect if client mentioned an email in their latest message — look up in DB
  let knownClientContext = "";
  const lastUserContent = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const emailMatch = lastUserContent.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    const foundEmail = emailMatch[0];
    const { data: existingConv } = await supabase
      .from("conversations")
      .select("name, created_at")
      .eq("email", foundEmail)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (existingConv?.name) {
      knownClientContext = `\n\n__KNOWN_CLIENT__ Tento klient (${existingConv.name}, ${foundEmail}) s námi již komunikoval (první kontakt: ${new Date(existingConv.created_at).toLocaleDateString("cs-CZ")}). Přivítej ho jménem a navažte na předchozí konverzaci.`;
    }
  }

  // Detect locale from middleware header and build language instruction
  const locale = (request.headers.get("x-locale") ?? "cs") as "cs" | "en" | "de";
  const languageInstruction =
    locale === "en"
      ? "\n\nIMPORTANT: Always respond in English. The user is on the English-language website (theshowdesigners.com)."
      : locale === "de"
      ? "\n\nWICHTIG: Antworte immer auf Deutsch. Der Nutzer befindet sich auf der deutschsprachigen Website (showdesigners.de)."
      : "";

  // Resolve conversation ID from session token
  let conversationId: string | null = null;
  if (sessionToken) {
    const { data } = await supabase
      .from("conversations")
      .select("id")
      .eq("session_token", sessionToken)
      .single();
    conversationId = data?.id ?? null;
  }

  // Save the last user message to DB (the one just sent)
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (conversationId && lastUserMessage) {
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      role: "user",
      content: lastUserMessage.content,
    });
  }

  // Streaming odpověď
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let fullText = "";

      try {
        const anthropicStream = await client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: SYSTEM_PROMPT + languageInstruction + knownClientContext,
          messages,
        });

        for await (const chunk of anthropicStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            fullText += chunk.delta.text;
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }

        // Save assistant response to DB
        if (conversationId && fullText) {
          await supabase.from("messages").insert({
            conversation_id: conversationId,
            role: "assistant",
            content: fullText,
          });
        }

        // Po dokončení zkontroluj, zda odpověď obsahuje data poptávky
        const inquiryData = extractInquiryData(fullText);
        if (inquiryData) {
          await sendInquiryEmails(inquiryData, inquiryData.summary ?? "");

          // Update conversation with name/email/inquiry_sent
          if (conversationId) {
            await supabase.from("conversations").update({
              name: inquiryData.name ?? null,
              email: inquiryData.email ?? null,
              inquiry_sent: true,
            }).eq("id", conversationId);
          }

          controller.enqueue(encoder.encode("\n__INQUIRY_SENT__"));
        }
      } catch (err) {
        console.error("[chat] Anthropic error:", err);
        controller.enqueue(encoder.encode("\n\nOmlouváme se, nastala chyba. Zkuste to prosím znovu."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
