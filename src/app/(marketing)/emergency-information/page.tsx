"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  Phone,
  AlertTriangle,
  ChevronDown,
  Flame,
  Shield,
  Radio,
  Clock,
  MapPin,
  HeartPulse,
  Zap,
} from "lucide-react";

export default function EmergencyInformation() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const emergencyContacts = [
    { name: "Emergency Line", phone: "0703 382 5646", subtitle: "Primary Dispatch • 24/7", icon: Phone, bg: "bg-[#dc2626]" },
    { name: "Ambulance", phone: "0703 382 5646", subtitle: "Direct Ambulance", icon: Radio, bg: "bg-[#0a0a0a]" },
    { name: "State SEMA", phone: "0803 123 4567", subtitle: "Disaster Ops", icon: Shield, bg: "bg-[#0a7a3a]" },
    { name: "FRSC", phone: "122", subtitle: "Highway Crash", icon: AlertTriangle, bg: "bg-[#0a0a0a]" },
    { name: "Fire Service", phone: "112", subtitle: "Fire & Rescue", icon: Flame, bg: "bg-[#dc2626]" },
    { name: "Police", phone: "999", subtitle: "Security", icon: Shield, bg: "bg-[#0a0a0a]" },
  ];

  const triggers = [
    { title: "Severe Chest Pain", desc: "Cardiac arrest or heart distress — every second counts.", icon: HeartPulse },
    { title: "Difficulty Breathing", desc: "Choking, asthma, respiratory failure.", icon: Zap },
    { title: "Road Accidents", desc: "Trauma from vehicular collisions.", icon: AlertTriangle },
    { title: "Severe Bleeding", desc: "Arterial or uncontrolled bleeding.", icon: HeartPulse },
    { title: "Stroke", desc: "Facial droop, arm weakness, slurred speech.", icon: AlertTriangle },
    { title: "Unconscious", desc: "Non-responsive or diabetic collapse.", icon: HeartPulse },
    { title: "Labour Emergency", desc: "Maternal trauma or delivery.", icon: HeartPulse },
    { title: "Poisoning", desc: "Chemical or toxic ingestion.", icon: Flame },
    { title: "Burns", desc: "2nd/3rd degree burns.", icon: Flame },
    { title: "Mass Casualty", desc: "Multiple injured — disaster.", icon: Shield },
  ];

  const steps = [
    { n: "01", t: "Stay Calm", d: "Assess scene, ensure your safety first.", icon: Shield },
    { n: "02", t: "Call 0703 382 5646", d: "Speak clearly, give location + callback.", icon: Phone },
    { n: "03", t: "Share Location", d: "Landmarks, street, LGA.", icon: MapPin },
    { n: "04", t: "Do Not Move Spine", d: "Unless immediate danger (fire).", icon: AlertTriangle },
    { n: "05", t: "Follow Dispatcher", d: "First-aid guidance over phone.", icon: Radio },
    { n: "06", t: "Recovery Position", d: "If unconscious but breathing.", icon: HeartPulse },
    { n: "07", t: "Clear Access", d: "Open gate, guide ambulance.", icon: Clock },
  ];

  const faqs = [
    { q: "When should I call SEMSAS?", a: "Life-threatening: road accidents, severe trauma, unconsciousness, heart attack, stroke, or labour emergencies. Call even if unsure — dispatcher triages." },
    { q: "Is it 24/7?", a: "Yes — 24 hours, 365 days, all 11 LGAs including holidays. Admin office Mon–Fri 8–4, emergency 24/7." },
    { q: "Who can call?", a: "Anyone — patient, family, bystander. You can call for a stranger. No credit needed for 112/122/999; SEMSAS line is standard rate but dispatcher calls back." },
    { q: "What to tell dispatcher?", a: "Exact location (LGA, street, landmark), callback number, what happened, number of casualties, age/sex, conscious/breathing, hazards." },
    { q: "Is it free?", a: "Under NEMSAS, 48-hour stabilization is free for all Nigerians at receiving facilities. Transport is free." },
    { q: "Inter-hospital transfers?", a: "Yes — with medical authorization and pre-alert. Paramedic-monitored, with handover form." },
    { q: "Response time?", a: "Average 14:30. Varies by distance, terrain, traffic. Closest ambulance dispatched via GPS." },
    { q: "Coverage area?", a: "All 11 LGAs: Gombe, Akko, Balanga, Kwami, Kaltungo, Yamaltu Deba, Billiri, Dukku, Funakaye, Nafada, Shongom — urban + rural." },
  ];

  return (
    <div className="bg-white">
      {/* Scroll progress — red */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[#dc2626] origin-left z-50" />

      <PageHero
        kicker="Emergency Access"
        title="Know what to do — save a life"
        subtitle="Triage rules, hotlines, and first-aid steps. Read once, save everywhere."
      />

      {/* Emergency Hotlines — Helix 40px */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-8">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-sans)" }}>Emergency Hotlines</h2>
              <p className="text-sm text-black/50 mt-1">Tap to call — save these numbers now.</p>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hidden md:flex items-center gap-2 text-xs font-bold bg-white rounded-full px-3 py-1.5 border border-black/5 shadow-sm">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse" /> 24/7 STATEWIDE
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.name}
                  href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-[24px] bg-white border border-black/5 p-5 flex gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] transition-shadow"
                >
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }} className={`w-12 h-12 rounded-[16px] ${c.bg} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="min-w-0">
                    <div className="font-black text-sm leading-tight">{c.name}</div>
                    <div className="text-xs text-black/50 font-semibold">{c.subtitle}</div>
                    <div className="mt-1 font-black text-[#dc2626] tracking-wide">{c.phone}</div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to Call — Helix grid with hover spring */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-white border border-black/5 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-sans)" }}>When to call <span className="text-black/30">an ambulance</span></h2>
            <p className="text-sm text-black/60 max-w-md">If in doubt, call. Dispatcher decides urgency — never hesitate for these ten.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
            {triggers.map((tr, i) => {
              const Icon = tr.icon;
              return (
                <motion.div
                  key={tr.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 18 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] bg-[#f8fafa] border border-black/5 p-5 flex flex-col group hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-[14px] bg-white border border-black/5 flex items-center justify-center group-hover:bg-[#dc2626] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-black text-sm mt-4 leading-tight">{tr.title}</div>
                  <div className="text-xs text-black/60 mt-1 leading-5">{tr.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps — horizontal sticky parallax */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#0a0a0a] text-white p-6 md:p-8 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[360px] shrink-0">
              <div className="sticky top-24">
                <div className="inline-flex rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-bold tracking-widest">FIRST-AID STEPS</div>
                <h2 className="mt-3 text-2xl md:text-3xl font-black leading-tight" style={{ fontFamily: "var(--font-sans)" }}>What to do<br /><span className="text-white/40">before help arrives</span></h2>
                <p className="mt-3 text-sm text-white/60 leading-6">Dispatcher stays on line and guides you. Do these 7 while ambulance is en route.</p>
                <div className="mt-6 hidden lg:block">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-1 bg-[#dc2626] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 220, damping: 20 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[24px] bg-white text-[#0a0a0a] p-5 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-xs font-black">{s.n}</div>
                      <Icon className="w-5 h-5 text-[#dc2626]" />
                    </div>
                    <div className="font-black text-sm mt-4">{s.t}</div>
                    <div className="text-xs text-black/60 mt-1 leading-5">{s.d}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — Helix accordion with spring */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6 mb-8">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-sans)" }}>Frequently asked questions</h2>
            <p className="text-sm text-black/60 mt-2">Everything citizens ask — answered in one tap.</p>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="rounded-[24px] bg-white border border-black/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-bold text-sm pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="w-8 h-8 rounded-full bg-[#f0f5f6] border border-black/5 flex items-center justify-center shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-sm leading-6 text-black/60 border-t border-black/5 mx-5">
                        <div className="pt-3">{faq.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
