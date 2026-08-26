"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import LeaderTeamCard from "@/components/LeaderTeamCard";

const leadershipTeam = [
  {
    name: "Dr. Bello Abdulkadir",
    role: "Head of SEMSAS Admin (Administrative Officer)",
    bio: "Responsible for providing effective administrative, logistical, human resource and operational support to ensure the smooth and efficient functioning of SEMSAS.",
    email: "admin@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Dr Bello Abdulkadir Head of SEMSAS Admin.jpg",
  },
  {
    name: "Dr. Maspara Gideon",
    role: "Head of Claims",
    bio: "Coordinates and manages claims and reimbursement processes, ensuring proper documentation, verification, and timely processing.",
    email: "claims@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Dr Maspara Gideon Head of Claim.jpg",
  },
  {
    name: "Halima Musa Miyabe",
    role: "Head of Monitoring and Evaluation",
    bio: "Oversees monitoring and evaluation to ensure quality, performance, and continuous improvement in emergency medical service delivery.",
    email: "me@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Halima Musa Miyabe Head of Monitoring & Evaluation.jpg",
  },
  {
    name: "Muhammad Sanusi Ahmad",
    role: "Strategic Information",
    bio: "Manages strategic information, data analytics, and reporting to guide evidence-based decision-making and digital transformation for SEMSAS.",
    email: "si@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Muhammad Sanusi Ahmad Strategic Information.jpg",
  },
  {
    name: "SEMSAS ICT Focal Person",
    role: "ICT Focal Person",
    bio: "Coordinates, manages and strengthens the information and communication technology systems supporting SEMSAS operations, ensuring robust digital emergency response systems.",
    email: "ict@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/ICT Focal Person.jpg",
  }
];
import {
  Phone,
  MapPin,
  Heart,
  Shield,
  Activity,
  ArrowRight,
  Truck,
  Users,
  BookOpen,
  Flame,
  FileText,
  ChevronUp,
  ShieldCheck,
  UserCheck,
  Mail,
  Siren,
  Zap,
  BadgeCheck,
} from "lucide-react";

