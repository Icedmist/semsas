"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  Shield,
  Heart,
  Activity,
  Award,
  Users,
  Zap,
  TrendingUp,
  Clock,
  Stethoscope,
  Briefcase,
  Target,
  Compass,
  UserCheck,
} from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    { icon: <Award className="w-6 h-6 text-[#dc2626]" />, title: "Professionalism", desc: "Upholding the highest clinical and operational standards in pre-hospital emergency care." },
    { icon: <Shield className="w-6 h-6 text-[#0a0a0a]" />, title: "Integrity", desc: "Operating with absolute transparency, honesty, and accountability to the public we serve." },
    { icon: <Heart className="w-6 h-6 text-[#dc2626]" />, title: "Compassion", desc: "Delivering care with respect, dignity, empathy, and kindness to patients in distress." },
    { icon: <Zap className="w-6 h-6 text-[#dc2626]" />, title: "Rapid Response", desc: "Valuing every second as critical, optimizing dispatch protocols for swift intervention." },
    { icon: <Users className="w-6 h-6 text-[#0a0a0a]" />, title: "Teamwork", desc: "Collaborating seamlessly across dispatchers, medical crews, and receiving hospitals." },
    { icon: <TrendingUp className="w-6 h-6 text-[#0a0a0a]" />, title: "Excellence", desc: "Striving for continuous improvement through regular responder drills and modern technologies." },
  ];

  const objectives = [
    { icon: <Clock className="w-5 h-5 text-[#dc2626]" />, text: "Deliver rapid emergency medical response statewide." },
    { icon: <Activity className="w-5 h-5 text-[#dc2626]" />, text: "Coordinate ambulance services across all 11 LGAs." },
    { icon: <UserCheck className="w-5 h-5 text-[#0a0a0a]" />, text: "Strengthen the referral system between community clinics and state hospitals." },
    { icon: <Heart className="w-5 h-5 text-[#dc2626]" />, text: "Reduce preventable pre-hospital and traffic-related deaths." },
    { icon: <Stethoscope className="w-5 h-5 text-[#0a0a0a]" />, text: "Modernize public emergency healthcare access tools." },
    { icon: <Briefcase className="w-5 h-5 text-[#0a0a0a]" />, text: "Build emergency response workforce clinical capacity." },
    { icon: <Compass className="w-5 h-5 text-[#0a0a0a]" />, text: "Promote public emergency preparedness campaigns." },
    { icon: <Target className="w-5 h-5 text-[#dc2626]" />, text: "Provide strategic medical support during disasters and epidemics." },
  ];

  return (
    <div className="bg-white">
      <PageHero
        kicker="About GoSEMSAS"
        title="About Gombe State SEMSAS"
        subtitle="Delivering coordinated emergency medical services and ambulance response to save lives across Gombe State."
      />

      {/* Who We Are — Healixx 40px */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 220, damping: 20 }} className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-white">
                <Image src="/images/about-personnel.jpg" alt="SEMSAS Emergency Paramedics Team" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="lg:col-span-7 space-y-4">
              <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-xs font-black tracking-widest text-black/40">WHO WE ARE</div>
              <h2 className="text-2xl md:text-3xl font-black leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
                Establishing the Standard for <span className="text-black/30">Pre-Hospital Emergency Care</span>
              </h2>
              <div className="text-sm leading-7 text-black/60 space-y-3">
                <p>The Gombe State Emergency Medical Services and Ambulance System (SEMSAS) is the official state implementation of the National Emergency Medical Services and Ambulance System (NEMSAS). It manages public emergency response, ambulance logistics, pre-hospital life support, and referral networks across Gombe State.</p>
                <p>We bridge the critical gap between medical emergencies — road traffic accidents, trauma, maternal challenges, sudden severe illnesses — and medical establishments. By mobilizing prompt dispatch and trained clinical personnel, SEMSAS ensures patients are stabilized and safely transitioned.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — Healixx 24px cards, not dark glass */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] bg-white border border-black/5 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="w-12 h-12 rounded-[16px] bg-[#dc2626]/10 border border-[#dc2626]/20 text-[#dc2626] flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-black text-xl" style={{ fontFamily: "var(--font-sans)" }}>Our Mission</h3>
            <p className="mt-2 text-sm leading-7 text-black/60">Deliver rapid, coordinated, and high-quality emergency medical services that improve survival rates and health outcomes for all residents and visitors across Gombe State.</p>
            <div className="mt-6 h-1 w-full bg-[#dc2626] rounded-full max-w-[120px]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="rounded-[24px] bg-[#0a0a0a] text-white p-8 border border-black">
            <div className="w-12 h-12 rounded-[16px] bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-black text-xl" style={{ fontFamily: "var(--font-sans)" }}>Our Vision</h3>
            <p className="mt-2 text-sm leading-7 text-white/70">A Gombe State where every person has timely access to professional emergency medical care whenever and wherever it is needed, minimizing preventable casualties.</p>
            <div className="mt-6 flex gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">55 Ambulances</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">111 Facilities</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values — Healixx 24px */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-white border border-black/5 p-6 md:p-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex rounded-full bg-[#f0f5f6] border border-black/5 px-3 py-1 text-xs font-black tracking-widest text-black/40">OUR FOUNDATIONS</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-sans)" }}>Core Values</h2>
            <p className="mt-2 text-sm text-black/60">Guiding our responders and dispatch team daily.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {coreValues.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="rounded-[24px] bg-[#f8fafa] border border-black/5 p-6 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-colors">
                <div className="w-10 h-10 rounded-[14px] bg-white border border-black/5 flex items-center justify-center">{v.icon}</div>
                <div className="font-black text-sm mt-4">{v.title}</div>
                <div className="text-xs leading-6 text-black/60 mt-1">{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Objectives — Healixx */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6 mb-8">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-sans)" }}>Strategic Objectives</h2>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {objectives.map((o, i) => (
              <motion.div key={o.text} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="rounded-[16px] bg-white border border-black/5 p-4 flex gap-3 items-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow">
                <div className="w-9 h-9 rounded-full bg-[#f0f5f6] border border-black/5 flex items-center justify-center shrink-0">{o.icon}</div>
                <span className="text-sm font-medium leading-6">{o.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
