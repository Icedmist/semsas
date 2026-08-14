"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, Filter, FileText, ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero";
import { stagger, fadeUpItem, fadeUp, scaleIn } from "@/lib/motion-variants";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  author: string;
  image: string;
  featured?: boolean;
}

const categories = [
  "All",
  "Emergency Response",
  "Road Safety",
  "Training",
  "Community Outreach",
  "Government",
  "Public Health",
  "Partnerships",
  "Disaster Response"
];

const articles: Article[] = [
  {
    id: "12",
    title: "Onboarding of CEMTTOS and Drivers on RESMAT in Malam Sidi, Kwami LGA",
    category: "Community Outreach",
    date: "August 14, 2026",
    readTime: "4 min read",
    summary: "GoSEMSAS completed a comprehensive onboarding and registration session in Malam Sidi, Kwami LGA, registering local first-responder CEMTTOS representatives and NURTW drivers onto the RESMAT program.",
    author: "Dr. Suraj Abdulkarim",
    image: "/images/news-onboarding-kwami-1.jpg",
    featured: true
  },
  {
    id: "11",
    title: "Community Sensitization with Pregnant Mothers on RESMAT",
    category: "Public Health",
    date: "August 14, 2026",
    readTime: "4 min read",
    summary: "GoSEMSAS maternal outreach teams organized an essential community health sensitization campaign focused on educating pregnant mothers on how to use the RESMAT emergency referral services.",
    author: "Sister Deborah Mark",
    image: "/images/news-mothers-resmat-1.jpg"
  },
  {
    id: "10",
    title: "Launching of Gombe State Ambulance Service by the Honourable Commissioner of Health",
    category: "Emergency Response",
    date: "August 14, 2026",
    readTime: "5 min read",
    summary: "Gombe State officially launched its decentralized emergency ambulance service under the supervision of the Honourable Commissioner of Health, deploying modern responder vehicles to all 11 Local Government Areas to secure immediate access to stabilizing care.",
    author: "Dr. Suraj Abdulkarim",
    image: "/images/news-launch-ambulance-1.jpg"
  },
  {
    id: "9",
    title: "Orientation of CEMTTOS and NURTW Drivers",
    category: "Training",
    date: "August 14, 2026",
    readTime: "4 min read",
    summary: "To secure seamless logistics pipelines, GoSEMSAS conducted comprehensive orientation workshops for CEMTTOS coordinators and NURTW ambulance drivers, focusing on dispatch rules and highway navigation strategies.",
    author: "Sister Deborah Mark",
    image: "/images/news-orientation-cemttos-1.jpg"
  },
  {
    id: "8",
    title: "Launching of SEMSAS Room",
    category: "Partnerships",
    date: "August 14, 2026",
    readTime: "3 min read",
    summary: "The state emergency communications headquarters officially opened the new digital SEMSAS room, integrating smart dispatch monitors, live telemetry tracking, and hotline response systems.",
    author: "Mrs. Amina Danjuma",
    image: "/images/news-launch-room-1.jpg"
  },
  {
    id: "7",
    title: "Engagement with LGAs during Advocacy to LGA Chairmen and Orientation of RESMAT officers and NURTW drivers",
    category: "Community Outreach",
    date: "August 14, 2026",
    readTime: "4 min read",
    summary: "GoSEMSAS delegates carried out high-level advocacy visits to local government area chairmen, alongside comprehensive training and orientation sessions for RESMAT officers and NURTW drivers to synchronize emergency dispatch protocols and improve response times across Gombe State.",
    author: "Dr. Suraj Abdulkarim",
    image: "/images/news-advocacy-1.jpg"
  }
];

export default function Newsroom() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering Logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = articles.find((a) => a.featured);

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Section */}
      <PageHero
        title="News & Press Centre"
        subtitle="Stay informed with the latest emergency response activities, training programmes, public health campaigns, and official announcements."
        crumb="News & Press"
        image="/images/news-hero.jpg"
        imageAlt="SEMSAS Public Safety Training Session"
      />

      {/* Featured News Block */}
      {featuredArticle && searchQuery === "" && selectedCategory === "All" && (
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="py-16 bg-white border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUpItem}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.25)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8"
            >
              
              {/* Featured Image */}
              <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Featured Details */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-emergency-red px-3 py-1 rounded-md text-[10px] uppercase font-bold text-white tracking-wider">
                      Featured Announcement
                    </span>
                    <span className="text-xs font-bold text-emergency-blue">
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-primary-navy leading-tight hover:text-emergency-red transition-colors">
                    <Link href={`/news/${featuredArticle.id}`}>{featuredArticle.title}</Link>
                  </h2>

                  <p className="text-muted-text text-xs sm:text-sm font-light leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-text">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
                  </div>
                  <Link
                    href={`/news/${featuredArticle.id}`}
                    className="btn btn-dark px-5 py-2.5 text-xs"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Filter and Search Section */}
      <section className="py-12 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="field pl-10!"
                type="text"
                placeholder="Search by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-2 scrollbar-none">
              <span className="text-xs font-bold text-primary-navy flex items-center gap-1.5 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedCategory === cat
                      ? "bg-primary-navy text-white"
                      : "bg-white text-muted-text border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Dynamic Article Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <motion.div
                  key={art.id}
                  variants={fadeUpItem}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(10,42,82,0.25)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary-navy text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] text-muted-text font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {art.date} &bull; {art.readTime}
                      </span>
                      <h3 className="font-heading font-extrabold text-base text-primary-navy leading-snug group-hover:text-emergency-red transition-colors line-clamp-2">
                        <Link href={`/news/${art.id}`}>{art.title}</Link>
                      </h3>
                      <p className="text-muted-text text-xs leading-relaxed font-light line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end text-[11px]">
                      <Link
                        href={`/news/${art.id}`}
                        className="font-bold text-primary-navy hover:text-emergency-red transition-colors inline-flex items-center gap-1"
                      >
                        Read More <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={scaleIn}
                className="col-span-full py-16 bg-white border border-slate-200/80 rounded-3xl flex flex-col items-center justify-center space-y-4 text-center p-6"
              >
                <FileText className="w-12 h-12 text-gray-300" />
                <h4 className="font-heading font-extrabold text-lg text-primary-navy">No articles match your search</h4>
                <p className="text-xs text-muted-text max-w-sm">Try typing different search keywords or selecting another category.</p>
              </motion.div>
            )}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
