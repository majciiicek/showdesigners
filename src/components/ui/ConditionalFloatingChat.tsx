"use client";

import { usePathname } from "next/navigation";
import FloatingChatLazy from "./FloatingChatLazy";

// Renders the floating chat widget only outside of Sanity Studio
export default function ConditionalFloatingChat() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return <FloatingChatLazy />;
}
