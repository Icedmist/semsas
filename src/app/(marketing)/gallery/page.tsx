"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video } from "lucide-react";
import PageHero from "@/components/PageHero";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  src: string;
  location: string;
  date: string;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Emergency Response",
    "Ambulances",
    "Training",
    "Community Outreach",
    "Events"
  ];

  const galleryItems: MediaItem[] = [
    {
      id: "g7",
      type: "image",
      title: "LGA Chairmen Advocacy & Engagement",
      category: "Community Outreach",
      src: "/images/news-advocacy-5.jpg",
      location: "Local Government Area",
      date: "August 2026"
    },
    {
      id: "g8",
      type: "image",
      title: "Advocacy Session for NURTW Drivers",
      category: "Community Outreach",
      src: "/images/news-advocacy-6.jpg",
      location: "Advocacy Hall",
      date: "August 2026"
    },
    {
      id: "g9",
      type: "image",
      title: "SEMSAS Control Room Launch Activities",
      category: "Events",
      src: "/images/news-launch-room-5.jpg",
      location: "Operations Headquarters",
      date: "August 2026"
    },
    {
      id: "g10",
      type: "image",
      title: "Call Triage & Telemetry Operations Setup",
      category: "Emergency Response",
      src: "/images/news-launch-room-8.jpg",
      location: "SEMSAS Room",
      date: "August 2026"
    },
    {
      id: "g11",
      type: "image",
      title: "Official Commissioning of Communications Headquarters",
      category: "Events",
      src: "/images/news-launch-room-9.jpg",
      location: "Operations Headquarters",
      date: "August 2026"
    },
    {
      id: "g12",
      type: "image",
      title: "First-Responders Coordination Group Review",
      category: "Training",
      src: "/images/gallery-new-1.jpg",
      location: "SEMSAS Center",
      date: "August 2026"
    },
    {
      id: "g13",
      type: "image",
      title: "Orientation Session for CEMTTOS Coordinators",
      category: "Training",
      src: "/images/news-orientation-cemttos-2.jpg",
      location: "Orientation Hall",
      date: "August 2026"
    },
    {
      id: "g14",
      type: "image",
      title: "CEMTTOS and NURTW Training Modules",
      category: "Training",
      src: "/images/news-orientation-cemttos-5.jpg",
      location: "Orientation Hall",
      date: "August 2026"
    },
    {
      id: "g15",
      type: "image",
      title: "Official Commissioning of State Ambulance Fleet",
      category: "Events",
      src: "/images/gallery-new-2.jpg",
      location: "State Health Complex",
      date: "August 2026"
    },
    {
      id: "g16",
      type: "image",
      title: "Decentralized Ambulance Fleet Inspection",
      category: "Ambulances",
      src: "/images/news-launch-ambulance-10.jpg",
      location: "State Health Complex",
      date: "August 2026"
    },
    {
      id: "g17",
      type: "image",
      title: "Ambulance Launching by Commissioner of Health",
      category: "Events",
      src: "/images/news-launch-ambulance-12.jpg",
      location: "State Health Complex",
      date: "August 2026"
    },
    {
      id: "g18",
      type: "image",
      title: "Community Sensitization with Pregnant Mothers",
      category: "Community Outreach",
      src: "/images/news-mothers-resmat-1.jpg",
      location: "Kwami LGA",
      date: "August 2026"
    },
    {
      id: "g19",
      type: "image",
      title: "Maternal Health Referral Campaign",
      category: "Community Outreach",
      src: "/images/gallery-new-3.jpg",
      location: "Kwami LGA",
      date: "August 2026"
    },
    {
      id: "g20",
      type: "image",
      title: "RESMAT Maternal Services Presentation",
      category: "Community Outreach",
      src: "/images/gallery-new-4.jpg",
      location: "Kwami LGA",
      date: "August 2026"
    },
    {
      id: "g21",
      type: "image",
      title: "Sensitization Campaign Group Photo",
      category: "Community Outreach",
      src: "/images/gallery-new-5.jpg",
      location: "Kwami LGA",
      date: "August 2026"
    },
    {
      id: "g22",
      type: "image",
      title: "Maternal Outreach Distribution Activities",
      category: "Community Outreach",
      src: "/images/gallery-new-6.jpg",
      location: "Kwami LGA",
      date: "August 2026"
    },
    {
      id: "g23",
      type: "image",
      title: "Mothers Engagement Session",
      category: "Community Outreach",
      src: "/images/gallery-new-7.jpg",
      location: "Kwami LGA",
      date: "August 2026"
    },
    {
      id: "g24",
      type: "image",
      title: "RESMAT Drivers and CEMTTOS Onboarding Forum",
      category: "Training",
      src: "/images/gallery-new-8.jpg",
      location: "Malam Sidi Center",
      date: "August 2026"
    },
    {
      id: "g25",
      type: "image",
      title: "Advocacy & Engagement with Community Leaders",
      category: "Community Outreach",
      src: "/images/gallery-advocacy-1.jpg",
      location: "Government Commissioning",
      date: "September 2026"
    },
    {
      id: "g26",
      type: "image",
      title: "Children Receiving Emergency Awareness",
      category: "Community Outreach",
      src: "/images/gallery-advocacy-2.jpg",
      location: "Community Center",
      date: "September 2026"
    },
    {
      id: "g27",
      type: "image",
      title: "Emergency Medical Services Officials Gathering",
      category: "Events",
      src: "/images/gallery-advocacy-3.jpg",
      location: "Government Complex",
      date: "September 2026"
    },
    {
      id: "g28",
      type: "image",
      title: "Commissioners and Officials Engagement",
      category: "Events",
      src: "/images/gallery-advocacy-4.jpg",
      location: "Government Headquarters",
      date: "September 2026"
    },
    {
      id: "g29",
      type: "image",
      title: "Leadership and Government Officials Meeting",
      category: "Events",
      src: "/images/gallery-advocacy-5.jpg",
      location: "State Administrative Building",
      date: "September 2026"
    },
    {
      id: "g30",
      type: "image",
      title: "SEMSAS Team Official Commissioning Ceremony",
      category: "Events",
      src: "/images/gallery-advocacy-6.jpg",
      location: "Government Complex",
      date: "September 2026"
    },
    {
      id: "g31",
      type: "image",
      title: "Community Health Officials and SEMSAS Staff",
      category: "Community Outreach",
      src: "/images/gallery-advocacy-7.jpg",
      location: "Health Administration Building",
      date: "September 2026"
    },
    {
      id: "g32",
      type: "image",
      title: "Government Officials and Emergency Services Team",
      category: "Events",
      src: "/images/gallery-advocacy-8.jpg",
      location: "Government Complex",
      date: "September 2026"
    },
    {
      id: "g33",
      type: "image",
      title: "State Leadership and SEMSAS Partnership",
      category: "Community Outreach",
      src: "/images/gallery-advocacy-9.jpg",
      location: "Government Administrative Center",
      date: "September 2026"
    },
    {
      id: "1",
      type: "image",
      title: "Southern Gombe Ambulance Deployment",
      category: "Ambulances",
      src: "/images/hero-ambulance.jpg",
      location: "Gombe Metropolis",
      date: "August 2026"
    },
    {
      id: "2",
      type: "image",
      title: "First-Aid CPR Demonstrations",
      category: "Community Outreach",
      src: "/images/news-hero.jpg",
      location: "Billiri LGA",
      date: "July 2026"
    },
    {
      id: "3",
      type: "image",
      title: "Paramedic Crew Handover Training",
      category: "Training",
      src: "/images/about-personnel.jpg",
      location: "SEMSAS Headquarters",
      date: "July 2026"
    },
    {
      id: "4",
      type: "image",
      title: "Advanced Emergency Dispatch Setup",
      category: "Emergency Response",
      src: "/images/hero-bg.jpg",
      location: "Operations Centre",
      date: "June 2026"
    },
    {
      id: "5",
      type: "image",
      title: "Ambulance Arrival at Specialist Hospital",
      category: "Emergency Response",
      src: "/images/services-hero.jpg",
      location: "State Specialist Hospital",
      date: "August 2026"
    },
    {
      id: "6",
      type: "image",
      title: "Field Responders Group Portrait",
      category: "Training",
      src: "/images/about-personnel.jpg",
      location: "Gombe Health Complex",
      date: "June 2026"
    }
  ];

  const videos: MediaItem[] = [
    {
      id: "v1",
      type: "video",
      title: "Basic Life Support Demonstration",
      category: "Training",
      src: "https://www.youtube.com/embed/placeholder1",
      location: "Gombe Hospital",
      date: "June 2026"
    },
    {
      id: "v2",
      type: "video",
      title: "SEMSAS Dispatch Centre Walkthrough",
      category: "Events",
      src: "https://www.youtube.com/embed/placeholder2",
      location: "Operations Complex",
      date: "May 2026"
    }
  ];

  // Filtering Logic
  const filteredPhotos = galleryItems.filter((item) => {
    return activeCategory === "All" || item.category === activeCategory;
  });

  const nextSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <PageHero
        title="Media Gallery"
        subtitle="Explore the activities, emergency responses, training sessions, ambulance fleet, and official events of Gombe State SEMSAS."
        crumb="Gallery"
        image="/images/hero-bg.jpg"
        imageAlt="SEMSAS Emergency operations"
      />

      {/* Tabs Selection (Photos / Videos) */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("photos")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "photos"
                ? "text-white"
                : "bg-bg-gray text-muted-text border border-slate-200/80 hover:bg-white"
            }`}
          >
            {activeTab === "photos" && (
              <motion.span
                layoutId="gallery-tab"
                className="absolute inset-0 rounded-xl bg-primary-navy shadow-md"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Photos Library</span>
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "videos"
                ? "text-white"
                : "bg-bg-gray text-muted-text border border-slate-200/80 hover:bg-white"
            }`}
          >
            {activeTab === "videos" && (
              <motion.span
                layoutId="gallery-tab"
                className="absolute inset-0 rounded-xl bg-primary-navy shadow-md"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2"><Video className="w-4 h-4" /> Video Room</span>
          </button>
        </div>
      </section>

      {/* Photos Library Tab */}
      {activeTab === "photos" && (
        <section className="py-16 bg-bg-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 py-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    activeCategory === cat
                      ? "bg-primary-navy text-white"
                      : "bg-white text-muted-text border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Pinterest Layout Image Grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filteredPhotos.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={fadeUpItem}
                  onClick={() => setLightboxIndex(idx)}
                  className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.25)] border border-slate-200/80 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden w-full aspect-[4/3] bg-gray-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary-navy text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4 text-left space-y-1">
                    <h4 className="font-heading font-extrabold text-sm text-primary-navy group-hover:text-emergency-red transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-muted-text font-semibold">
                      {item.location} &bull; {item.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>
      )}

      {/* Videos Tab */}
      {activeTab === "videos" && (
        <section className="py-16 bg-bg-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {videos.map((vid) => (
                <motion.div
                  key={vid.id}
                  variants={fadeUpItem}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.25)] border border-slate-200/80 hover:-translate-y-1 transition-all duration-300 text-left group"
                >
                  <div className="relative aspect-[16/9] w-full bg-slate-950 flex items-center justify-center">
                    {/* Embedded Mock Iframe Video Player */}
                    <div className="absolute inset-0 bg-primary-navy/40 flex items-center justify-center pointer-events-none z-10">
                      <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white scale-95 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                    <div className="w-full h-full bg-slate-900 border border-slate-800" />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emergency-blue bg-emergency-blue/5 border border-emergency-blue/15 px-2 py-0.5 rounded">
                        {vid.category}
                      </span>
                      <span className="text-[10px] text-muted-text font-semibold">{vid.date}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-primary-navy">
                      {vid.title}
                    </h3>
                    <p className="text-muted-text text-xs font-light">
                      Recorded live at: {vid.location}. Demonstrating vital pre-hospital emergency procedures.
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between p-6 select-none"
          >
            {/* Close and Actions Header */}
            <div className="flex justify-between items-center text-white">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Slider Controls and Image */}
            <div className="flex-1 flex items-center justify-between gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white focus:outline-none flex-shrink-0 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white focus:outline-none flex-shrink-0 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer text */}
            <div className="text-center text-white space-y-1">
              <h3 className="font-heading font-black text-lg">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                {filteredPhotos[lightboxIndex].location} &bull; {filteredPhotos[lightboxIndex].date} &bull; Category: {filteredPhotos[lightboxIndex].category}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
