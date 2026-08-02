import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className="min-h-full flex flex-col font-sans bg-bg-gray text-text-dark">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
