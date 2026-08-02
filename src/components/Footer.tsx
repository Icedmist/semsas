"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-navy text-white border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base border-b border-white/10 pb-2">
              About SEMSAS Gombe
            </h4>
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
            <h4 className="font-heading font-bold text-base border-b border-white/10 pb-2">
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
            <h4 className="font-heading font-bold text-base border-b border-white/10 pb-2">
              Emergency Contacts
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emergency-red fill-emergency-red" />
                <span className="font-bold text-white">Toll-Free Dispatch: 112</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span>Alternate Support: 767</span>
              </div>
              <div className="text-gray-300 leading-relaxed text-[11px]">
                Available 24 hours a day, 7 days a week, 365 days a year across Gombe State.
              </div>
            </div>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base border-b border-white/10 pb-2">
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
            Copyright &copy; {new Date().getFullYear()} Gombe State SEMSAS. All rights reserved.
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
