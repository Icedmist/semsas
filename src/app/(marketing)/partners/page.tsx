"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

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
    <div className="bg-bg-gray">
      <PageHero
        title="Strategic Partners"
        subtitle="Working together across state and federal sectors to strengthen emergency medical systems."
        crumb="Partners"
      />

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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary-navy text-white shadow-[0_8px_20px_-8px_rgba(0,82,165,0.5)]"
                    : "bg-white text-muted-text border border-slate-200/80 hover:bg-slate-50 hover:text-primary-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6"
          >
            {filteredPartners.map((part) => (
              <motion.div
                key={part.id}
                variants={fadeUpItem}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.25)] hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between group min-h-[220px]"
              >
                <div className="space-y-4">
                  {/* Mock Logo Box */}
                  <div className="w-16 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center font-heading font-black text-primary-navy text-xs tracking-wider shadow-sm group-hover:border-primary-navy group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300">
                    {part.logoText}
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-primary-navy leading-snug group-hover:text-dark-navy transition-colors">
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

                <div className="pt-4 border-t border-slate-200/80 mt-4">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Redirecting to partner website...`); }}
                    className="btn btn-dark w-full text-xs px-4 py-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}