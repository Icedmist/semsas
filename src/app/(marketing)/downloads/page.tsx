"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Search, Filter, FileText, Eye } from "lucide-react";
import PageHero from "@/components/PageHero";
import { stagger, fadeUpItem, fadeUp, scaleIn } from "@/lib/motion-variants";

interface ResourceDoc {
  id: string;
  title: string;
  category: string;
  size: string;
  format: string;
  version: string;
  pubDate: string;
  desc: string;
}

const categories = [
  "All",
  "Emergency Guides",
  "Policies",
  "Annual Reports",
  "Referral Forms",
  "First Aid Materials",
  "Training Manuals",
  "Public Awareness Materials",
  "Strategic Plans",
  "Emergency Contact Cards"
];

const documents: ResourceDoc[] = [
  {
    id: "1",
    title: "SEMSAS Emergency Preparedness Guide",
    category: "Emergency Guides",
    size: "2.4 MB",
    format: "PDF",
    version: "v2.1",
    pubDate: "August 2026",
    desc: "An informational handbook detailing how to handle trauma scenes and coordinate during natural disasters."
  },
  {
    id: "2",
    title: "State First Aid Manual & Basic Life Support",
    category: "First Aid Materials",
    size: "4.8 MB",
    format: "PDF",
    version: "v1.4",
    pubDate: "July 2026",
    desc: "Step-by-step clinical directions for administering CPR, managing choking, and stopping bleeding before an ambulance arrives."
  },
  {
    id: "3",
    title: "Hospital Emergency Referral Handover Form",
    category: "Referral Forms",
    size: "820 KB",
    format: "PDF",
    version: "v3.0",
    pubDate: "July 2026",
    desc: "Official medical referral sheets used during patient handovers between community health posts and specialist centers."
  },
  {
    id: "4",
    title: "Gombe State Emergency Contact Pocket Card",
    category: "Emergency Contact Cards",
    size: "1.1 MB",
    format: "PDF",
    version: "v1.1",
    pubDate: "July 2026",
    desc: "Printable card containing toll-free dial coordinates, dispatch protocols, and SEMA rescue extensions."
  },
  {
    id: "5",
    title: "Public Health Safety & Awareness Booklet",
    category: "Public Awareness Materials",
    size: "3.5 MB",
    format: "PDF",
    version: "v1.0",
    pubDate: "July 2026",
    desc: "Materials distributed across Gombe communities to educate families on ambulance triage criteria."
  },
  {
    id: "6",
    title: "SEMSAS Gombe Chapter Annual Review Report",
    category: "Annual Reports",
    size: "1.8 MB",
    format: "PDF",
    version: "v2025",
    pubDate: "June 2026",
    desc: "A review of dispatcher stats, response times, regional coverage expansions, and state health budget audits."
  },
  {
    id: "7",
    title: "Gombe SEMSAS Strategic Expansion Plan (2026 - 2030)",
    category: "Strategic Plans",
    size: "5.2 MB",
    format: "PDF",
    version: "v1.0",
    pubDate: "May 2026",
    desc: "The roadmap for establishing ambulance stations across all northern and southern local government zones."
  },
  {
    id: "8",
    title: "State Operational Ambulance Triage Protocol Policy",
    category: "Policies",
    size: "2.1 MB",
    format: "PDF",
    version: "v2.0",
    pubDate: "March 2026",
    desc: "Standard operating policy manual regulating clinical patient criteria, consent, and transit procedures."
  }
];

/**
 * The Downloads portal page component.
 * Allows users to browse, search, and download public documents and materials.
 */
export default function DownloadsPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering Logic
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Section */}
      <PageHero
        title="Resources & Downloads"
        subtitle="Access official Gombe State SEMSAS policy booklets, operational guidelines, and training sheets."
        crumb="Downloads"
      />

      {/* Main Interactive Downloads Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Controls Bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="field pl-10!"
                type="text"
                placeholder="Search resources by title, keyword, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-2 scrollbar-none">
              <span className="text-xs font-bold text-primary-navy flex items-center gap-1.5 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter Category:
              </span>
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedCategory === cat
                      ? "bg-primary-navy text-white"
                      : "bg-bg-gray text-muted-text border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Documents Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <motion.div
                  key={doc.id}
                  variants={fadeUpItem}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[240px] text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emergency-blue bg-bg-gray px-2.5 py-1 rounded-md border border-slate-200/80 shadow-sm">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-muted-text font-bold">
                        {doc.format} &bull; {doc.size}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bg-gray flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-200/80">
                        <FileText className="w-5 h-5 text-primary-navy" />
                      </div>
                      <div>
                        <h4 className="font-heading font-extrabold text-sm text-primary-navy leading-snug">
                          {doc.title}
                        </h4>
                        <p className="text-[10px] text-muted-text mt-0.5">
                          Version: {doc.version} | Published: {doc.pubDate}
                        </p>
                        <p className="text-muted-text text-xs leading-relaxed font-light mt-2 line-clamp-2">
                          {doc.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-gray-200/60">
                    <button
                      onClick={() => {
                        // Create a simple PDF download (placeholder implementation)
                        const link = document.createElement('a');
                        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Document: ${doc.title}\nVersion: ${doc.version}\nSize: ${doc.size}\nFormat: ${doc.format}\n\nThis is a placeholder document.`)}`;
                        link.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="flex items-center justify-center gap-1.5 bg-white hover:bg-primary-navy hover:text-white hover:border-primary-navy border border-slate-200/80 text-primary-navy font-bold py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Online
                    </button>

                    <button
                      onClick={() => {
                        // Trigger PDF download (for now creates a simple text file)
                        const link = document.createElement('a');
                        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`${doc.title}\n\nVersion: ${doc.version}\nPublished: ${doc.pubDate}\n\n${doc.desc}`)}`;
                        link.download = `${doc.title.replace(/\s+/g, '_')}_${doc.version}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="btn btn-dark py-2.5 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={scaleIn}
                className="col-span-full py-16 bg-white border border-slate-200/80 rounded-3xl flex flex-col items-center justify-center space-y-4 text-center p-6"
              >
                <FileText className="w-12 h-12 text-gray-300" />
                <h4 className="font-heading font-extrabold text-lg text-primary-navy">No matching documents</h4>
                <p className="text-xs text-muted-text max-w-sm">Try typing different search keywords or selecting another category.</p>
              </motion.div>
            )}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
