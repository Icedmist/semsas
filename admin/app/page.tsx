"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  Users,
  Ambulance,
  Truck,
  UserCheck,
  MapPin,
  RefreshCw,
  Save,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  LayoutDashboard,
  Globe,
} from "lucide-react";

interface LiveDashboardData {
  updatedAt: string;
  dashboard: {
    emergencyCalls: number;
    livesSaved: number;
    patientsMoved: number;
    totalAmbulances: number;
  };
  hero: {
    ambulances: number;
    personnel: number;
    communities: number;
    responses: number;
  };
  status: {
    message: string;
    status: "operational" | "degraded" | "offline";
  };
}

const STATUS_META: Record<
  LiveDashboardData["status"]["status"],
  { label: string; color: string; dot: string }
> = {
  operational: { label: "Operational", color: "text-emerald-600 bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  degraded: { label: "Degraded", color: "text-amber-600 bg-amber-50 border-amber-200", dot: "bg-amber-500" },
  offline: { label: "Offline", color: "text-red-600 bg-red-50 border-red-200", dot: "bg-red-500" },
};

interface FieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function NumberField({ label, value, onChange }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
        {label}
      </label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value || "0", 10)))}
        className="w-full bg-bg-gray border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-primary-navy focus:outline-none focus:border-primary-navy focus:bg-white focus:ring-4 focus:ring-primary-navy/10 transition-all"
      />
    </div>
  );
}

