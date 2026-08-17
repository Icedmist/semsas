"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  Users,
  Ambulance,
  Building2,
  PhoneCall,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPinned,
  Baby,
  AlertTriangle,
  Award,
  RadioTower,
  Save,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Database,
  MapPin,
  HelpCircle,
  Phone
} from "lucide-react";

import { defaultDashboardData } from "../../src/lib/default-dashboard-data";

type DashboardDataSchema = typeof defaultDashboardData;

const TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "fleet", label: "Ambulance Fleet", icon: Ambulance },
  { id: "team", label: "RESMAT Team", icon: Users },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "calls", label: "Emergency Calls", icon: PhoneCall },
  { id: "transport", label: "Patient Transport", icon: Baby },
  { id: "emergencyTypes", label: "Emergency Types", icon: HelpCircle },
  { id: "performance", label: "Performance", icon: Award },
  { id: "census", label: "Where We Serve", icon: MapPinned },
  { id: "trends", label: "Monthly Births", icon: TrendingUp },
  { id: "serviceRuns", label: "Service Runs", icon: Clock }
];

export default function AdminConsole() {
  const [data, setData] = useState<DashboardDataSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<"success" | "error" | null>(null);
  const [dirty, setDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [now, setNow] = useState("");

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

  // Read API URL from environment variables
  const getApiUrl = () => {
    const nextUrl = process.env.NEXT_PUBLIC_API_URL;
    return nextUrl ? `${nextUrl}/api/live-stats` : "/api/live-stats";
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl());
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setData(json);
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
  }, []);

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
      const secretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || "";
      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secretKey ? { Authorization: `Bearer ${secretKey}` } : {})
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to save");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
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
    <div className="min-h-screen bg-bg-gray pb-24">
      {/* Premium Branded Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Logos grid */}
              {[
                { src: "/images/nemsas-logo.png", alt: "NEMSAS Logo" },
                { src: "/images/fmoh-logo.png", alt: "Federal Ministry of Health", border: true },
                { src: "/images/moh-gombe-logo.jpeg", alt: "Gombe State Ministry of Health", border: true },
                { src: "/images/worldbank-logo.jpeg", alt: "World Bank", border: true }
              ].map((logo) => (
                <div
                  key={logo.src}
                  className="hidden xs:flex sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden bg-white items-center justify-center border border-slate-200 shadow-sm shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="object-contain w-10 h-10"
                  />
                </div>
              ))}
              <div className="ml-1 sm:ml-3 min-w-0">
                <h1 className="text-[13px] sm:text-base xl:text-lg font-heading font-extrabold text-primary-navy tracking-wide truncate leading-tight">
                  GOMBE STATE EMERGENCY MEDICAL SERVICES &amp; AMBULANCE SYSTEM (SEMSAS)
                </h1>
                <p className="text-[9px] sm:text-[11px] text-emergency-red font-bold tracking-[0.18em] mt-0.5">
                  ADMIN CONSOLE • EDITING LIVE DASHBOARD
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {!dirty && (
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Live
                </span>
              )}
              {dirty && (
                <span className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                  <AlertTriangle className="w-3.5 h-3.5" /> Unsaved
                </span>
              )}
              <button
                onClick={loadData}
                disabled={loading}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200 bg-white hover:border-primary-navy hover:bg-primary-navy/5 hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
                title="Reload Data"
              >
                <RefreshCw className={`w-4 h-4 text-slate-500 hover:text-primary-navy ${loading ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-red flex items-center gap-2 text-xs px-5 py-2.5"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Publish Updates"}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#0A2A52] via-emergency-red to-[#0A2A52]" />
      </header>

      {/* Main Console Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
          {TABS.map((tab) => {
            const TabIcon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-primary-navy to-primary-deep text-white shadow-glow-blue"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Fields */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <SectionHeader title="Overview Settings" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderNumberField("overview", "totalEmergencies", "Total Emergencies", data.overview.totalEmergencies)}
                {renderNumberField("overview", "totalAmbulances", "Total Ambulances", data.overview.totalAmbulances)}
                {renderTextField("overview", "avgResponseTime", "Average Response Time", data.overview.avgResponseTime)}
                {renderNumberField("overview", "livesSaved", "Lives Saved", data.overview.livesSaved)}
                {renderNumberField("overview", "patientsTransported", "Patients Transported", data.overview.patientsTransported)}
                {renderNumberField("overview", "emergencyTrend", "Emergency Trend (%)", data.overview.emergencyTrend, true)}
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
              <SectionHeader title="Monthly Births (June - Dec 2025)" />
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

      {/* Premium Branded Footer */}
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

            <div className="flex items-center gap-2" title="11 editable sections">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    activeTab === tab.id
                      ? "w-5 h-2 bg-gradient-to-r from-primary-navy to-emergency-red shadow-[0_0_8px_rgba(220,20,60,0.4)]"
                      : "w-2 h-2 bg-slate-300 hover:bg-primary-navy"
                  }`}
                  aria-label={`Go to ${tab.label}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A86B]" />
                </span>
                <span className="font-bold text-slate-700 tracking-wide">
                  SYSTEM OPERATIONAL
                </span>
              </div>
              <span className="text-slate-500 font-semibold tabular-nums flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-primary-navy" />
                {now}
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
        <h2 className="text-lg font-bold text-primary-navy">{title}</h2>
        <div className="w-12 h-1 bg-emergency-amber rounded-full mt-1.5" />
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
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</label>
        <input
          type="number"
          step={float ? "0.1" : "1"}
          value={val}
          onChange={(e) => {
            const parsed = float ? parseFloat(e.target.value || "0") : parseInt(e.target.value || "0", 10);
            patch(section, { [field]: Math.max(0, parsed) });
          }}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary-navy focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,82,165,0.1)] transition-all"
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
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</label>
        <input
          type="text"
          value={val}
          onChange={(e) => patch(section, { [field]: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary-navy focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,82,165,0.1)] transition-all"
        />
      </div>
    );
  }
}
