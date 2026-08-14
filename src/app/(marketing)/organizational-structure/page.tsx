"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ShieldAlert,
  Building,
  Radio,
  Truck,
  HeartPulse,
  Share2,
  ChevronDown,
  Info
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

interface StructureNode {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

export default function OrganizationalStructure() {
  const [activeNode, setActiveNode] = useState<string | null>("gombe");

  const hierarchy: StructureNode[] = [
    {
      id: "federal",
      name: "Federal Ministry of Health & Social Welfare",
      subtitle: "National Policy Director",
      desc: "Sets the national guidelines, regulatory frameworks, and provides policy funding and standards integration for health sector emergency responses across Nigeria.",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "nemsas",
      name: "National Emergency Medical Services and Ambulance System (NEMSAS)",
      subtitle: "National Coordinating Body",
      desc: "Coordinates national-scale rollout, resource guidelines, federal funding allocation, and sets baseline emergency operational KPI standards.",
      icon: <ShieldAlert className="w-5 h-5" />
    },
    {
      id: "gombe",
      name: "Gombe State SEMSAS",
      subtitle: "State Governing Chapter",
      desc: "Manages state operations, executes emergency healthcare budgets locally, coordinates regional centers, and enforces state emergency responder protocols.",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: "dispatch",
      name: "Emergency Communication & Dispatch Centre",
      subtitle: "Operational Nerve Centre",
      desc: "Handles incoming emergency calls on 0703 382 5646, identifies patient locations, conducts remote triaging, and allocates response teams.",
      icon: <Radio className="w-5 h-5" />
    },
    {
      id: "ambulance",
      name: "Emergency Ambulance Operations",
      subtitle: "First Responders",
      desc: "Executes dispatch directions, deploys ambulances to emergency scenes, administers pre-hospital clinical treatment, and preserves life in transit.",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: "hospitals",
      name: "Receiving Health Facilities",
      subtitle: "Clinical Care Partners",
      desc: "Standardized state and local government clinics/hospitals pre-alerted by dispatch to receive, stabilize, and finalize emergency trauma patient treatment.",
      icon: <HeartPulse className="w-5 h-5" />
    },
    {
      id: "partners",
      name: "Strategic Emergency Partners",
      subtitle: "Collaborating Services",
      desc: "Includes joint operations with FRSC, Fire Service, NPF, and SEMA during road traffic accidents, fires, and mass casualty disasters.",
      icon: <Share2 className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-bg-gray">
      <PageHero
        title="Organizational Structure"
        subtitle="How emergency medical services are coordinated from the national level down to communities in Gombe State."
        crumb="Organization"
      />

      {/* Interactive Org Chart Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-3">
            <span className="section-tag">
              Interactive Flowchart
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              SEMSAS Coordination Hierarchy
            </h2>
            <p className="text-muted-text text-xs sm:text-sm">
              Click on any node to expand and view the clinical and operational responsibilities of each level.
            </p>
          </div>

          {/* Connected Cards Hierarchy Column */}
          <div className="relative flex flex-col items-center space-y-6">

            {hierarchy.map((node, index) => (
              <React.Fragment key={node.id}>
                {/* Connecting Line */}
                {index > 0 && (
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary-navy to-emergency-red opacity-30" />
                )}

                {/* Node Card */}
                <div className="w-full max-w-xl">
                  <button
                    onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                    className={`group w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      activeNode === node.id
                        ? "bg-[#0A2A52] text-white border-transparent shadow-lg"
                        : "bg-white border-slate-200/80 text-primary-navy hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeNode === node.id ? "bg-white/10 text-white" : "bg-primary-navy/5 text-primary-navy"
                      }`}>
                        {node.icon}
                      </div>
                      <div>
                        <h4 className="font-heading font-extrabold text-sm sm:text-base leading-tight">
                          {node.name}
                        </h4>
                        <p className={`text-[10px] sm:text-xs font-semibold ${
                          activeNode === node.id ? "text-gray-300" : "text-muted-text"
                        }`}>
                          {node.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {activeNode === node.id ? (
                        <ChevronDown className="w-5 h-5 text-emergency-red" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-navy" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Description Panel */}
                  <AnimatePresence>
                    {activeNode === node.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-x border-b border-slate-200/80 rounded-b-2xl p-5 -mt-2 text-xs sm:text-sm text-muted-text leading-relaxed font-light flex gap-3 shadow-sm">
                          <Info className="w-4 h-4 text-emergency-red flex-shrink-0 mt-0.5" />
                          <p>{node.desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </React.Fragment>
            ))}

          </div>

        </div>
      </section>

      {/* Responsibilities Grid */}
      <section className="py-24 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

          <div className="max-w-2xl mx-auto space-y-3">
            <span className="section-tag section-tag-red">
              Operational Matrix
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              Organizational Responsibilities
            </h2>
            <p className="text-muted-text text-xs sm:text-sm">
              Functional duties separated across governmental levels to ensure maximum delivery speed.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* National Level */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.18)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-primary-navy/5 text-primary-navy flex items-center justify-center mb-6 group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-primary-navy mb-3">Federal & Policy Level</h3>
              <p className="text-muted-text text-xs sm:text-sm leading-relaxed font-light">
                Responsible for drafting the legislative ambulance frameworks, setting diagnostic guidelines, allocating core national health intervention grants, and evaluating state-level compliance.
              </p>
            </motion.div>

            {/* State Coordination */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.18)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emergency-blue/5 text-emergency-blue flex items-center justify-center mb-6 group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-primary-navy mb-3">State Governance Level</h3>
              <p className="text-muted-text text-xs sm:text-sm leading-relaxed font-light">
                Reviews operational statistics, sets localized response time KPIs, manages ambulance maintenance contracts, audits receiving hospitals, and handles strategic recruitment of clinicians.
              </p>
            </motion.div>

            {/* Field Operations */}
            <motion.div variants={fadeUpItem} className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.18)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emergency-red/5 text-emergency-red flex items-center justify-center mb-6 group-hover:scale-105 group-hover:-rotate-3 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-primary-navy mb-3">Community Field Operations</h3>
              <p className="text-muted-text text-xs sm:text-sm leading-relaxed font-light">
                Handles immediate calls, conducts first-aid instructions via phone, operates clinical vehicles, stabilizes patients, and completes patient handover sheets at medical structures.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}