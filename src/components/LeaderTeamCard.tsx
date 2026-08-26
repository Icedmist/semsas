"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

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
      className="group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-md hover:shadow-[0_32px_64px_-24px_rgba(10,42,82,0.25)] hover:border-slate-300 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Banner */}
      <div className="relative h-40 bg-gradient-to-br from-[#0A2A52] via-primary-navy to-emergency-red overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #ffffff, transparent 45%)",
          }}
        />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emergency-red/50 rounded-full blur-3xl" />
        <div className="absolute top-6 left-8 flex items-center gap-2 text-white/80">
          <span className="w-2 h-2 rounded-full bg-emergency-red animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">SEMSAS Command</span>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="px-8 -mt-20 flex justify-center">
        <div className="relative">
          {leader.imageUrl ? (
            <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-2xl ring-[8px] ring-white transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <Image
                src={leader.imageUrl}
                alt={leader.name}
                fill
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-emergency-red to-primary-navy text-white flex items-center justify-center font-heading font-black text-5xl shadow-2xl ring-[8px] ring-white transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              {initials}
            </div>
          )}
          <div className="absolute bottom-2 right-2 w-7 h-7 bg-success-green rounded-full ring-4 ring-white shadow-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-10 pt-8 flex flex-col flex-1">
        <div className="text-center">
          <h4 className="font-heading font-extrabold text-2xl text-primary-navy leading-tight transition-colors group-hover:text-emergency-red">
            {leader.name}
          </h4>
          <p className="text-sm font-bold text-emergency-red/90 uppercase tracking-widest mt-2.5">
            {leader.role}
          </p>
        </div>
        
        <div className="w-16 h-1 bg-slate-100 mx-auto mt-6 rounded-full transition-all duration-300 group-hover:w-24 group-hover:bg-emergency-red/20" />
        
        <p className="text-slate-500 text-[15px] leading-relaxed font-light mt-6 text-center line-clamp-4 group-hover:text-slate-700 transition-colors">
          {leader.bio}
        </p>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-center gap-3">
            <a
              href={`mailto:${leader.email}`}
              className="w-12 h-12 rounded-full bg-slate-50 hover:bg-emergency-red hover:text-white text-slate-400 hover:shadow-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
              title="Email Administrator"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={leader.linkedin}
              className="w-12 h-12 rounded-full bg-slate-50 hover:bg-primary-navy hover:text-white text-slate-400 hover:shadow-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
              title="LinkedIn Profile"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
          <Link
            href={contactHref}
            className="mt-6 w-full py-4 px-6 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-navy transition-all duration-300 group-hover:bg-primary-navy/[0.03] group-hover:text-emergency-red"
          >
            Contact Office
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
