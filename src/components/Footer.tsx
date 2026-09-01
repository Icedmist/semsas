import Link from "next/link";

// GoSEMSAS Footer faithful: Section CTA + Section Footer
export default function Footer() {
  return (
    <footer className="w-full bg-white pt-6">
      {/* Section CTA - GoSEMSAS rounded bg white with inner container */}
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="rounded-[24px] bg-[#f0f5f6] md:rounded-[32px] overflow-hidden border border-black/5">
          <div className="px-6 py-10 md:px-12 md:py-14 flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-black leading-tight" style={{fontFamily:"var(--font-urbanist)"}}>
                Speak with one of our health emergency experts to discover <span className="text-black/40">how GoSEMSAS can support your community.</span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-black/60">Start your emergency readiness with GoSEMSAS today. Your community, your health, your safety.</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a href="tel:07033825646" className="inline-flex items-center justify-center rounded-full bg-[#f1314d] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#d91c3e] shadow-md hover:shadow-lg hover:shadow-red-400/40 transition-all border border-red-600">
                Emergency 0703 382 5646
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white border-2 border-red-500 px-7 py-3.5 text-sm font-semibold hover:bg-red-600 hover:text-white transition-colors hover:border-red-700">
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Section Footer */}
          <div className="bg-white mx-2 md:mx-3 mb-3 rounded-[20px] border border-black/5 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8 justify-between">
              <div className="max-w-sm">
                <Link href="/" className="inline-flex items-center gap-2">
                  <img src="/images/gosemsas-logo.svg" alt="GoSEMSAS" className="h-7 w-auto" />
                  <span className="font-black">GoSEMSAS</span>
                </Link>
                <p className="mt-3 text-sm leading-6 text-black/60">
                  Official digital platform for Gombe State Emergency Medical Services and Ambulance System. Bridging emergencies and health facilities across 11 LGAs — 24/7 statewide.
                </p>
                <div className="mt-4 inline-flex flex-wrap gap-2">
                  <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">FMOH</span>
                  <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">NEMSAS</span>
                  <span className="rounded-full bg-red-200 px-3 py-1.5 text-xs font-bold text-red-900">World Bank</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                <div>
                  <div className="font-bold mb-3">Explore</div>
                  <div className="flex flex-col gap-2.5 text-black/60">
                    <Link href="/about" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">About Us</Link>
                    <Link href="/services" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">Services</Link>
                    <Link href="/leadership" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">Leadership</Link>
                    <Link href="/organizational-structure" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">Structure</Link>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-3">Resources</div>
                  <div className="flex flex-col gap-2.5 text-black/60">
                    <Link href="/news" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">News</Link>
                    <Link href="/gallery" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">Gallery</Link>
                    <Link href="/downloads" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">Downloads</Link>
                    <Link href="/dashboard" className="hover:text-red-600 transition-colors font-medium hover:font-semibold">Live Dashboard</Link>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-3">Emergency</div>
                  <div className="flex flex-col gap-2.5 text-black/60">
                    <a href="tel:07033825646" className="hover:text-red-700 font-mono font-bold transition-colors">0703 382 5646</a>
                    <span className="text-red-600 font-semibold">FRSC 122</span>
                    <span className="text-red-600 font-semibold">Fire 112</span>
                    <span className="text-red-600 font-semibold">Police 999</span>
                    <Link href="/emergency-information" className="hover:text-red-700 underline font-medium transition-colors">When to call</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="text-sm text-black/50">© 2025 GoSEMSAS — Gombe State Ministry of Health. All Rights Reserved.</div>
              <div className="flex items-center gap-2">
                <a href="https://x.com" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">𝕏</a>
                <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">f</a>
                <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6" />
    </footer>
  );
}
