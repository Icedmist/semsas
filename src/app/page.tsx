"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Clock,
  MapPin,
  Heart,
  Shield,
  Activity,
  ChevronRight,
  ArrowRight,
  Truck,
  Users,
  Award,
  BookOpen,
  Bell,
  Check,
  ChevronUp,
  Menu,
  X,
  FileText,
  HelpCircle,
  ThumbsUp,
  Flame,
  UserCheck,
  ShieldCheck
} from "lucide-react";

// Types
interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix: string;
  icon: React.ReactNode;
}

interface TimelineStep {
  number: number;
  title: string;
  desc: string;
}

export default function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Track scroll for sticky nav and back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats counting animation simulation
  const [stats, setStats] = useState({
    ambulances: 0,
    personnel: 0,
    communities: 0,
    responses: 0,
  });

  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          let startTimestamp: number | null = null;
          const duration = 2000; // 2 seconds

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            setStats({
              ambulances: Math.floor(progress * 25),
              personnel: Math.floor(progress * 180),
              communities: Math.floor(progress * 110),
              responses: Math.floor(progress * 4500),
            });

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = statsSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [statsAnimated]);

  // Partners lists
  const partners = [
    { name: "Federal Ministry of Health", text: "FMOH" },
    { name: "NEMSAS National", text: "NEMSAS" },
    { name: "Federal Road Safety Corps", text: "FRSC" },
    { name: "NEMA Nigeria", text: "NEMA" },
    { name: "Gombe SEMA", text: "SEMA" },
    { name: "Nigerian Police Force", text: "NPF" },
    { name: "Federal Fire Service", text: "Fire Service" },
    { name: "Nigerian Red Cross Society", text: "Red Cross" },
  ];

  // News Items
  const newsItems = [
    {
      title: "SEMSAS Expands Emergency Response Coverage to Southern Gombe",
      date: "August 1, 2026",
      excerpt: "In a bid to ensure rapid emergency healthcare delivery, Gombe State SEMSAS has deployed additional ambulance units to Kaltungo and Balanga LGAs.",
      image: "/images/hero-ambulance.jpg",
    },
    {
      title: "Gombe State Paramedics Complete Intensive Advanced Trauma Training",
      date: "July 24, 2026",
      excerpt: "Forty emergency care professionals have successfully completed specialized training in advanced trauma support conducted by international facilitators.",
      image: "/images/about-personnel.jpg",
    },
    {
      title: "SEMSAS Response Time Decreases to Record Lows Across Gombe Metropolis",
      date: "July 12, 2026",
      excerpt: "A new dispatch optimization system integrated into the 0703 382 5646 emergency hotline has successfully slashed response times by 18% in the metropolitan area.",
      image: "/images/hero-bg.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-bg-gray text-text-dark selection:bg-emergency-red selection:text-white overflow-x-hidden">
      


      {/* ----------------- HERO SECTION ----------------- */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-primary-navy hero-banner"
      >
        {/* Background Image with Cinematic Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Gombe City Sunrise Backdrop"
            fill
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/95 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-primary-navy/20" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-1/4 w-[35rem] h-[35rem] bg-emergency-blue/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-10 w-[25rem] h-[25rem] bg-emergency-red/15 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emergency-red"></span>
                </span>
                🚑 24/7 EMERGENCY RESPONSE SYSTEM
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.75rem] leading-tight tracking-tight text-white">
                  SAVING LIVES.<br />
                  <span className="text-emergency-red drop-shadow-[0_2px_10px_rgba(214,40,40,0.2)] block mt-1">EVERY SECOND COUNTS.</span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
                  Gombe State Emergency Medical Services and Ambulance System (SEMSAS) provides 24-hour emergency response, ambulance services, pre-hospital care, and safe medical transportation across all communities.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none"
              >
                <a
                  href="tel:07033825646"
                  className="btn btn-red px-8 py-4 text-center"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  Request an Ambulance
                </a>
                <a
                  href="#about"
                  className="btn btn-ghost px-8 py-4 text-center"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Feature Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 max-w-lg"
              >
                {[
                  "24/7 Emergency Dispatch",
                  "Statewide LGA Coverage",
                  "Trained Medical Experts",
                  "Fast, Safe & Reliable Care",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm font-medium hover:text-white transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emergency-blue/20 flex items-center justify-center text-emergency-blue border border-emergency-blue/30 p-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* HERO RIGHT COLUMN */}
            <div className="lg:col-span-7 relative flex justify-center items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.5] rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-primary-navy/40"
              >
                {/* Ambulance Image */}
                <Image
                  src="/images/hero-ambulance.jpg"
                  alt="Gombe SEMSAS Rapid Response Ambulance"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover relative z-10"
                  priority
                />
                
                {/* Visual Glow Effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/40 via-transparent to-transparent z-20 pointer-events-none" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- EMERGENCY INFO BAR ----------------- */}
      <section id="emergencyinfo" className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Emergency Numbers */}
          <div className="bg-[#051F3D]/90 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-soft card-lift hover:shadow-glow-blue flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emergency-red/20 border border-emergency-red/40 flex items-center justify-center text-emergency-red flex-shrink-0">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white mb-1">Emergency Numbers</h3>
              <p className="text-xs text-gray-300 mb-3">Toll-Free dispatch open 24/7 statewide</p>
              <div className="flex flex-wrap gap-2 text-sm font-bold">
                <span className="bg-emergency-red px-3 py-1 rounded-md shadow-md text-white font-extrabold tracking-wider">Call: 0703 382 5646</span>
              </div>
            </div>
          </div>

          {/* Card 2: Coverage */}
          <div className="bg-[#051F3D]/90 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-soft card-lift hover:shadow-glow-blue flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emergency-blue/20 border border-emergency-blue/40 flex items-center justify-center text-emergency-blue flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white mb-1">Statewide Coverage</h3>
              <p className="text-xs text-gray-300 mb-3">Serving all Local Government Areas in Gombe State</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-emergency-blue/20 border border-emergency-blue/30 px-2 py-1 rounded text-emergency-blue font-bold">11 LGAs</span>
                <span className="bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded text-emerald-400 font-bold">24/7 Operations</span>
              </div>
            </div>
          </div>

          {/* Card 3: Promise */}
          <div className="bg-[#051F3D]/90 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-soft card-lift hover:shadow-glow-blue flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/45 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white mb-1">Our Core Promise</h3>
              <p className="text-xs text-gray-300 mb-3">Professional, swift, and highly compassionate service</p>
              <p className="text-sm font-heading font-black text-emerald-400 uppercase tracking-wider">
                We Respond. We Care. We Save Lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- ABOUT PREVIEW SECTION ----------------- */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/images/about-personnel.jpg"
                  alt="SEMSAS Emergency Paramedics Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              
              {/* Floating Success Indicator */}
              <div className="absolute -bottom-6 -right-6 glass-card-light p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-200/50 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-black text-xs text-primary-navy">NEMSAS INTEGRATED</div>
                  <div className="text-[10px] text-muted-text">Aligned with National Emergency standards.</div>
                </div>
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-tag">
                About GoSEMSAS
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-navy">
                Coordinating Rapid Emergency Care Across Gombe State
              </h2>
              <p className="text-muted-text text-base sm:text-lg leading-relaxed">
                The Gombe State Emergency Medical Services and Ambulance System (SEMSAS) is the localized implementation of the National Emergency Medical Services and Ambulance System (NEMSAS). We bridge the gap between emergency occurrences and medical institutions, ensuring that every citizen gets medical transport and stabilizer care when they need it most.
              </p>
              <p className="text-muted-text text-sm sm:text-base leading-relaxed">
                Through our strategic network of emergency units, trained dispatch handlers, and skilled paramedics, we ensure coordinated pre-hospital care and rapid transit. We operate directly within the communities, securing health outcomes for families and accident victims in real-time.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#services"
                  className="btn btn-dark px-6 py-3.5 text-sm"
                >
                  Our Services
                </a>
                <a
                  href="#emergencyinfo"
                  className="btn bg-gray-100 hover:bg-gray-200 text-primary-navy px-6 py-3.5 text-sm"
                >
                  Emergency Procedures
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- MISSION & VISION ----------------- */}
      <section className="relative py-24 bg-primary-navy overflow-hidden">
        {/* Background glow graphics */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emergency-blue/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emergency-red/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col justify-between group hover:border-emergency-blue/50 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl min-h-[320px]">
              {/* Top Accent Light Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emergency-blue to-transparent" />
              
              {/* Background typographic detail */}
              <span className="absolute bottom-0 right-0 text-white/[0.015] text-[10rem] font-black tracking-widest translate-y-8 translate-x-4 select-none pointer-events-none font-heading">
                GOAL
              </span>

              <div className="space-y-6 relative z-10 text-left">
                <div className="w-14 h-14 rounded-2xl bg-emergency-blue/10 border border-emergency-blue/30 text-emergency-blue flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-[0_0_15px_rgba(47,128,237,0.15)]">
                  <Activity className="w-7 h-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading font-black text-2xl text-white tracking-wide">Our Mission</h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                    Deliver rapid, coordinated, and high-quality emergency medical services that improve survival rates and medical health outcomes for all residents and visitors across Gombe State.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col justify-between group hover:border-emergency-red/50 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl min-h-[320px]">
              {/* Top Accent Light Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emergency-red to-transparent" />

              {/* Background typographic detail */}
              <span className="absolute bottom-0 right-0 text-white/[0.015] text-[10rem] font-black tracking-widest translate-y-8 translate-x-4 select-none pointer-events-none font-heading">
                VISION
              </span>

              <div className="space-y-6 relative z-10 text-left">
                <div className="w-14 h-14 rounded-2xl bg-emergency-red/10 border border-emergency-red/30 text-emergency-red flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-[0_0_15px_rgba(214,40,40,0.15)]">
                  <Shield className="w-7 h-7" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading font-black text-2xl text-white tracking-wide">Our Vision</h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                    A Gombe State where every person has timely access to professional emergency medical care whenever and wherever it is needed, minimizing preventable casualties.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- OUR SERVICES SECTION ----------------- */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="section-tag section-tag-red">
              What We Do
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-navy">
              Comprehensive Emergency Response Services
            </h2>
            <p className="text-muted-text text-sm sm:text-base">
              Providing standardized pre-hospital and medical emergency services across communities in Gombe State.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-6 h-6 text-emergency-red" />,
                title: "Emergency Ambulance Services",
                desc: "Equipped vehicles stationed in key regions for rapid response and transport.",
              },
              {
                icon: <Activity className="w-6 h-6 text-emergency-blue" />,
                title: "Pre-Hospital Emergency Care",
                desc: "Immediate stabilization and critical trauma treatment by certified responders.",
              },
              {
                icon: <Phone className="w-6 h-6 text-primary-navy" />,
                title: "Emergency Dispatch System",
                desc: "Dedicated emergency routing on 0703 382 5646 with smart tracking to allocate the closest ambulance unit.",
              },
              {
                icon: <Users className="w-6 h-6 text-emerald-500" />,
                title: "Patient Transportation",
                desc: "Comfortable, safe, and medically supervised transfers between health facilities.",
              },
              {
                icon: <Flame className="w-6 h-6 text-orange-500" />,
                title: "Road Traffic Crash Response",
                desc: "Active joint operations with FRSC to deliver fast trauma care on major Gombe highways.",
              },
              {
                icon: <BookOpen className="w-6 h-6 text-purple-500" />,
                title: "Emergency Medical Training",
                desc: "Regular clinical instruction and emergency drills for state medical technicians.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="card-lift bg-white rounded-3xl p-8 shadow-soft border border-slate-100 hover:border-primary-navy/15 text-left group flex flex-col justify-between min-h-[240px]"
              >
                <div className="border-l-2 pl-4 border-l-slate-200 group-hover:border-l-emergency-red transition-colors duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-navy/5 to-emergency-red/5 border border-primary-navy/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-extrabold text-lg mb-2 text-primary-navy">
                    {service.title}
                  </h3>
                  <p className="text-muted-text text-xs sm:text-sm leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
                <div className="pt-6 pl-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-navy hover:text-emergency-red transition-colors"
                  >
                    Learn More <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- HOW EMERGENCY RESPONSE WORKS ----------------- */}
      <section className="py-24 bg-primary-navy text-white relative overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emergency-red/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="section-tag section-tag-light">
              Lifeline Protocol
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl">
              How Emergency Response Works
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              A structured, real-time medical workflow designed to optimize speed and patient care.
            </p>
          </div>

          {/* Desktop Timeline Grid (6 Columns) */}
          <div className="hidden lg:grid grid-cols-6 gap-6 relative">
            {/* Animated Connector Line across steps */}
            <div className="absolute top-[35px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-emergency-red via-emergency-blue to-emerald-500 z-0 opacity-40" />

            {[
              { num: 1, title: "Call Hotline", desc: "Dial 0703 382 5646 immediately." },
              { num: 2, title: "Verify Details", desc: "Dispatcher verifies coordinates and triage state." },
              { num: 3, title: "Assign Unit", desc: "Closest active ambulance team is selected." },
              { num: 4, title: "Rapid Dispatch", desc: "Paramedics depart under siren guidance." },
              { num: 5, title: "Stabilization", desc: "Medical crew administers care on-site." },
              { num: 6, title: "Hospital Transit", desc: "Patient is safely transported to the hospital." },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 space-y-4 flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-primary-navy border-4 border-white/20 group-hover:border-emergency-red flex items-center justify-center font-heading font-black text-xl transition-all duration-300 shadow-md group-hover:scale-110">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-sm tracking-wide text-white group-hover:text-emergency-red transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-300 max-w-[130px] mx-auto leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Vertical Timeline */}
          <div className="lg:hidden space-y-8 text-left max-w-md mx-auto relative pl-6 border-l border-white/10">
            {[
              { num: 1, title: "Call Hotline", desc: "Dial 0703 382 5646 immediately during emergencies." },
              { num: 2, title: "Verify Details", desc: "The dispatcher verifies your exact location coordinates and triage state." },
              { num: 3, title: "Assign Unit", desc: "The closest available ambulance unit is located and assigned to the case." },
              { num: 4, title: "Rapid Dispatch", desc: "Ambulance paramedics depart instantly, keeping dispatch informed in transit." },
              { num: 5, title: "Stabilization", desc: "The medical crew arrives on-site and administers life-saving treatments." },
              { num: 6, title: "Hospital Transit", desc: "The patient is transported smoothly to the nearest emergency health facility." },
            ].map((step, idx) => (
              <div key={idx} className="relative space-y-2 group">
                <div className="absolute -left-[38px] top-0 w-8 h-8 rounded-full bg-primary-navy border border-white/20 group-hover:border-emergency-red flex items-center justify-center font-heading font-extrabold text-xs">
                  {step.num}
                </div>
                <h4 className="font-heading font-bold text-base text-white group-hover:text-emergency-red transition-colors pt-0.5">
                  {step.title}
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- WHY CHOOSE SEMSAS ----------------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="section-tag">
              Our Strengths
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-navy">
              Why Choose Gombe SEMSAS
            </h2>
            <p className="text-muted-text text-sm sm:text-base">
              A healthcare delivery program built on reliability, advanced response technology, and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock className="w-7 h-7 text-emergency-red" />,
                title: "Rapid Response Time",
                desc: "Optimized dispatch algorithms ensure our ambulances get to you in minimal time.",
              },
              {
                icon: <Users className="w-7 h-7 text-emergency-blue" />,
                title: "Professional Teams",
                desc: "Manned by certified EMTs and trauma care specialists trained under national regulations.",
              },
              {
                icon: <Truck className="w-7 h-7 text-amber-500" />,
                title: "Modern Ambulance Fleet",
                desc: "Equipped with diagnostic monitors, oxygen support, and critical care medication.",
              },
              {
                icon: <MapPin className="w-7 h-7 text-emerald-500" />,
                title: "Statewide Coverage",
                desc: "Strategic emergency ambulance stations positioned to serve both urban and rural LGAs.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-lift bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-soft text-left space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-primary-navy/5 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-heading font-extrabold text-base text-primary-navy">
                  {item.title}
                </h3>
                <p className="text-muted-text text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- STATISTICS SECTION ----------------- */}
      <section
        ref={statsSectionRef}
        className="py-20 bg-gradient-to-br from-primary-navy to-[#051F3D] text-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-2">
              <div className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-emergency-red tracking-tight">
                {stats.ambulances}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-300 font-semibold">
                Ambulance Units
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <div className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                {stats.personnel}+
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-300 font-semibold">
                Emergency Personnel
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <div className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-emergency-blue tracking-tight">
                {stats.communities}+
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-300 font-semibold">
                Communities Served
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2">
              <div className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-emerald-400 tracking-tight">
                {stats.responses}+
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-gray-300 font-semibold">
                Emergency Responses
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- STRATEGIC PARTNERS ----------------- */}
      <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-text">
            Strategic Partners & Affiliates
          </h4>

          {/* Infinite Scroll Logo Container */}
          <div className="relative w-full overflow-hidden">
            <div className="flex w-[200%] gap-12 animate-carousel py-4 items-center">
              {/* Double up the list for infinite loops */}
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-48 h-16 bg-bg-gray rounded-xl flex items-center justify-center border border-gray-100 text-muted-text hover:text-primary-navy grayscale hover:grayscale-0 transition-all font-heading font-black tracking-widest text-sm"
                >
                  {partner.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- LEADERSHIP PREVIEW SECTION ----------------- */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-primary-navy">
              Our Leadership Team
            </h2>
            <p className="text-muted-text text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Dedicated professionals coordinating state resources to deliver swift, life-saving emergency care.
            </p>
          </div>

          {/* Leadership Message Card */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="card-lift bg-white rounded-3xl p-8 lg:p-12 border border-gray-150 shadow-soft relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-navy/5 rounded-full blur-3xl" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Coordinator Photo */}
                <div className="lg:col-span-4 relative flex justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-white">
                    <Image
                      src="/images/Dr%20Suraj%20Abdulkarim%20.jpg"
                      alt="Dr. Suraj Abdulkarim"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Message Copy */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="inline-flex items-center gap-1.5 text-emergency-red text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> Message from the State Coordinator
                  </div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy leading-tight">
                    &ldquo;Securing Health, Preserving Lives Across Every Community&rdquo;
                  </h3>
                  <div className="text-muted-text text-sm sm:text-base font-light leading-relaxed space-y-4">
                    <p>
                      &ldquo;At Gombe State SEMSAS, our mandate is defined by urgency and guided by compassion. Emergency situations demand more than speed; they demand integrated systems, specialized expertise, and standardized care protocols. We are dedicated to ensuring that no Gombe citizen loses their life due to delays in referral transit or lack of pre-hospital clinical care.&rdquo;
                    </p>
                    <p>
                      &ldquo;Through our collaborative partnerships with the Federal Ministry of Health, NEMSAS, and first-responder allies like the FRSC, we are setting up a comprehensive shield for all travelers and residents. We thank you for your trust and support as we continue expanding our stations to serve you better.&rdquo;
                    </p>
                  </div>
                  <div className="pt-2">
                    <h5 className="font-heading font-extrabold text-base text-primary-navy">Dr. Suraj Abdulkarim</h5>
                    <p className="text-xs text-muted-text">State Coordinator, Gombe State SEMSAS</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- LATEST NEWS ----------------- */}
      <section id="newsevents" className="py-24 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 text-left max-w-4xl mx-auto">
            <div className="space-y-3">
              <span className="section-tag section-tag-red">
                Media Center
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-navy">
                Latest News & Announcements
              </h2>
            </div>
            <a
              href="#newsevents"
              className="btn btn-dark px-5 py-3 text-sm"
            >
              View All News
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {newsItems.map((news, idx) => (
              <div
                key={idx}
                className="card-lift bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-150 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary-navy text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Emergency Update
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-muted-text font-medium">{news.date}</span>
                    <h3 className="font-heading font-extrabold text-base text-primary-navy leading-snug group-hover:text-emergency-red transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-muted-text text-xs leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                  </div>
                  <div className="pt-2">
                    <a
                      href="#newsevents"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-navy group-hover:text-emergency-red transition-colors"
                    >
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- CALL TO ACTION (CTA) ----------------- */}
      <section className="relative py-24 bg-primary-navy text-white overflow-hidden">
        {/* Cinematic Heartbeat line backdrop svg */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center z-0">
          <svg
            className="w-full h-40 stroke-white stroke-[2] fill-none animate-pulse-slow"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path d="M0,50 L200,50 L210,30 L220,70 L230,20 L240,80 L250,50 L400,50 L410,10 L420,90 L430,40 L440,60 L450,50 L1000,50" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="w-16 h-16 rounded-full bg-emergency-red/20 border border-emergency-red/40 text-emergency-red flex items-center justify-center mx-auto mb-4 animate-heartbeat">
            <Heart className="w-8 h-8 fill-emergency-red" />
          </div>
          
          <div className="space-y-4">
            <h2 className="font-heading font-black text-3xl sm:text-5xl">
              Need Emergency Medical Assistance?
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Our trained emergency dispatchers and paramedical ambulance crews are standing by 24/7 to rescue and deliver high-quality, life-saving pre-hospital care.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="tel:07033825646"
              className="btn btn-red w-full sm:w-auto px-8 py-4"
            >
              <Phone className="w-5 h-5 fill-white" />
              Call Emergency: 0703 382 5646
            </a>
            <a
              href="#contact"
              className="btn btn-ghost w-full sm:w-auto px-8 py-4"
            >
              Contact SEMSAS Office
            </a>
          </div>
        </div>
      </section>

      {/* ----------------- CONTACT SECTION (FORM & DETAILS) ----------------- */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="section-tag">
                  Get In Touch
                </span>
                <h2 className="font-heading font-black text-3xl text-primary-navy">
                  Contact SEMSAS
                </h2>
                <p className="text-muted-text text-sm leading-relaxed">
                  For administrative inquiries, partner relationships, training information, and suggestions.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-navy/5 text-primary-navy flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-primary-navy">Headquarters</h5>
                    <p className="text-muted-text text-xs">Gombe State Ministry of Health Complex, Gombe, Gombe State, Nigeria.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emergency-red/5 text-emergency-red flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-primary-navy">Inquiries Hotline</h5>
                    <p className="text-muted-text text-xs">Admin Line: +234 (0) 803 000 0000 (Placeholder)</p>
                    <p className="text-emergency-red text-xs font-bold mt-0.5">Emergency Triage: Dial 0703 382 5646</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emergency-blue/5 text-emergency-blue flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-primary-navy">Official Email</h5>
                    <p className="text-muted-text text-xs">info@semsas.gm.gov.ng (Placeholder)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-150 shadow-soft">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary-navy" htmlFor="name">Full Name</label>
                    <input
                      className="w-full bg-bg-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-navy focus:bg-white focus:ring-4 focus:ring-primary-navy/10 transition-all"
                      type="text"
                      id="name"
                      placeholder="e.g. Ibrahim Yusuf"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary-navy" htmlFor="email">Email Address</label>
                    <input
                      className="w-full bg-bg-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-navy focus:bg-white focus:ring-4 focus:ring-primary-navy/10 transition-all"
                      type="email"
                      id="email"
                      placeholder="e.g. ibrahim@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary-navy" htmlFor="subject">Subject</label>
                  <input
                    className="w-full bg-bg-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-navy focus:bg-white focus:ring-4 focus:ring-primary-navy/10 transition-all"
                    type="text"
                    id="subject"
                    placeholder="How can we assist you?"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary-navy" htmlFor="message">Message</label>
                  <textarea
                    className="w-full bg-bg-gray border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-navy focus:bg-white focus:ring-4 focus:ring-primary-navy/10 transition-all min-h-[120px]"
                    id="message"
                    placeholder="Write details of your inquiries here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-full py-3.5 text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>



      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 bg-emergency-red hover:bg-red-700 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emergency-red"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 stroke-[3]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
