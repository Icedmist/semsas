import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import AnimatedGradientBar from "@/components/AnimatedGradientBar";

// Single font for entire app — Urbanist (Healixx primary)
const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoSEMSAS — Gombe State Emergency Medical Services and Ambulance System",
  description: "Official digital platform for Gombe State NEMSAS. Emergency Dispatch: 0703 382 5646 — 24/7 statewide. Rapid ambulance dispatch, pre-hospital stabilization, and coordinated referrals across 11 LGAs.",
  icons: {
    icon: "/images/gosemsas-logo-light.svg",
    shortcut: "/images/gosemsas-logo-light.svg",
    apple: "/images/gosemsas-logo-light.svg",
  },
  openGraph: {
    title: "GoSEMSAS — Gombe State Emergency Medical Services",
    description: "Bridging medical emergencies and health facilities across Gombe State. 24/7 dispatch 0703 382 5646.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a] font-sans relative">
        {/* Animated vertical gradient bar — Image 1 stylish animation */}
        <AnimatedGradientBar />
        {children}
      </body>
    </html>
  );
}
