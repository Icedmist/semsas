"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Leadership() {
  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <section className="relative py-20 bg-primary-navy text-white text-center overflow-hidden hero-banner">
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
                    src="/images/Dr%20Suraj%20Abdulkarim%20.jpg"
                    alt="Dr. Suraj Abdulkarim"
                      fill
                      className="object-cover object-top"
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
                  <h5 className="font-heading font-extrabold text-base text-primary-navy">Dr. Suraj Abdulkarim</h5>
                  <p className="text-xs text-muted-text">State Coordinator, Gombe State SEMSAS</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
