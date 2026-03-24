"use client";

import dynamic from "next/dynamic";

// Deferred — loads after hydration, not needed for initial render
const FloatingChat = dynamic(() => import("./FloatingChat"), { ssr: false });

export default function FloatingChatLazy() {
  return <FloatingChat />;
}
