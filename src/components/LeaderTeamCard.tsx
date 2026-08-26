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
}

export default function LeaderTeamCard({ leader, idx = 0, contactHref = "/#contact" }: Props) {
  const initials = leader.name
    .replace(/^(Dr\.|Mrs\.|Mallam|Engr\.|Sister|Pharm)\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden relative"
    >
      {/* Decorative gradient glow behind the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-navy/5 to-emergency-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Image Section */}
      <div className="relative h-64 sm:h-[280px] w-full p-3 pb-0 z-10">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm">
          {leader.imageUrl ? (
            <Image
              src={leader.imageUrl}
              alt={leader.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-heading font-black text-5xl text-slate-300">
              {initials}
            </div>
          )}
          
          {/* Subtle inner overlay for text contrast if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-emergency-red/10 text-emergency-red text-[10px] font-bold uppercase tracking-widest mb-4">
            {leader.role}
          </div>
          <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
            {leader.name}
          </h4>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3 flex-1 group-hover:text-slate-600 transition-colors">
          {leader.bio}
        </p>

        <div className="mt-8 pt-6 border-t border-slate-100/80 flex items-center justify-between">
          <div className="flex gap-2">
            <a
              href={`mailto:${leader.email}`}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-emergency-red hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={leader.linkedin}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-primary-navy hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300"
              title="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
          
          <Link
            href={contactHref}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-navy hover:text-emergency-red transition-colors"
          >
            Contact
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
