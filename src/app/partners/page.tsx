"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, HeartHandshake, Compass, Users2, ExternalLink } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  category: string;
  desc: string;
  logoText: string;
  featured?: boolean;
}

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Government",
    "Emergency Agencies",
    "Healthcare Institutions",
    "NGOs & Collaborators"
  ];

  const partners: Partner[] = [
    {
      id: "1",
      name: "Federal Ministry of Health & Social Welfare",
      category: "Government",
      desc: "Sets the national regulatory benchmarks and policy guidelines coordinating national healthcare initiatives.",
      logoText: "FMOH",
      featured: true
    },
    {
      id: "2",
      name: "National Emergency Medical Services & Ambulance System",
      category: "Emergency Agencies",
      desc: "National coordinating body facilitating grants, technical standards, and state implementation reviews.",
      logoText: "NEMSAS",
      featured: true
    },
    {
      id: "3",
      name: "Federal Road Safety Corps (FRSC)",
      category: "Emergency Agencies",
      desc: "Primary highway traffic monitoring agency collaborating during roadway vehicle crash triage setups.",
      logoText: "FRSC",
      featured: true
    },
    {
      id: "4",
      name: "National Emergency Management Agency",
      category: "Emergency Agencies",
      desc: "Federal agency addressing regional disasters, offering logistical support during major catastrophes.",
      logoText: "NEMA",
      featured: true
    },
    {
      id: "5",
      name: "Gombe State Emergency Management Agency",
      category: "Emergency Agencies",
      desc: "Coordinates state-level emergency response logistics, relief supplies, and joint operational planning.",
      logoText: "SEMA",
      featured: true
    },
    {
      id: "6",
      name: "Gombe State Specialist Hospital",
      category: "Healthcare Institutions",
      desc: "Primary referral destination in the state capital with specialized tertiary medical wards.",
      logoText: "GSSH",
      featured: true
    },
    {
      id: "7",
      name: "Nigerian Police Force (Gombe Command)",
      category: "Government",
      desc: "Provides situational security alerts and site protection boundaries during hazardous paramedic responses.",
      logoText: "NPF",
      featured: true
    },
    {
      id: "8",
      name: "Nigerian Red Cross Society",
      category: "NGOs & Collaborators",
      desc: "Assists Gombe State SEMSAS in coordinating local first aid drills and training volunteer responder units.",
      logoText: "Red Cross",
      featured: true
    }
  ];

  const filteredPartners = partners.filter((partner) => {
    return activeCategory === "All" || partner.category === activeCategory;
  });

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <section className="relative py-20 bg-primary-navy text-white text-center overflow-hidden hero-banner">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emergency-blue/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Partners</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Strategic Partners
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Working together across state and federal sectors to strengthen emergency medical systems.
          </p>
        </div>
      </section>

      {/* Featured / Grid Segment */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="section-tag">
              Affiliates Directory
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              Our Collaborative Networks
            </h2>
            <p className="text-muted-text text-xs sm:text-sm">
              SEMSAS integrates medical transport and municipal safety teams into a single operational interface.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center gap-2 py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary-navy text-white"
                    : "bg-bg-gray text-muted-text border border-gray-150 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
            {filteredPartners.map((part) => (
              <div
                key={part.id}
                className="bg-bg-gray border border-gray-150 rounded-3xl p-6 hover:shadow-md transition-shadow text-left flex flex-col justify-between group min-h-[220px]"
              >
                <div className="space-y-4">
                  {/* Mock Logo Box */}
                  <div className="w-16 h-12 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center font-heading font-black text-primary-navy text-xs tracking-wider shadow-sm group-hover:border-emergency-red transition-all">
                    {part.logoText}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-primary-navy leading-snug">
                      {part.name}
                    </h4>
                    <p className="text-[10px] text-emergency-blue font-bold uppercase mt-1">
                      {part.category}
                    </p>
                  </div>
                  <p className="text-muted-text text-xs font-light leading-relaxed">
                    {part.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/50 mt-4">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Redirecting to partner website...`); }}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-primary-navy hover:text-white border border-gray-200 text-primary-navy font-bold py-2 rounded-xl transition-all text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
