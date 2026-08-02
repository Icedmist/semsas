"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, Filter, FileText, ChevronDown } from "lucide-react";

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

export default function Newsroom() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

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
      id: "1",
      title: "Gombe State SEMSAS Expands Rapid Response Station Coverage to Southern Regions",
      category: "Emergency Response",
      date: "August 1, 2026",
      readTime: "5 min read",
      summary: "In a strategic effort to improve response times across Gombe State, SEMSAS has successfully established new ambulance deployment points in Kaltungo and Balanga Local Government Areas. This deployment will provide direct coverage for transit routes and rural medical emergencies.",
      author: "Dr. Abdullahi Yusuf Gombe",
      image: "/images/news-hero.jpg",
      featured: true
    },
    {
      id: "2",
      title: "Clinical Paramedics Team Completes Advanced Trauma Life Support Training",
      category: "Training",
      date: "July 24, 2026",
      readTime: "4 min read",
      summary: "Forty field paramedics and ambulance drivers have concluded intensive clinical training centered on trauma triage, cardiac emergencies, and airway management.",
      author: "Sister Deborah Mark",
      image: "/images/about-personnel.jpg"
    },
    {
      id: "3",
      title: "Highway Response Units Optimised for High-Traffic Corridors Ahead of Festive Season",
      category: "Road Safety",
      date: "July 18, 2026",
      readTime: "3 min read",
      summary: "Gombe SEMSAS and FRSC have aligned highway patrols to post standby ambulance units at critical crash zones along the Gombe-Yola expressway.",
      author: "Mrs. Amina Danjuma",
      image: "/images/hero-ambulance.jpg"
    },
    {
      id: "4",
      title: "Community Outreach Campaign Teaches Essential Cardiopulmonary Resuscitation (CPR)",
      category: "Community Outreach",
      date: "July 12, 2026",
      readTime: "6 min read",
      summary: "SEMSAS coordinators completed community-wide awareness demonstrations in Billiri, teaching over 300 volunteers basic first-aid skills and recovery positions.",
      author: "Dr. Bello Ibrahim",
      image: "/images/news-hero.jpg"
    },
    {
      id: "5",
      title: "Strategic Partnerships and Funding Alignment Finalised with FMOH and NEMSAS",
      category: "Partnerships",
      date: "July 04, 2026",
      readTime: "4 min read",
      summary: "Federal medical inspectors audited the Gombe dispatch operations and approved funding structures designed to subsidize maternal healthcare transfers.",
      author: "Dr. Abdullahi Yusuf Gombe",
      image: "/images/services-hero.jpg"
    },
    {
      id: "6",
      title: "SEMSAS Deploys Specialized Disease Transport Units to Support Public Health",
      category: "Public Health",
      date: "June 28, 2026",
      readTime: "5 min read",
      summary: "Three modern vehicles have been modified to safely transfer highly infectious disease cases under negative pressure protocols to regional research units.",
      author: "Dr. Bello Ibrahim",
      image: "/images/about-hero.jpg"
    }
  ];

  // Filtering Logic
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/news-hero.jpg"
            alt="SEMSAS Public Safety Training Session"
            fill
            className="object-cover opacity-25 filter brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">News & Press</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            News & Press Centre
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto font-light leading-relaxed">
            Stay informed with the latest emergency response activities, training programmes, public health campaigns, and official announcements.
          </p>
        </div>
      </section>

      {/* Featured News Block */}
      {featuredArticle && searchQuery === "" && selectedCategory === "All" && (
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-bg-gray rounded-3xl overflow-hidden shadow-sm border border-gray-150 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
              
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
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {featuredArticle.author}</span>
                  </div>
                  <Link
                    href={`/news/${featuredArticle.id}`}
                    className="inline-flex items-center gap-1.5 bg-primary-navy hover:bg-emergency-red text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Section */}
      <section className="py-12 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary-navy"
                type="text"
                placeholder="Search by title, author, or keyword..."
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
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary-navy text-white"
                      : "bg-white text-muted-text border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-150 flex flex-col justify-between group hover:shadow-md transition-shadow"
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

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-muted-text font-semibold flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-primary-navy" /> {art.author}
                      </span>
                      <Link
                        href={`/news/${art.id}`}
                        className="font-bold text-primary-navy hover:text-emergency-red transition-colors inline-flex items-center gap-1"
                      >
                        Read More <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 bg-white border border-gray-150 rounded-3xl flex flex-col items-center justify-center space-y-4 text-center p-6">
                <FileText className="w-12 h-12 text-gray-300" />
                <h4 className="font-heading font-extrabold text-lg text-primary-navy">No articles match your search</h4>
                <p className="text-xs text-muted-text max-w-sm">Try typing different search keywords or selecting another category.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
