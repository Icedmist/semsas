"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video } from "lucide-react";

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
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="SEMSAS Emergency operations"
            fill
            className="object-cover opacity-20 filter brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Media Gallery
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Explore the activities, emergency responses, training sessions, ambulance fleet, and official events of Gombe State SEMSAS.
          </p>
        </div>
      </section>

      {/* Tabs Selection (Photos / Videos) */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "photos"
                ? "bg-primary-navy text-white"
                : "bg-bg-gray text-muted-text border border-gray-150"
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Photos Library
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "videos"
                ? "bg-primary-navy text-white"
                : "bg-bg-gray text-muted-text border border-gray-150"
            }`}
          >
            <Video className="w-4 h-4" /> Video Room
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
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredPhotos.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-150 hover:border-transparent transition-all duration-300 group cursor-pointer"
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
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Videos Tab */}
      {activeTab === "videos" && (
        <section className="py-16 bg-bg-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-150 text-left group"
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
                </div>
              ))}
            </div>
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
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Slider Controls and Image */}
            <div className="flex-1 flex items-center justify-between gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white focus:outline-none flex-shrink-0"
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
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white focus:outline-none flex-shrink-0"
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
