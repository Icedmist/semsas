"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/"
          ? "glass-nav shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Group */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="GoSEMSAS logo"
                fill
                sizes="48px"
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg tracking-wider flex items-center gap-1.5">
                <span className="bg-white rounded-lg px-2 py-0.5 shadow-sm">
                  <span className="text-black">Go</span>
                  <span className="text-emergency-red">SEMSAS</span>
                </span>
                <span className="text-white text-xs bg-emergency-red px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">Gombe</span>
              </span>
              <span className="text-[10px] text-gray-300 font-medium max-w-[240px] leading-tight line-clamp-1">
                State Emergency Medical Services & Ambulance System
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group/item">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      onMouseEnter={() => setAboutDropdownOpen(true)}
                      className={`relative flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-emergency-red after:transition-all after:duration-300 hover:after:w-full ${
                        isActive(link.href) ? "text-emergency-red after:w-full" : "text-white/90 hover:text-emergency-red"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      onMouseLeave={() => setAboutDropdownOpen(false)}
                      className="absolute left-0 mt-3 w-56 rounded-2xl bg-[#051F3D] border border-white/10 shadow-2xl py-2 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 transform translate-y-1 group-hover/item:translate-y-0"
                    >
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          className={`block px-4 py-2.5 text-xs font-semibold hover:bg-white/5 hover:text-emergency-red transition-all ${
                            pathname === sublink.href ? "text-emergency-red" : "text-white/80"
                          }`}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors focus:outline-none after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-emergency-red after:transition-all after:duration-300 hover:after:w-full ${
                      isActive(link.href) ? "text-emergency-red after:w-full" : "text-white/90 hover:text-emergency-red"

                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Call Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:07033825646"
              className="btn btn-red relative overflow-hidden group focus:outline-none px-5 py-3"
            >
              <Phone className="w-4 h-4 fill-white animate-pulse" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] text-white/80 uppercase tracking-widest font-bold">Emergency Call</span>
                <span className="text-sm tracking-wide">0703 382 5646</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-emergency-red focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#051F3D]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-1">
                      <div className="font-semibold text-xs uppercase tracking-widest text-gray-400 px-3 pt-3 pb-1">
                        {link.name}
                      </div>
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          href={sublink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block text-sm font-medium py-2 px-6 rounded-md hover:bg-white/5 hover:text-emergency-red transition-all ${
                            pathname === sublink.href ? "text-emergency-red" : "text-white/80"
                          }`}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-sm font-medium py-2 px-3 rounded-md hover:bg-white/5 hover:text-emergency-red transition-all ${
                        isActive(link.href) ? "text-emergency-red text-bold" : "text-white/90"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="tel:07033825646"
                  className="btn btn-red w-full py-3"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Emergency Call: 0703 382 5646</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
