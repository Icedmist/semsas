"use client";

/**
 * @module DashboardSlides
 * This module contains various slide components for the live dashboard,
 * including overview, fleet, RESMAT team, medical facilities, emergency calls,
 * and specific emergency types. Also includes custom SVG illustrations.
 */
import React from "react";
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
  Smartphone,
  Truck,
  Stethoscope
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line
} from "recharts";
import AnimatedCounter from "@/components/AnimatedCounter";

// ==========================================
// Illustrations (SVG Components)
// ==========================================

export function IllustrationOverview({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <path
        d="M60 70 C20 40 20 15 45 15 C55 15 60 25 60 25 C60 25 65 15 75 15 C100 15 100 40 60 70"
        fill="#DC143C"
      />
      <path
        d="M10 45 L35 45 L42 30 L50 60 L58 35 L65 55 L72 40 L80 45 L110 45"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IllustrationFleet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <rect x="10" y="25" width="85" height="40" rx="4" fill="#0052A5" />
      <rect x="65" y="10" width="30" height="55" rx="4" fill="#0052A5" />
      <rect x="70" y="15" width="20" height="15" rx="2" fill="#87CEEB" />
      <rect x="15" y="30" width="15" height="12" rx="2" fill="#87CEEB" />
      <rect x="30" y="35" width="20" height="6" rx="1" fill="#DC143C" />
      <rect x="37" y="28" width="6" height="20" rx="1" fill="#DC143C" />
      <circle cx="30" cy="65" r="10" fill="#333" />
      <circle cx="30" cy="65" r="5" fill="#666" />
      <circle cx="75" cy="65" r="10" fill="#333" />
      <circle cx="75" cy="65" r="5" fill="#666" />
    </svg>
  );
}

export function IllustrationTeam({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <circle cx="35" cy="25" r="12" fill="#0052A5" />
      <path d="M35 37 C20 37 15 50 15 60 L55 60 C55 50 50 37 35 37" fill="#0052A5" />
      <circle cx="35" cy="22" r="6" fill="#FFE4C4" />
      <path d="M30 30 Q25 40 30 45" stroke="#00A86B" strokeWidth="2" fill="none" />
      <circle cx="30" cy="46" r="3" fill="#00A86B" />
      <circle cx="60" cy="28" r="10" fill="#00A86B" />
      <path d="M60 38 C48 38 44 48 44 56 L76 56 C76 48 72 38 60 38" fill="#00A86B" />
      <circle cx="60" cy="26" r="5" fill="#FFE4C4" />
      <rect x="55" y="18" width="10" height="3" fill="white" />
      <rect x="58" y="15" width="4" height="6" fill="white" />
    </svg>
  );
}

export function IllustrationFacilities({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <rect x="25" y="20" width="70" height="55" fill="#0052A5" />
      {[35, 55, 75].map((e) =>
        [28, 45, 62].map((t) => (
          <rect key={`${e}-${t}`} x={e} y={t} width="10" height="8" fill="#87CEEB" rx="1" />
        ))
      )}
      <rect x="52" y="55" width="16" height="20" fill="#00A86B" />
      <rect x="55" y="5" width="10" height="15" fill="#DC143C" />
      <rect x="50" y="8" width="20" height="6" fill="#DC143C" />
      <rect x="15" y="30" width="8" height="8" rx="4" fill="#DC143C" />
      <text x="19" y="36" className="text-[6px] fill-white font-bold" textAnchor="middle">
        H
      </text>
    </svg>
  );
}

export function IllustrationCalls({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <rect x="35" y="10" width="50" height="60" rx="8" fill="#333" />
      <rect x="38" y="15" width="44" height="45" rx="4" fill="#87CEEB" />
      <text x="60" y="42" className="text-xl font-bold fill-[#DC143C]" textAnchor="middle">
        112
      </text>
      <path d="M90 25 Q100 30 90 40" stroke="#00A86B" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M95 20 Q110 30 95 45" stroke="#00A86B" strokeWidth="3" fill="none" opacity="0.4" />
      <path d="M100 15 Q120 30 100 50" stroke="#00A86B" strokeWidth="3" fill="none" opacity="0.2" />
      <circle cx="60" cy="62" r="4" fill="#DC143C" />
    </svg>
  );
}

