"use client";
import Link from "next/link";
import { useState } from "react";

// GoSEMSAS (GoSEMSAS geometry) header: Container 66px, Nav 16px, Menu Black 10px pill, Primary 58px
export default function Header() {
  const [mobile, setMobile] = useState(false);
  return (
    <div className="w-full bg-white">
      <header className="w-full bg-white py-3">
        <div className="mx-auto max-w-[1280px] px-4">
          {/* GoSEMSAS Container rounded 66px - outer */}
          <div className="rounded-[32px] md:rounded-[66px] bg-white">
            {/* Nav Bar rounded 16px with soft border/shadow like GoSEMSAS */}
            <nav className="flex items-center justify-between rounded-[16px] border border-black/[0.06] bg-white px-3 py-2 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-6">
                {/* Logo Box - GoSEMSAS uses N6Px SVG */}
                <Link href="/" className="flex items-center gap-2">
                  <img src="/images/gosemsas-logo.svg" alt="GoSEMSAS" className="h-[28px] w-auto object-contain" />
                  <span className="hidden sm:inline font-black tracking-tight text-[18px]">GoSEMSAS</span>
                </Link>

                {/* Menu Black pills - desktop */}
                <div className="hidden lg:flex items-center gap-1.5">
                  <Link href="/about" className="rounded-[10px] px-3.5 py-2 text-sm font-medium text-black/70 hover:bg-red-50 hover:text-red-700 hover:border-red-300 border border-transparent transition-all">About</Link>
                  <Link href="/services" className="rounded-[10px] px-3.5 py-2 text-sm font-medium text-black/70 hover:bg-red-50 hover:text-red-700 hover:border-red-300 border border-transparent transition-all">Services</Link>
                  <Link href="/organizational-structure" className="rounded-[10px] px-3.5 py-2 text-sm font-medium text-black/70 hover:bg-red-50 hover:text-red-700 hover:border-red-300 border border-transparent transition-all">Structure</Link>
                  <Link href="/partners" className="rounded-[10px] px-3.5 py-2 text-sm font-medium text-black/70 hover:bg-red-50 hover:text-red-700 hover:border-red-300 border border-transparent transition-all">Partners</Link>
                  <Link href="/emergency-information" className="rounded-full bg-[#F32A4D] px-4 py-2 text-sm font-bold text-white hover:bg-[#c81235] shadow-lg hover:shadow-xl hover:shadow-red-400/40 transition-all">Emergency 0703 382 5646</Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/news" className="hidden md:inline-flex rounded-[10px] px-3.5 py-2 text-sm font-medium text-black/70 hover:bg-black/5">Media</Link>
                <Link href="/contact" className="hidden md:inline-flex rounded-[10px] px-3.5 py-2 text-sm font-medium text-black/70 hover:bg-red-50 hover:text-red-700 transition-colors">Contact</Link>
                {/* Primary Button 58px - GoSEMSAS with red accent */}
                <Link href="/dashboard" className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#F32A4D] border border-[#F32A4D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c81235] hover:shadow-lg hover:shadow-red-400/30 transition-all">
                  Live Dashboard
                </Link>
                <button onClick={() => setMobile(!mobile)} className="lg:hidden w-9 h-9 rounded-full border border-red-300 flex flex-col items-center justify-center gap-1 hover:bg-red-50 transition-colors">
                  <span className="block w-4 h-0.5 bg-red-600" />
                  <span className="block w-4 h-0.5 bg-red-600" />
                  <span className="block w-4 h-0.5 bg-red-600" />
                </button>
              </div>
            </nav>
          </div>

          {mobile && (
            <div className="mt-2 rounded-[20px] border border-black/10 bg-white p-4 shadow-xl">
              <div className="flex flex-col gap-1">
                {[
                  ["/about","About"],
                  ["/services","Services"],
                  ["/leadership","Leadership"],
                  ["/organizational-structure","Structure"],
                  ["/partners","Partners"],
                  ["/emergency-information","Emergency Info"],
                  ["/news","News"],
                  ["/gallery","Gallery"],
                  ["/downloads","Downloads"],
                  ["/contact","Contact"],
                  ["/dashboard","Live Dashboard"],
                ].map(([href,label])=> (
                  <Link key={href} href={href} onClick={()=>setMobile(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-red-50 hover:text-red-700 transition-colors">{label}</Link>
                ))}
                <a href="tel:07033825646" className="mt-2 rounded-full bg-[#f1314d] py-3 text-center text-sm font-black text-white hover:bg-[#d91c3e] transition-colors shadow-md hover:shadow-lg hover:shadow-red-400/30">Emergency 0703 382 5646</a>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
