"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Globe, ArrowRight } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
  imageUrl?: string;
}

interface Props {
  leader: Leader;
  idx?: number;
  contactHref?: string;
  variant?: "light" | "dark";
}

/**
 * A card component displaying information about a leadership team member.
 * Supports light and dark variants and displays an image or initials.
 */
export default function LeaderTeamCard({ leader, idx = 0, contactHref = "/#contact", variant = "light" }: Props) {
  const initials = leader.name
    .replace(/^(Dr\.|Mrs\.|Mallam|Engr\.|Sister|Pharm)\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className={`group flex flex-col rounded-3xl border shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden relative ${
        isDark ? "bg-white/[0.05] border-white/10 backdrop-blur-xl" : "bg-white border-slate-100"
      }`}
    >
      {/* Decorative gradient glow behind the card */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? "bg-gradient-to-br from-white/5 to-white/10" : "bg-gradient-to-br from-primary-navy/5 to-emergency-red/5"}`} />
      
      {/* Top Image Section (Avatar Style) */}
      <div className="relative pt-8 pb-2 flex justify-center z-10">
        <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg ${isDark ? "ring-4 ring-white/10" : "ring-4 ring-slate-50"}`}>
          {leader.imageUrl ? (
            <Image
              src={leader.imageUrl}
              alt={leader.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
             <div className={`w-full h-full flex items-center justify-center font-heading font-black text-4xl ${isDark ? "bg-white/10 text-white/20" : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-300"}`}>
              {initials}
            </div>
          )}
          
          {/* Subtle inner overlay for text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10 items-center text-center">
        <div className="mb-4">
          <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${isDark ? "bg-white/10 text-white" : "bg-emergency-red/10 text-emergency-red"}`}>
            {leader.role}
          </div>
          <h4 className={`font-heading font-extrabold text-xl sm:text-2xl leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {leader.name}
          </h4>
        </div>
        
        <p className={`text-sm leading-relaxed font-light line-clamp-3 flex-1 transition-colors ${isDark ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-600"}`}>
          {leader.bio}
        </p>

        <div className={`mt-8 pt-6 border-t flex items-center justify-between w-full ${isDark ? "border-white/10" : "border-slate-100/80"}`}>
          <div className="flex gap-2">
            <a
              href={`mailto:${leader.email}`}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-50 hover:bg-emergency-red hover:text-white text-slate-400"}`}
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={leader.linkedin}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-50 hover:bg-primary-navy hover:text-white text-slate-400"}`}
              title="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
          
          <Link
            href={contactHref}
            className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${isDark ? "text-white hover:text-white/80" : "text-primary-navy hover:text-emergency-red"}`}
          >
            Contact
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
