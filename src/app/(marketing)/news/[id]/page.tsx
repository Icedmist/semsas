"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Printer,
  FileDown
} from "lucide-react";
import { stagger, fadeUpItem } from "@/lib/motion-variants";

interface ArticleDetail {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  contentHtml: string;
  toc: { id: string; text: string }[];
}

export default function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Mock database
  const articlesDb: Record<string, ArticleDetail> = {
    "12": {
      id: "12",
      title: "Onboarding of CEMTTOS and Drivers on RESMAT in Malam Sidi, Kwami LGA",
      category: "Community Outreach",
      date: "August 14, 2026",
      readTime: "4 min read",
      author: "Dr. Suraj Abdulkarim",
      authorRole: "State SEMSAS Coordinator",
      image: "/images/news-onboarding-kwami-1.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "malam-sidi-onboarding", text: "Malam Sidi Launch" },
        { id: "resmat-registration", text: "RESMAT Enrollment" },
        { id: "onboarding-gallery", text: "Event Gallery" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          To widen maternal transport access across Gombe State, GoSEMSAS organized a comprehensive regional onboarding workshop in Malam Sidi, Kwami LGA. The sessions registered local CEMTTOS community mobilizers and transport drivers.
        </p>

        <h3 id="malam-sidi-onboarding" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Malam Sidi Launch</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Kwami LGA remains a critical sector for emergency maternal logistics. Local ward leaders and healthcare officers gathered to review communications guidelines, dispatch response tracking, and local road safety requirements.
        </p>

        <h3 id="resmat-registration" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">RESMAT Enrollment</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          A total of 15 local commercial transport drivers were officially enrolled onto the RESMAT program registry. Drivers received critical training in pre-hospital transit requirements, emergency routing guidelines, and digital payment frameworks.
        </p>

        <h3 id="onboarding-gallery" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Event Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-1.jpg" class="object-cover w-full h-full" alt="Onboarding 1"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-2.jpg" class="object-cover w-full h-full" alt="Onboarding 2"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-3.jpg" class="object-cover w-full h-full" alt="Onboarding 3"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-4.jpg" class="object-cover w-full h-full" alt="Onboarding 4"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-5.jpg" class="object-cover w-full h-full" alt="Onboarding 5"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-6.jpg" class="object-cover w-full h-full" alt="Onboarding 6"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-7.jpg" class="object-cover w-full h-full" alt="Onboarding 7"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-onboarding-kwami-8.jpg" class="object-cover w-full h-full" alt="Onboarding 8"/></div>
        </div>
      `
    },
    "11": {
      id: "11",
      title: "Community Sensitization with Pregnant Mothers on RESMAT",
      category: "Public Health",
      date: "August 14, 2026",
      readTime: "4 min read",
      author: "Sister Deborah Mark",
      authorRole: "Chief Training Coordinator",
      image: "/images/news-mothers-resmat-1.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "sensitization-objectives", text: "Maternal Health Focus" },
        { id: "resmat-features", text: "RESMAT Features" },
        { id: "mothers-gallery", text: "Event Gallery" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          To improve maternal health metrics and lower childbirth casualties, GoSEMSAS medical outreach teams conducted community sensitization campaigns dedicated to pregnant mothers.
        </p>

        <h3 id="sensitization-objectives" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Maternal Health Focus</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          The campaign details the critical importance of seeking timely medical referral and emergency care, identifying labor risk triggers, and calling the GoSEMSAS dispatch lines before complications arise.
        </p>

        <h3 id="resmat-features" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">RESMAT Features</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Outreach officers explained how the RESMAT maternal transport system functions, allowing pregnant women in rural wards to secure emergency clinic transfers under GoSEMSAS coordination and subsidized payment frameworks.
        </p>

        <h3 id="mothers-gallery" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Event Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-1.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 1"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-2.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 2"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-3.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 3"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-4.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 4"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-5.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 5"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-6.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 6"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-7.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 7"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-8.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 8"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-mothers-resmat-9.jpg" class="object-cover w-full h-full" alt="Mothers Outreach 9"/></div>
        </div>
      `
    },
    "10": {
      id: "10",
      title: "Launching of Gombe State Ambulance Service by the Honourable Commissioner of Health",
      category: "Emergency Response",
      date: "August 14, 2026",
      readTime: "5 min read",
      author: "Dr. Suraj Abdulkarim",
      authorRole: "State SEMSAS Coordinator",
      image: "/images/news-launch-ambulance-1.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "launch-event", text: "Official Launching Ceremony" },
        { id: "statewide-impact", text: "Decentralized Coverage" },
        { id: "launch-gallery", text: "Event Gallery" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          The Gombe State Government has officially commissioned the new Gombe State Ambulance Service. Presided over by the Honourable Commissioner of Health, the milestone project deploys state-of-the-art ambulance fleets to secure pre-hospital life-support response statewide.
        </p>

        <h3 id="launch-event" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Official Launching Ceremony</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          During the launching ceremony, the Honourable Commissioner highlighted that securing rapid response services is key to minimizing maternal deaths, roadside casualties, and referral transit risks. The commissioned ambulance fleets are equipped with high-tech trauma and resuscitation gear.
        </p>

        <h3 id="statewide-impact" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Decentralized Coverage</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          By allocating fully manned and specialized ambulances to strategic sectors in all 11 Local Government Areas, GoSEMSAS ensures that emergency medical care is accessible to both urban metropolis hubs and remote countryside sectors without delay.
        </p>

        <h3 id="launch-gallery" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Event Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-1.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 1"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-2.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 2"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-3.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 3"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-4.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 4"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-5.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 5"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-6.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 6"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-7.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 7"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-8.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 8"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-9.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 9"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-10.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 10"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-11.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 11"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-ambulance-12.jpg" class="object-cover w-full h-full" alt="Ambulance Launch 12"/></div>
        </div>
      `
    },
    "9": {
      id: "9",
      title: "Orientation of CEMTTOS and NURTW Drivers",
      category: "Training",
      date: "August 14, 2026",
      readTime: "4 min read",
      author: "Sister Deborah Mark",
      authorRole: "Chief Training Coordinator",
      image: "/images/news-orientation-cemttos-1.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "nurtw-engagement", text: "NURTW Engagement" },
        { id: "cemttos-coordination", text: "CEMTTOS Role" },
        { id: "orientation-gallery", text: "Orientation Gallery" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          To ensure unified operation of dispatch pipelines, GoSEMSAS organized an interactive orientation session for CEMTTOS coordinators and NURTW ambulance drivers. The session coordinates logistical pathways and highway dispatch guidelines.
        </p>

        <h3 id="nurtw-engagement" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">NURTW Engagement</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          First-responder NURTW drivers reviewed emergency ambulance navigation regulations, safe driving operations under siren conditions, and real-time coordination with highway control posts.
        </p>

        <h3 id="cemttos-coordination" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">CEMTTOS Role</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          CEMTTOS representatives aligned their regional dispatch trackers with the primary GoSEMSAS digital room, guaranteeing that vehicle locations are monitored continuously to secure low response metrics.
        </p>

        <h3 id="orientation-gallery" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Orientation Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-orientation-cemttos-1.jpg" class="object-cover w-full h-full" alt="Orientation 1"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-orientation-cemttos-2.jpg" class="object-cover w-full h-full" alt="Orientation 2"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-orientation-cemttos-3.jpg" class="object-cover w-full h-full" alt="Orientation 3"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-orientation-cemttos-4.jpg" class="object-cover w-full h-full" alt="Orientation 4"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-orientation-cemttos-5.jpg" class="object-cover w-full h-full" alt="Orientation 5"/></div>
        </div>
      `
    },
    "8": {
      id: "8",
      title: "Launching of SEMSAS Room",
      category: "Partnerships",
      date: "August 14, 2026",
      readTime: "3 min read",
      author: "Mrs. Amina Danjuma",
      authorRole: "Head of Communications",
      image: "/images/news-launch-room-1.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "room-setup", text: "Operations Room Infrastructure" },
        { id: "dispatch-system", text: "Integrated Dispatch System" },
        { id: "room-gallery", text: "SEMSAS Room Gallery" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          The Gombe State SEMSAS has officially opened its dedicated dispatch and operations headquarters, known as the SEMSAS Room. The new digital communications node will manage caller triage, vehicle routing, and clinic alerts.
        </p>

        <h3 id="room-setup" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Operations Room Infrastructure</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Equipped with advanced satellite navigation tracking monitors, digital hotlines, and server frames, the SEMSAS Room handles emergency calls coming from the 0703 382 5646 helpline.
        </p>

        <h3 id="dispatch-system" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Integrated Dispatch System</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Command operators will run specialized dispatch software to map caller coordinates, select the closest active ambulance unit, and track transit speeds to optimize medical outcomes.
        </p>

        <h3 id="room-gallery" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">SEMSAS Room Gallery</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-1.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 1"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-2.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 2"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-3.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 3"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-4.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 4"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-5.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 5"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-6.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 6"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-7.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 7"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-8.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 8"/></div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100"><img src="/images/news-launch-room-9.jpg" class="object-cover w-full h-full" alt="SEMSAS Room 9"/></div>
        </div>
      `
    },
    "7": {
      id: "7",
      title: "Engagement with LGAs during Advocacy to LGA Chairmen and Orientation of RESMAT officers and NURTW drivers",
      category: "Community Outreach",
      date: "August 14, 2026",
      readTime: "4 min read",
      author: "Dr. Suraj Abdulkarim",
      authorRole: "State SEMSAS Coordinator",
      image: "/images/news-advocacy-1.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "advocacy-lga", text: "Advocacy to LGA Chairmen" },
        { id: "orientation-resmat", text: "RESMAT & NURTW Orientation" },
        { id: "engagement-gallery", text: "Event Gallery" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          To ensure unified operation of the emergency dispatch pipelines, the Gombe State Emergency Medical Services and Ambulance System (GoSEMSAS) launched a state-wide advocacy and community orientation campaign. The drive aligns local government leaders, responders, and transport unions to facilitate emergency rescues.
        </p>

        <h3 id="advocacy-lga" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Advocacy to LGA Chairmen</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Advocacy visits were conducted directly to local government chairmen. The visits secure local commitment, political support, and resource coordination to assure that emergency ambulances can navigate and serve remote communities within every local government area.
        </p>

        <h3 id="orientation-resmat" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">RESMAT & NURTW Orientation</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Crucially, GoSEMSAS held orientation sessions for RESMAT officers and NURTW drivers. As primary actors in transit and logistics, NURTW drivers were oriented on traffic coordination protocols during ambulance dispatch, while RESMAT officers reviewed standardized life support care guidelines.
        </p>

        <h3 id="engagement-gallery" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Event Gallery</h3>
        <p class="text-muted-text font-light leading-relaxed mb-4">
          Highlights from the advocacy engagement and orientation activities:
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-1.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 1"/>
          </div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-2.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 2"/>
          </div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-3.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 3"/>
          </div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-4.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 4"/>
          </div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-5.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 5"/>
          </div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-6.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 6"/>
          </div>
          <div class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img src="/images/news-advocacy-7.jpg" class="object-cover w-full h-full" alt="LGA Advocacy Image 7"/>
          </div>
        </div>
      `
    },
    "1": {
      id: "1",
      title: "Gombe State SEMSAS Expands Rapid Response Station Coverage to Southern Regions",
      category: "Emergency Response",
      date: "August 1, 2026",
      readTime: "5 min read",
      author: "Dr. Suraj Abdulkarim",
      authorRole: "State SEMSAS Coordinator",
      image: "/images/news-hero.jpg",
      toc: [
        { id: "introduction", text: "Introduction" },
        { id: "regional-impact", text: "Regional Expansion Impact" },
        { id: "clinical-standards", text: "Clinical and Logistics Setup" },
        { id: "future-roadmap", text: "Future Infrastructure Goals" }
      ],
      contentHtml: `
        <h3 id="introduction" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Introduction</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          The Gombe State Emergency Medical Services and Ambulance System (SEMSAS) has officially deployed secondary ambulance hubs to Kaltungo and Balanga Local Government Areas. This deployment marks a major milestone in establishing decentralized state emergency systems. By placing vehicles in high-need districts, SEMSAS is drastically lowering response times during traffic accidents and urgent clinical transfers.
        </p>

        <h3 id="regional-impact" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Regional Expansion Impact</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Prior to this setup, emergencies occurring on the trans-state highways in southern Gombe required deployment from the central metropolis, resulting in delay periods. The new localized stations will post crew teams in close proximity, guaranteeing that response coordinates are met within target minutes.
        </p>

        <h3 id="clinical-standards" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Clinical and Logistics Setup</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          Each station carries standard Type-B ambulances equipped with cardiac monitors, portable oxygen ports, and emergency trauma pharmaceuticals. Crucially, the crews are connected to the central 0703 382 5646 digital routing matrix, enabling real-time dispatch management and hospital alerts in transit.
        </p>

        <h3 id="future-roadmap" class="text-xl font-heading font-black text-primary-navy mt-8 mb-4">Future Infrastructure Goals</h3>
        <p class="text-muted-text font-light leading-relaxed mb-6">
          State Coordinator Dr. Yusuf stated that in the next administrative quarter, plans will be finalized to expand stations to northern districts, assuring that Gombe State achieves 100% universal emergency safety net coverage under NEMSAS regulatory guidelines.
        </p>
      `
    }
  };

  const article = articlesDb[id] || articlesDb["1"];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end bg-[#0A2A52] pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-20 filter brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="space-y-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Newsroom
            </Link>
            <div className="flex items-center gap-3">
              <span className="bg-emergency-red px-2.5 py-1 rounded text-[10px] uppercase font-bold text-white tracking-wider">
                {article.category}
              </span>
              <span className="text-xs text-gray-300 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl text-white max-w-4xl leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            
            {/* Sticky Table of Contents (Left) */}
            <motion.div variants={fadeUpItem} className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <h4 className="font-heading font-black text-xs uppercase tracking-widest text-primary-navy border-b border-gray-100 pb-2">
                  Table of Contents
                </h4>
                <ul className="space-y-3 text-xs">
                  {article.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-muted-text hover:text-emergency-red block transition-colors font-medium"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Print/Download Options */}
                <div className="pt-6 border-t border-gray-100 space-y-2">
                  <button
                    onClick={handlePrint}
                    className="group w-full flex items-center gap-2 text-left text-xs font-semibold text-muted-text hover:text-primary-navy transition-all duration-200 px-2.5 py-2 rounded-lg hover:bg-primary-navy/5"
                  >
                    <Printer className="w-4 h-4 text-muted-text group-hover:text-primary-navy transition-colors" /> Print Article
                  </button>
                  <button
                    onClick={() => alert("PDF download started (placeholder)...")}
                    className="group w-full flex items-center gap-2 text-left text-xs font-semibold text-muted-text hover:text-primary-navy transition-all duration-200 px-2.5 py-2 rounded-lg hover:bg-primary-navy/5"
                  >
                    <FileDown className="w-4 h-4 text-muted-text group-hover:text-primary-navy transition-colors" /> Download as PDF
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Article Content (Center) */}
            <motion.div variants={fadeUpItem} className="lg:col-span-6 space-y-6 text-left">
              {/* Date Row */}
              <div className="flex items-center border-b border-gray-100 pb-6 text-xs text-muted-text">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-primary-navy" /> {article.date}
                </div>
              </div>

              {/* Body Content */}
              <div
                className="prose prose-slate max-w-none text-xs sm:text-sm font-light text-muted-text leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />

              {/* Share Bar */}
              <div className="border-t border-gray-100 pt-8 flex items-center justify-between gap-4 text-xs font-semibold text-muted-text">
                <span className="flex items-center gap-1.5"><Share2 className="w-4 h-4 text-primary-navy" /> Share this news:</span>
                <div className="flex gap-2">
                  {["Facebook", "Twitter", "WhatsApp"].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => alert(`Shared to ${platform}`)}
                      className="bg-bg-gray hover:bg-primary-navy hover:text-white px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Related Articles (Right) */}
            <motion.div variants={fadeUpItem} className="lg:col-span-3 space-y-8">
              <h4 className="font-heading font-black text-xs uppercase tracking-widest text-primary-navy border-b border-gray-100 pb-2">
                Related Articles
              </h4>
              <div className="space-y-6">
                {[
                  { id: "2", title: "Clinical Paramedics Team Completes Advanced Training", date: "July 24, 2026" },
                  { id: "3", title: "Highway Response Units Optimised for High-Traffic Corridors", date: "July 18, 2026" }
                ].map((rel) => (
                  <div key={rel.id} className="space-y-1.5 text-left">
                    <span className="text-[10px] text-muted-text font-medium">{rel.date}</span>
                    <h5 className="font-heading font-extrabold text-xs text-primary-navy hover:text-emergency-red leading-snug">
                      <Link href={`/news/${rel.id}`}>{rel.title}</Link>
                    </h5>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
