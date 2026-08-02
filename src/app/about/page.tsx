"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Activity,
  Compass,
  Award,
  Users,
  Target,
  FileText,
  Clock,
  Stethoscope,
  Briefcase,
  Zap,
  TrendingUp,
  UserCheck
} from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  const coreValues = [
    {
      icon: <Award className="w-6 h-6 text-emergency-red" />,
      title: "Professionalism",
      desc: "Upholding the highest clinical and operational standards in pre-hospital emergency care."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-navy" />,
      title: "Integrity",
      desc: "Operating with absolute transparency, honesty, and accountability to the public we serve."
    },
    {
      icon: <Heart className="w-6 h-6 text-emergency-blue" />,
      title: "Compassion",
      desc: "Delivering care with respect, dignity, empathy, and kindness to patients in distress."
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: "Rapid Response",
      desc: "Valuing every second as critical, optimizing dispatch protocols for swift intervention."
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      title: "Teamwork",
      desc: "Collaborating seamlessly across dispatchers, medical crews, and receiving hospitals."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      title: "Excellence",
      desc: "Striving for continuous improvement through regular responder drills and modern technologies."
    }
  ];

  const objectives = [
    { icon: <Clock className="w-5 h-5 text-emergency-red" />, text: "Deliver rapid emergency medical response statewide." },
    { icon: <Activity className="w-5 h-5 text-emergency-blue" />, text: "Coordinate ambulance services across all 11 LGAs." },
    { icon: <UserCheck className="w-5 h-5 text-emerald-500" />, text: "Strengthen the referral system between community clinics and state hospitals." },
    { icon: <Heart className="w-5 h-5 text-red-500" />, text: "Reduce preventable pre-hospital and traffic-related deaths." },
    { icon: <Stethoscope className="w-5 h-5 text-indigo-500" />, text: "Modernize public emergency healthcare access tools." },
    { icon: <Briefcase className="w-5 h-5 text-amber-500" />, text: "Build emergency response workforce clinical capacity." },
    { icon: <Compass className="w-5 h-5 text-purple-500" />, text: "Promote public emergency preparedness campaigns." },
    { icon: <Target className="w-5 h-5 text-cyan-500" />, text: "Provide strategic medical support during disasters and epidemics." }
  ];

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Nigerian Emergency Responders Assisting Patient"
            fill
            className="object-cover opacity-30 filter brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <nav className="text-xs sm:text-sm font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white">
            About Gombe State SEMSAS
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Delivering coordinated emergency medical services and ambulance response to save lives across Gombe State.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/images/about-personnel.jpg"
                  alt="SEMSAS Emergency Paramedics Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-primary-navy/5 text-primary-navy px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                Who We Are
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-navy">
                Establishing the Standard for Pre-Hospital Emergency Care
              </h2>
              <div className="text-muted-text text-sm sm:text-base space-y-4 leading-relaxed font-light">
                <p>
                  The Gombe State Emergency Medical Services and Ambulance System (SEMSAS) is the official state implementation of the National Emergency Medical Services and Ambulance System (NEMSAS). It is a vital initiative designed to manage public emergency response, ambulance logistics, pre-hospital life support, and referral networks across Gombe State.
                </p>
                <p>
                  We aim to bridge the critical gap between medical emergencies—such as road traffic accidents, trauma occurrences, maternal healthcare challenges, and sudden severe illnesses—and medical establishments. By mobilizing prompt dispatch systems and trained clinical personnel, SEMSAS ensures that patients are stabilized, cared for, and safely transitioned.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Side-by-Side */}
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

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary-navy bg-primary-navy/5 px-3 py-1 rounded-full inline-block">
              Our Foundations
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-navy">
              Core Values
            </h2>
            <p className="text-muted-text text-xs sm:text-sm">
              The fundamental principles that guide our emergency responders and operational dispatch team daily.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-bg-gray hover:bg-white p-8 rounded-3xl border border-gray-150 hover:shadow-lg transition-all duration-300 text-left space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-primary-navy/5 flex items-center justify-center shadow-sm">
                  {val.icon}
                </div>
                <h3 className="font-heading font-extrabold text-base text-primary-navy">
                  {val.title}
                </h3>
                <p className="text-muted-text text-xs leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-24 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emergency-blue/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emergency-red bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              Deliverables
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl">
              Strategic Objectives
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              Our clear milestones for expanding public healthcare emergency safety nets.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {objectives.map((obj, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="glass-panel border-white/10 p-6 rounded-2xl flex flex-col justify-between min-h-[160px] group hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-white group-hover:scale-105 transition-transform">
                  {obj.icon}
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-gray-200 group-hover:text-white transition-colors">
                  {obj.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
