"use client";
import { motion } from "framer-motion";

export default function AnimatedGradientBar({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none fixed left-0 top-0 h-screen w-[6px] md:w-[8px] z-30 overflow-hidden ${className}`} aria-hidden>
      {/* Gradient bar - Image 1 style, animated stylishly */}
      <motion.div
        initial={{ y: "-100%", opacity: 0.85 }}
        animate={{ y: ["-100%", "0%", "5%", "0%"] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0A2A52 0%, #1e3a8a 35%, #b01030 65%, #DC143C 100%)",
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        }}
      />
      {/* Shimmer */}
      <motion.div
        animate={{ y: ["100%", "-100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        className="absolute inset-x-0 h-[120px] bg-gradient-to-b from-transparent via-white/30 to-transparent opacity-60"
      />
      {/* Glow */}
      <div className="absolute inset-0 blur-[6px] opacity-30" style={{ background: "linear-gradient(180deg, #0A2A52, #DC143C)" }} />
    </div>
  );
}

// Also background wash for hero
export function AnimatedGradientWash() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]" aria-hidden>
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-1/2 -top-1/2 w-[200%] h-[200%] opacity-[0.04]"
        style={{
          background: "linear-gradient(180deg, #0A2A52 0%, #DC143C 100%)",
          backgroundSize: "100% 100%",
        }}
      />
      {/* Soft orbs - stylish */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #0A2A52, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[90px] opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #DC143C, transparent 70%)" }}
      />
    </div>
  );
}