function MetricCard({
  icon,
  title,
  iconClass,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  iconClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconClass}`}>
          {icon}
        </div>
        <h3 className="font-heading font-bold text-base text-primary-navy">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function AdminConsole() {
  const [data, setData] = useState<LiveDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<"success" | "error" | null>(null);
  const [dirty, setDirty] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/live-stats");
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

  const patch = (section: "dashboard" | "hero" | "status", partial: Partial<LiveDashboardData["dashboard"] & LiveDashboardData["hero"] & LiveDashboardData["status"]>) => {
    setData((prev) =>
      prev
        ? { ...prev, [section]: { ...(prev as any)[section], ...partial } }
        : prev
    );
    setDirty(true);
    setSaveResult(null);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/live-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dashboard: data.dashboard,
          hero: data.hero,
          status: data.status,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const json = await res.json();
      setData(json.data);
      setDirty(false);
      setSaveResult("success");
    } catch (error) {
      console.error(error);
      setSaveResult("error");
    } finally {
      setSaving(false);
    }
  };

  const statusMeta = data ? STATUS_META[data.status.status] : null;

  return (
    <div className="min-h-screen bg-bg-gray">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#0B2E5B] text-white shadow-lg">
        <div className="h-1 bg-gradient-to-r from-emergency-red via-emergency-amber to-emergency-blue" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-emergency-amber" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-lg leading-none">
                SEMSAS Admin Console
              </h1>
              <p className="text-[11px] text-white/50 font-medium mt-1">
                Live Dashboard &amp; Statistics Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {dirty && (
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emergency-amber bg-emergency-amber/10 border border-emergency-amber/30 px-3 py-1.5 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" /> Unsaved changes
              </span>
            )}
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Reload</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !data}
              className="btn btn-red px-5 py-2.5 text-xs"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Save feedback */}
        {saveResult && (
          <div
            className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-sm font-semibold ${
              saveResult === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {saveResult === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              {saveResult === "success"
                ? "Changes saved successfully. The public live dashboard has been updated."
                : "Something went wrong. Please check the data and try again."}
            </div>
            <button onClick={() => setSaveResult(null)} className="hover:opacity-70">
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <RefreshCw className="w-10 h-10 text-primary-navy animate-spin" />
            <p className="text-sm text-muted-text font-medium">Loading live dashboard data...</p>
          </div>
        ) : !data ? (
          <div className="bg-white rounded-3xl border border-red-200 p-12 text-center space-y-3">
            <XCircle className="w-10 h-10 text-red-500 mx-auto" />
            <p className="font-bold text-primary-navy">Failed to load live dashboard data.</p>
            <button onClick={loadData} className="btn btn-dark px-6 py-3 text-sm mx-auto">
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Status summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${statusMeta?.color}`}>
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-text tracking-widest">
                    Current System Status
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${statusMeta?.dot}`} />
                    <span className="font-heading font-extrabold text-lg text-primary-navy">
                      {statusMeta?.label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-text font-semibold">
                <Globe className="w-3.5 h-3.5" />
                Last updated:{" "}
                {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "Never"}
              </div>
            </div>

            {/* Live Dashboard Stats */}
            <div>
              <h2 className="font-heading font-extrabold text-lg text-primary-navy mb-4 flex items-center gap-2">
                Live Dashboard Stats
                <span className="text-[10px] uppercase tracking-wider text-muted-text font-bold bg-bg-gray border border-gray-200 px-2.5 py-1 rounded-full">
                  Public /dashboard
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard
                  icon={<Activity className="w-5 h-5 text-emergency-red" />}
                  title="Emergency Calls"
                  iconClass="bg-emergency-red/10"
                >
                  <NumberField
                    label="Total Calls"
                    value={data.dashboard.emergencyCalls}
                    onChange={(v) => patch("dashboard", { emergencyCalls: v })}
                  />
                </MetricCard>
                <MetricCard
                  icon={<Heart className="w-5 h-5 text-emerald-500" />}
                  title="Lives Saved"
                  iconClass="bg-emerald-500/10"
                >
                  <NumberField
                    label="Lives Saved"
                    value={data.dashboard.livesSaved}
                    onChange={(v) => patch("dashboard", { livesSaved: v })}
                  />
                </MetricCard>
                <MetricCard
                  icon={<Users className="w-5 h-5 text-emergency-amber" />}
                  title="Patients Moved"
                  iconClass="bg-emergency-amber/10"
                >
                  <NumberField
                    label="Patients Moved"
                    value={data.dashboard.patientsMoved}
                    onChange={(v) => patch("dashboard", { patientsMoved: v })}
                  />
                </MetricCard>
                <MetricCard
                  icon={<Ambulance className="w-5 h-5 text-[#FF0000]" />}
                  title="Total Ambulances"
                  iconClass="bg-red-50"
                >
                  <NumberField
                    label="Ambulances"
                    value={data.dashboard.totalAmbulances}
                    onChange={(v) => patch("dashboard", { totalAmbulances: v })}
                  />
                </MetricCard>
              </div>
            </div>

            {/* Homepage Hero Stats */}
            <div>
              <h2 className="font-heading font-extrabold text-lg text-primary-navy mb-4 flex items-center gap-2">
                Homepage Hero Counters
                <span className="text-[10px] uppercase tracking-wider text-muted-text font-bold bg-bg-gray border border-gray-200 px-2.5 py-1 rounded-full">
                  Public Homepage
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard
                  icon={<Truck className="w-5 h-5 text-emergency-blue" />}
                  title="Ambulance Units"
                  iconClass="bg-emergency-blue/10"
                >
                  <NumberField
                    label="Units"
                    value={data.hero.ambulances}
                    onChange={(v) => patch("hero", { ambulances: v })}
                  />
                </MetricCard>
                <MetricCard
                  icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
                  title="Emergency Personnel"
                  iconClass="bg-emerald-500/10"
                >
                  <NumberField
                    label="Personnel"
                    value={data.hero.personnel}
                    onChange={(v) => patch("hero", { personnel: v })}
                  />
                </MetricCard>
                <MetricCard
                  icon={<MapPin className="w-5 h-5 text-emergency-amber" />}
                  title="Communities Served"
                  iconClass="bg-emergency-amber/10"
                >
                  <NumberField
                    label="Communities"
                    value={data.hero.communities}
                    onChange={(v) => patch("hero", { communities: v })}
                  />
                </MetricCard>
                <MetricCard
                  icon={<Activity className="w-5 h-5 text-emergency-red" />}
                  title="Emergency Responses"
                  iconClass="bg-emergency-red/10"
                >
                  <NumberField
                    label="Responses"
                    value={data.hero.responses}
                    onChange={(v) => patch("hero", { responses: v })}
                  />
                </MetricCard>
              </div>
            </div>

            {/* System Status */}
            <div>
              <h2 className="font-heading font-extrabold text-lg text-primary-navy mb-4">
                System Status Banner
              </h2>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(Object.keys(STATUS_META) as Array<keyof typeof STATUS_META>).map(
                    (key) => {
                      const meta = STATUS_META[key];
                      return (
                        <button
                          key={key}
                          onClick={() => patch("status", { status: key })}
                          className={`flex items-center justify-center gap-2.5 rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                            data.status.status === key
                              ? `${meta.color} shadow-sm ring-2 ring-offset-1`
                              : "bg-bg-gray border-gray-200 text-muted-text hover:border-gray-300"
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                          {meta.label}
                        </button>
                      );
                    }
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                    Status Message
                  </label>
                  <input
                    type="text"
                    value={data.status.message}
                    onChange={(e) => patch("status", { message: e.target.value })}
                    className="w-full bg-bg-gray border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-primary-navy focus:outline-none focus:border-primary-navy focus:bg-white focus:ring-4 focus:ring-primary-navy/10 transition-all"
                    placeholder="e.g. All Systems Working"
                  />
                </div>
              </div>
            </div>

            {/* Sticky Save Bar */}
            <div className="sticky bottom-6 z-20 flex items-center justify-between gap-4 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-[0_20px_50px_-20px_rgba(8,47,91,0.3)] px-6 py-4">
              <div className="text-xs text-muted-text">
                {dirty ? (
                  <span className="flex items-center gap-2 font-semibold text-emergency-amber">
                    <AlertTriangle className="w-4 h-4" /> You have unsaved changes
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> All changes saved
                  </span>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={saving || !dirty}
                className="btn btn-red px-6 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Publish Updates"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
