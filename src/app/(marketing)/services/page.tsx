"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  Truck,
  Radio,
  Activity,
  Flame,
  ArrowRightLeft,
  ShieldAlert,
  BookOpen,
  Bell,
  Sparkles,
  Wrench,
  HeartHandshake,
  Network,
  ArrowRight
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    { icon: <Truck className="w-5 h-5 text-[#dc2626]" />, title: "Emergency Ambulance Services", desc: "Deploying fully certified responder vehicles and clinical staff directly to patient locations." },
    { icon: <Radio className="w-5 h-5 text-[#0a0a0a]" />, title: "Emergency Dispatch", desc: "Direct emergency routing over 0703 382 5646 with modern caller tracking and immediate unit allocation." },
    { icon: <Activity className="w-5 h-5 text-[#dc2626]" />, title: "Pre-Hospital Emergency Care", desc: "Administration of basic and advanced cardiac and trauma life support on-site by paramedics." },
    { icon: <Flame className="w-5 h-5 text-[#dc2626]" />, title: "Road Traffic Crash Response", desc: "Fast deployment to Gombe highways in coordination with FRSC to administer trauma stabilization." },
    { icon: <ArrowRightLeft className="w-5 h-5 text-[#0a0a0a]" />, title: "Patient Referral Services", desc: "Securing coordinated clinical transport when transferring patients between public hospitals." },
    { icon: <ShieldAlert className="w-5 h-5 text-[#dc2626]" />, title: "Disaster & Mass Casualty Response", desc: "Mobilizing strategic disaster protocols during major fires, floods, or public health emergencies." },
    { icon: <BookOpen className="w-5 h-5 text-[#0a0a0a]" />, title: "Emergency Medical Training", desc: "Advanced clinical courses and operational instruction for Gombe State paramedics and dispatch staff." },
    { icon: <Bell className="w-5 h-5 text-[#0a0a0a]" />, title: "Community Awareness", desc: "Public education programs detailing basic first aid steps and how to request emergency assistance." },
    { icon: <Sparkles className="w-5 h-5 text-[#0a0a0a]" />, title: "Medical Event Coverage", desc: "Positioning standby ambulances and responder medical personnel at large state public events." },
    { icon: <Wrench className="w-5 h-5 text-[#0a0a0a]" />, title: "Fleet Management", desc: "Managing vehicle maintenance, regular mechanical safety checks, and absolute ambulance uptime." },
    { icon: <HeartHandshake className="w-5 h-5 text-[#dc2626]" />, title: "Equipment Support", desc: "Ensuring all ambulances carry calibrated defibrillators, oxygen ports, and emergency pharmaceuticals." },
    { icon: <Network className="w-5 h-5 text-[#0a0a0a]" />, title: "Hospital Coordination", desc: "Real-time communication with hospital emergency wards before patients arrive to guarantee readiness." },
  ];

  return (
    <div className="bg-white">
      <PageHero
        kicker="Services"
        title="Our Services"
        subtitle="Providing professional, rapid pre-hospital emergency care and ambulance transit services."
      />

      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-xs font-black tracking-widest text-black/40">EMERGENCY CARE FRAMEWORK</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-sans)" }}>Delivering Integrated Medical Response Statewide</h2>
            <p className="mt-2 text-sm leading-6 text-black/60">From call-taking and smart vehicle routing to emergency trauma procedures and pre-alerting hospital wards, we coordinate every link in the survival chain.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, type: "spring", stiffness: 220, damping: 18 }} whileHover={{ y: -4 }} className="rounded-[24px] bg-white border border-black/5 p-6 flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="w-10 h-10 rounded-[14px] bg-[#f0f5f6] border border-black/5 flex items-center justify-center">{s.icon}</div>
                <div className="font-black text-sm mt-4">{s.title}</div>
                <div className="text-xs leading-6 text-black/60 mt-1">{s.desc}</div>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0a0a0a] hover:text-[#dc2626]">Learn More <ArrowRight className="w-3.5 h-3.5" /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 mt-6 mb-8">
        <div className="rounded-[40px] bg-[#0a0a0a] text-white p-6 md:p-10 overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.03]" style={{ background: "linear-gradient(180deg, #DC143C, transparent)" }} />
          <div className="relative grid md:grid-cols-6 gap-4">
            {[
              ["Call", "0703 382 5646 dialed"],
              ["Verify", "Dispatcher triage"],
              ["Assign", "Nearest ambulance"],
              ["Dispatch", "En route 14:30 avg"],
              ["Stabilize", "BLS/ACLS on scene"],
              ["Transit", "Pre-alert hospital"],
            ].map(([t, d], i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-[16px] bg-white/5 border border-white/10 p-4 text-center backdrop-blur">
                <div className="w-8 h-8 rounded-full bg-[#dc2626] text-white flex items-center justify-center text-xs font-black mx-auto">{String(i+1).padStart(2,"0")}</div>
                <div className="font-black text-sm mt-2">{t}</div>
                <div className="text-xs text-white/60">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
