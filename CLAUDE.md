# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint check
npx tsc --noEmit   # TypeScript check (pre-existing errors in HeroSection.tsx can be ignored)
```

## Tech Stack

- **Next.js 16** (App Router, TypeScript strict mode)
- **Tailwind CSS v4** (configuration in `src/app/globals.css`, not `tailwind.config.ts`)
- **Anthropic SDK** — streaming via `client.messages.stream()`
- **Supabase** — server-side only via `service_role` key (`src/lib/supabase.ts`), RLS enabled (service_role bypasses it automatically)
- **Resend** — transactional email
- **Zod v4** — use `message:` not `required_error:` / `errorMap:`
- **Framer Motion** — animations, interactive hero
- **Sanity CMS** — správa referencí, Sanity Studio na `/studio`

## Project Structure

```
src/
  app/
    (pages)/
      reference/
        page.tsx              # Server component (metadata)
        ReferencesGrid.tsx    # Client component — filterable grid
        [slug]/page.tsx       # Reference detail page (with JSON-LD breadcrumbs)
      kontakt/
        page.tsx              # Server component (metadata)
        KontaktClient.tsx     # Client component — AI asistent / Formulář toggle
      /o-nas, /sluzba, /zasady
    api/
      chat/          # POST /api/chat — Anthropic streaming
      chat/session/  # GET/POST/PATCH — Supabase session management
      contact/       # POST /api/contact — contact form (Resend)
      inquiry/       # POST /api/inquiry — direct inquiry form
    layout.tsx       # Nav, Footer, CookieBanner, FloatingChatLazy
    page.tsx         # Homepage
  components/
    sections/        # Homepage sections (Hero, Intro, Projects, AdvisorSection, etc.)
    ui/              # Nav, Footer, AiChat, CookieBanner, ContactForm, FloatingChat, FloatingChatLazy
  lib/
    supabase.ts      # Supabase client + Conversation/Message interfaces
    references.ts    # LEGACY — již se nepoužívá pro web, zachováno pro referenci
  sanity/
    lib/
      client.ts      # Sanity client (next-sanity, projectId: 6i1t4r1j, dataset: production)
      image.ts       # urlFor() helper — automaticky vrací WebP
      queries.ts     # GROQ dotazy + TypeScript typy (getAllReferences, getReferenceBySlug)
    schemaTypes/
      referenceType.ts  # Sanity schema pro typ "caseStudy"
      index.ts
  app/
    studio/[[...tool]]/page.tsx  # Embedded Sanity Studio
