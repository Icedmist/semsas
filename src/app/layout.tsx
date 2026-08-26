import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gombe State Emergency Medical Services & Ambulance System | SEMSAS",
  description: "Gombe State SEMSAS provides 24-hour rapid response, ambulance services, pre-hospital emergency care, disaster response, and safe medical transportation across Gombe State.",
  keywords: [
    "Gombe State",
    "SEMSAS",
    "Emergency Medical Services",
    "Ambulance Services",
    "Nigeria Emergency",
    "NEMSAS",
    "Gombe Ambulance",
    "Pre-hospital Care",
  ],
  authors: [{ name: "Gombe State Government" }],
  openGraph: {
    title: "Gombe State Emergency Medical Services & Ambulance System",
    description: "Rapid response, professional paramedics, and state-of-the-art ambulance fleet serving all local government areas in Gombe State.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gombe State Emergency Medical Services & Ambulance System",
    description: "Rapid response, professional paramedics, and state-of-the-art ambulance fleet serving Gombe State.",
  },
};

/**
 * The root layout component for the SEMSAS application.
 * Wraps all pages with global font links, CSS, and basic motion config.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg-gray text-text-dark">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
