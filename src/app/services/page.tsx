"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Phone,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function ServicesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as any } }
  };

  const services: ServiceItem[] = [
    {
      icon: <Truck className="w-6 h-6 text-emergency-red" />,
      title: "Emergency Ambulance Services",
      desc: "Deploying fully certified responder vehicles and clinical staff directly to patient locations."
    },
    {
      icon: <Radio className="w-6 h-6 text-emergency-blue" />,
      title: "Emergency Dispatch",
      desc: "Direct toll-free routing over 112 with modern caller tracking and immediate unit allocation."
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      title: "Pre-Hospital Emergency Care",
      desc: "Administration of basic and advanced cardiac and trauma life support on-site by paramedics."
    },
    {
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      title: "Road Traffic Crash Response",
      desc: "Fast deployment to Gombe highways in coordination with FRSC to administer trauma stabilization."
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6 text-purple-500" />,
      title: "Patient Referral Services",
      desc: "Securing coordinated clinical transport when transferring patients between public hospitals."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-600" />,
      title: "Disaster & Mass Casualty Response",
      desc: "Mobilizing strategic disaster protocols during major fires, floods, or public health emergencies."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: "Emergency Medical Training",
      desc: "Advanced clinical courses and operational instruction for Gombe State paramedics and dispatch staff."
    },
    {
      icon: <Bell className="w-6 h-6 text-amber-500" />,
      title: "Community Awareness",
      desc: "Public education programs detailing basic first aid steps and how to request emergency assistance."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Medical Event Coverage",
      desc: "Positioning standby ambulances and responder medical personnel at large state public events."
    },
    {
      icon: <Wrench className="w-6 h-6 text-cyan-600" />,
      title: "Fleet Management",
      desc: "Managing vehicle maintenance, regular mechanical safety checks, and absolute ambulance uptime."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-indigo-500" />,
      title: "Equipment Support",
      desc: "Ensuring all ambulances carry calibrated defibrillators, oxygen ports, and emergency pharmaceuticals."
    },
    {
      icon: <Network className="w-6 h-6 text-teal-500" />,
      title: "Hospital Coordination",
      desc: "Real-time communication with hospital emergency wards before patients arrive to guarantee readiness."
    }
  ];

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.jpg"
            alt="Ambulance arriving at Gombe Specialist Hospital"
            fill
            className="object-cover opacity-35 filter brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Services</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Our Services
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Providing professional, rapid pre-hospital emergency care and ambulance transit services.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-primary-navy/5 text-primary-navy px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
            Emergency Care Framework
          </div>
          <h2 className="font-heading font-black text-3xl text-primary-navy">
            Delivering Integrated Medical Response Statewide
          </h2>
          <p className="text-muted-text text-sm sm:text-base leading-relaxed font-light">
            Gombe State SEMSAS offers a fully integrated, state-funded response system. From call-taking and smart vehicle routing to emergency trauma procedures and pre-alerting hospital medical wards, we coordinate every link in the survival chain to safeguard public health.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emergency-red bg-emergency-red/5 px-3 py-1 rounded-full inline-block">
              Operational Scope
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              Clinical & Logistical Capabilities
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-gradient-to-br from-white to-slate-50/40 rounded-3xl p-8 shadow-[0_10px_30px_rgba(8,47,91,0.02)] border border-slate-100 hover:border-slate-200/80 hover:shadow-[0_20px_40px_rgba(8,47,91,0.06)] hover:translate-y-[-4px] transition-all duration-300 text-left group flex flex-col justify-between min-h-[240px]"
              >
                <div className="border-l-2 pl-4 border-l-slate-200 group-hover:border-l-emergency-red transition-colors duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-bg-gray border border-slate-100 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-extrabold text-base mb-2 text-primary-navy">
                    {service.title}
                  </h3>
                  <p className="text-muted-text text-xs leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
                <div className="pt-6 pl-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-navy hover:text-emergency-red transition-colors"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Workflow Section */}
      <section className="py-24 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emergency-red/10 rounded-full blur-[80px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emergency-red bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              Infographic Flow
            </span>
            <h2 className="font-heading font-black text-3xl">
              Our Patient Care Workflow
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              How SEMSAS operates behind the scenes from the moment an alert triggers.
            </p>
          </div>

          {/* Workflow Steps Carousel/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {[
              { num: "01", title: "Emergency Call", label: "Incident Reported" },
              { num: "02", title: "Dispatch Coordination", label: "Unit Selected" },
              { num: "03", title: "Ambulance Transit", label: "En-Route response" },
              { num: "04", title: "Stabilization Care", label: "Treating Patient" },
              { num: "05", title: "Hospital Transfer", label: "Safe Transit" },
              { num: "06", title: "Referral Handover", label: "Handover Sheet" }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 space-y-4 flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-primary-navy border-2 border-white/20 group-hover:border-emergency-red flex items-center justify-center font-heading font-black text-lg transition-all duration-300 shadow-md group-hover:scale-105">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-sm text-white group-hover:text-emergency-red transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    {step.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
