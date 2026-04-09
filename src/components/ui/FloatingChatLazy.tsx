"use client";

import dynamic from "next/dynamic";
import type { ChatText } from "./AiChat";
import type { FloatingText } from "./FloatingChat";

// Deferred — loads after hydration, not needed for initial render
const FloatingChat = dynamic(() => import("./FloatingChat"), { ssr: false });

export default function FloatingChatLazy({ text, chatText, locale = "cs" }: { text: FloatingText; chatText: ChatText; locale?: "cs" | "en" | "de" }) {
  return <FloatingChat text={text} chatText={chatText} locale={locale} />;
}
