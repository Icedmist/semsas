"use client";

import React, { createContext, useContext, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

interface LiveUpdatesContextValue {
  isPaused: boolean;
  togglePaused: () => void;
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

const LiveUpdatesContext = createContext<LiveUpdatesContextValue>({
  isPaused: false,
  togglePaused: () => {},
  currentSection: 0,
  setCurrentSection: () => {},
});

export function useLiveUpdates() {
  return useContext(LiveUpdatesContext);
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <LiveUpdatesContext.Provider
      value={{
        isPaused,
        togglePaused: () => setIsPaused((prev) => !prev),
        currentSection,
        setCurrentSection,
      }}
    >
      <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
        <DashboardFooter />
      </div>
    </LiveUpdatesContext.Provider>
  );
}

