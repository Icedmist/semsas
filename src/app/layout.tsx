import type { Metadata } from "next";
import { Urbanist, Inter, Fredoka } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400","500","600","700","900"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400","600"],
  display: "swap",
});
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoSEMSAS — Gombe State Emergency Medical Services and Ambulance System",
  description: "Official digital platform for Gombe State NEMSAS. Emergency Dispatch: 0703 382 5646 — 24/7 statewide. Rapid ambulance dispatch, pre-hospital stabilization, and coordinated referrals across 11 LGAs.",
  openGraph: {
    title: "GoSEMSAS — Gombe State Emergency Medical Services",
    description: "Bridging medical emergencies and health facilities across Gombe State. 24/7 dispatch 0703 382 5646.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} ${inter.variable} ${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a]">{children}</body>
    </html>
  );
}
