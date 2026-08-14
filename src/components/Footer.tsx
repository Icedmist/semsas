"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowUpRight,
  Mail,
  Clock,
} from "lucide-react";

const socials = [
  {
    name: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "X (Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0A2A52] text-white border-t border-white/10 z-10 overflow-hidden">
      {/* Duotone accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#0A2A52] via-emergency-red to-[#0A2A52]" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#2F80ED]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-96 h-96 bg-emergency-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Column 1: About */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="GoSEMSAS logo"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight leading-none">
                  <span className="text-white">Go</span>
                  <span className="text-gradient-red">SEMSAS</span>
                </span>
                <span className="text-[9.5px] text-white/40 font-semibold tracking-[0.14em] uppercase mt-1">
                  Gombe State
                </span>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Gombe State Emergency Medical Services and Ambulance System (SEMSAS) delivers fast, coordinated, pre-hospital critical treatment and reliable ambulance dispatch statewide.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ name, path }) => (
                <a
                  key={name}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={name}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:bg-emergency-red hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(220,20,60,0.6)] transition-all duration-300"
                >
                  <BrandIcon path={path} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-widest flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li><Link href="/about" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">About Us <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></Link></li>
              <li><Link href="/services" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">Our Services <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></Link></li>
              <li><Link href="/emergency-information" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">Emergency Response Steps <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></Link></li>
              <li><Link href="/downloads" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">Downloads &amp; Policy <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></Link></li>
              <li><Link href="/#contact" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">Contact &amp; Support <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></Link></li>
            </ul>
          </div>

          {/* Column 3: Emergency Contacts */}
          <div className="space-y-5">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-widest flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
              Emergency Contacts
            </h4>
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 space-y-4">
              <a href="tel:07033825646" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emergency-red to-[#b01030] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_8px_20px_-6px_rgba(220,20,60,0.6)]">
                  <Phone className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Toll-Free Dispatch</div>
                  <div className="font-bold text-white text-sm">0703 382 5646</div>
                </div>
              </a>
              <div className="flex items-center gap-2 text-[11px] text-white/50 leading-relaxed">
                <Clock className="w-3.5 h-3.5 text-emergency-amber shrink-0" />
                Available 24 hours a day, 7 days a week, 365 days a year across Gombe State.
              </div>
            </div>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-5">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-widest flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li><a href="#" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">NEMSAS Guidelines <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></a></li>
              <li><a href="#" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">First Aid General Guide <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></a></li>
              <li><a href="#" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">Partnership Portals <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></a></li>
              <li><a href="#" className="group inline-flex items-center gap-1.5 hover:text-white transition-colors">Administrative Login <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /></a></li>
            </ul>
            <div className="flex items-center gap-2 text-[11px] text-white/40 pt-1">
              <Mail className="w-3.5 h-3.5 text-[#2F80ED]" />
              info@semsas.gm.gov.ng
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            Copyright &copy; {new Date().getFullYear()} GoSEMSAS. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
              <a key={item} href="#" className="group inline-flex items-center gap-1 hover:text-white transition-all duration-300">
                {item} <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}