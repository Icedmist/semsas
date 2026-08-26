"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import LeaderTeamCard from "@/components/LeaderTeamCard";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

const leadershipTeam = [
  {
    name: "Dr. Bello Abdulkadir",
    role: "Head of SEMSAS Admin (Administrative Officer)",
    bio: "Responsible for providing effective administrative, logistical, human resource and operational support to ensure the smooth and efficient functioning of SEMSAS.",
    email: "admin@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Dr Bello Abdulkadir Head of SEMSAS Admin.jpg",
  },
  {
    name: "Dr. Maspara Gideon",
    role: "Head of Claims",
    bio: "Coordinates and manages claims and reimbursement processes, ensuring proper documentation, verification, and timely processing.",
    email: "claims@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Dr Maspara Gideon Head of Claim.jpg",
  },
  {
    name: "Halima Musa Miyabe",
    role: "Head of Monitoring & Evaluation",
    bio: "Oversees monitoring and evaluation to ensure quality, performance, and continuous improvement in emergency medical service delivery.",
    email: "me@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Halima Musa Miyabe Head of Monitoring & Evaluation.jpg",
  },
  {
    name: "Muhammad Sanusi Ahmad",
    role: "Strategic Information",
    bio: "Manages strategic information, data analytics, and reporting to guide evidence-based decision-making and digital transformation for SEMSAS.",
    email: "si@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/Muhammad Sanusi Ahmad Strategic Information.jpg",
  },
  {
    name: "SEMSAS ICT Focal Person",
    role: "ICT Focal Person",
    bio: "Coordinates, manages and strengthens the information and communication technology systems supporting SEMSAS operations, ensuring robust digital emergency response systems.",
    email: "ict@semsas.gombe.gov.ng",
    linkedin: "#",
    imageUrl: "/images/ICT Focal Person.jpg",
  }
];

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

      {/* Leadership Team Grid */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 mb-4">
              SEMSAS Management Team
            </h2>
            <p className="text-muted-text font-light text-sm sm:text-base">
              Meet the dedicated professionals leading the various departments and operations of the Gombe State Emergency Medical Services and Ambulance System.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, index) => (
              <LeaderTeamCard key={index} leader={leader} idx={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