export function IllustrationTransport({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <rect x="15" y="45" width="90" height="5" fill="#0052A5" />
      <rect x="15" y="50" width="5" height="20" fill="#0052A5" />
      <rect x="100" y="50" width="5" height="20" fill="#0052A5" />
      <rect x="20" y="35" width="80" height="10" rx="3" fill="#87CEEB" />
      <ellipse cx="60" cy="38" rx="30" ry="5" fill="#00A86B" />
      <rect x="75" y="28" width="20" height="10" rx="3" fill="white" stroke="#ddd" />
      <circle cx="85" cy="28" r="8" fill="#FFE4C4" />
      <rect x="25" y="10" width="2" height="35" fill="#666" />
      <rect x="20" y="10" width="12" height="3" fill="#666" />
      <rect x="22" y="5" width="8" height="8" rx="2" fill="#DC143C" />
    </svg>
  );
}

export function IllustrationPerformance({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <path d="M40 10 L80 10 L75 45 Q60 55 45 45 L40 10" fill="#FFB81C" />
      <path d="M40 15 Q25 15 25 30 Q25 40 40 40" stroke="#FFB81C" strokeWidth="6" fill="none" />
      <path d="M80 15 Q95 15 95 30 Q95 40 80 40" stroke="#FFB81C" strokeWidth="6" fill="none" />
      <rect x="50" y="50" width="20" height="10" fill="#0052A5" />
      <rect x="40" y="60" width="40" height="8" rx="2" fill="#0052A5" />
      <polygon points="60,18 63,28 74,28 65,34 68,45 60,38 52,45 55,34 46,28 57,28" fill="white" />
    </svg>
  );
}

export function IllustrationTrends({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none">
      <rect x="15" y="50" width="15" height="25" fill="#0052A5" rx="2" />
      <rect x="35" y="40" width="15" height="35" fill="#0052A5" rx="2" />
      <rect x="55" y="30" width="15" height="45" fill="#0052A5" rx="2" />
      <rect x="75" y="20" width="15" height="55" fill="#00A86B" rx="2" />
      <rect x="95" y="10" width="15" height="65" fill="#00A86B" rx="2" />
      <path d="M22 48 L42 38 L62 28 L82 18 L102 8" stroke="#DC143C" strokeWidth="3" strokeLinecap="round" />
      <polygon points="105,5 115,12 108,14" fill="#DC143C" />
    </svg>
  );
}

// Icons for emergency complications
export function IconBleeding({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#DC143C" opacity="0.15" />
      <path d="M30 10 Q20 25 20 35 Q20 50 30 50 Q40 50 40 35 Q40 25 30 10" fill="#DC143C" />
      <circle cx="30" cy="35" r="4" fill="white" opacity="0.3" />
    </svg>
  );
}

export function IconProlongedLabor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#00A86B" opacity="0.15" />
      <circle cx="30" cy="15" r="8" fill="#FFE4C4" />
      <path d="M30 23 C20 23 18 35 22 45 L38 45 C42 35 40 23 30 23" fill="#00A86B" />
      <ellipse cx="30" cy="38" rx="10" ry="8" fill="#00A86B" />
      <ellipse cx="30" cy="38" rx="6" ry="5" fill="#00A86B" stroke="white" strokeWidth="1" />
    </svg>
  );
}

