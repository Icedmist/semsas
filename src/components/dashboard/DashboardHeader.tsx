"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Settings } from "lucide-react";
import { useLiveUpdates } from "@/app/dashboard/layout";
import { EASE } from "@/lib/motion-variants";

const logos = [
  { src: "/images/nemsas-logo.png", alt: "NEMSAS Logo", w: 56, h: 56 },
  { src: "/images/fmoh-logo.png", alt: "Federal Ministry of Health", w: 52, h: 52 },
  { src: "/images/moh-gombe-logo.jpeg", alt: "Gombe State Ministry of Health", w: 52, h: 52 },
  { src: "/images/worldbank-logo.jpeg", alt: "World Bank", w: 52, h: 52 },
];

/**
 * The header component for the live dashboard.
 * Displays partner logos, live status indicator, and controls for live updates.
 */
export default function DashboardHeader() {
  const { isPaused, togglePaused } = useLiveUpdates();

  return (
    <header className="bg-white border-b border-slate-200 relative z-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {logos.map((logo) => (
              <div
                key={logo.src}
                className="hidden xs:flex sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden bg-white items-center justify-center border border-slate-200 shadow-sm shrink-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  className="object-contain"
                />
              </div>
            ))}
            <div className="ml-1 sm:ml-3 min-w-0">
              <h1 className="text-[13px] sm:text-base xl:text-lg font-heading font-extrabold text-primary-navy tracking-wide truncate leading-tight">
                GOMBE STATE EMERGENCY MEDICAL SERVICES &amp; AMBULANCE SYSTEM (SEMSAS)
              </h1>
              <p className="text-[9px] sm:text-[11px] text-emergency-red font-bold tracking-[0.18em] mt-0.5">
                SAVING LIVES, SERVING COMMUNITIES
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                    isPaused ? "" : "animate-ping"
                  }`}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {isPaused ? "Paused" : "Live"}
            </span>

            <button
              onClick={togglePaused}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white hover:border-primary-navy hover:bg-primary-navy/5 hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
              aria-label={isPaused ? "Resume live updates" : "Pause live updates"}
              title={isPaused ? "Resume live updates" : "Pause live updates"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isPaused ? "play" : "pause"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="block"
                >
                  {isPaused ? (
                    <Play className="w-5 h-5 text-primary-navy fill-primary-navy" />
                  ) : (
                    <Pause className="w-5 h-5 text-primary-navy fill-primary-navy" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link
              href="/admin"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white hover:border-primary-navy hover:bg-primary-navy/5 hover:shadow-md flex items-center justify-center transition-all duration-300 hover:rotate-90 focus:outline-none"
              aria-label="Admin settings"
              title="Admin settings"
            >
              <Settings className="w-5 h-5 text-slate-500 hover:text-primary-navy transition-colors" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-[#0A2A52] via-emergency-red to-[#0A2A52]" />
    </header>
  );
}