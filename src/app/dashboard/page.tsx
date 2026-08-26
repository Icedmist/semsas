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
    <div className="min-h-[calc(100vh-160px)] py-6 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto animate-fade-in relative">
      <div className="h-[calc(100vh-200px)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}