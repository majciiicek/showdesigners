"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Block {
  id: number;
  label: string;
  desc: string;
  initX: string;
  initY: number;
}

const BLOCKS: Block[] = [
  {
    id: 0,
    label: "Dramaturgie",
    desc: "Příběh a rytmus celého večera",
    initX: "-30vw",
    initY: -130,
  },
  {
    id: 1,
    label: "Umělci & Show",
    desc: "Výběr, booking a koordinace",
    initX: "28vw",
    initY: -150,
  },
  {
    id: 2,
    label: "Atmosféra",
    desc: "Energie — zvuk, světla, flow",
    initX: "-27vw",
    initY: 150,
  },
  {
    id: 3,
    label: "Scénografie",
    desc: "Prostor jako součást příběhu",
    initX: "28vw",
    initY: 130,
  },
];

// Correct order: Dramaturgie → Umělci → Atmosféra → Scénografie
const CORRECT_ORDER = [0, 1, 2, 3];

// Y-positions in the center stack (bottom → top)
const STACK_Y = [105, 35, -35, -105];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBlockAnimate(
  block: Block,
  isPlaced: boolean,
  stackIndex: number,
  showCompletion: boolean,
  isShaking: boolean
) {
  if (isShaking) {
    return {
      x: [block.initX, `calc(${block.initX} - 12px)`, `calc(${block.initX} + 12px)`, `calc(${block.initX} - 8px)`, `calc(${block.initX} + 8px)`, block.initX],
      y: block.initY,
      opacity: 1,
      scale: 1,
    };
  }
  if (isPlaced) {
    return {
      x: 0,
      y: STACK_Y[stackIndex] ?? 0,
      opacity: showCompletion ? 0 : 1,
      scale: 0.97,
    };
  }
  return {
    x: block.initX,
    y: [block.initY, block.initY - 9, block.initY, block.initY + 9, block.initY],
    opacity: 1,
    scale: 1,
  };
}

function getBlockTransition(isPlaced: boolean, isShaking: boolean, index: number) {
  if (isShaking) {
    return { duration: 0.45, ease: "easeInOut" as const };
  }
  if (isPlaced) {
    return { duration: 0.7, ease: [0.16, 1, 0.3, 1] };
  }
  return {
    y: {
      duration: 3.6 + index * 0.55,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: index * 0.4,
    },
    opacity: { duration: 0.8, delay: 0.35 + index * 0.12 },
    scale: { duration: 0.2 },
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroSection() {
  const [placed, setPlaced] = useState<number[]>([]);
  const [shakingId, setShakingId] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const isComplete = placed.length === BLOCKS.length;

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => setShowCompletion(true), 750);
      return () => clearTimeout(t);
    }
  }, [isComplete]);

  function handleBlockClick(id: number) {
    if (placed.includes(id) || showCompletion || shakingId !== null) return;

    const nextCorrect = CORRECT_ORDER[placed.length];
    if (id === nextCorrect) {
      // Correct block — place it
      setPlaced((prev) => [...prev, id]);
    } else {
      // Wrong block — shake and bounce back
      setShakingId(id);
      setTimeout(() => setShakingId(null), 500);
    }
  }

  function handleReset() {
    setShowCompletion(false);
    setTimeout(() => setPlaced([]), 300);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Background photo — subtle atmospheric texture */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ opacity: showCompletion ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/fireshow/0IMG0280-Enhanced-NR.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "blur(2px)" }}
          priority
        />
        {/* Overlay — dark enough to keep blocks readable */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Hero video — fades in on completion */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCompletion ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Dark overlay over video — only visible when video is showing */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCompletion ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />


      {/* Lime radial glow — intensifies when complete */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isComplete ? 0.14 : 0.04 }}
        transition={{ duration: 1.2 }}
        style={{
          background: "radial-gradient(circle at 50% 50%, #C8D400 0%, transparent 55%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Center content                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <AnimatePresence mode="wait">

          {!showCompletion && (
            <motion.div
              key="instruction"
              className="text-center"
              animate={{
                opacity: placed.length > 0 ? 0 : 1,
                scale: placed.length > 0 ? 0.94 : 1,
              }}
              transition={{ duration: 0.35 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#C8D400] text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              >
                Entertainment consultancy
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display text-white"
              >
                POSKLÁDEJTE
                <br />
                SVŮJ{" "}
                <span className="text-[#C8D400]">VEČER</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ delay: 1.4 }}
                className="text-white text-sm mt-5"
              >
                Klikněte na kostičky ve správném pořadí
              </motion.p>
            </motion.div>
          )}

          {showCompletion && (
            <motion.div
              key="completion"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-6 pointer-events-auto"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-[#C8D400] text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              >
                Příběh večera je kompletní
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display text-white mb-3"
              >
                TOHLE STAVÍME
                <br />
                <span className="text-[#C8D400]">ZA VÁS</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.45 }}
                className="text-white text-base mb-10 max-w-sm mx-auto leading-relaxed"
              >
                Jeden partner. Kompletní entertainment.
                <br />
                Od dramaturgie po poslední vystoupení.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/kontakt"
                  className="bg-[#C8D400] text-black font-semibold px-10 py-4 rounded-sm btn-hover-lime"
                >
                  Nezávazná poptávka
                </Link>
                <button
                  onClick={handleReset}
                  className="text-white/30 text-sm hover:text-white/60 transition-colors underline underline-offset-4"
                >
                  Začít znovu
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Scattered / stacking blocks                                         */}
      {/* ------------------------------------------------------------------ */}
      {BLOCKS.map((block, i) => {
        const isPlaced = placed.includes(block.id);
        const stackIndex = placed.indexOf(block.id);
        const isShaking = shakingId === block.id;

        return (
          <motion.button
            key={block.id}
            aria-label={`Přidat ${block.label} do programu`}
            onClick={() => handleBlockClick(block.id)}
            disabled={isPlaced || showCompletion}
            className={[
              "absolute z-20 w-52 text-left px-5 py-3.5 rounded-sm border select-none",
              "transition-shadow duration-200",
              isPlaced
                ? "bg-[#C8D400]/10 border-[#C8D400]/40 cursor-default"
                : isShaking
                ? "bg-red-500/10 border-red-400/40 cursor-pointer"
                : "bg-white/[0.04] border-white/15 hover:bg-white/[0.08] hover:border-white/30 cursor-pointer",
            ].join(" ")}
            style={{
              top: "50%",
              left: "50%",
              marginLeft: "-104px",
              marginTop: "-33px",
            }}
            initial={{ x: block.initX, y: block.initY, opacity: 0 }}
            animate={getBlockAnimate(block, isPlaced, stackIndex, showCompletion, isShaking)}
            transition={getBlockTransition(isPlaced, isShaking, i)}
            whileHover={!isPlaced && !showCompletion && !isShaking ? { scale: 1.06 } : undefined}
            whileTap={!isPlaced && !showCompletion && !isShaking ? { scale: 0.96 } : undefined}
          >
            <div>
              <p
                className={[
                  "font-semibold text-sm leading-tight",
                  isPlaced ? "text-[#C8D400]" : isShaking ? "text-red-300" : "text-white",
                ].join(" ")}
              >
                {block.label}
              </p>
              <p className="text-white/40 text-xs mt-0.5 leading-snug">
                {block.desc}
              </p>
            </div>
          </motion.button>
        );
      })}

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: placed.length > 0 ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 right-8 lg:right-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase rotate-90 origin-center">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

    </section>
  );
}