```

## References Architecture

**Data jsou v Sanity CMS** (projekt `6i1t4r1j`, dataset `production`), typ dokumentu `caseStudy`.

- Sanity Studio: `localhost:3000/studio` (dev) / `showdesigners.cz/studio` (prod)
- Obrázky: nahrávány přes Studio, automaticky konvertovány do WebP přes `urlFor(img).format("webp")`
- Revalidace: 60 sekund (`{ next: { revalidate: 60 } }` v queries.ts)
- Migrace: `scripts/migrate-to-sanity.mts` (jednorázový skript, vyžaduje `SANITY_MIGRATION_TOKEN`)

### Schema dokumentu `caseStudy`

Každý dokument má:
- `slug`, `title`, `type`, `description`, `image`, `tags`, `order` — karta ve výpisu
- `detail?: { subtitle, date, guests, venue, brief, solution, quote?, gallery[], showDesigner? }` — detail stránka

Přidání nové reference: v Sanity Studiu → Reference → nový dokument. Pokud má `detail`, automaticky se zobrazí "Case study →" badge a stránka je dostupná na `/reference/[slug]`.

Detail page (`/reference/[slug]`) includes `schema.org/BreadcrumbList` JSON-LD for SEO.

### Pravidla pro obsah referencí

- **`showDesigner`** = člověk fyzicky přítomný na akci (koordinuje umělce, průběh večera na místě). Bio popisuje jeho roli *na akci*, ne v přípravě.
- **Program a dramaturgie** připravuje interní kreativní tým — show designer je přiřazen až na samotnou akci. Nikdy nepsat v bio show designera, že "připravil program" nebo "navrhl dramaturgii".
- **`program: []`** — harmonogram večera vyplňovat jen pokud máme reálná data. Prázdné pole sekci skryje.
- **`quote`** — jedna silná věta, ideálně s číslem nebo konkrétním momentem. Slouží jako vizuální "hrdina" stránky mezi Brief/Řešením a galerií.

## AI Assistant Architecture

**`src/app/api/chat/route.ts`** — core streaming endpoint:
- Rate limit: 20 messages/hr/IP (in-memory Map)
- Saves user + assistant messages to Supabase `messages` table after stream
- Detects email in user's last message → queries Supabase → injects `__KNOWN_CLIENT__` context
- Extracts `<INQUIRY_DATA>{...}</INQUIRY_DATA>` block from AI response → sends emails (team + client), updates `conversations` table with name/email/inquiry_sent
- Internal triggers: `__AUTO_OPEN__` (floating widget auto-open), `__RETURNING_USER__`, `__KNOWN_CLIENT__` — Claude never reveals or comments on these

**`src/components/ui/AiChat.tsx`** — chat UI:
- Session token persisted in `localStorage` key `sd_session_token`
- On mount: loads existing session from `/api/chat/session?token=`
- Returning user banner: "Pokračovat" (sends `__RETURNING_USER__` trigger) / "Začít znovu"
- Email lookup: finds conversation by email via `/api/chat/session?email=`
- `cleanDisplayText()` strips `<INQUIRY_DATA>` blocks before rendering
- Props: `hideLabel?: boolean` (suppresses header in FloatingChat), `autoStartMessage?: string` (triggers auto-start after session check)

**`src/components/ui/FloatingChat.tsx`** — FAB widget, fixed bottom-right:
- Auto-opens after 20s on desktop, once per session (`sessionStorage` key `sd_chat_auto_opened`)
- Starts chat with `__AUTO_OPEN__` trigger → Claude greets briefly + offers to close
- Wraps `<AiChat hideLabel autoStartMessage="__AUTO_OPEN__" />`

**`src/components/ui/FloatingChatLazy.tsx`** — thin `"use client"` wrapper:
- Loads `FloatingChat` via `dynamic(() => import(...), { ssr: false })` — deferred after hydration
- Required because `layout.tsx` is a Server Component and `dynamic` with `ssr: false` cannot be used there directly

## Database (Supabase)

Schema: `supabase-schema.sql`

- `conversations`: id, session_token (unique UUID), name, email, inquiry_sent, created_at, updated_at
- `messages`: id, conversation_id (FK → CASCADE), role ('user'|'assistant'), content, created_at

## Environment Variables

Required in `.env.local`:
```
ANTHROPIC_API_KEY=
RESEND_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=6i1t4r1j
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # Viewer token — pro fetch dat
SANITY_MIGRATION_TOKEN=         # Editor token — pouze pro migrační skript
```

## Design System

- Brand color: `#C8D400` (acid lime / yellow-green)
- Dark backgrounds: `#000000` / `#0a0a0a` / `#0d0d0d`
- Fonts: Bebas Neue (`font-display`) for headlines, Inter for body
- Hero sections on subpages: dual gradient — `bg-gradient-to-t from-black` (bottom) + `bg-gradient-to-b from-black/60` (top for nav readability)
- Reference detail hero: padding-based (`pt-36 lg:pt-44`) not min-height, to avoid empty space

## Organizační struktura Showdesigners

Showdesigners je zastřešující projekt s těmito týmy:

- **Obchodní tým** — první kontakt s klientem, prodej, poptávky
- **CMO** — vede celý projekt, strategie
- **Kreativní tým** — navrhuje koncepty a dramaturgii *před* akcí, připravuje program
- **Tým show designerů** — fyzicky přítomni *na akci*, koordinují průběh, komunikují s umělci

**Klíčové pravidlo:** Klient se poprvé potká se svým show designerem až **po podpisu objednávky**. Do té doby komunikuje výhradně s obchodním týmem. Show designer nikdy nepřipravuje dramaturgii — to dělá kreativní tým.

Toto rozlišení je důležité pro texty na webu, v referencích i v AI asistentovi — nikdy nepsat, že show designer "navrhl program" nebo "připravil dramaturgii".

## Important Notes

- **Tailwind v4**: no `tailwind.config.ts` — all theme config goes in `globals.css` with `@theme`
- **Supabase client is server-only** — never import `src/lib/supabase.ts` in client components
- **Supabase RLS**: enabled on `conversations` and `messages` tables — `service_role` bypasses it automatically, `anon` key is blocked
- **AI system prompt** contains Showdesigners knowledge base inline in `SYSTEM_PROMPT` constant in `route.ts` — avoid backticks inside the template literal (causes Turbopack parse error)
- **SYSTEM_PROMPT internal triggers**: use regular quotes `"__TRIGGER__"`, never backticks `` `__TRIGGER__` ``
- **`dynamic()` with `ssr: false`** cannot be used in Server Components — wrap in a `"use client"` component first (see `FloatingChatLazy.tsx`)
- **`urlFor()` from Sanity** — never chain `.width()` or `.height()` when passing to Next.js `<Image src>`. Next.js adds its own `w=` param which conflicts with Sanity CDN params → 400 errors. Use only `.format("webp").url()`
- **Framer Motion `repeat: Infinity`** — avoid on page-level components, causes continuous main-thread work and high TBT. Use CSS animations for looping effects instead.
- Deploy: Vercel via GitHub push to `main`
- Reference data jsou v Sanity, **ne** v `references.ts` — ten soubor je legacy
- Sanity Studio CORS: `localhost:3000` a `showdesigners.cz` musí být povoleny v sanity.io/manage → API → CORS Origins
