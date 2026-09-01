"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Users,
  Ambulance,
  Building2,
  PhoneCall,
  Clock,
  TrendingUp,
  MapPinned,
  Baby,
  AlertTriangle,
  Award,
  Save,
  RefreshCw,
  XCircle,
  CheckCircle2,
  HelpCircle,
  Phone
} from "lucide-react";

import { defaultDashboardData, AVAILABLE_YEARS, CURRENT_YEAR } from "@/lib/default-dashboard-data";
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
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

type DashboardDataSchema = typeof defaultDashboardData;

const SLIDES: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  Slide: React.ComponentType<{ data: any }>;
  section: keyof DashboardDataSchema;
}[] = [
  { id: "overview", label: "Overview", icon: Activity, Slide: SlideOverview, section: "overview" },
  { id: "fleet", label: "Ambulance Fleet", icon: Ambulance, Slide: SlideAmbulanceFleet, section: "ambulanceFleet" },
  { id: "team", label: "RESMAT Team", icon: Users, Slide: SlideResmatTeam, section: "staff" },
  { id: "facilities", label: "Facilities", icon: Building2, Slide: SlideMedicalFacilities, section: "facilities" },
  { id: "calls", label: "Emergency Calls", icon: PhoneCall, Slide: SlideEmergencyCalls, section: "dailyDispatch" },
  { id: "transport", label: "Patient Transport", icon: Baby, Slide: SlidePatientTransport, section: "transport" },
  { id: "emergencyTypes", label: "Emergency Types", icon: HelpCircle, Slide: SlideEmergencyTypes, section: "emergencyTypes" },
  { id: "performance", label: "Performance", icon: Award, Slide: SlidePerformance, section: "performance" },
  { id: "census", label: "Where We Serve", icon: MapPinned, Slide: SlideCensus, section: "census" },
  { id: "trends", label: "Monthly Births", icon: TrendingUp, Slide: SlideLaborDelivery, section: "trends" },
  { id: "serviceRuns", label: "Service Runs", icon: Clock, Slide: SlideServiceRuns, section: "ambulanceServiceRuns" }
];

