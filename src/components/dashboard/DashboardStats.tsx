"use client";

import React, { useEffect, useState, useRef } from "react";
import { Activity, Heart, Users, Ambulance, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import Skeleton from "@/components/Skeleton";
import { useLiveUpdates } from "@/app/dashboard/layout";
import { stagger, fadeUpItem } from "@/lib/motion-variants";
import type { LiveDashboardData } from "@/lib/live-data";

interface StatDef {
  label: string;
  key: "emergencyCalls" | "livesSaved" | "patientsMoved" | "totalAmbulances";
  Icon: React.ComponentType<{ className?: string }>;
  tile: string;
  valueClass: string;
}

const STATS: StatDef[] = [
  {
    label: "Emergency Calls",
    key: "emergencyCalls",
    Icon: Activity,
    tile: "bg-gradient-to-br from-[#DC143C] to-[#b01030]",
    valueClass: "text-[#DC143C]",
  },
  {
    label: "Lives Saved",
    key: "livesSaved",
    Icon: Heart,
    tile: "bg-gradient-to-br from-[#00A86B] to-[#00875A]",
    valueClass: "text-[#00A86B]",
  },
  {
    label: "Patients Moved",
    key: "patientsMoved",
    Icon: Users,
    tile: "bg-gradient-to-br from-[#FFB81C] to-[#E59A00]",
    valueClass: "text-[#E59A00]",
  },
  {
    label: "Total Ambulances",
    key: "totalAmbulances",
    Icon: Ambulance,
    tile: "bg-gradient-to-br from-[#0052A5] to-[#0A2A52]",
    valueClass: "text-[#0052A5]",
  },
];

export default function DashboardStats() {
  const { isPaused } = useLiveUpdates();
  const [data, setData] = useState<LiveDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      try {
        const res = await fetch("/api/live-stats");
        const json = (await res.json()) as LiveDashboardData;
        if (mountedRef.current) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (mountedRef.current) setLoading(false);
      }
    };

    load();

    if (!isPaused) {
      timer = setInterval(load, 15000);
    }

    return () => {
      mountedRef.current = false;
      if (timer) clearInterval(timer);
    };
  }, [isPaused]);

  const status = data?.status.status;
  const statusStyles =
    status === "operational"
      ? { bg: "bg-emerald-50 border-emerald-200", dot: "bg-[#00A86B]", text: "text-emerald-700" }
      : status === "degraded"
      ? { bg: "bg-amber-50 border-amber-200", dot: "bg-[#FFB81C]", text: "text-amber-700" }
      : { bg: "bg-red-50 border-red-200", dot: "bg-[#DC143C]", text: "text-red-700" };

  return (
    <div className="flex flex-col h-full">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.key}
            variants={fadeUpItem}
            className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-[0_24px_50px_-24px_rgba(10,42,82,0.35)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-3xl opacity-80 group-hover:scale-125 transition-transform duration-500" />

            {loading ? (
              <div className="flex items-center gap-4 relative">
                <Skeleton className="w-14 h-14 rounded-xl" />
                <div className="space-y-2.5">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 relative">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ${stat.tile}`}
                >
                  <stat.Icon className="w-7 h-7" />
                </div>
                <div>
                  <AnimatedCounter
                    value={(() => {
                      if (!data) return 0;
                      if (stat.key === "emergencyCalls") return data.overview.totalEmergencies;
                      if (stat.key === "livesSaved") return data.overview.livesSaved;
                      if (stat.key === "patientsMoved") return data.overview.patientsTransported;
                      if (stat.key === "totalAmbulances") return data.overview.totalAmbulances;
                      return 0;
                    })()}
                    className={`font-heading font-black text-4xl tabular-nums ${stat.valueClass}`}
                  />
                  <p className="text-xs text-slate-500 font-semibold mt-1">{stat.label}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Status banner */}
      {loading ? (
        <div className="mt-6">
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      ) : (
        data && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 space-y-3"
          >
            <div
              className={`flex items-center justify-center gap-3 p-4 rounded-xl border ${statusStyles.bg}`}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${statusStyles.dot} ${
                    status === "operational" ? "animate-ping" : ""
                  }`}
                />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${statusStyles.dot}`} />
              </span>
              <span className={`text-sm font-bold ${statusStyles.text}`}>
                {data.status.message}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <RadioTower className="w-3.5 h-3.5" /> System Status
              </span>
            </div>
            <p className="text-[11px] text-center text-slate-400 font-medium">
              Last updated: {new Date(data.updatedAt).toLocaleString()}
            </p>
          </motion.div>
        )
      )}
    </div>
  );
}