"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PlusCircle,
  HelpCircle,
  AlertTriangle,
  HeartPulse,
  Info,
  ChevronDown,
  Activity,
  Flame,
  Shield,
  MapPin,
  Clock,
  Compass
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function EmergencyInformation() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const emergencyContacts = [
    { name: "Emergency Line", phone: "0703 382 5646", subtitle: "Primary Emergency Dispatch (24/7)", icon: <Phone className="w-6 h-6 text-white" />, color: "bg-emergency-red shadow-[0_0_15px_rgba(214,40,40,0.3)]" },
    { name: "Ambulance Hotline", phone: "0703 382 5646", subtitle: "Direct Ambulance Dispatch", icon: <Phone className="w-6 h-6 text-white" />, color: "bg-emergency-blue" },
    { name: "State SEMA", phone: "+234 803 123 4567", subtitle: "Disaster Operations", icon: <Activity className="w-6 h-6 text-white" />, color: "bg-primary-navy" },
    { name: "Federal Road Safety (FRSC)", phone: "122", subtitle: "Highway Crash Alerts", icon: <Compass className="w-6 h-6 text-white" />, color: "bg-orange-500" },
    { name: "Federal Fire Service", phone: "112", subtitle: "Fire and Triage Support", icon: <Flame className="w-6 h-6 text-white" />, color: "bg-red-600" },
    { name: "Nigerian Police Force", phone: "999", subtitle: "Security Dispatch Partner", icon: <Shield className="w-6 h-6 text-white" />, color: "bg-slate-700" }
  ];

  const callTriggers = [
    { title: "Severe Chest Pain", desc: "Signs of cardiac arrest or cardiovascular distress." },
    { title: "Difficulty Breathing", desc: "Asthma attacks, choking, or respiratory failure." },
    { title: "Road Traffic Accidents", desc: "Trauma and physical injuries from vehicular collisions." },
    { title: "Severe Bleeding", desc: "Arterial cuts or internal bleeding that cannot be slowed down." },
    { title: "Stroke Symptoms", desc: "Sudden facial drooping, arm weakness, or slurred speech." },
    { title: "Unconscious Patient", desc: "Non-responsive victims or severe diabetic collapses." },
    { title: "Labour Emergencies", desc: "Maternal trauma or child delivery emergencies." },
    { title: "Poisoning", desc: "Chemical ingestion or severe toxic exposure reactions." },
    { title: "Burn Injuries", desc: "Second or third-degree thermal or chemical burns." },
    { title: "Mass Casualty Incidents", desc: "Disasters involving multiple injured persons." }
  ];

  const safetySteps = [
    { num: 1, title: "Stay Calm", desc: "Assess the situation quickly to avoid further risk." },
    { num: 2, title: "Call Emergency Services", desc: "Dial 0703 382 5646 and speak clearly to the operator." },
    { num: 3, title: "Share Your Location", desc: "Give nearby landmarks, street names, or LGA details." },
    { num: 4, title: "Do Not Move Patients", desc: "Avoid moving spine/neck trauma victims unless there is immediate danger (e.g., fire)." },
    { num: 5, title: "Follow Instructions", desc: "The dispatcher will guide you through first-aid triage steps over the phone." },
    { num: 6, title: "Keep Airway Clear", desc: "If the patient is unconscious but breathing, place them in the recovery position." },
    { num: 7, title: "Wait Safely", desc: "Clear pathways so paramedics can access the scene instantly." }
  ];

  const faqs: FAQItem[] = [
    {
      q: "When should I call SEMSAS?",
      a: "You should call SEMSAS during life-threatening medical emergencies, including road accidents, severe trauma, sudden unconsciousness, heart attacks, stroke, or maternal labour complications."
    },
    {
      q: "Is the service available 24/7?",
      a: "Yes. Gombe State SEMSAS operates 24 hours a day, 7 days a week, 365 days a year, including all public holidays."
    },
    {
      q: "Who can request an ambulance?",
      a: "Any resident or visitor in Gombe State can request an ambulance. You can call on behalf of yourself, a relative, or a stranger in distress."
    },
    {
      q: "What information should I provide to the dispatcher?",
      a: "Please provide your exact location (with landmarks if possible), details of what happened, the number of casualties, the patient's approximate age, and whether they are conscious and breathing."
    },
    {
      q: "Is the ambulance service free?",
      a: "Under the NEMSAS guidelines, primary emergency response and stabilization care for the first 48 hours are subsidized for patients in Gombe State to ensure immediate rescue."
    },
    {
      q: "Can SEMSAS transfer patients between hospitals?",
      a: "Yes. SEMSAS coordinates clinical patient referrals between hospitals when authorized by medical practitioners to ensure safe transport with paramedic monitoring."
    },
    {
      q: "How long does a response take?",
      a: "Response times depend on coordinates, road traffic, and weather. We dispatch the closest ambulance to ensure response time remains as low as possible."
    },
    {
      q: "What areas of Gombe State are covered?",
      a: "SEMSAS operates across all 11 Local Government Areas in Gombe State, including both urban metropolitan sectors and rural settlements."
    }
  ];

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <section className="relative py-20 bg-primary-navy text-white text-center overflow-hidden hero-banner">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emergency-red/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Emergency Information</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Emergency Information
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Know what to do during a medical emergency to save precious seconds and preserve lives.
          </p>
        </div>
      </section>

      {/* Emergency Contacts Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="section-tag section-tag-red">
              Dial Lines
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              Emergency Hotlines
            </h2>
            <p className="text-muted-text text-xs sm:text-sm">
              Keep these numbers noted. Toll-free numbers do not require call credit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-bg-gray rounded-3xl p-6 border border-gray-150 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl ${contact.color} flex items-center justify-center flex-shrink-0`}>
                  {contact.icon}
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-primary-navy leading-tight">
                    {contact.name}
                  </h4>
                  <p className="text-[10px] text-muted-text mb-2 font-semibold">{contact.subtitle}</p>
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-base sm:text-lg font-black text-primary-navy hover:text-emergency-red transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* When to Call an Ambulance */}
      <section className="py-24 bg-bg-gray border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="section-tag">
              Triage Rules
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              When to Call an Ambulance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {callTriggers.map((trigger, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between group hover:border-emergency-red transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emergency-red/5 text-emergency-red flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-extrabold text-xs sm:text-sm text-primary-navy mb-1.5 leading-snug">
                  {trigger.title}
                </h4>
                <p className="text-[11px] text-muted-text leading-relaxed font-light">
                  {trigger.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* What To Do Before Help Arrives */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3">
            <span className="section-tag">
              First-Aid Steps
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              What To Do Before Help Arrives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetySteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-bg-gray p-6 rounded-3xl border border-gray-150 flex flex-col justify-between min-h-[180px] hover:shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-navy text-white flex items-center justify-center font-heading font-bold text-xs">
                  {step.num}
                </div>
                <div className="mt-4">
                  <h4 className="font-heading font-extrabold text-sm text-primary-navy mb-1 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-muted-text leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-bg-gray border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="section-tag section-tag-red">
              FAQ
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-heading font-extrabold text-xs sm:text-sm text-primary-navy hover:text-emergency-red transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180 text-emergency-red" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-text font-light leading-relaxed border-t border-gray-50 flex gap-2">
                        <Info className="w-4 h-4 text-emergency-blue flex-shrink-0 mt-0.5" />
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