export default function AdminConsole() {
  const [data, setData] = useState<DashboardDataSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<"success" | "error" | null>(null);
  const [dirty, setDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [now, setNow] = useState("");
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

  // Guard: prevent render before data loaded

  const formatTime = (date: Date) => {
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  useEffect(() => {
    setNow(formatTime(new Date()));
    const id = setInterval(() => setNow(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  // Read API URL — now local to the main app
  const getApiUrl = (year?: number) => {
    const base = `/api/live-stats`;
    const t = Date.now();
    if (year) {
      return `${base}?year=${year}&t=${t}`;
    }
    return `${base}?t=${t}`;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl(selectedYear), {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }
      });
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      const payload = (json as any).data ?? json;
      if (!payload || !payload.overview) throw new Error("Invalid data");
      setData(payload);
      setDirty(false);
      setSaveResult(null);
    } catch (error) {
      console.error(error);
      setSaveResult("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedYear]);

  const patch = (section: keyof DashboardDataSchema, partial: any) => {
    setData((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated[section] = { ...(updated[section] as any), ...partial };
      return updated;
    });
    setDirty(true);
    setSaveResult(null);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const secretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || "gosemsas-admin-2025";
      const res = await fetch(getApiUrl(selectedYear), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to save");
      const json = await res.json();
      if (json.success || json.ok || (json as any).data) {
        setData((json as any).data ?? data);
        setDirty(false);
        setSaveResult("success");
      } else {
        throw new Error(json.error || "Save failed");
      }
    } catch (error) {
      console.error(error);
      setSaveResult("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-gray space-y-4">
        <RefreshCw className="w-12 h-12 text-primary-navy animate-spin" />
        <p className="text-sm font-semibold text-slate-600">Connecting to Live SEMSAS Database...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-gray space-y-4">
        <XCircle className="w-16 h-16 text-emergency-red" />
        <p className="text-lg font-bold text-slate-800">Failed to load dashboard data</p>
        <button onClick={loadData} className="btn btn-dark px-6 py-2.5 text-sm">
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Header (matches live dashboard) */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {[
                { src: "/images/nemsas-logo.png", alt: "NEMSAS Logo", border: false },
                { src: "/images/fmoh-logo.png", alt: "Federal Ministry of Health", border: true }
              ].map((logo) => (
                <div
                  key={logo.src}
                  className={`w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center ${
                    logo.border ? "border border-black" : ""
                  }`}
                >
                  <img src={logo.src} alt={logo.alt} className="object-contain" />
                </div>
              ))}
              <div className="ml-4">
                <h1 className="text-xl font-bold text-[#FF0000] tracking-wide leading-tight">
                  GOMBE STATE EMERGENCY MEDICAL SERVICES &amp; AMBULANCE SYSTEM (SEMSAS)
                </h1>
                <p className="text-xs text-black mt-0.5">SAVING LIVES, SERVING COMMUNITIES</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { src: "/images/moh-gombe-logo.jpeg", alt: "Gombe State Ministry of Health", border: true },
                { src: "/images/worldbank-logo.jpeg", alt: "World Bank", border: true }
              ].map((logo) => (
                <div
                  key={logo.src}
                  className={`w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center ${
                    logo.border ? "border border-black" : ""
                  }`}
                >
                  <img src={logo.src} alt={logo.alt} className="object-contain" />
                </div>
              ))}
              {dirty ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                  <AlertTriangle className="w-4 h-4" /> Unsaved
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
              {/* Year Selector */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setSelectedYear(prev => Math.max(Math.min(...AVAILABLE_YEARS), prev - 1))}
                  disabled={selectedYear <= Math.min(...AVAILABLE_YEARS)}
                  className="w-9 h-9 rounded-full border border-black flex items-center justify-center bg-white hover:bg-black/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Previous Year"
                  aria-label="Previous Year"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                  <Calendar className="w-5 h-5 text-black" />
                  <span className="text-sm font-bold text-black tabular-nums w-16 text-center">{selectedYear}</span>
                  {selectedYear === CURRENT_YEAR && (
                    <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Current</span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedYear(prev => Math.min(Math.max(...AVAILABLE_YEARS), prev + 1))}
                  disabled={selectedYear >= Math.max(...AVAILABLE_YEARS)}
                  className="w-9 h-9 rounded-full border border-black flex items-center justify-center bg-white hover:bg-black/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Next Year"
                  aria-label="Next Year"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
              <button
                onClick={loadData}
                disabled={loading}
                className="w-11 h-11 rounded-full border border-black flex items-center justify-center bg-white hover:bg-black/5 transition-colors"
                title="Reload Data"
              >
                <RefreshCw className={`w-5 h-5 text-black ${loading ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs text-white bg-[#DC143C] hover:bg-[#b01030] transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Publish Updates"}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-1 bg-[#0052A5]" />
      </header>

      {/* Main Console Content */}
      <main className="flex-1 container mx-auto px-6 py-8 pb-24 space-y-6">
        {saveResult && (
          <div
            className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-sm font-semibold ${
              saveResult === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {saveResult === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              {saveResult === "success"
                ? "Dashboard updated successfully. All slide changes are now live."
                : "Failed to publish updates. Please check your credentials/network."}
            </div>
            <button onClick={() => setSaveResult(null)} className="hover:opacity-70">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Tabbed Navigation Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {SLIDES.map((tab) => {
            const TabIcon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-[#0052A5] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Live Slide Preview (renders the actual dashboard slide) */}
        <div className="h-[calc(100vh-300px)] min-h-[440px] animate-fade-in">
          {(() => {
            const active = SLIDES.find((s) => s.id === activeTab)!;
            const ActiveSlide = active.Slide;
            return <ActiveSlide key={active.id} data={(data as any)[active.section]} />;
          })()}
        </div>

        {/* Tab Content Fields */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <SectionHeader title="Overview Settings" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderNumberField("overview", "totalEmergencies", "Total Emergencies", (data as any)?.overview?.totalEmergencies ?? 0)}
                {renderNumberField("overview", "totalAmbulances", "Total Ambulances", (data as any)?.overview?.totalAmbulances ?? 0)}
                {renderTextField("overview", "avgResponseTime", "Average Response Time", (data as any)?.overview?.avgResponseTime ?? 0)}
                {renderNumberField("overview", "livesSaved", "Lives Saved", (data as any)?.overview?.livesSaved ?? 0)}
                {renderNumberField("overview", "patientsTransported", "Patients Transported", (data as any)?.overview?.patientsTransported ?? 0)}
                {renderNumberField("overview", "emergencyTrend", "Emergency Trend (%)", (data as any)?.overview?.emergencyTrend ?? 0, true)}
              </div>
            </div>
          )}

          {/* TAB 2: AMBULANCE FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              <SectionHeader title="Ambulance Fleet by LGA" />
              {renderNumberField("ambulanceFleet", "total", "Total Fleet Count (Global)", data.ambulanceFleet.total)}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mt-4">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Fleet Distribution</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {data.ambulanceFleet.byLGA.map((lga, idx) => (
                    <div key={lga.name} className="bg-white p-3 rounded-xl border border-slate-200">
                      <label className="text-xs font-bold text-slate-700 block mb-1">{lga.name}</label>
                      <input
                        type="number"
                        min={0}
                        value={lga.count}
                        onChange={(e) => {
                          const updatedLGA = [...data.ambulanceFleet.byLGA];
                          updatedLGA[idx].count = Math.max(0, parseInt(e.target.value || "0", 10));
                          patch("ambulanceFleet", { byLGA: updatedLGA });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:bg-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESMAT TEAM */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <SectionHeader title="RESMAT Personnel Count" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderNumberField("staff", "cemtorsOffices", "CEMTTOs Offices", data.staff.cemtorsOffices)}
                {renderNumberField("staff", "volunteerDrivers", "Volunteer Drivers", data.staff.volunteerDrivers)}
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200 flex flex-col justify-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Auto-Calculated Total</span>
                  <span className="text-3xl font-extrabold text-primary-navy mt-1">
                    {data.staff.cemtorsOffices + data.staff.volunteerDrivers}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FACILITIES */}
          {activeTab === "facilities" && (
            <div className="space-y-6">
              <SectionHeader title="Medical Facilities Distribution" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderNumberField("facilities", "remonic", "MAMII / Remonic Health Facilities", data.facilities.remonic)}
                {renderNumberField("facilities", "cemone", "CEmoNC Health Facilities", data.facilities.cemone)}
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Zonal Distribution</p>
                <div className="space-y-3">
                  {data.facilities.distribution.map((dist, idx) => (
                    <div key={dist.area} className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <span className="text-xs font-bold text-slate-800">{dist.area}</span>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">MAMII (Remonic)</label>
                        <input
                          type="number"
                          value={dist.remonic}
                          onChange={(e) => {
                            const updatedDist = [...data.facilities.distribution];
                            updatedDist[idx].remonic = Math.max(0, parseInt(e.target.value || "0", 10));
                            patch("facilities", { distribution: updatedDist });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">CEmoNC</label>
                        <input
                          type="number"
                          value={dist.cemone}
                          onChange={(e) => {
                            const updatedDist = [...data.facilities.distribution];
                            updatedDist[idx].cemone = Math.max(0, parseInt(e.target.value || "0", 10));
                            patch("facilities", { distribution: updatedDist });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EMERGENCY CALLS */}
          {activeTab === "calls" && (
            <div className="space-y-6">
              <SectionHeader title="Emergency Calls & Dispatch Settings" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderNumberField("dailyDispatch", "callsReceived", "Calls Received Today", data.dailyDispatch.callsReceived)}
                {renderTextField("dailyDispatch", "avgResponseTime", "Avg Response Time", data.dailyDispatch.avgResponseTime)}
                {renderNumberField("dailyDispatch", "successfulInterventions", "Successful Interventions Today", data.dailyDispatch.successfulInterventions)}
                {renderTextField("dailyDispatch", "avgTimeToScene", "Avg Time to Scene", data.dailyDispatch.avgTimeToScene)}
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Hourly Calls Trend</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {data.dailyDispatch.trends.map((t, idx) => (
                    <div key={t.time} className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-700 block mb-1">{t.time}</span>
                      <input
                        type="number"
                        value={t.calls}
                        onChange={(e) => {
                          const updatedTrends = [...data.dailyDispatch.trends];
                          updatedTrends[idx].calls = Math.max(0, parseInt(e.target.value || "0", 10));
                          patch("dailyDispatch", { trends: updatedTrends });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PATIENT TRANSPORT */}
          {activeTab === "transport" && (
            <div className="space-y-6">
              <SectionHeader title="Maternal Patient Transport" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderNumberField("transport", "totalDeliveries", "Safe Deliveries", data.transport.totalDeliveries)}
                {renderNumberField("transport", "totalOtherEmergencies", "Other Complications", data.transport.totalOtherEmergencies)}
                {renderNumberField("transport", "resmatCases", "Total RESMAT Cases", data.transport.resmatCases)}
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Monthly Breakdown</p>
                <div className="space-y-3">
                  {data.transport.monthlyData.map((m, idx) => (
                    <div key={m.month} className="bg-white p-3 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <span className="text-xs font-bold text-slate-800">{m.month}</span>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Deliveries</label>
                        <input
                          type="number"
                          value={m.deliveries}
                          onChange={(e) => {
                            const updatedMData = [...data.transport.monthlyData];
                            updatedMData[idx].deliveries = Math.max(0, parseInt(e.target.value || "0", 10));
                            updatedMData[idx].total = updatedMData[idx].deliveries + updatedMData[idx].otherEmergencies;
                            patch("transport", { monthlyData: updatedMData });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Other Cases</label>
                        <input
                          type="number"
                          value={m.otherEmergencies}
                          onChange={(e) => {
                            const updatedMData = [...data.transport.monthlyData];
                            updatedMData[idx].otherEmergencies = Math.max(0, parseInt(e.target.value || "0", 10));
                            updatedMData[idx].total = updatedMData[idx].deliveries + updatedMData[idx].otherEmergencies;
                            patch("transport", { monthlyData: updatedMData });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Total</span>
                        <span className="text-sm font-bold text-slate-700">{m.deliveries + m.otherEmergencies}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EMERGENCY TYPES */}
          {activeTab === "emergencyTypes" && (
            <div className="space-y-6">
              <SectionHeader title="Emergency Call Types" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Labor Complications */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-sm font-bold text-[#DC143C] mb-3">Labor Complications</p>
                  <div className="space-y-3">
                    {data.emergencyTypes.laborComplications.map((c, idx) => (
                      <div key={c.name} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-700">{c.name}</span>
                        <input
                          type="number"
                          value={c.count}
                          onChange={(e) => {
                            const updatedLabor = [...data.emergencyTypes.laborComplications];
                            updatedLabor[idx].count = Math.max(0, parseInt(e.target.value || "0", 10));
                            patch("emergencyTypes", { laborComplications: updatedLabor });
                          }}
                          className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-center focus:bg-white focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pregnancy Complications */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-sm font-bold text-[#0052A5] mb-3">Pregnancy Complications</p>
                  <div className="space-y-3">
                    {data.emergencyTypes.pregnancyComplications.map((c, idx) => (
                      <div key={c.name} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-700">{c.name}</span>
                        <input
                          type="number"
                          value={c.count}
                          onChange={(e) => {
                            const updatedPreg = [...data.emergencyTypes.pregnancyComplications];
                            updatedPreg[idx].count = Math.max(0, parseInt(e.target.value || "0", 10));
                            patch("emergencyTypes", { pregnancyComplications: updatedPreg });
                          }}
                          className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-center focus:bg-white focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PERFORMANCE */}
          {activeTab === "performance" && (
            <div className="space-y-6">
              <SectionHeader title="Response & Survival Performance" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderNumberField("performance", "responseTimeTarget", "Response Time Target (mins)", data.performance.responseTimeTarget)}
                {renderNumberField("performance", "responseTimeActual", "Response Time Actual (mins)", data.performance.responseTimeActual)}
                {renderNumberField("performance", "survivalRate", "Survival Rate (%)", data.performance.survivalRate, true)}
                {renderNumberField("performance", "satisfactionScore", "Satisfaction Score (%)", data.performance.satisfactionScore, true)}
                {renderNumberField("performance", "coverageArea", "Coverage Area (%)", data.performance.coverageArea, true)}
              </div>
            </div>
          )}

          {/* TAB 9: CENSUS / WHERE WE SERVE */}
          {activeTab === "census" && (
            <div className="space-y-6">
              <SectionHeader title="Where We Serve (Census Details)" />
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 overflow-x-auto">
                <table className="w-full min-w-[600px] text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-500 font-bold uppercase">
                      <th className="text-left py-2 px-3">LGA Name</th>
                      <th className="text-left py-2 px-3">Population</th>
                      <th className="text-left py-2 px-3">Ambulances</th>
                      <th className="text-right py-2 px-3">Ambulance Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.census.byLGA.map((lga, idx) => (
                      <tr key={lga.name} className="border-b border-slate-200 bg-white">
                        <td className="py-2 px-3 font-bold text-slate-800">{lga.name}</td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            value={lga.population}
                            onChange={(e) => {
                              const updatedCensus = [...data.census.byLGA];
                              const pop = Math.max(0, parseInt(e.target.value || "0", 10));
                              updatedCensus[idx].population = pop;
                              // Auto calculate ratio
                              const amb = updatedCensus[idx].ambulances || 1;
                              updatedCensus[idx].ratio = `1:${Math.round(pop / amb).toLocaleString()}`;
                              patch("census", { byLGA: updatedCensus });
                            }}
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:bg-white focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="number"
                            value={lga.ambulances}
                            onChange={(e) => {
                              const updatedCensus = [...data.census.byLGA];
                              const amb = Math.max(1, parseInt(e.target.value || "1", 10));
                              updatedCensus[idx].ambulances = amb;
                              // Auto calculate ratio
                              const pop = updatedCensus[idx].population || 0;
                              updatedCensus[idx].ratio = `1:${Math.round(pop / amb).toLocaleString()}`;
                              patch("census", { byLGA: updatedCensus });
                            }}
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:bg-white focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-3 text-right font-semibold text-primary-navy">
                          {lga.ratio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: MONTHLY BIRTHS / TRENDS */}
          {activeTab === "trends" && (
            <div className="space-y-6">
              <SectionHeader title={`Monthly Births (${selectedYear})`} />
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-3">
                  {data.trends.monthly.map((m, idx) => (
                    <div key={m.month} className="bg-white p-3 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <span className="text-xs font-bold text-slate-800">{m.month}</span>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Emergencies</label>
                        <input
                          type="number"
                          value={m.emergencies}
                          onChange={(e) => {
                            const updatedMonthly = [...data.trends.monthly];
                            updatedMonthly[idx].emergencies = Math.max(0, parseInt(e.target.value || "0", 10));
                            patch("trends", { monthly: updatedMonthly });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Deliveries</label>
                        <input
                          type="number"
                          value={m.deliveries}
                          onChange={(e) => {
                            const updatedMonthly = [...data.trends.monthly];
                            updatedMonthly[idx].deliveries = Math.max(0, parseInt(e.target.value || "0", 10));
                            patch("trends", { monthly: updatedMonthly });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: AMBULANCE SERVICE RUNS */}
          {activeTab === "serviceRuns" && (
            <div className="space-y-6">
              <SectionHeader title="Ambulance Service Runs" />
              {renderNumberField("ambulanceServiceRuns", "total", "Total Patient Transfers", data.ambulanceServiceRuns.total)}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mt-4">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Monthly Service Runs</p>
                <div className="space-y-3">
                  {data.ambulanceServiceRuns.monthlyRuns.map((r, idx) => (
                    <div key={r.month} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                      <span className="text-xs font-bold text-slate-800">{r.month}</span>
                      <input
                        type="number"
                        value={r.runs}
                        onChange={(e) => {
                          const updatedRuns = [...data.ambulanceServiceRuns.monthlyRuns];
                          updatedRuns[idx].runs = Math.max(0, parseInt(e.target.value || "0", 10));
                          // Auto sum total
                          const sumTotal = updatedRuns.reduce((sum, run) => sum + run.runs, 0);
                          patch("ambulanceServiceRuns", {
                            monthlyRuns: updatedRuns,
                            total: sumTotal
                          });
                        }}
                        className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-center focus:bg-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer (matches live dashboard) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#DC143C]" />
              <span className="text-xs text-black uppercase tracking-wide">Emergency Hotline:</span>
              <span className="text-sm font-bold text-black">112</span>
            </div>

            <div className="flex items-center gap-2" title="11 editable sections">
              {SLIDES.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    activeTab === tab.id
                      ? "w-6 h-2 bg-[#0052A5]"
                      : "w-2 h-2 bg-black/30 hover:bg-black"
                  }`}
                  aria-label={`Go to ${tab.label}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                <span className="text-black">SYSTEM OPERATIONAL</span>
              </div>
              <span className="text-black tabular-nums">
                Last Updated: {now}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  // Field renderer helpers
  function SectionHeader({ title }: { title: string }) {
    return (
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-black">{title}</h2>
        <div className="w-12 h-1 bg-[#FFB81C] rounded-full mt-1.5" />
      </div>
    );
  }

  function renderNumberField(
    section: keyof DashboardDataSchema,
    field: string,
    label: string,
    val: number,
    float = false
  ) {
    return (
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">{label}</label>
        <input
          type="number"
          step={float ? "0.1" : "1"}
          value={val}
          onChange={(e) => {
            const parsed = float ? parseFloat(e.target.value || "0") : parseInt(e.target.value || "0", 10);
            patch(section, { [field]: Math.max(0, parsed) });
          }}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm font-semibold text-black focus:outline-none focus:border-[#0052A5] focus:shadow-[0_0_0_4px_rgba(0,82,165,0.1)] transition-all"
        />
      </div>
    );
  }

  // Field renderer helpers
  function renderTextField(
    section: keyof DashboardDataSchema,
    field: string,
    label: string,
    val: string
  ) {
    return (
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-black/60">{label}</label>
        <input
          type="text"
          value={val}
          onChange={(e) => patch(section, { [field]: e.target.value })}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm font-semibold text-black focus:outline-none focus:border-[#0052A5] focus:shadow-[0_0_0_4px_rgba(0,82,165,0.1)] transition-all"
        />
      </div>
    );
  }
}
