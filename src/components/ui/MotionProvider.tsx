"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// Wraps the app with reduced Framer Motion bundle (~18KB vs ~50KB)
// domAnimation covers: animate, exit, whileHover, whileTap, whileInView, useInView
// Does NOT cover: drag, layout animations — not used in this project
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
