"use client";

import { usePathname } from "next/navigation";
import FloatingChatLazy from "./FloatingChatLazy";
import type { ChatText } from "./AiChat";
import type { FloatingText } from "./FloatingChat";

// Renders the floating chat widget only outside of Sanity Studio
export default function ConditionalFloatingChat({ text, chatText, locale = "cs" }: { text: FloatingText; chatText: ChatText; locale?: "cs" | "en" | "de" }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return <FloatingChatLazy text={text} chatText={chatText} locale={locale} />;
}
