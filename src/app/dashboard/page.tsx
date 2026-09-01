"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLiveUpdates } from "@/app/dashboard/layout";
import { defaultDashboardData } from "@/lib/default-dashboard-data";
import {
  SlideOverview,
  SlideAmbulanceFleet,
  SlideResmatTeam,
  SlideMedicalFacilities,
  SlideEmergencyCalls,
  SlidePatientTransport,
  SlideEmergencyTypes,
  SlidePerformance,
  SlideCensus,
  SlideLaborDelivery,
  SlideServiceRuns
} from "@/components/dashboard/slides/DashboardSlides";

/**
 * The main page component for the live dashboard.
 * Manages fetching live data and navigating between different dashboard slides.
 */
export default function DashboardPage() {
  const { currentSection, setCurrentSection, isPaused } = useLiveUpdates();
  const [liveData, setLiveData] = useState<any>(defaultDashboardData);
  const mountedRef = useRef(true);

  // Fetch live stats from API and merge them with default values
  useEffect(() => {
    mountedRef.current = true;

    const fetchLiveStats = async () => {
      try {
        const res = await fetch("/api/live-stats");
        if (!res.ok) return;
        const data = await res.json();
        if (mountedRef.current && data) {
          setLiveData((prev: any) => {
            const updated = JSON.parse(JSON.stringify(prev));
            // Merge top-level carousel sections returned by the live-stats API
            const sections = [
              "overview",
              "ambulanceFleet",
              "staff",
              "facilities",
              "dailyDispatch",
              "transport",
              "emergencyTypes",
              "performance",
              "census",
              "trends",
              "ambulanceServiceRuns",
              "status"
            ] as const;
            for (const section of sections) {
              if (data[section] && typeof data[section] === "object") {
                updated[section] = { ...updated[section], ...data[section] };
              }
            }
            return updated;
          });
        }
      } catch (err) {
        console.error("Failed to load live dashboard stats in carousel:", err);
      }
    };

    fetchLiveStats();
    // Poll every 15 seconds if not paused
    let timer: any = null;
    if (!isPaused) {
      timer = setInterval(fetchLiveStats, 15000);
    }

    return () => {
      mountedRef.current = false;
      if (timer) clearInterval(timer);
    };
  }, [isPaused]);

  // Handle automatic carousel transition
  const nextSection = useCallback(() => {
    setCurrentSection((currentSection + 1) % 11);
  }, [currentSection, setCurrentSection]);

  const prevSection = useCallback(() => {
    setCurrentSection((currentSection - 1 + 11) % 11);
  }, [currentSection, setCurrentSection]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSection, 48000); // 48 seconds per slide
    return () => clearInterval(interval);
  }, [isPaused, nextSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSection();
      } else if (e.key === "ArrowLeft") {
        prevSection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSection, prevSection]);

  // Slide mapping
  const renderSlide = () => {
    switch (currentSection) {
      case 0:
        return <SlideOverview key="overview" data={liveData.overview} />;
      case 1:
        return <SlideAmbulanceFleet key="fleet" data={liveData.ambulanceFleet} />;
      case 2:
        return <SlideResmatTeam key="staff" data={liveData.staff} />;
      case 3:
        return <SlideMedicalFacilities key="facilities" data={liveData.facilities} />;
      case 4:
        return <SlideEmergencyCalls key="dispatch" data={liveData.dailyDispatch} />;
      case 5:
        return <SlidePatientTransport key="transport" data={liveData.transport} />;
      case 6:
        return <SlideEmergencyTypes key="emergency" data={liveData.emergencyTypes} />;
      case 7:
        return <SlidePerformance key="performance" data={liveData.performance} />;
      case 8:
        return <SlideCensus key="census" data={liveData.census} />;
      case 9:
        return <SlideLaborDelivery key="trends" data={liveData.trends} />;
      case 10:
        return <SlideServiceRuns key="runs" data={liveData.ambulanceServiceRuns} />;
      default:
        return <SlideOverview key="overview" data={liveData.overview} />;
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      {/* Healixx top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="text-xs font-black tracking-widest text-black/40">LIVE DASHBOARD • SLIDE {String(currentSection + 1).padStart(2, "0")}/11</div>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={prevSection} className="rounded-full bg-white border border-black/10 px-4 py-1.5 text-xs font-bold hover:bg-black hover:text-white">← Prev</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextSection} className="rounded-full bg-[#0a0a0a] text-white px-4 py-1.5 text-xs font-bold hover:bg-black">Next →</motion.button>
        </div>
      </div>

      <motion.div
        key={currentSection}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="min-h-[520px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 flex justify-center gap-2 lg:hidden">
        <span className="text-xs text-black/40">Swipe or use ← →</span>
      </div>
    </div>
  );
}