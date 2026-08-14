"use client";

import React, { createContext, useContext, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

interface LiveUpdatesContextValue {
  isPaused: boolean;
  togglePaused: () => void;
}

const LiveUpdatesContext = createContext<LiveUpdatesContextValue>({
  isPaused: false,
  togglePaused: () => {},
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

  return (
    <LiveUpdatesContext.Provider
      value={{
        isPaused,
        togglePaused: () => setIsPaused((prev) => !prev),
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
