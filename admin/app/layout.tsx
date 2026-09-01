import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEMSAS Admin Console",
  description:
    "Administration console for the Gombe State Emergency Medical Services & Ambulance System (SEMSAS) live dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full font-sans bg-white text-[#0a0a0a]">
        {children}
      </body>
    </html>
  );
}
