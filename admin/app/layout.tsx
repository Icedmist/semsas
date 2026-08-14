import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans bg-bg-gray text-text-dark">
        {children}
      </body>
    </html>
  );
}