export function IconConvulsions({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#FFB81C" opacity="0.15" />
      <path d="M25 15 L20 30 L28 28 L22 45 L35 25 L27 27 L35 15 Z" fill="#FFB81C" />
      <path d="M38 20 L35 30 L40 29 L36 40" stroke="#FFB81C" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function IconOther({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <circle cx="30" cy="30" r="25" fill="#0052A5" opacity="0.15" />
      <rect x="22" y="12" width="16" height="36" rx="3" fill="#0052A5" />
      <rect x="12" y="22" width="36" height="16" rx="3" fill="#0052A5" />
      <rect x="27" y="20" width="6" height="20" fill="white" />
      <rect x="20" y="27" width="20" height="6" fill="white" />
    </svg>
  );
}

// ==========================================
// Base Slide Layout Wrapper Component
// ==========================================

interface SlideWrapperProps {
  title: string;
  subtitle?: string;
  illustration?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  titleColor?: string;
  children: React.ReactNode;
}

export function SlideWrapper({
  title,
  subtitle,
  illustration,
  icon: IconComponent,
  titleColor = "#0a0a0a",
  children
}: SlideWrapperProps) {
  return (
    <div className="rounded-[40px] bg-[#f0f5f6] p-4 md:p-6 h-full">
      <div className="flex gap-4 md:gap-6 h-full flex-col lg:flex-row">
        {/* Left: Healixx card */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="bg-white rounded-[24px] border border-black/5 p-8 h-full flex flex-col items-center justify-center relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            {illustration ? (
              <div className="mb-6 w-full max-w-[280px]">{illustration}</div>
            ) : IconComponent ? (
              <div className="mb-8">
                <IconComponent className="w-20 h-20 text-[#0a0a0a] stroke-[1.5]" />
              </div>
            ) : null}
            <h2 className="text-2xl font-black text-center mb-2 text-balance" style={{ color: titleColor, fontFamily:"var(--font-urbanist)" }}>
              {title}
            </h2>
            {subtitle && <p className="text-sm text-black/60 text-center mb-3">{subtitle}</p>}
            <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
          </div>
        </div>

        {/* Right: Healixx card */}
        <div className="flex-1 min-h-0">
          <div className="bg-white rounded-[24px] border border-black/5 p-6 md:p-8 h-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Slide Components
// ==========================================

// Slide 1: Overview
export function SlideOverview({ data }: { data: any }) {
  const cards = [
    { label: "Emergency Calls", value: data.totalEmergencies, color: "#DC143C", bgColor: "bg-red-50", icon: Activity },
    { label: "Lives Saved", value: data.livesSaved, color: "#00A86B", bgColor: "bg-green-50", icon: Heart },
    { label: "Patients Moved", value: data.patientsTransported, color: "#FFB81C", bgColor: "bg-amber-50", icon: Users },
    { label: "Total Ambulances", value: data.totalAmbulances, color: "#FF0000", bgColor: "bg-red-50", icon: Ambulance }
  ];

  return (
    <SlideWrapper
      title="Overview"
      subtitle="Service Performance Summary"
      illustration={<IllustrationOverview className="w-full h-32" />}
    >
      <div className="flex flex-col h-full justify-center">
        <div className="grid grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <div
                key={card.label}
                className={`${card.bgColor} rounded-[24px] p-6 flex items-center gap-4 animate-slide-up`}
                style={{ animationDelay: `${100 * idx}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: card.color }}
                >
                  <CardIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: card.color }}>
                    <AnimatedCounter value={card.value} />
                  </p>
                  <p className="text-sm text-black font-medium">{card.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-green-50 rounded-[16px] border border-green-200">
          <div className="w-4 h-4 rounded-full bg-[#00A86B] animate-pulse" />
          <span className="text-base font-semibold text-green-700">All Systems Working</span>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 2: Ambulance Fleet
export function SlideAmbulanceFleet({ data }: { data: any }) {
  const chartData = data.byLGA.map((item: any) => ({
    name: item.shortName,
    fullName: item.name,
    count: item.count
  }));

  return (
    <SlideWrapper
      title="Ambulance Fleet"
      subtitle="Vehicles across all LGAs"
      illustration={<IllustrationFleet className="w-full h-28 md:h-32" />}
      titleColor="#DC143C"
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-4 p-4 rounded-[16px] bg-red-50 border-2 border-[#FF0000]">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-[#FF0000] shrink-0">
              <Ambulance className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF0000]">
                <AnimatedCounter value={data.total} />
              </p>
              <p className="text-sm text-black">Total Ambulances in Gombe State</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black/5 rounded-[16px] p-4">
          <p className="text-xs text-black uppercase tracking-wide font-semibold mb-2 text-center">
            Ambulances by Local Government Area
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -15, right: 10, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#000000" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 10, fill: "#000000" }} axisLine={false} tickLine={false} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry: any, index: number) => {
                    const count = entry.count;
                    const fill = count >= 10 ? "#00A86B" : count >= 4 ? "#FFB81C" : "#DC143C";
                    return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#00A86B]" />
            <span className="text-xs text-black">10+ ambulances</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#FFB81C]" />
            <span className="text-xs text-black">4-9 ambulances</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#DC143C]" />
            <span className="text-xs text-black">1-3 ambulances</span>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 3: Our RESMAT Team
export function SlideResmatTeam({ data }: { data: any }) {
  const chartData = [
    { name: "CEMTTOs Offices", value: data.cemtorsOffices, color: "#0052A5" },
    { name: "Volunteer Drivers", value: data.volunteerDrivers, color: "#FF0000" }
  ];

  return (
    <SlideWrapper
      title="Our RESMAT Team"
      subtitle="Community responders"
      illustration={<IllustrationTeam className="w-full h-28 md:h-32" />}
      titleColor="#DC143C"
    >
      <div className="flex items-center justify-center gap-8 h-full">
        <div className="relative w-64 h-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Users className="w-8 h-8 text-[#0052A5] mb-1" />
            <p className="text-4xl font-bold text-black">
              <AnimatedCounter value={data.totalPersonnel} />
            </p>
            <p className="text-xs text-black">Total Team</p>
          </div>
        </div>

        <div className="space-y-4 w-64">
          {chartData.map((item) => {
            const ItemIcon = item.name === "Volunteer Drivers" ? Truck : Building2;
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-[16px]"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <ItemIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-black">{item.name}</p>
                  <p className="text-3xl font-bold" style={{ color: item.color }}>
                    <AnimatedCounter value={item.value} />
                  </p>
                </div>
              </div>
            );
          })}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-black leading-relaxed">
              <strong>CEMTTOs</strong> = Community Emergency Medical Transport Triage Officers who coordinate rural emergency transport
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 4: Medical Facilities
export function SlideMedicalFacilities({ data }: { data: any }) {
  const chartData = [
    { name: "MAMII Health Facilities", value: data.remonic, color: "#0052A5", desc: "Emergency Care", icon: Building2 },
    { name: "CEmoNC Health Facilities", value: data.cemone, color: "#00A86B", desc: "Basic Care", icon: Stethoscope }
  ];
  const total = data.remonic + data.cemone;

  return (
    <SlideWrapper
      title="Medical Facilities"
      subtitle="Healthcare centers in Gombe"
      illustration={<IllustrationFacilities className="w-full h-28 md:h-32" />}
      titleColor="#DC143C"
    >
      <div className="flex items-center justify-center gap-8 h-full">
        <div className="relative w-64 h-64 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Building2 className="w-8 h-8 text-[#0052A5] mb-1" />
            <p className="text-4xl font-bold text-black">
              <AnimatedCounter value={total} />
            </p>
            <p className="text-xs text-black">Total Facilities</p>
          </div>
        </div>

        <div className="space-y-4 w-64">
          {chartData.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.name}
                className="p-5 rounded-[16px] border-l-4"
                style={{ backgroundColor: `${item.color}10`, borderLeftColor: item.color }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <ItemIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{item.name}</p>
                    <p className="text-xs text-black">{item.desc}</p>
                  </div>
                </div>
                <p className="text-3xl font-bold ml-13" style={{ color: item.color }}>
                  <AnimatedCounter value={item.value} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 5: Emergency Calls
export function SlideEmergencyCalls({ data }: { data: any }) {
  const cards = [
    { label: "Calls Today", value: data.callsReceived, color: "#0052A5", bgColor: "bg-blue-50", icon: PhoneCall },
    { label: "People Helped", value: data.successfulInterventions, color: "#00A86B", bgColor: "bg-green-50", icon: CheckCircle }
  ];

  return (
    <SlideWrapper
      title="Emergency Calls"
      subtitle="Daily dispatch center"
      illustration={<IllustrationCalls className="w-full h-28 md:h-32" />}
      titleColor="#DC143C"
    >
      <div className="flex flex-col justify-center h-full gap-6">
        <div className="flex items-center justify-center gap-6">
          {cards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div key={card.label} className={`${card.bgColor} rounded-[24px] p-6 flex items-center gap-4 flex-1 max-w-xs`}>
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: card.color }}
                >
                  <CardIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: card.color }}>
                    <AnimatedCounter value={card.value} />
                  </p>
                  <p className="text-sm text-black">{card.label}</p>
                </div>
              </div>
            );
          })}
          <div className="bg-amber-50 rounded-[24px] p-6 flex items-center gap-4 flex-1 max-w-xs">
            <div className="w-14 h-14 rounded-[16px] flex items-center justify-center bg-[#FFB81C] shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FFB81C]">{data.avgResponseTime}</p>
              <p className="text-sm text-black">Avg Response</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[16px] p-4">
          <p className="text-xs text-black mb-2 font-medium">Calls Throughout the Day</p>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trends}>
                <defs>
                  <linearGradient id="callsGradientVisual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052A5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0052A5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="calls" stroke="#0052A5" fill="url(#callsGradientVisual)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 6: RESMAT Patient Transport
export function SlidePatientTransport({ data }: { data: any }) {
  const cards = [
    { name: "Safe Deliveries", value: data.totalDeliveries, color: "#00A86B", icon: Baby },
    { name: "Other Emergencies", value: data.totalOtherEmergencies, color: "#FFB81C", icon: AlertTriangle },
    { name: "Total (RESMAT)", value: data.resmatCases, color: "#DC143C", icon: Truck }
  ];

  return (
    <SlideWrapper
      title="RESMAT Patient Transport"
      subtitle="Emergency cases handled"
      illustration={<IllustrationTransport className="w-full h-28 md:h-32" />}
      titleColor="#DC143C"
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-center gap-4">
          {cards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div
                key={card.name}
                className="flex items-center gap-3 p-3 rounded-[16px] flex-1 max-w-[200px]"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: card.color }}
                >
                  <CardIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: card.color }}>
                    <AnimatedCounter value={card.value} />
                  </p>
                  <p className="text-xs text-black leading-tight">{card.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex-1 bg-gray-50 rounded-[16px] p-4">
          <p className="text-xs text-black uppercase tracking-wide font-semibold mb-2 text-center">
            Monthly Labor & Delivery Cases (June - November 2025)
          </p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyData} margin={{ left: -15, right: 10 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                <Legend verticalAlign="top" height={30} formatter={(value) => <span className="text-xs text-black">{value}</span>} />
                <Bar dataKey="deliveries" name="Safe Deliveries" fill="#00A86B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="otherEmergencies" name="Other Cases" fill="#FFB81C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-black">
            <strong className="text-[#DC143C]">RESMAT</strong> = Rural Emergency Services and Maternal Transport
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 7: Types of Emergencies
export function SlideEmergencyTypes({ data }: { data: any }) {
  const totalLabor = data.laborComplications.reduce((sum: number, item: any) => sum + item.count, 0);
  const totalPregnancy = data.pregnancyComplications.reduce((sum: number, item: any) => sum + item.count, 0);
  const grandTotal = totalLabor + totalPregnancy;

  const laborComplications = data.laborComplications.map((item: any) => ({
    ...item,
    percentage: Math.round((item.count / totalLabor) * 100)
  }));

  const pregnancyComplications = data.pregnancyComplications.map((item: any) => ({
    ...item,
    percentage: Math.round((item.count / totalPregnancy) * 100)
  }));

  const complicationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Bleeding: IconBleeding,
    "Prolonged Labor": IconProlongedLabor,
    Convulsions: IconConvulsions,
    "Convulsions (Eclampsia)": IconConvulsions,
    Eclampsia: IconConvulsions,
    "Other Complications": IconOther,
    "Other Pregnancy Issues": IconOther
  };

  return (
    <SlideWrapper
      title="Types of Emergencies"
      subtitle="Why people call for help"
      illustration={
        <div className="grid grid-cols-2 gap-3">
          <IconBleeding className="w-16 h-16" />
          <IconProlongedLabor className="w-16 h-16" />
          <IconConvulsions className="w-16 h-16" />
          <IconOther className="w-16 h-16" />
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-6 h-full p-4">
        {/* Labor Complications */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-center">
            <h3 className="text-xl font-bold text-[#DC143C] mb-1">Labor Complications</h3>
            <p className="text-2xl font-bold text-black">{totalLabor.toLocaleString()}</p>
            <p className="text-xs text-black">{Math.round((totalLabor / grandTotal) * 100)}% of emergencies</p>
          </div>
          <div className="relative w-48 h-48 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={laborComplications}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {laborComplications.map((entry: any, index: number) => (
                    <Cell key={`labor-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 w-full max-w-[280px]">
            {laborComplications.map((item: any) => {
              const CompIcon = complicationIcons[item.name] || IconOther;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2 p-1.5 rounded-lg"
                  style={{ backgroundColor: `${item.color}10`, borderLeft: `3px solid ${item.color}` }}
                >
                  <CompIcon className="w-6 h-6 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-black truncate leading-tight">{item.name}</p>
                    <p className="text-[10px] text-black">{item.count.toLocaleString()} cases</p>
                  </div>
                  <p className="text-base font-bold shrink-0" style={{ color: item.color }}>
                    {item.percentage}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pregnancy Complications */}
        <div className="flex flex-col items-center border-l-2 border-gray-200 pl-6">
          <div className="mb-3 text-center">
            <h3 className="text-xl font-bold text-[#0052A5] mb-1">Pregnancy Complications</h3>
            <p className="text-2xl font-bold text-black">{totalPregnancy.toLocaleString()}</p>
            <p className="text-xs text-black">{Math.round((totalPregnancy / grandTotal) * 100)}% of emergencies</p>
          </div>
          <div className="relative w-48 h-48 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pregnancyComplications}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {pregnancyComplications.map((entry: any, index: number) => (
                    <Cell key={`pregnancy-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 w-full max-w-[280px]">
            {pregnancyComplications.map((item: any) => {
              const CompIcon = complicationIcons[item.name] || IconOther;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2 p-1.5 rounded-lg"
                  style={{ backgroundColor: `${item.color}10`, borderLeft: `3px solid ${item.color}` }}
                >
                  <CompIcon className="w-6 h-6 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-black truncate leading-tight">{item.name}</p>
                    <p className="text-[10px] text-black">{item.count.toLocaleString()} cases</p>
                  </div>
                  <p className="text-base font-bold shrink-0" style={{ color: item.color }}>
                    {item.percentage}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 8: How We Are Doing (Performance)
export function SlidePerformance({ data }: { data: any }) {
  const items = [
    { label: "Survival Rate", value: data.survivalRate, suffix: "%", color: "#00A86B", bgColor: "bg-green-50", icon: Heart },
    { label: "Happy Patients", value: data.satisfactionScore, suffix: "%", color: "#FFB81C", bgColor: "bg-amber-50", icon: Award },
    { label: "Areas Covered", value: data.coverageArea, suffix: "%", color: "#DC143C", bgColor: "bg-red-50", icon: MapPinned }
  ];

  return (
    <SlideWrapper
      title="How We Are Doing"
      subtitle="Our performance numbers"
      illustration={<IllustrationPerformance className="w-full h-28 md:h-32" />}
    >
      <div className="flex flex-col justify-center h-full">
        <div className="grid grid-cols-2 gap-5">
          {items.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.label}
                className={`${item.bgColor} rounded-[24px] p-5 animate-slide-up`}
                style={{ animationDelay: `${100 * idx}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    <ItemIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-black">{item.label}</p>
                </div>
                <p className="text-4xl font-bold" style={{ color: item.color }}>
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 9: Where We Serve (Census)
export function SlideCensus({ data }: { data: any }) {
  const totalAmbulances = data.byLGA.reduce((sum: number, item: any) => sum + item.ambulances, 0);
  const avgAmbulances = Math.round(totalAmbulances / data.byLGA.length);

  return (
    <SlideWrapper
      title="Where We Serve"
      subtitle="Ambulances across Gombe State"
      illustration={
        <div className="text-center">
          <MapPinned className="w-16 h-16 text-[#0052A5] mx-auto mb-2" />
          <p className="text-xs text-black">11 Local Government Areas</p>
        </div>
      }
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-3 p-4 rounded-[16px] bg-blue-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#FF0000] shrink-0">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#FF0000]">
                <AnimatedCounter value={totalAmbulances} />
              </p>
              <p className="text-xs text-black">Total Ambulances</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-[16px] bg-green-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#00A86B] shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00A86B]">
                <AnimatedCounter value={avgAmbulances} />
              </p>
              <p className="text-xs text-black">Avg per LGA</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black/5 rounded-[16px] p-4 overflow-auto max-h-[300px]">
          <div className="grid grid-cols-2 gap-3">
            {data.byLGA.map((lga: any) => (
              <div
                key={lga.name}
                className="bg-white rounded-lg p-3 border border-black/10 flex items-center justify-between shadow-xs"
              >
                <div>
                  <p className="text-sm font-semibold text-black leading-tight">{lga.name}</p>
                  <p className="text-[10px] text-black">LGA</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#0052A5]">{lga.ambulances}</p>
                  <p className="text-[10px] text-black">ambulances</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 10: Monthly Labor & Delivery Cases
export function SlideLaborDelivery({ data }: { data: any }) {
  const totalDeliveries = data.monthly.reduce((sum: number, item: any) => sum + item.deliveries, 0);
  const avgDeliveries = Math.round(totalDeliveries / data.monthly.length);

  return (
    <SlideWrapper
      title="Monthly Labor & Delivery Cases (June - December 2025)"
      subtitle="Monthly births we helped with"
      illustration={<IllustrationTrends className="w-full h-28 md:h-32" />}
    >
      <div className="flex flex-col justify-center h-full gap-6">
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-3 p-4 rounded-[16px] bg-green-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#00A86B] shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00A86B]">
                <AnimatedCounter value={totalDeliveries} />
              </p>
              <p className="text-xs text-black">Total Deliveries</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-[16px] bg-blue-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0052A5] shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0052A5]">
                <AnimatedCounter value={avgDeliveries} />
              </p>
              <p className="text-xs text-black">Average per Month</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[16px] p-4 flex-1">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                <Legend verticalAlign="top" height={36} formatter={(value) => <span className="text-xs text-black font-medium">{value}</span>} />
                <Line
                  type="monotone"
                  dataKey="deliveries"
                  name="Deliveries"
                  stroke="#00A86B"
                  strokeWidth={3}
                  dot={{ fill: "#00A86B", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Slide 11: Ambulance Service Runs
export function SlideServiceRuns({ data }: { data: any }) {
  if (!data || !data.monthlyRuns) {
    return (
      <SlideWrapper
        title="Ambulance Service Runs"
        icon={Ambulance}
        titleColor="#DC143C"
      >
        <div className="flex items-center justify-center h-96">
          <p className="text-black">No data available</p>
        </div>
      </SlideWrapper>
    );
  }

  return (
    <SlideWrapper
      title="Ambulance Service Runs"
      subtitle="Patients Moved to Hospital"
      illustration={<Ambulance className="w-16 h-16 text-primary-navy" />}
      titleColor="#DC143C"
    >
      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-sm font-semibold">Total Patients Moved</p>
              <p className="text-black text-xs mt-1">March - December</p>
            </div>
            <p className="text-4xl font-bold text-red-600">
              <AnimatedCounter value={data.total} />
            </p>
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlyRuns} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={50} tick={{ fill: "#000", fontSize: 10 }} />
              <YAxis tick={{ fill: "#000", fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd", color: "#000" }}
                labelStyle={{ color: "#000" }}
                formatter={(value: any) => [`${value} runs`, "Patient Transfers"]}
              />
              <Bar dataKey="runs" fill="#DC143C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-2 px-2 text-black font-bold whitespace-nowrap">Month</th>
                <th className="text-center py-2 px-2 text-black font-bold whitespace-nowrap">Runs</th>
                <th className="text-right py-2 px-2 text-black font-bold whitespace-nowrap">% Total</th>
              </tr>
            </thead>
            <tbody>
              {data.monthlyRuns.map((run: any, rIdx: number) => (
                <tr key={rIdx} className="border-b border-black/10 hover:bg-white">
                  <td className="py-1.5 px-2 text-black font-medium">{run.month}</td>
                  <td className="text-center py-1.5 px-2 text-black font-semibold">{run.runs}</td>
                  <td className="text-right py-1.5 px-2 text-black">
                    {((run.runs / data.total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black bg-white font-bold">
                <td className="py-2 px-2 text-black text-left">TOTAL</td>
                <td className="text-center py-2 px-2 text-[#DC143C]">{data.total}</td>
                <td className="text-right py-2 px-2 text-black">100.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </SlideWrapper>
  );
}
