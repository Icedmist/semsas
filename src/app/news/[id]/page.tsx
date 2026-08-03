"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Printer,
  FileDown,
  ChevronRight,
  ArrowRight,
  BookOpen,
  HelpCircle
} from "lucide-react";

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
      <section className="relative h-[40vh] min-h-[300px] flex items-end bg-primary-navy pb-8 overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Table of Contents (Left) */}
            <div className="lg:col-span-3 hidden lg:block">
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
                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center gap-2 text-left text-xs font-semibold text-muted-text hover:text-primary-navy transition-colors"
                  >
                    <Printer className="w-4 h-4" /> Print Article
                  </button>
                  <button
                    onClick={() => alert("PDF download started (placeholder)...")}
                    className="w-full flex items-center gap-2 text-left text-xs font-semibold text-muted-text hover:text-primary-navy transition-colors"
                  >
                    <FileDown className="w-4 h-4" /> Download as PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content (Center) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Author and Date Row */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6 text-xs text-muted-text">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-navy/5 flex items-center justify-center text-primary-navy font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-heading font-extrabold text-primary-navy">{article.author}</h5>
                    <p className="text-[10px]">{article.authorRole}</p>
                  </div>
                </div>
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
                      className="bg-bg-gray hover:bg-primary-navy/5 px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] transition-colors"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Articles (Right) */}
            <div className="lg:col-span-3 space-y-8">
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
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
