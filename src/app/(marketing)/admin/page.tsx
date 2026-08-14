"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Download,
  AlertCircle,
  Users,
  Settings,
  PlusCircle,
  CheckCircle2,
  Hourglass,
  UserCheck
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { stagger, fadeUpItem, fadeUp } from "@/lib/motion-variants";

export default function AdminDashboard() {
  const [selectedRole, setSelectedRole] = useState("Content Administrator");

  const stats = [
    { label: "Published Articles", count: 18, icon: <FileText className="w-5 h-5 text-emergency-blue" /> },
    { label: "Gallery Assets", count: 42, icon: <ImageIcon className="w-5 h-5 text-primary-navy" /> },
    { label: "Active Downloads", count: 8, icon: <Download className="w-5 h-5 text-success-green" /> },
    { label: "Emergency Alerts", count: 1, icon: <AlertCircle className="w-5 h-5 text-emergency-red" /> }
  ];

  const recentContent = [
    { title: "SEMSAS Expands Rapid Response to Southern regions", type: "News", status: "Published", date: "Aug 1, 2026", author: "Dr. A. Yusuf" },
    { title: "Ambulance Arrival at Gombe Specialist Hospital", type: "Gallery", status: "Published", date: "Aug 1, 2026", author: "Sister Deborah" },
    { title: "SEMSAS Gombe Chapter Annual Review Report", type: "Download", status: "Draft", date: "Jul 29, 2026", author: "Mrs. A. Danjuma" },
    { title: "Advanced Roadway CPR Instruction Video", type: "Video", status: "Draft", date: "Jul 24, 2026", author: "Sister Deborah" }
  ];

  const roles = [
    "Super Administrator",
    "Content Administrator",
    "News Editor",
    "Media Officer",
    "Communications Officer"
  ];

  return (
    <div className="pt-20 bg-bg-gray min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-6 text-left">
          <div className="space-y-1">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">
              SEMSAS Headless CMS
            </h1>
            <p className="text-xs text-muted-text">
              Portal Administration Console &bull; Gombe State Emergency Chapter
            </p>
          </div>

          {/* Role Changer Mock */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary-navy flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emergency-red" /> Current Role:
            </span>
            <select
              className="field w-auto! font-semibold"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 h-fit text-left">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-1.5"
            >
              <div className="text-[10px] uppercase font-bold text-muted-text tracking-widest px-2">
                Manage Content
              </div>
              <ul className="space-y-1 text-xs">
                <motion.li variants={fadeUpItem} className="relative">
                  <button className="relative w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white font-bold">
                    <motion.span
                      layoutId="admin-nav"
                      className="absolute inset-0 rounded-xl bg-primary-navy shadow-[0_8px_24px_-8px_rgba(0,82,165,0.5)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                    <LayoutDashboard className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Dashboard Home</span>
                  </button>
                </motion.li>
                <motion.li variants={fadeUpItem}>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-text hover:bg-slate-50 hover:text-primary-navy font-semibold transition-colors">
                    <FileText className="w-4 h-4" /> News & Press Articles
                  </button>
                </motion.li>
                <motion.li variants={fadeUpItem}>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-text hover:bg-slate-50 hover:text-primary-navy font-semibold transition-colors">
                    <ImageIcon className="w-4 h-4" /> Gallery & Media Library
                  </button>
                </motion.li>
                <motion.li variants={fadeUpItem}>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-text hover:bg-slate-50 hover:text-primary-navy font-semibold transition-colors">
                    <Download className="w-4 h-4" /> Policy Downloads
                  </button>
                </motion.li>
                <motion.li variants={fadeUpItem}>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-text hover:bg-slate-50 hover:text-primary-navy font-semibold transition-colors">
                    <AlertCircle className="w-4 h-4" /> Dispatch Alerts
                  </button>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-1.5 pt-4 border-t border-slate-100"
            >
              <div className="text-[10px] uppercase font-bold text-muted-text tracking-widest px-2">
                System Options
              </div>
              <ul className="space-y-1 text-xs">
                <motion.li variants={fadeUpItem}>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-text hover:bg-slate-50 hover:text-primary-navy font-semibold transition-colors">
                    <Users className="w-4 h-4" /> Users & Permissions
                  </button>
                </motion.li>
                <motion.li variants={fadeUpItem}>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-text hover:bg-slate-50 hover:text-primary-navy font-semibold transition-colors">
                    <Settings className="w-4 h-4" /> Portal Settings
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Core Content Area */}
          <div className="lg:col-span-9 space-y-8 text-left">

            {/* Stats Cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpItem}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-[0_24px_50px_-24px_rgba(10,42,82,0.25)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-text">{stat.label}</span>
                    <AnimatedCounter
                      value={stat.count}
                      className="font-heading font-black text-2xl text-primary-navy tabular-nums"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Content Table Block */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-primary-navy">
                    Recent Content Activities
                  </h3>
                  <p className="text-[10px] text-muted-text mt-0.5">
                    Items drafted or modified across all media folders.
                  </p>
                </div>

                <button
                  onClick={() => alert("CMS Action: Launching Rich Text Editor...")}
                  className="btn btn-dark text-xs px-4 py-2"
                >
                  <PlusCircle className="w-4 h-4" /> Create New Content
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-primary-navy font-bold border-b border-slate-100 text-left">
                      <th className="px-6 py-4">Title / Asset</th>
                      <th className="px-6 py-4">Media Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Updated</th>
                      <th className="px-6 py-4">Author</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-muted-text">
                    {recentContent.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-primary-navy">{item.title}</td>
                        <td className="px-6 py-4">{item.type}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === "Published"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-amber-500/10 text-amber-600"
                          }`}>
                            {item.status === "Published" ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : (
                              <Hourglass className="w-3 h-3" />
                            )}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4 font-medium">{item.author}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}