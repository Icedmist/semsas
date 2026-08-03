"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  HelpCircle,
  FileCheck,
  Building,
  Activity,
  Award,
  Shield,
  Truck
} from "lucide-react";

// Zod Schema for validation
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactMethod: z.enum(["email", "phone"]),
  consent: z.boolean().refine((val) => val === true, "You must consent to data processing")
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactMethod: "email" as "email" | "phone",
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const departments = [
    { name: "Emergency Operations", ext: "Ext 101", phone: "07033825646", icon: <Activity className="w-5 h-5" /> },
    { name: "Administration", ext: "Ext 202", phone: "+234 803 000 0000", icon: <Building className="w-5 h-5" /> },
    { name: "Clinical Training", ext: "Ext 303", phone: "+234 803 000 0001", icon: <Award className="w-5 h-5" /> },
    { name: "Media & Relations", ext: "Ext 404", phone: "+234 803 000 0002", icon: <Shield className="w-5 h-5" /> },
    { name: "Fleet Management", ext: "Ext 505", phone: "+234 803 000 0003", icon: <Truck className="w-5 h-5" /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // Validate using Zod
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    // Mock API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        contactMethod: "email",
        consent: false
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="pt-20 bg-bg-gray">
      {/* Hero Banner */}
      <section className="relative py-20 bg-primary-navy text-white text-center overflow-hidden hero-banner">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emergency-red/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <nav className="text-xs font-semibold tracking-widest text-gray-300 uppercase">
            <Link href="/" className="hover:text-emergency-red">Home</Link>
            <span className="mx-2 text-white/50">/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Contact Gombe SEMSAS
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Need logistical information or want to partner? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Grid of contact details & form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side: details cards */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-3">
                <span className="section-tag">
                  Directory details
                </span>
                <h2 className="font-heading font-black text-3xl text-primary-navy">
                  Corporate Offices
                </h2>
              </div>

              {/* Cards list */}
              <div className="space-y-6">
                <div className="bg-bg-gray rounded-2xl p-5 border border-gray-150 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-navy/5 text-primary-navy flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-primary-navy">Gombe Headquarters</h4>
                    <p className="text-xs text-muted-text mt-1.5 leading-relaxed">
                      Gombe State Ministry of Health Complex, Gombe, Gombe State, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="bg-bg-gray rounded-2xl p-5 border border-gray-150 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emergency-red/5 text-emergency-red flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-primary-navy">Administrative Line</h4>
                    <p className="text-xs text-muted-text mt-1">Admin Office: +234 (0) 803 000 0000</p>
                    <p className="text-xs text-emergency-red font-bold mt-1">Emergency Dispatch: Dial 0703 382 5646</p>
                  </div>
                </div>

                <div className="bg-bg-gray rounded-2xl p-5 border border-gray-150 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emergency-blue/5 text-emergency-blue flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-primary-navy">Office Hours</h4>
                    <p className="text-xs text-muted-text mt-1">Admin Desk: Monday &ndash; Friday (8:00 AM &ndash; 4:00 PM)</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">Emergency Triage: 24/7 Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:col-span-7 bg-bg-gray rounded-3xl p-8 border border-gray-150 shadow-sm relative">
              <h3 className="font-heading font-extrabold text-lg text-primary-navy mb-6 text-left">
                Send a Message
              </h3>
              
              <form className="space-y-5 text-left" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-primary-navy" htmlFor="name">Full Name</label>
                    <input
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-navy"
                      type="text"
                      id="name"
                      placeholder="e.g. Ibrahim Yusuf"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-[10px] text-emergency-red font-semibold">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-primary-navy" htmlFor="email">Email Address</label>
                    <input
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-navy"
                      type="email"
                      id="email"
                      placeholder="e.g. ibrahim@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-[10px] text-emergency-red font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-primary-navy" htmlFor="phone">Phone Number</label>
                    <input
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-navy"
                      type="text"
                      id="phone"
                      placeholder="e.g. +2348030000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-[10px] text-emergency-red font-semibold">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-primary-navy" htmlFor="method">Preferred Contact Method</label>
                    <select
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-navy"
                      id="method"
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as any })}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary-navy" htmlFor="subject">Subject</label>
                  <input
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-navy"
                    type="text"
                    id="subject"
                    placeholder="Brief summary of your inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  {errors.subject && <p className="text-[10px] text-emergency-red font-semibold">{errors.subject}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-primary-navy" htmlFor="message">Message Details</label>
                  <textarea
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary-navy min-h-[100px]"
                    id="message"
                    placeholder="Write detailed inquiry descriptions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <p className="text-[10px] text-emergency-red font-semibold">{errors.message}</p>}
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      className="mt-1 flex-shrink-0"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    />
                    <span className="text-[10px] leading-relaxed text-muted-text">
                      I consent to Gombe State SEMSAS storing my details to reply to my administrative inquiry.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[10px] text-emergency-red font-semibold">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-dark w-full py-3.5 text-xs"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </form>

              {/* Success Notification overlay */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-black text-xl text-primary-navy">Message Sent Successfully</h3>
                    <p className="text-xs text-muted-text max-w-sm font-light">
                      Thank you for contacting Gombe State SEMSAS. Our administrative team will review your inquiry and reply shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="py-20 bg-bg-gray border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h3 className="font-heading font-black text-2xl text-primary-navy">
              Department Directory
            </h3>
            <p className="text-muted-text text-xs font-light">
              Dial direct lines for specific inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {departments.map((dept, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-gray-150 text-left flex flex-col justify-between min-h-[140px]"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-navy/5 text-primary-navy flex items-center justify-center mb-3">
                  {dept.icon}
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-xs text-primary-navy leading-snug">
                    {dept.name}
                  </h4>
                  <p className="text-[10px] text-muted-text mt-0.5">{dept.ext}</p>
                </div>
                <p className="text-xs font-extrabold text-emergency-red mt-2">
                  {dept.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
