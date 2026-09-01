"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLiveUpdates } from "@/app/dashboard/layout";

function formatTime(d: Date) {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

export default function DashboardFooter() {
  const { isPaused, currentSection, setCurrentSection } = useLiveUpdates();
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTime(new Date()));
    if (isPaused) return;
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <footer className="sticky bottom-0 bg-white border-t border-black/5">
      <div className="mx-auto max-w-[1280px] px-4 py-3">
        <div className="rounded-[16px] bg-[#f0f5f6] border border-black/5 px-3 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#dc2626] text-white flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold tracking-widest text-black/40 hidden md:inline">EMERGENCY</span>
            <span className="font-black text-[#0a0a0a]">0703 382 5646</span>
          </div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: 11 }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentSection(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-full transition-all ${i === currentSection ? "w-6 h-2 bg-[#0a0a0a]" : "w-2 h-2 bg-black/15 hover:bg-black/30"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className={`hidden lg:inline-flex items-center gap-1.5 ${isPaused ? "text-black/40" : "text-[#0a7a3a]"}`}>
              <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-black/20" : "bg-[#0a7a3a] animate-pulse"}`} />
              {isPaused ? "PAUSED" : "LIVE"}
            </span>
            <span className="font-mono bg-white rounded-full px-3 py-1 border border-black/5">{time}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
