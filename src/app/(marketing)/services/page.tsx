"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stagger, fadeUpItem } from "@/lib/motion-variants";
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

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function ServicesPage() {
  const services: ServiceItem[] = [
    {
      icon: <Truck className="w-6 h-6 text-emergency-red" />,
      title: "Emergency Ambulance Services",
      desc: "Deploying fully certified responder vehicles and clinical staff directly to patient locations."
    },
    {
      icon: <Radio className="w-6 h-6 text-emergency-blue" />,
      title: "Emergency Dispatch",
      desc: "Direct emergency routing over 0703 382 5646 with modern caller tracking and immediate unit allocation."
    },
    {
      icon: <Activity className="w-6 h-6 text-emergency-blue" />,
      title: "Pre-Hospital Emergency Care",
      desc: "Administration of basic and advanced cardiac and trauma life support on-site by paramedics."
    },
    {
      icon: <Flame className="w-6 h-6 text-emergency-red" />,
      title: "Road Traffic Crash Response",
      desc: "Fast deployment to Gombe highways in coordination with FRSC to administer trauma stabilization."
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6 text-primary-navy" />,
      title: "Patient Referral Services",
      desc: "Securing coordinated clinical transport when transferring patients between public hospitals."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emergency-red" />,
      title: "Disaster & Mass Casualty Response",
      desc: "Mobilizing strategic disaster protocols during major fires, floods, or public health emergencies."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emergency-blue" />,
      title: "Emergency Medical Training",
      desc: "Advanced clinical courses and operational instruction for Gombe State paramedics and dispatch staff."
    },
    {
      icon: <Bell className="w-6 h-6 text-primary-navy" />,
      title: "Community Awareness",
      desc: "Public education programs detailing basic first aid steps and how to request emergency assistance."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary-navy" />,
      title: "Medical Event Coverage",
      desc: "Positioning standby ambulances and responder medical personnel at large state public events."
    },
    {
      icon: <Wrench className="w-6 h-6 text-primary-navy" />,
      title: "Fleet Management",
      desc: "Managing vehicle maintenance, regular mechanical safety checks, and absolute ambulance uptime."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emergency-blue" />,
      title: "Equipment Support",
      desc: "Ensuring all ambulances carry calibrated defibrillators, oxygen ports, and emergency pharmaceuticals."
    },
    {
      icon: <Network className="w-6 h-6 text-emergency-blue" />,
      title: "Hospital Coordination",
      desc: "Real-time communication with hospital emergency wards before patients arrive to guarantee readiness."
    }
  ];

  return (
    <div className="pt-20 bg-bg-gray">
      <PageHero
        title="Our Services"
        subtitle="Providing professional, rapid pre-hospital emergency care and ambulance transit services."
        crumb="Services"
        image="/images/services-hero.jpg"
        imageAlt="Ambulance arriving at Gombe Specialist Hospital"
      />

      {/* Introduction */}
      <section className="py-24 bg-white">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <motion.div variants={fadeUpItem} className="section-tag">
            Emergency Care Framework
          </motion.div>
          <motion.h2
            variants={fadeUpItem}
            className="font-heading font-black text-3xl text-slate-900"
          >
            Delivering Integrated Medical Response Statewide
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="text-muted-text text-sm sm:text-base leading-relaxed font-light"
          >
            Gombe State SEMSAS offers a fully integrated, state-funded response system. From call-taking and smart vehicle routing to emergency trauma procedures and pre-alerting hospital medical wards, we coordinate every link in the survival chain to safeguard public health.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="text-center space-y-3"
          >
            <motion.span variants={fadeUpItem} className="section-tag section-tag-red">
              Operational Scope
            </motion.span>
            <motion.h2
              variants={fadeUpItem}
              className="font-heading font-black text-2xl sm:text-3xl text-slate-900"
            >
              Clinical & Logistical Capabilities
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="card-lift card-premium-blue rounded-3xl p-8 text-left group flex flex-col justify-between min-h-[240px]"
              >
                <div className="border-l-2 pl-4 border-l-slate-200 group-hover:border-l-emergency-red transition-colors duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
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
      <section className="py-24 bg-[#0A2A52] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emergency-red/10 rounded-full blur-[80px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <motion.span variants={fadeUpItem} className="section-tag section-tag-light">
              Infographic Flow
            </motion.span>
            <motion.h2 variants={fadeUpItem} className="font-heading font-black text-3xl">
              Our Patient Care Workflow
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-gray-300 text-xs sm:text-sm">
              How SEMSAS operates behind the scenes from the moment an alert triggers.
            </motion.p>
          </motion.div>

          {/* Workflow Steps Carousel/Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative"
          >
            {[
              { num: "01", title: "Emergency Call", label: "Incident Reported" },
              { num: "02", title: "Dispatch Coordination", label: "Unit Selected" },
              { num: "03", title: "Ambulance Transit", label: "En-Route response" },
              { num: "04", title: "Stabilization Care", label: "Treating Patient" },
              { num: "05", title: "Hospital Transfer", label: "Safe Transit" },
              { num: "06", title: "Referral Handover", label: "Handover Sheet" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpItem}
                className="relative z-10 space-y-4 flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#0A2A52] border-2 border-white/20 group-hover:border-emergency-red flex items-center justify-center font-heading font-black text-lg transition-all duration-300 shadow-md group-hover:scale-105">
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
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
