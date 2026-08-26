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
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 overflow-hidden"
    >
      {/* Top Image Section - Flush to edges */}
      <div className="relative h-64 sm:h-72 w-full bg-slate-50 overflow-hidden">
        {leader.imageUrl ? (
          <Image
            src={leader.imageUrl}
            alt={leader.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-heading font-black text-5xl text-slate-300">
            {initials}
          </div>
        )}
        
        {/* Subtle overlay gradient for a premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 relative bg-white">
        {/* Subtle top accent line on hover */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-navy to-emergency-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <div className="mb-4">
          <p className="text-[11px] font-bold text-emergency-red uppercase tracking-widest mb-2">
            {leader.role}
          </p>
          <h4 className="font-heading font-bold text-xl text-slate-900 leading-tight">
            {leader.name}
          </h4>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed font-light line-clamp-4 flex-1">
          {leader.bio}
        </p>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-2">
            <a
              href={`mailto:${leader.email}`}
              className="w-9 h-9 rounded-full bg-slate-50 hover:bg-emergency-red hover:text-white text-slate-400 flex items-center justify-center transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={leader.linkedin}
              className="w-9 h-9 rounded-full bg-slate-50 hover:bg-primary-navy hover:text-white text-slate-400 flex items-center justify-center transition-colors"
              title="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
          
          <Link
            href={contactHref}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-navy hover:text-emergency-red transition-colors"
          >
            Contact
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
