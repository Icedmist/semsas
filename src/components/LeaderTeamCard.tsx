"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
}

interface Props {
  leader: Leader;
  idx?: number;
  contactHref?: string;
}

export default function LeaderTeamCard({ leader, idx = 0, contactHref = "/#contact" }: Props) {
  const initials = leader.name
    .replace(/^(Dr\.|Mrs\.|Mallam|Engr\.|Sister)\s*/i, "")
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
      className="group relative overflow-hidden rounded-3xl border border-primary-navy/10 bg-white shadow-sm hover:shadow-2xl hover:shadow-primary-navy/15 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
    >
      <div className="relative h-24 bg-gradient-to-br from-primary-navy via-primary-navy to-emergency-red overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #ffffff, transparent 45%)",
          }}
        />
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-emergency-red/40 rounded-full blur-2xl" />
        <div className="absolute top-4 left-6 flex items-center gap-1.5 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emergency-red animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest">SEMSAS Command</span>
        </div>
      </div>

      <div className="px-6 -mt-10 flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emergency-red to-primary-navy text-white flex items-center justify-center font-heading font-black text-2xl shadow-lg ring-4 ring-white transition-transform duration-500 group-hover:scale-105">
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-green rounded-full ring-2 ring-white" />
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 flex flex-col flex-1">
        <div className="text-center">
          <h4 className="font-heading font-extrabold text-lg text-primary-navy leading-tight">
            {leader.name}
          </h4>
          <p className="text-[11px] font-bold text-emergency-red uppercase tracking-wider mt-1">
            {leader.role}
          </p>
        </div>
        <p className="text-muted-text text-xs leading-relaxed font-light mt-3 text-center">
          {leader.bio}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-center gap-2">
            <a
              href={`mailto:${leader.email}`}
              className="w-9 h-9 rounded-full bg-bg-gray hover:bg-emergency-red hover:text-white text-muted-text flex items-center justify-center transition-all duration-300"
              title="Email Administrator"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={leader.linkedin}
              className="w-9 h-9 rounded-full bg-bg-gray hover:bg-primary-navy hover:text-white text-muted-text flex items-center justify-center transition-all duration-300"
              title="LinkedIn Profile"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
          <Link
            href={contactHref}
            className="mt-4 w-full flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary-navy hover:text-emergency-red transition-colors"
          >
            Contact Office
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
