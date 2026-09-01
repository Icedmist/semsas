"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Settings } from "lucide-react";
import { useLiveUpdates } from "@/app/dashboard/layout";

export default function DashboardHeader() {
  const { isPaused, togglePaused } = useLiveUpdates();
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/5">
      <div className="mx-auto max-w-[1280px] px-4 py-3">
        <div className="rounded-[16px] border border-black/5 bg-white px-3 py-2 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/gosemsas-logo.svg" alt="GoSEMSAS" className="h-7 w-auto" />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-black/10" />
            <div className="min-w-0 hidden md:block">
              <div className="font-black text-sm leading-none" style={{ fontFamily: "var(--font-sans)" }}>GOMBE SEMSAS • LIVE DASHBOARD</div>
              <div className="text-xs text-black/50 font-semibold tracking-wide">11 slides • 48s • TV-ready</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.span layout className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold rounded-full border border-black/5 bg-[#f0f5f6] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <motion.span animate={{ scale: isPaused ? 1 : [1, 1.6, 1] }} transition={{ repeat: isPaused ? 0 : Infinity, duration: 1.2 }} className="absolute inset-0 rounded-full bg-[#dc2626] opacity-30" />
                <span className="relative rounded-full h-2 w-2 bg-[#dc2626]" />
              </span>
              {isPaused ? "Paused" : "Live"}
            </motion.span>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={togglePaused}
              className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-black"
              aria-label={isPaused ? "Resume" : "Pause"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={isPaused ? "play" : "pause"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4 fill-white" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <Link href="/admin" className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black">
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-[#0a0a0a] via-[#dc2626] to-[#0a0a0a]" />
    </header>
  );
}
