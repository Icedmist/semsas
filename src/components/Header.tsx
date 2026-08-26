"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown, Mail, Clock } from "lucide-react";
import { EASE } from "@/lib/motion-variants";

/**
 * The main header navigation component for the SEMSAS application.
 * Includes a responsive layout with a top utility bar and a primary navigation menu.
 * Handles scroll state to adjust styling and layout.
 */
export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      dropdown: [
        { name: "About SEMSAS", href: "/about" },
        { name: "Organizational Structure", href: "/organizational-structure" },
        { name: "Leadership Team", href: "/leadership" },
        { name: "Strategic Partners", href: "/partners" },
      ],
    },
    { name: "Services", href: "/services" },
    { name: "Emergency Info", href: "/emergency-information" },
    {
      name: "Media Room",
      href: "/news",
      dropdown: [
        { name: "News & Announcements", href: "/news" },
        { name: "Photo & Video Gallery", href: "/gallery" },
      ],
    },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
    { name: "Live Dashboard", href: "/dashboard" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div
        className={`hidden lg:block bg-[#0A2A52] text-white/85 transition-all duration-500 overflow-hidden ${
          isScrolled ? "max-h-0" : "max-h-12"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emergency-amber" />
              24/7 Emergency Response & Ambulance Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emergency-amber" />
              info@gosemsas.gov.ng
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-semibold">
            <Phone className="w-3.5 h-3.5 text-emergency-amber" />
            Emergency Hotline:{" "}
            <a href="tel:07033825646" className="text-white hover:text-emergency-amber transition-colors">
              0703 382 5646
            </a>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(10,42,82,0.18)] border-slate-100"
            : "bg-white/70 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none rounded-lg">
              <div className="relative w-16 h-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
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
                  <span className="text-slate-900">Go</span>
                  <span className="text-gradient-red">SEMSAS</span>
                </span>
                <span className="text-[9.5px] text-slate-500 font-semibold tracking-[0.14em] uppercase mt-1">
                  Emergency Medical Services
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                    onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                  >
                    {link.dropdown ? (
                      <>
                        <button
                          className={`relative flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none ${
                            active
                              ? "text-emergency-red"
                              : "text-slate-700 hover:text-emergency-red"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="active-nav"
                              transition={{ type: "spring", stiffness: 400, damping: 32 }}
                              className="absolute inset-0 rounded-full bg-emergency-red/10"
                            />
                          )}
                          <span className="relative z-10">{link.name}</span>
                          <ChevronDown
                            className={`relative z-10 w-3.5 h-3.5 transition-transform duration-300 ${
                              openDropdown === link.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.18, ease: EASE }}
                              className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(10,42,82,0.25)] p-2"
                            >
                              {link.dropdown.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  href={sublink.href}
                                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    pathname === sublink.href
                                      ? "text-emergency-red bg-emergency-red/8"
                                      : "text-slate-700 hover:text-emergency-red hover:bg-slate-50"
                                  }`}
                                >
                                  {sublink.name}
                                  <span className="w-1.5 h-1.5 rounded-full bg-emergency-red/40" />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className={`relative flex items-center px-3.5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none ${
                          active ? "text-emergency-red" : "text-slate-700 hover:text-emergency-red"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-nav"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-emergency-red/10"
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Call Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:07033825646"
                className="btn btn-red relative overflow-hidden px-5 py-2.5 group focus:outline-none"
              >
                <Phone className="w-4 h-4 fill-white animate-pulse" />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] text-white/80 uppercase tracking-widest font-bold">Emergency Call</span>
                  <span className="text-sm tracking-wide">0703 382 5646</span>
                </div>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-emergency-red bg-white border border-slate-200 shadow-sm focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Slim Gradient Accent */}
        <div className="h-[3px] bg-gradient-to-r from-[#0A2A52] via-[#DC143C] to-[#0A2A52]" />
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_20px_50px_-20px_rgba(10,42,82,0.25)]"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 overflow-y-auto max-h-[calc(100vh-72px)]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 * i }}
                >
                  {link.dropdown ? (
                    <div>
                      <div className="font-bold text-xs uppercase tracking-widest text-slate-400 px-3 pt-4 pb-2">
                        {link.name}
                      </div>
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between text-sm font-medium py-2.5 px-4 rounded-xl transition-all ${
                            pathname === sublink.href
                              ? "text-emergency-red bg-emergency-red/8"
                              : "text-slate-700 hover:bg-slate-50 hover:text-emergency-red"
                          }`}
                        >
                          {sublink.name}
                          <span className="w-1.5 h-1.5 rounded-full bg-emergency-red/40" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-sm font-semibold py-2.5 px-4 rounded-xl transition-all ${
                        isActive(link.href)
                          ? "text-emergency-red bg-emergency-red/8"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emergency-red"
                      }`}
                    >
                      {link.name}
                      {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-emergency-red" />}
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-100 space-y-2">
                <a href="tel:07033825646" className="btn btn-red w-full py-3">
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Emergency Call: 0703 382 5646</span>
                </a>
                <span className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  Available 24/7 across all 11 LGAs
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}