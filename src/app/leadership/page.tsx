"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Phone, User, Award, ShieldCheck } from "lucide-react";

interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  email: string;
  linkedin: string;
}

export default function Leadership() {
  const leadershipTeam: LeaderProfile[] = [
    {
      name: "Dr. Abdullahi Yusuf Gombe",
      role: "State SEMSAS Coordinator",
      bio: "An accomplished public health administrator with over 18 years of clinical experience. Formerly led regional healthcare reform committees before spearheading Gombe SEMSAS.",
      email: "a.yusuf@semsas.gm.gov.ng",
      linkedin: "#"
    },
    {
      name: "Mrs. Amina Danjuma",
      role: "Director of Operations",
      bio: "Specializes in ambulance fleet logistics and dispatch system architecture. She has overseen large-scale medical emergency responses in northeastern Nigeria.",
      email: "a.danjuma@semsas.gm.gov.ng",
      linkedin: "#"
    },
    {
      name: "Dr. Bello Ibrahim",
      role: "Medical Director",
      bio: "Board-certified emergency physician who leads the triage and medical protocol training. Focuses on setting clinical standards for pre-hospital treatments.",
      email: "b.ibrahim@semsas.gm.gov.ng",
      linkedin: "#"
    },
    {
      name: "Mallam Yusuf Haruna",
      role: "Communications & Dispatch Manager",
      bio: "Information technology expert with a background in telecommunications. Manages the uptime, scaling, and training protocols for the 112 dispatch operators.",
      email: "y.haruna@semsas.gm.gov.ng",
      linkedin: "#"
    },
    {
      name: "Engr. Timothy Solomon",
      role: "Fleet & Equipment Support Coordinator",
      bio: "Ensures the response fleet is medically stocked, mechanically sound, and calibrated. Manages regular safety inspections of on-board diagnostic setups.",
      email: "t.solomon@semsas.gm.gov.ng",
      linkedin: "#"
    },
    {
      name: "Sister Deborah Mark",
      role: "Responder Training Coordinator",
      bio: "Senior nurse educator and trauma life support trainer. Coordinates the continuous development curriculum for EMT crews and paramedics across the state.",
      email: "d.mark@semsas.gm.gov.ng",
      linkedin: "#"
    }
  ];

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <section className="relative py-20 bg-primary-navy text-white text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emergency-red/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Leadership</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Our Leadership Team
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Dedicated professionals coordinating state resources to deliver swift, life-saving emergency care.
          </p>
        </div>
      </section>

      {/* Leadership Message Card */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bg-gray rounded-3xl p-8 lg:p-12 border border-gray-150 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-navy/5 rounded-full blur-3xl" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Coordinator Photo */}
              <div className="lg:col-span-4 relative flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-white">
                  <Image
                    src="/images/coordinator.jpg"
                    alt="Dr. Abdullahi Yusuf Gombe"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Message Copy */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-1.5 text-emergency-red text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Message from the State Coordinator
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy leading-tight">
                  &ldquo;Securing Health, Preserving Lives Across Every Community&rdquo;
                </h3>
                <div className="text-muted-text text-sm sm:text-base font-light leading-relaxed space-y-4">
                  <p>
                    &ldquo;At Gombe State SEMSAS, our mandate is defined by urgency and guided by compassion. Emergency situations demand more than speed; they demand integrated systems, specialized expertise, and standardized care protocols. We are dedicated to ensuring that no Gombe citizen loses their life due to delays in referral transit or lack of pre-hospital clinical care.&rdquo;
                  </p>
                  <p>
                    &ldquo;Through our collaborative partnerships with the Federal Ministry of Health, NEMSAS, and first-responder allies like the FRSC, we are setting up a comprehensive shield for all travelers and residents. We thank you for your trust and support as we continue expanding our stations to serve you better.&rdquo;
                  </p>
                </div>
                <div className="pt-2">
                  <h5 className="font-heading font-extrabold text-base text-primary-navy">Dr. Abdullahi Yusuf Gombe</h5>
                  <p className="text-xs text-muted-text">State Coordinator, Gombe State SEMSAS</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Leadership Intro & Grid */}
      <section className="py-24 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary-navy bg-primary-navy/5 px-3 py-1 rounded-full inline-block">
              Executive Committee
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              Executive Officers & Managers
            </h2>
            <p className="text-muted-text text-xs sm:text-sm font-light">
              Meet the clinical directors, logicians, and administrative supervisors driving our day-to-day operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Portrait Placeholder Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-primary-navy/5 text-primary-navy flex items-center justify-center border border-primary-navy/10">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-base text-primary-navy leading-tight">
                      {leader.name}
                    </h4>
                    <p className="text-xs font-semibold text-emergency-red mt-0.5">
                      {leader.role}
                    </p>
                  </div>
                  <p className="text-muted-text text-xs leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${leader.email}`}
                      className="w-8 h-8 rounded-lg bg-bg-gray hover:bg-primary-navy/5 text-muted-text hover:text-primary-navy flex items-center justify-center transition-colors"
                      title="Email Administrator"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href={leader.linkedin}
                      className="w-8 h-8 rounded-lg bg-bg-gray hover:bg-primary-navy/5 text-muted-text hover:text-primary-navy flex items-center justify-center transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                  <Link
                    href="/#contact"
                    className="text-[10px] uppercase font-bold text-primary-navy hover:text-emergency-red tracking-wider"
                  >
                    Contact Coordinator &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