// Scroll-reveal animation variants
const EASE = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Homepage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Track scroll for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats counting animation simulation
  const [stats, setStats] = useState({
    ambulances: 0,
    personnel: 0,
    communities: 0,
    responses: 0,
  });

  const [heroTargets, setHeroTargets] = useState({
    ambulances: 25,
    personnel: 180,
    communities: 110,
    responses: 4500,
  });

  const heroTargetsRef = useRef(heroTargets);

  useEffect(() => {
    heroTargetsRef.current = heroTargets;
  }, [heroTargets]);

  useEffect(() => {
    fetch("/api/live-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data?.hero) {
          setHeroTargets(data.hero);
        }
      })
      .catch(() => {
        // fall back to default targets
      });
  }, []);

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
              ambulances: Math.floor(progress * heroTargetsRef.current.ambulances),
              personnel: Math.floor(progress * heroTargetsRef.current.personnel),
              communities: Math.floor(progress * heroTargetsRef.current.communities),
              responses: Math.floor(progress * heroTargetsRef.current.responses),
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
      date: "Aug 1, 2026",
      category: "Network Expansion",
      excerpt: "In a bid to ensure rapid emergency healthcare delivery, Gombe State SEMSAS has deployed additional ambulance units to Kaltungo and Balanga LGAs.",
      image: "/images/hero-ambulance.jpg",
    },
    {
      title: "Gombe State Paramedics Complete Intensive Advanced Trauma Training",
      date: "Jul 24, 2026",
      category: "Training",
      excerpt: "Forty emergency care professionals have successfully completed specialized training in advanced trauma support conducted by international facilitators.",
      image: "/images/about-personnel.jpg",
    },
    {
      title: "SEMSAS Response Time Decreases to Record Lows Across Gombe Metropolis",
      date: "Jul 12, 2026",
      category: "Milestone",
      excerpt: "A new dispatch optimization system integrated into the 0703 382 5646 emergency hotline has successfully slashed response times by 18% in the metropolitan area.",
      image: "/images/hero-bg.jpg",
    },
  ];

  const services = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Emergency Ambulance Services",
      desc: "Equipped vehicles stationed in key regions for rapid response and transport.",
      accent: "bg-red-50 text-emergency-red group-hover:bg-emergency-red group-hover:text-white",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Pre-Hospital Emergency Care",
      desc: "Immediate stabilization and critical trauma treatment by certified responders.",
      accent: "bg-blue-50 text-primary-navy group-hover:bg-primary-navy group-hover:text-white",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Emergency Dispatch System",
      desc: "Dedicated emergency routing on 0703 382 5646 with smart tracking to allocate the closest ambulance unit.",
      accent: "bg-blue-50 text-primary-navy group-hover:bg-primary-navy group-hover:text-white",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Patient Transportation",
      desc: "Comfortable, safe, and medically supervised transfers between health facilities.",
      accent: "bg-blue-50 text-primary-navy group-hover:bg-primary-navy group-hover:text-white",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Road Traffic Crash Response",
      desc: "Active joint operations with FRSC to deliver fast trauma care on major Gombe highways.",
      accent: "bg-blue-50 text-primary-navy group-hover:bg-primary-navy group-hover:text-white",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Emergency Medical Training",
      desc: "Regular clinical instruction and emergency drills for state medical technicians.",
      accent: "bg-blue-50 text-primary-navy group-hover:bg-primary-navy group-hover:text-white",
    },
  ];

  const howItWorks = [
    { icon: <Phone className="w-6 h-6" />, num: 1, title: "Call Hotline", desc: "Dial 0703 382 5646 immediately." },
    { icon: <FileText className="w-6 h-6" />, num: 2, title: "Verify Details", desc: "Dispatcher verifies coordinates and triage state." },
    { icon: <MapPin className="w-6 h-6" />, num: 3, title: "Assign Unit", desc: "Closest active ambulance team is selected." },
    { icon: <Truck className="w-6 h-6" />, num: 4, title: "Rapid Dispatch", desc: "Paramedics depart under siren guidance." },
    { icon: <Activity className="w-6 h-6" />, num: 5, title: "Stabilization", desc: "Medical crew administers care on-site." },
    { icon: <ShieldCheck className="w-6 h-6" />, num: 6, title: "Hospital Transit", desc: "Patient is safely transported to the hospital." },
  ];

  const whyUs = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Response Time",
      desc: "Optimized dispatch algorithms ensure our ambulances get to you in minimal time.",
      accent: "bg-red-50 text-emergency-red",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Professional Teams",
      desc: "Manned by certified EMTs and trauma care specialists trained under national regulations.",
      accent: "bg-blue-50 text-primary-navy",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Modern Ambulance Fleet",
      desc: "Equipped with diagnostic monitors, oxygen support, and critical care medication.",
      accent: "bg-blue-50 text-primary-navy",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Statewide Coverage",
      desc: "Strategic emergency ambulance stations positioned to serve both urban and rural LGAs.",
      accent: "bg-blue-50 text-primary-navy",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900 selection:bg-emergency-red/20 selection:text-emergency-red overflow-x-hidden">
      {/* ----------------- HERO SECTION ----------------- */}
      <section
        id="home"
        ref={heroRef}
        className="relative pt-36 pb-28 sm:pt-44 sm:pb-36 overflow-hidden bg-[#0A2A52]"
      >
        {/* Ambient glows */}
        <div className="absolute -top-40 right-[-10%] w-[42rem] h-[42rem] bg-[#2F80ED]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[34rem] h-[34rem] bg-emergency-red/15 rounded-full blur-[140px] pointer-events-none" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_70%_at_60%_20%,black,transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-9 text-left">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-xs font-semibold text-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency-red"></span>
                </span>
                Live emergency response · 24/7
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-6"
              >
                <h1 className="font-heading font-black text-5xl sm:text-6xl xl:text-[4.5rem] leading-[1.04] tracking-tight text-white">
                  Emergency care,{" "}
                  <span className="bg-gradient-to-r from-[#6FB7FF] via-[#4DA3FF] to-[#2F80ED] bg-clip-text text-transparent">
                    on the way to you.
                  </span>
                </h1>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
                  Gombe State&apos;s 24-hour ambulance and pre-hospital care network, serving every
                  community across all 11 LGAs.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="tel:07033825646"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-emergency-red px-8 py-4 text-sm font-bold text-white shadow-[0_16px_40px_-12px_rgba(220,20,60,0.65)] transition-all duration-300 hover:bg-[#b01030] hover:-translate-y-0.5 group"
                >
                  <Siren className="w-5 h-5 group-hover:animate-pulse" />
                  Call 0703 382 5646
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Quick stats strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="pt-2"
              >
                <div className="flex items-center divide-x divide-white/10">
                  <div className="pr-8">
                    <div className="font-heading font-black text-2xl text-white tabular-nums">25<span className="text-emergency-red">+</span></div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-white/50 font-bold">Ambulances</div>
                  </div>
                  <div className="px-8">
                    <div className="font-heading font-black text-2xl text-white tabular-nums">11</div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-white/50 font-bold">LGAs Covered</div>
                  </div>
                  <div className="pl-8">
                    <div className="font-heading font-black text-2xl text-white tabular-nums">24/7</div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-white/50 font-bold">Rapid Response</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* HERO RIGHT COLUMN */}
            <motion.div
              style={{ y: heroImageY }}
              className="lg:col-span-6 relative flex justify-center items-center w-full min-h-[400px] lg:min-h-[500px]"
            >
              {/* Backing decorative glow and tech elements */}
              <div className="absolute inset-10 rounded-[3rem] bg-gradient-to-br from-[#2F80ED]/40 via-transparent to-emergency-red/25 blur-3xl opacity-80 pointer-events-none" />
              
              {/* Decorative Tech Rings */}
              <div className="absolute -inset-4 border border-white/5 rounded-[2.5rem] pointer-events-none hidden sm:block animate-[spin_120s_linear_infinite]" />
              <div className="absolute -inset-12 border border-dashed border-white/5 rounded-[3.5rem] pointer-events-none hidden sm:block animate-[spin_180s_linear_infinite]" />

              {/* Main Image Container with Angled Glassmorphism Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative w-full aspect-[16/10] rounded-[2.2rem] overflow-hidden border border-white/10 shadow-[0_45px_100px_-30px_rgba(0,0,0,0.85)] z-20 group hover:border-white/20 transition-all duration-500"
              >
                <Image
                  src="/images/white-ambulance.jpg"
                  alt="Gombe SEMSAS Modern White Ambulance"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A52]/90 via-[#0A2A52]/20 to-transparent pointer-events-none" />

                {/* Bottom Bar: Live Dispatch Status */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-transparent border-t border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                      </span>
                      <div>
                        <span className="text-white font-heading font-black text-xs uppercase tracking-wider block">GPS Dispatch Active</span>
                        <span className="text-white/60 text-[9px] uppercase tracking-widest font-bold block mt-0.5">Real-time Telemetry Connected</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 1: Response Metrics Card */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                className="absolute -bottom-6 -left-4 sm:-left-8 z-30 max-w-[200px] sm:max-w-[220px]"
              >
                <div className="rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/10 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emergency-red/20 flex items-center justify-center text-emergency-red">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Avg. Response</div>
                      <div className="font-heading font-black text-sm text-white mt-0.5">Under 12 Mins</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 2: 100% Coverage Badge */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                className="absolute -top-6 -right-2 sm:-right-8 z-30"
              >
                <div className="flex items-center gap-3 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:border-white/20 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-heading font-black text-xs text-white">Statewide Coverage</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/50 font-bold mt-0.5">11 LGAs · Gombe State</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- EMERGENCY INFO BAR ----------------- */}
      <section id="emergencyinfo" className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Card 1: Emergency Numbers */}
          <motion.div
            variants={fadeUpItem}
            className="bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center text-emergency-red flex-shrink-0">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white mb-1">Emergency Numbers</h3>
              <p className="text-sm text-white/60 mb-3">Toll-free dispatch open 24/7 statewide</p>
              <a
                href="tel:07033825646"
                className="inline-block bg-emergency-red px-3.5 py-1.5 rounded-lg text-sm font-extrabold tracking-wide text-white shadow-sm hover:bg-[#b01030] transition-colors"
              >
                Call: 0703 382 5646
              </a>
            </div>
          </motion.div>

          {/* Card 2: Coverage */}
          <motion.div
            variants={fadeUpItem}
            className="bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-[#4DA3FF] flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white mb-1">Statewide Coverage</h3>
              <p className="text-sm text-white/60 mb-3">Serving all Local Government Areas in Gombe State</p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-white/10 text-white border border-white/10 px-2.5 py-1 rounded-lg">11 LGAs</span>
                <span className="bg-white/10 text-white border border-white/10 px-2.5 py-1 rounded-lg">24/7 Operations</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Promise */}
          <motion.div
            variants={fadeUpItem}
            className="bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-[#4DA3FF] flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white mb-1">Our Core Promise</h3>
              <p className="text-sm text-white/60 mb-3">Professional, swift, and highly compassionate service</p>
              <p className="text-xs font-heading font-black text-emerald-400 uppercase tracking-widest">
                We respond. We care. We save lives.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ----------------- ABOUT PREVIEW SECTION ----------------- */}
      <section id="about" className="py-24 sm:py-28 bg-gradient-to-b from-blue-50/30 via-white to-blue-50/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_60px_-30px_rgba(8,47,91,0.35)] ring-1 ring-slate-900/10">
                <Image
                  src="/images/about-personnel.jpg"
                  alt="SEMSAS Emergency Paramedics Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Success Indicator */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-blue-50/95 backdrop-blur border border-blue-200/60 p-4 rounded-2xl shadow-[0_20px_50px_-15px_rgba(8,47,91,0.25)] flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-navy flex-shrink-0">
                  <BadgeCheck className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="font-heading font-black text-xs text-slate-900">NEMSAS INTEGRATED</div>
                  <div className="text-xs text-slate-500 mt-0.5">Aligned with National Emergency standards.</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Copy */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <motion.div
                variants={fadeUpItem}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-navy"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emergency-red animate-ping" />
                About GoSEMSAS
              </motion.div>
              <motion.h2
                variants={fadeUpItem}
                className="font-heading font-black text-3xl sm:text-4xl lg:text-[2.75rem] text-slate-900 leading-tight"
              >
                Coordinating rapid emergency care across Gombe State
              </motion.h2>
              <motion.p variants={fadeUpItem} className="text-slate-600 text-base sm:text-lg leading-relaxed">
                The Gombe State Emergency Medical Services and Ambulance System (SEMSAS) is the localized
                implementation of the National Emergency Medical Services and Ambulance System (NEMSAS). We
                bridge the gap between emergency occurrences and medical institutions, ensuring that every
                citizen gets medical transport and stabilizer care when they need it most.
              </motion.p>
              <motion.p variants={fadeUpItem} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Through our strategic network of emergency units, trained dispatch handlers, and skilled
                paramedics, we ensure coordinated pre-hospital care and rapid transit. We operate directly
                within the communities, securing health outcomes for families and accident victims in real-time.
              </motion.p>

              <motion.div variants={fadeUpItem} className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-navy px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-primary-deep hover:-translate-y-0.5"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#emergencyinfo"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-primary-navy hover:text-primary-navy hover:bg-slate-50"
                >
                  Emergency Procedures
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- MISSION & VISION ----------------- */}
      <section className="relative py-24 sm:py-28 bg-[#0A2A52] overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-[#2F80ED]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-24 w-[30rem] h-[30rem] bg-emergency-red/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          >
            <div className="max-w-xl space-y-4">
              <motion.div
                variants={fadeUpItem}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
                Our Guiding Purpose
              </motion.div>
              <motion.h2
                variants={fadeUpItem}
                className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight"
              >
                Mission &amp; Vision
              </motion.h2>
            </div>
            <motion.p variants={fadeUpItem} className="text-sm text-white/50 max-w-xs leading-relaxed">
              The principles that drive every ambulance dispatch, every rescue, and every life we protect.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Mission Card */}
            <motion.div
              variants={fadeUpItem}
              className="relative rounded-[28px] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 sm:p-12 overflow-hidden group transition-all duration-500 hover:border-[#2F80ED]/50 hover:shadow-[0_30px_80px_-30px_rgba(47,128,237,0.5)]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F80ED] to-transparent" />
              <div className="absolute top-6 right-8 font-heading font-black text-7xl sm:text-8xl text-white/[0.06] leading-none select-none pointer-events-none group-hover:text-[#2F80ED]/20 transition-colors duration-500">
                01
              </div>

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#2F80ED]/20 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Activity className="w-8 h-8 text-[#7CB8FF]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#7CB8FF] font-bold">Statement 01</span>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">Our Mission</h3>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    Deliver rapid, coordinated, and high-quality emergency medical services that improve
                    survival rates and medical health outcomes for all residents and visitors across Gombe State.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-[#2F80ED]/60 to-transparent" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Every Second Counts</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fadeUpItem}
              className="relative rounded-[28px] bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 sm:p-12 overflow-hidden group transition-all duration-500 hover:border-emergency-red/50 hover:shadow-[0_30px_80px_-30px_rgba(220,20,60,0.45)]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emergency-red to-transparent" />
              <div className="absolute top-6 right-8 font-heading font-black text-7xl sm:text-8xl text-white/[0.06] leading-none select-none pointer-events-none group-hover:text-emergency-red/20 transition-colors duration-500">
                02
              </div>

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-emergency-red/20 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Shield className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-red-400 font-bold">Statement 02</span>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">Our Vision</h3>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    A Gombe State where every person has timely access to professional emergency medical care
                    whenever and wherever it is needed, minimizing preventable casualties.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-emergency-red/60 to-transparent" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">No Life Left Behind</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- OUR SERVICES SECTION ----------------- */}
      <section id="services" className="relative py-28 bg-gradient-to-b from-blue-50/20 via-white to-blue-50/20 overflow-hidden">
        {/* Soft decorative background glow */}
        <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT PANEL: Sticky Heading & Operations Widget */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-5 text-left"
              >
                <motion.div
                  variants={fadeUpItem}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-emergency-red"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
                  What We Do
                </motion.div>
                <motion.h2
                  variants={fadeUpItem}
                  className="font-heading font-black text-3xl sm:text-4xl text-slate-900 leading-tight"
                >
                  Comprehensive emergency response services
                </motion.h2>
                <motion.p variants={fadeUpItem} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Providing standardized pre-hospital and medical emergency services across communities in Gombe State.
                </motion.p>
              </motion.div>

              {/* Interactive Telemetry Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-2xl border border-white/10 p-5 text-left shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Operations Room</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-[#4DA3FF] font-bold">24/7 Monitored</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">Dispatch Nodes</span>
                    <span className="text-white font-mono font-bold">ACTIVE (11 LGAs)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">Response Protocol</span>
                    <span className="text-white font-mono font-bold">LEVEL-1 PRIORITY</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT PANEL: Staggered Cards Grid */}
            <div className="lg:col-span-8">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpItem}
                    className="group relative card-premium-blue rounded-3xl p-8 text-left flex flex-col justify-between min-h-[250px] overflow-hidden"
                  >
                    <div className="relative space-y-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${service.accent}`}>
                        {service.icon}
                      </div>
                      <div className="space-y-2.5">
                        <h3 className="font-heading font-extrabold text-lg text-slate-900">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                    <div className="relative pt-5 mt-5 border-t border-slate-200/50">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-navy transition-all duration-300 group-hover:gap-3 group-hover:text-emergency-red"
                      >
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- HOW EMERGENCY RESPONSE WORKS ----------------- */}
      <section className="relative py-24 sm:py-28 bg-gradient-to-b from-blue-50/40 via-white to-blue-50/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <motion.div
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-navy"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary-navy" />
              Lifeline Protocol
            </motion.div>
            <motion.h2
              variants={fadeUpItem}
              className="font-heading font-black text-3xl sm:text-4xl text-slate-900"
            >
              How emergency response works
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-slate-600 text-sm sm:text-base">
              A structured, real-time medical workflow designed to optimize speed and patient care.
            </motion.p>
          </motion.div>

          {/* Desktop Timeline Grid (6 Columns) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden lg:grid grid-cols-6 gap-6 relative"
          >
            <div className="absolute top-[42px] left-[8%] right-[8%] h-px bg-slate-200/80 z-0" />

            {howItWorks.map((step, idx) => (
              <motion.div key={idx} variants={fadeUpItem} className="relative z-10 flex flex-col items-center group">
                <div className="relative">
                  <div className="w-[84px] h-[84px] rounded-2xl bg-[#F4F8FD] border border-blue-100 shadow-[0_8px_24px_-12px_rgba(8,47,91,0.15)] flex items-center justify-center text-primary-navy transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-primary-navy/30 group-hover:text-emergency-red group-hover:shadow-[0_20px_40px_-16px_rgba(8,47,91,0.35)]">
                    {step.icon}
                  </div>
                  <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-primary-navy border-2 border-[#F4F8FD] flex items-center justify-center font-heading font-extrabold text-xs text-white shadow-md">
                    {step.num}
                  </span>
                </div>
                <div className="mt-6 space-y-1.5">
                  <h4 className="font-heading font-bold text-sm tracking-wide text-slate-900 group-hover:text-primary-navy transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-[140px] mx-auto leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Vertical Timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:hidden space-y-8 text-left max-w-md mx-auto relative pl-6 border-l border-slate-200"
          >
            {howItWorks.map((step, idx) => (
              <motion.div key={idx} variants={fadeUpItem} className="relative space-y-2 group">
                <div className="absolute -left-[42px] top-0 w-8 h-8 rounded-xl bg-[#F4F8FD] border border-blue-100 flex items-center justify-center text-primary-navy shadow-sm group-hover:text-emergency-red group-hover:border-primary-navy/30 transition-colors">
                  {step.icon}
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900 pt-0.5">
                  <span className="text-primary-navy font-extrabold mr-2">{step.num}.</span>
                  {step.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------- WHY CHOOSE SEMSAS ----------------- */}
      <section className="py-24 sm:py-28 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <motion.div
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-navy"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
              Our Strengths
            </motion.div>
            <motion.h2
              variants={fadeUpItem}
              className="font-heading font-black text-3xl sm:text-4xl text-slate-900"
            >
              Why choose Gombe SEMSAS
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-slate-600 text-sm sm:text-base">
              A healthcare delivery program built on reliability, advanced response technology, and professionalism.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyUs.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="bg-[#F8FBFF]/90 rounded-3xl border border-blue-100/50 p-8 shadow-[0_4px_20px_-12px_rgba(8,47,91,0.08)] hover:shadow-[0_24px_50px_-15px_rgba(47,128,237,0.15)] hover:border-[#2F80ED]/30 hover:bg-[#F2F7FD]/95 text-left space-y-4 transition-all duration-500 hover:-translate-y-1.5 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${item.accent}`}>
                  {item.icon}
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------- STATISTICS SECTION ----------------- */}
      <section ref={statsSectionRef} className="relative py-24 sm:py-28 bg-[#0A2A52] overflow-hidden">
        <div className="absolute -top-32 right-0 w-[26rem] h-[26rem] bg-emergency-red/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 left-0 w-[26rem] h-[26rem] bg-[#2F80ED]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl mx-auto text-center space-y-4 mb-14"
          >
            <motion.div
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
              Impact by the numbers
            </motion.div>
            <motion.h2
              variants={fadeUpItem}
              className="font-heading font-black text-3xl sm:text-4xl text-white"
            >
              Building a statewide safety net
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            {/* Stat 1 */}
            <motion.div
              variants={fadeUpItem}
              className="group relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-8 lg:p-10 text-center hover:border-white/30 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="font-heading font-black text-4xl sm:text-5xl text-white tabular-nums">
                {stats.ambulances}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/60 font-bold">
                Ambulance Units
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              variants={fadeUpItem}
              className="group relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-8 lg:p-10 text-center hover:border-[#2F80ED]/60 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="font-heading font-black text-4xl sm:text-5xl text-gradient-blue tabular-nums">
                {stats.personnel}<span className="text-3xl">+</span>
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/60 font-bold">
                Emergency Personnel
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              variants={fadeUpItem}
              className="group relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-8 lg:p-10 text-center hover:border-white/30 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="font-heading font-black text-4xl sm:text-5xl text-white tabular-nums">
                {stats.communities}<span className="text-3xl">+</span>
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/60 font-bold">
                Communities Served
              </div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              variants={fadeUpItem}
              className="group relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-8 lg:p-10 text-center hover:border-emergency-red/50 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="font-heading font-black text-4xl sm:text-5xl text-gradient-red tabular-nums">
                {stats.responses}<span className="text-3xl">+</span>
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/60 font-bold">
                Emergency Responses
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- STRATEGIC PARTNERS ----------------- */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-blue-50/20 overflow-hidden border-b border-blue-100/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-xl mx-auto space-y-3"
          >
            <motion.div
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-navy"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
              Trusted Network
            </motion.div>
            <motion.h4
              variants={fadeUpItem}
              className="font-heading font-black text-2xl sm:text-3xl text-slate-900"
            >
              Strategic partners &amp; affiliates
            </motion.h4>
            <motion.p variants={fadeUpItem} className="text-slate-500 text-sm leading-relaxed">
              Working hand-in-hand with government agencies and first-responder allies to build a statewide safety net.
            </motion.p>
          </motion.div>

          {/* Infinite Scroll Logo Container */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-full overflow-hidden"
          >
            <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-[200%] gap-6 animate-carousel py-4 items-center">
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={idx}
                  title={partner.name}
                  className="group flex-shrink-0 w-52 h-20 rounded-2xl bg-[#F4F8FD] border border-blue-100/50 hover:border-primary-navy/25 shadow-sm hover:shadow-md flex items-center justify-center gap-3 grayscale hover:grayscale-0 transition-all duration-500 hover:-translate-y-1"
                >
                  <span className="font-heading font-black tracking-widest text-base text-slate-500 group-hover:text-primary-navy transition-colors">
                    {partner.text}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emergency-red transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- LEADERSHIP PREVIEW SECTION ----------------- */}
      <section className="relative py-24 sm:py-28 bg-[#0A2A52] overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[26rem] h-[26rem] bg-[#2F80ED]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-[26rem] h-[26rem] bg-emergency-red/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="max-w-2xl space-y-4">
              <motion.div
                variants={fadeUpItem}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
                Command &amp; Leadership
              </motion.div>
              <motion.h2
                variants={fadeUpItem}
                className="font-heading font-black text-3xl sm:text-5xl text-white leading-tight"
              >
                Our leadership team
              </motion.h2>
              <motion.p variants={fadeUpItem} className="text-white/50 text-sm sm:text-base max-w-xl leading-relaxed">
                Dedicated professionals coordinating state resources to deliver swift, life-saving emergency care.
              </motion.p>
            </div>
            <motion.a
              variants={fadeUpItem}
              href="/leadership"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 shrink-0"
            >
              Meet the full team
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Leadership Spotlight Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative rounded-[32px] bg-white/[0.05] backdrop-blur-xl border border-white/10 overflow-hidden group shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emergency-red via-primary-navy to-[#2F80ED] z-20" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Photo — full-bleed column */}
              <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[440px]">
                <Image
                  src="/images/Dr%20Suraj%20Abdulkarim%20.jpg"
                  alt="Dr. Suraj Abdulkarim"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A52]/95 via-[#0A2A52]/20 to-transparent" />

                {/* Nameplate */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 px-5 py-4">
                    <h5 className="font-heading font-extrabold text-lg text-white">Dr. Suraj Abdulkarim</h5>
                    <p className="text-[11px] uppercase tracking-widest text-white/60 font-bold mt-1">
                      State Coordinator · Gombe State SEMSAS
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote content */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-emergency-red text-xs font-bold uppercase tracking-wider bg-emergency-red/10 border border-emergency-red/20 px-4 py-2 rounded-full w-fit">
                  <UserCheck className="w-4 h-4" /> Message from the State Coordinator
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-[2.4rem] text-white leading-tight mt-5">
                  &ldquo;Securing health, preserving lives across every community&rdquo;
                </h3>
                <div className="mt-6 space-y-4">
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    At Gombe State SEMSAS, our mandate is defined by urgency and guided by compassion.
                    Emergency situations demand more than speed; they demand integrated systems, specialized
                    expertise, and standardized care protocols. We are dedicated to ensuring that no Gombe
                    citizen loses their life due to delays in referral transit or lack of pre-hospital
                    clinical care.
                  </p>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    Through our collaborative partnerships with the Federal Ministry of Health, NEMSAS, and
                    first-responder allies like the FRSC, we are setting up a comprehensive shield for all
                    travelers and residents across the state.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-emergency-red to-[#b01030] flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-white text-white" />
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-white/40 font-bold">
                      Every second counts
                    </span>
                  </div>
                  <a
                    href="/leadership"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7CB8FF] hover:text-white transition-colors"
                  >
                    Read full leadership profile <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Leadership Team Members */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12"
          >
            {leadershipTeam.map((leader, idx) => (
              <LeaderTeamCard key={idx} leader={leader} idx={idx} variant="dark" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------- LATEST NEWS ----------------- */}
      <section id="newsevents" className="relative py-24 sm:py-28 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div className="max-w-2xl space-y-4">
              <motion.div
                variants={fadeUpItem}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-emergency-red"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
                Media Center
              </motion.div>
              <motion.h2
                variants={fadeUpItem}
                className="font-heading font-black text-3xl sm:text-4xl text-slate-900"
              >
                Latest news &amp; announcements
              </motion.h2>
              <motion.p variants={fadeUpItem} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Stay informed on the latest dispatches, training milestones, and statewide emergency response developments.
              </motion.p>
            </div>
            <motion.a
              variants={fadeUpItem}
              href="#newsevents"
              className="inline-flex items-center gap-2 rounded-full bg-primary-navy px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-primary-deep hover:-translate-y-0.5 shrink-0"
            >
              View all news
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {newsItems.map((news, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_-12px_rgba(8,47,91,0.12)] hover:shadow-[0_30px_60px_-30px_rgba(8,47,91,0.35)] hover:border-slate-300 flex flex-col transition-all duration-500 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur text-slate-700 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emergency-red animate-pulse" />
                    {news.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-[11px] font-bold text-slate-700 px-3 py-1.5 rounded-full shadow-sm">
                    {news.date}
                  </div>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 leading-snug line-clamp-2 group-hover:text-primary-navy transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href="#newsevents"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-navy group-hover:gap-3.5 transition-all duration-300 group-hover:text-emergency-red"
                    >
                      Read full article <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------- CALL TO ACTION (CTA) ----------------- */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-[36px] bg-gradient-to-br from-[#0A2A52] via-[#0B2E5B] to-[#0A2A52] text-white overflow-hidden"
          >
            {/* Subtle grid + glows */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-[26rem] h-[26rem] bg-emergency-red/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-[26rem] h-[26rem] bg-[#2F80ED]/20 rounded-full blur-[120px] pointer-events-none" />

            <motion.div variants={fadeUpItem} className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 text-center space-y-10">
              <motion.div variants={fadeUpItem} className="relative mx-auto w-fit">
                <div className="relative w-16 h-16 rounded-full bg-white/10 ring-1 ring-white/20 flex items-center justify-center animate-heartbeat">
                  <Heart className="w-7 h-7 fill-emergency-red text-emergency-red" />
                </div>
              </motion.div>

              <motion.div variants={fadeUpItem} className="space-y-4">
                <h2 className="font-heading font-black text-3xl sm:text-5xl leading-tight">
                  Need emergency <span className="text-emergency-red">medical</span> assistance?
                </h2>
                <p className="text-white/70 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Our trained emergency dispatchers and paramedical ambulance crews are standing by 24/7 to
                  rescue and deliver high-quality, life-saving pre-hospital care.
                </p>
              </motion.div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                <a
                  href="tel:07033825646"
                  className="inline-flex items-center gap-2.5 rounded-full bg-emergency-red px-8 py-4 text-sm font-bold text-white shadow-[0_16px_40px_-12px_rgba(220,20,60,0.6)] transition-all duration-300 hover:bg-[#b01030] hover:-translate-y-0.5 group"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                  </span>
                  Call Emergency: 0703 382 5646
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                >
                  Contact SEMSAS Office
                </a>
              </div>

              <motion.div
                variants={fadeUpItem}
                className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 pt-2 text-[11px] text-white/50 font-semibold uppercase tracking-widest"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available 24/7
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F80ED]" /> All 11 LGAs Covered
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" /> Free First 48h Stabilization
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- CONTACT SECTION (FORM & DETAILS) ----------------- */}
      <section id="contact" className="relative py-24 sm:py-28 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Contact details */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-5 space-y-10"
            >
              <motion.div variants={fadeUpItem} className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-navy">
                  <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
                  Get In Touch
                </div>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
                  Contact SEMSAS
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  For administrative inquiries, partner relationships, training information, and suggestions.
                </p>
              </motion.div>

              <div className="space-y-4">
                <motion.div variants={fadeUpItem} className="group flex items-start gap-4 bg-white rounded-2xl border border-slate-200/80 hover:border-primary-navy/25 shadow-sm hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary-navy flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-slate-900">Headquarters</h5>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Gombe State Ministry of Health Complex, Gombe, Gombe State, Nigeria.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUpItem} className="group flex items-start gap-4 bg-white rounded-2xl border border-slate-200/80 hover:border-emergency-red/25 shadow-sm hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-emergency-red flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-slate-900">Inquiries Hotline</h5>
                    <p className="text-slate-500 text-xs mt-1">Admin Line: +234 (0) 803 000 0000 (Placeholder)</p>
                    <p className="text-emergency-red text-xs font-bold mt-1.5">Emergency Triage: Dial 0703 382 5646</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUpItem} className="group flex items-start gap-4 bg-white rounded-2xl border border-slate-200/80 hover:border-[#2F80ED]/25 shadow-sm hover:shadow-md p-5 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary-navy flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-sm text-slate-900">Official Email</h5>
                    <p className="text-slate-500 text-xs mt-1">info@semsas.gm.gov.ng (Placeholder)</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative rounded-[28px] bg-slate-50 p-8 sm:p-10 border border-slate-200/80 shadow-[0_20px_60px_-30px_rgba(8,47,91,0.3)] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-navy via-emergency-red to-primary-navy" />
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700" htmlFor="name">Full Name</label>
                      <input
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-primary-navy focus:ring-4 focus:ring-primary-navy/10 transition-all"
                        type="text"
                        id="name"
                        placeholder="e.g. Ibrahim Yusuf"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700" htmlFor="email">Email Address</label>
                      <input
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-primary-navy focus:ring-4 focus:ring-primary-navy/10 transition-all"
                        type="email"
                        id="email"
                        placeholder="e.g. ibrahim@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700" htmlFor="subject">Subject</label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-primary-navy focus:ring-4 focus:ring-primary-navy/10 transition-all"
                      type="text"
                      id="subject"
                      placeholder="How can we assist you?"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700" htmlFor="message">Message</label>
                    <textarea
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-primary-navy focus:ring-4 focus:ring-primary-navy/10 transition-all min-h-[120px]"
                      id="message"
                      placeholder="Write details of your inquiries here..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-primary-navy py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary-deep hover:-translate-y-0.5 group"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </motion.div>
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
            className="fixed bottom-6 right-6 z-40 bg-primary-navy hover:bg-primary-deep text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-navy"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 stroke-[3]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
