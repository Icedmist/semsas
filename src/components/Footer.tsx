"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-primary-navy text-white border-t border-white/10 z-10 overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-emergency-red via-emergency-blue to-success-green" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-emergency-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-96 h-96 bg-emergency-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="GoSEMSAS logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-base tracking-wider">
                  <span className="bg-white rounded-md px-1.5 py-0.5 shadow-sm">
                    <span className="text-black">Go</span>
                    <span className="text-emergency-red">SEMSAS</span>
                  </span>
                </span>
                <span className="text-[10px] text-gray-300 font-medium">Gombe State</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Gombe State Emergency Medical Services and Ambulance System (SEMSAS) delivers fast, coordinated, pre-hospital critical treatment and reliable ambulance dispatch statewide.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                <span
                  key={platform}
                  className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2 py-1 rounded hover:bg-white/15 cursor-pointer transition-colors"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emergency-red to-emergency-blue" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/about" className="hover:text-emergency-red">About Us</Link></li>
              <li><Link href="/services" className="hover:text-emergency-red">Our Services</Link></li>
              <li><Link href="/emergency-information" className="hover:text-emergency-red">Emergency Response Steps</Link></li>
              <li><Link href="/downloads" className="hover:text-emergency-red">Downloads & Policy</Link></li>
              <li><Link href="/#contact" className="hover:text-emergency-red">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Emergency Contacts */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emergency-red to-emergency-blue" />
              Emergency Contacts
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emergency-red fill-emergency-red" />
                <span className="font-bold text-white">Toll-Free Dispatch: 0703 382 5646</span>
              </div>
              <div className="text-gray-300 leading-relaxed text-[11px]">
                Available 24 hours a day, 7 days a week, 365 days a year across Gombe State.
              </div>
            </div>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emergency-red to-emergency-blue" />
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-emergency-red">NEMSAS Guidelines</a></li>
              <li><a href="#" className="hover:text-emergency-red">First Aid General Guide</a></li>
              <li><a href="#" className="hover:text-emergency-red">Partnership Portals</a></li>
              <li><a href="#" className="hover:text-emergency-red">Administrative Login</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-300">
          <div>
            Copyright &copy; {new Date().getFullYear()} GoSEMSAS. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
