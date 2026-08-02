"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Download, Search, Filter, FileText, Globe, Eye, HelpCircle } from "lucide-react";

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

export default function DownloadsPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
      <section className="relative py-20 bg-primary-navy text-white text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emergency-blue/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Downloads</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Resources & Downloads
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Access official Gombe State SEMSAS policy booklets, operational guidelines, and training sheets.
          </p>
        </div>
      </section>

      {/* Main Interactive Downloads Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-bg-gray border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary-navy"
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
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary-navy text-white"
                      : "bg-bg-gray text-muted-text border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-bg-gray rounded-3xl p-6 border border-gray-150 flex flex-col justify-between hover:shadow-md transition-shadow min-h-[240px] text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emergency-blue bg-white px-2.5 py-1 rounded-md border border-gray-100 shadow-sm">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-muted-text font-bold">
                        {doc.format} &bull; {doc.size}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-150">
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
                      onClick={() => alert(`Opening web viewer for ${doc.title}`)}
                      className="flex items-center justify-center gap-1.5 bg-white hover:bg-primary-navy hover:text-white border border-gray-200 text-primary-navy font-bold py-2.5 rounded-xl transition-colors text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Online
                    </button>
                    
                    <button
                      onClick={() => alert(`Downloading placeholder: ${doc.title}`)}
                      className="flex items-center justify-center gap-1.5 bg-primary-navy hover:bg-emergency-red text-white font-bold py-2.5 rounded-xl transition-colors text-xs"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 bg-white border border-gray-150 rounded-3xl flex flex-col items-center justify-center space-y-4 text-center p-6">
                <FileText className="w-12 h-12 text-gray-300" />
                <h4 className="font-heading font-extrabold text-lg text-primary-navy">No matching documents</h4>
                <p className="text-xs text-muted-text max-w-sm">Try typing different search keywords or selecting another category.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
