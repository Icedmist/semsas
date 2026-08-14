"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

export default function Leadership() {
  return (
    <div className="bg-bg-gray">
      <PageHero
        title="Our Leadership Team"
        subtitle="Dedicated professionals coordinating state resources to deliver swift, life-saving emergency care."
        crumb="Leadership"
      />

      {/* Leadership Message Card */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/80 shadow-[0_24px_60px_-24px_rgba(10,42,82,0.18)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-navy/5 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Coordinator Photo */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="lg:col-span-4 relative flex justify-center"
              >
                <motion.div
                  variants={fadeUpItem}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-1 ring-slate-900/10"
                >
                  <Image
                    src="/images/Dr%20Suraj%20Abdulkarim%20.jpg"
                    alt="Dr. Suraj Abdulkarim"
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </motion.div>

              {/* Message Copy */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="lg:col-span-8 space-y-6"
              >
                <motion.div
                  variants={fadeUpItem}
                  className="inline-flex items-center gap-1.5 text-emergency-red text-xs font-bold uppercase tracking-wider"
                >
                  <ShieldCheck className="w-4 h-4" /> Message from the State Coordinator
                </motion.div>
                <motion.h3
                  variants={fadeUpItem}
                  className="font-heading font-black text-2xl sm:text-3xl text-slate-900 leading-tight"
                >
                  &ldquo;Securing Health, Preserving Lives Across Every Community&rdquo;
                </motion.h3>
                <motion.div
                  variants={fadeUpItem}
                  className="text-muted-text text-sm sm:text-base font-light leading-relaxed space-y-4"
                >
                  <p>
                    &ldquo;At Gombe State SEMSAS, our mandate is defined by urgency and guided by compassion. Emergency situations demand more than speed; they demand integrated systems, specialized expertise, and standardized care protocols. We are dedicated to ensuring that no Gombe citizen loses their life due to delays in referral transit or lack of pre-hospital clinical care.&rdquo;
                  </p>
                  <p>
                    &ldquo;Through our collaborative partnerships with the Federal Ministry of Health, NEMSAS, and first-responder allies like the FRSC, we are setting up a comprehensive shield for all travelers and residents. We thank you for your trust and support as we continue expanding our stations to serve you better.&rdquo;
                  </p>
                </motion.div>
                <motion.div variants={fadeUpItem} className="pt-2">
                  <h5 className="font-heading font-extrabold text-base text-slate-900">Dr. Suraj Abdulkarim</h5>
                  <p className="text-xs text-muted-text">State Coordinator, Gombe State SEMSAS</p>
                </motion.div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}