"use client";

import React, { useEffect, useState } from "react";
import { Phone, Activity } from "lucide-react";
import { useLiveUpdates } from "@/app/dashboard/layout";

const LGA_STATUS_DOTS = 11;

function formatTime(date: Date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function DashboardFooter() {
  const { isPaused } = useLiveUpdates();
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emergency-red/10 text-emergency-red flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </span>
            <span className="text-[11px] text-slate-500 uppercase tracking-wide font-bold hidden md:inline">
              Emergency Hotline:
            </span>
            <span className="text-sm font-heading font-extrabold text-primary-navy">112</span>
          </div>

          <div className="flex items-center gap-2" title="11 LGAs under coverage">
            {Array.from({ length: LGA_STATUS_DOTS }).map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === 0
                    ? "w-5 h-2 bg-gradient-to-r from-primary-navy to-emergency-red shadow-[0_0_8px_rgba(220,20,60,0.4)]"
                    : "w-2 h-2 bg-slate-300 hover:bg-primary-navy"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                    isPaused ? "" : "animate-ping"
                  }`}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A86B]" />
              </span>
              <span className="font-bold text-slate-700 tracking-wide">
                SYSTEM {isPaused ? "PAUSED" : "OPERATIONAL"}
              </span>
            </div>
            <span className="text-slate-500 font-semibold tabular-nums flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-primary-navy" />
              {time}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}