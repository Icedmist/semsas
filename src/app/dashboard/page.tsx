import type { Metadata } from "next";
import { Activity } from "lucide-react";
import DashboardStats from "@/components/dashboard/DashboardStats";

export const metadata: Metadata = {
  title: "SEMSAS Dashboard | Gombe State Emergency Medical Services",
  description:
    "Real-time emergency medical services dashboard for Gombe State Emergency Medical Services & Ambulance System (SEMSAS) under the Gombe State Ministry of Health, Nigeria.",
};

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Overview Panel */}
        <div className="lg:w-[340px] xl:w-[360px] flex-shrink-0">
          <div className="relative bg-[#0A2A52] rounded-3xl p-8 h-full min-h-[420px] flex flex-col items-center justify-center text-center overflow-hidden border border-white/10 shadow-[0_30px_80px_-30px_rgba(10,42,82,0.6)]">
            {/* Glows + grid */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2F80ED]/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emergency-red/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#2F80ED]/50 rounded-tl-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 w-full max-w-[240px]">
                <svg viewBox="0 0 120 80" className="w-full h-28" fill="none" aria-hidden="true">
                  <path
                    d="M60 70 C20 40 20 15 45 15 C55 15 60 25 60 25 C60 25 65 15 75 15 C100 15 100 40 60 70"
                    fill="#DC143C"
                    opacity="0.95"
                  />
                  <path
                    d="M10 45 L35 45 L42 30 L50 60 L58 35 L65 55 L72 40 L80 45 L110 45"
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ecg-animate"
                  />
                </svg>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Live Monitor
              </div>

              <h2 className="font-heading font-black text-3xl text-white mt-4">Overview</h2>
              <p className="text-sm text-white/50 font-light mt-1">Service Performance Summary</p>
              <div className="w-12 h-1 bg-emergency-red rounded-full mt-5" />
              <p className="text-[11px] text-white/40 font-medium mt-5 leading-relaxed max-w-[220px]">
                Real-time statewide emergency response metrics, updated continuously from the dispatch centre.
              </p>
            </div>
          </div>
        </div>

        {/* Live Stats Grid */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgba(10,42,82,0.25)] h-full">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
              <div>
                <h2 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                  Live Operational Statistics
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Statewide emergency service metrics across all 11 LGAs
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-navy bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                <Activity className="w-3.5 h-3.5" />
                Auto-refresh 15s
              </span>
            </div>

            <DashboardStats />
          </div>
        </div>
      </div>
    </div>
  );
}