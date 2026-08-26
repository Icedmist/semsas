"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumb: string;
  image?: string;
  imageAlt?: string;
  badge?: string;
}

/**
 * A reusable hero section component for secondary pages.
 * Displays a title, optional subtitle, breadcrumb, and optional background image.
 */
export default function PageHero({
  title,
  subtitle,
  crumb,
  image,
  imageAlt,
  badge,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-28 bg-[#0A2A52] overflow-hidden">
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A52] via-[#0A2A52]/80 to-[#0A2A52]/40" />
        </div>
      )}

      {/* Ambient glows */}
      <div className="absolute -top-40 right-[-10%] w-[40rem] h-[40rem] bg-[#2F80ED]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-40%] left-[-10%] w-[34rem] h-[34rem] bg-emergency-red/10 rounded-full blur-[140px] pointer-events-none" />
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_70%_at_60%_30%,black,transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-[11px] font-semibold tracking-widest text-white/50 uppercase flex items-center gap-2 mb-5"
        >
          <motion.span variants={fadeUpItem}>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </motion.span>
          <motion.span variants={fadeUpItem} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white">{crumb}</span>
          </motion.span>
        </motion.nav>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-5"
        >
          {badge && (
            <motion.span
              variants={fadeUpItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency-red" />
              </span>
              {badge}
            </motion.span>
          )}
          <motion.h1
            variants={fadeUpItem}
            className="font-heading font-black text-3xl sm:text-5xl text-white leading-[1.08] tracking-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUpItem}
              className="text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}