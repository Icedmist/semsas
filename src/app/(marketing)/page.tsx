import Link from "next/link";

// GoSEMSAS (GoSEMSAS geometry) homepage rebuilt with GoSEMSAS content
// Uses GoSEMSAS geometry: max-w 1280, rounded 40px sections, 66px nav, 58px primary button, Urbanist/Fredoka, #f0f5f6, #0a0a0a, #ffce8a

export default function Home() {
  return (
    <div className="bg-white">
      {/* HERO — GoSEMSAS Hero Section: left text + right hero image UOMU... */}
      <section className="mx-auto max-w-[1280px] px-4">
        <div className="rounded-[32px] bg-white border border-black/5 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h1 className="mt-0 text-3xl md:text-5xl font-black leading-[0.95] tracking-tight" style={{fontFamily:"var(--font-urbanist)"}}>
                Where care<br />
                <span className="text-black/30">meets rapid</span><br />
                response
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-black/60 max-w-xl">
                From road traffic crashes to maternal emergencies, GoSEMSAS bridges the gap between 11 LGAs and health facilities — rapid dispatch, pre-hospital stabilization, coordinated referrals — 24/7 statewide.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="tel:07033825646" className="rounded-full bg-[#dc2626] border border-[#b91c1c] px-6 py-3 text-sm font-bold text-white hover:bg-[#b91c1c] shadow-[0_2px_12px_rgba(220,38,38,0.25)]">Emergency 0703 382 5646</a>
                <Link href="/emergency-information" className="rounded-full bg-white border border-black/10 px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white hover:border-black">How to call →</Link>
              </div>
              <div className="mt-6 flex gap-6 text-xs font-semibold">
                <span><b className="text-sm">11 LGAs</b> <span className="text-black/40">Covered</span></span>
                <span><b className="text-sm">55</b> <span className="text-black/40">Ambulances</span></span>
                <span><b className="text-sm">24/7</b> <span className="text-black/40">Dispatch</span></span>
              </div>
            </div>
            <div className="relative bg-[#f0f5f6] p-4 lg:p-6 flex items-center">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-white border border-black/5">
                <img src="/images/UOMUepVQXzu9Z4Iu7nm30ARGDI.png" alt="Emergency response" className="h-full w-full object-cover" />
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 backdrop-blur p-3 border border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/images/CzT5Uj890xo8WuZWLcMHca8t5z0.svg" alt="" className="w-9 h-7 object-contain" />
                    <div className="text-xs leading-tight"><div className="font-bold">Dispatch Centre</div><div className="text-black/60">Avg Response 14:30</div></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold">55 Ambulances</div>
                    <div className="text-[11px] text-emerald-600 font-bold">● All Systems Working</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE — GoSEMSAS Why choose section with 40px rounded bg #f0f5f6 */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{fontFamily:"var(--font-urbanist)"}}>
                Why choose GoSEMSAS for emergency <span className="text-black/40">care & transport?</span>
              </h2>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-[20px] bg-white border border-black/5 p-4 text-center">
                  <div className="text-2xl font-black">97.2%</div>
                  <div className="text-xs text-black/50">Survival Rate</div>
                </div>
                <div className="rounded-[20px] bg-white border border-black/5 p-4 text-center">
                  <div className="text-2xl font-black">1628</div>
                  <div className="text-xs text-black/50">Emergencies</div>
                </div>
                <div className="rounded-[20px] bg-[#dc2626] text-white p-4 text-center border border-[#991b1b]">
                  <div className="text-2xl font-black">11</div>
                  <div className="text-xs opacity-60">LGAs</div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href="/about" className="rounded-full bg-[#dc2626] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#b91c1c]">Why GoSEMSAS</Link>
                <Link href="/services" className="rounded-full bg-white border border-black/10 px-5 py-2.5 text-sm font-semibold">Our Services</Link>
              </div>
            </div>
            <div className="flex-1 rounded-[24px] overflow-hidden bg-white border border-black/5 max-h-[420px]">
              <img src="/images/4t9GS4DAR9pDQAoyOtsuWlMBE.png" alt="Team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — GoSEMSAS Features designed for your health journey */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-white border border-black/5 p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-black" style={{fontFamily:"var(--font-urbanist)"}}>Features designed for your<br /><span className="text-black/40">emergency journey</span></h2>
            <p className="max-w-md text-sm leading-6 text-black/60">GoSEMSAS is designed to get help to you fast — dispatch, stabilization, and transport — with live transparency across Gombe State.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {img:"/images/3NIJipihll5Gq0XC8umIY2uao0.png", title:"Rapid Dispatch", desc:"0703 382 5646 routes to nearest ambulance in seconds."},
              {img:"/images/TlKNkGph24dTdXM8Mds4keWK1Xw.png", title:"Pre-hospital Care", desc:"BLS/ACLS stabilization on scene before hospital."},
              {img:"/images/andCpPt4jBacvOjQq85iVP07Lk.png", title:"Coordinated Referral", desc:"Pre-alert + handover to 111 facilities statewide."},
            ].map(c=> (
              <div key={c.title} className="rounded-[24px] border border-black/5 overflow-hidden bg-[#f8fafa]">
                <div className="h-[180px] overflow-hidden"><img src={c.img} alt={c.title} className="h-full w-full object-cover" /></div>
                <div className="p-5"><div className="font-bold">{c.title}</div><div className="text-sm text-black/60 mt-1 leading-6">{c.desc}</div></div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] bg-[#f0f5f6] p-5 flex items-center justify-between">
            <div className="text-sm"><b>Receiving tailored</b> alerts for your LGA helps you act proactively — <span className="text-black/50">proactive adjustments save lives.</span></div>
            <Link href="/emergency-information" className="hidden md:inline-flex rounded-full bg-[#0a0a0a] text-white px-5 py-2.5 text-sm font-semibold">Emergency Info →</Link>
          </div>
        </div>
      </section>

      {/* SIMPLE STEPS — GoSEMSAS Simple steps get to start your health journey */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black" style={{fontFamily:"var(--font-urbanist)"}}>Simple steps to get help <span className="text-black/40">in an emergency</span></h2>
              <div className="mt-6 space-y-3">
                {[
                  ["01","Call 0703 382 5646","Share location, callback, and main complaint. Stay on line."],
                  ["02","Dispatcher Verifies & Assigns","Triage + nearest ambulance + facility pre-alert."],
                  ["03","Team Stabilizes & Transports","CEMTTOS on scene, hospital handover, 48hr NEMSAS care."],
                ].map(([n,t,d])=> (
                  <div key={n} className="rounded-2xl bg-white border border-black/5 p-4 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#dc2626] text-white flex items-center justify-center text-sm font-black shrink-0">{n}</div>
                    <div><div className="font-bold text-sm">{t}</div><div className="text-sm text-black/60">{d}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] overflow-hidden bg-white border border-black/5">
              <img src="/images/TXIbSKRPFAwuK68w77ilsUwHjqE.png" alt="Steps" className="w-full h-[380px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — GoSEMSAS See how GoSEMSAS has transformed lives */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-white border border-black/5 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black text-center" style={{fontFamily:"var(--font-urbanist)"}}>See how GoSEMSAS has transformed<br /><span className="text-black/40">lives through rapid response</span></h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {name:"Aisha, Akko", text:"Ambulance arrived in 12 minutes for my labour — safe delivery, free 48hr care."},
              {name:"Musa, Kaltungo", text:"Road crash on Gombe-Yola highway — FRSC + GoSEMSAS stabilized on scene."},
              {name:"Halima, Dukku", text:"Volunteer driver network + CEMTTOS means even remote wards are covered."},
            ].map(c=> (
              <div key={c.name} className="rounded-[24px] bg-[#fef2f2] border border-red-100 p-6">
                <div className="flex gap-1 text-[#dc2626]">★★★★★</div>
                <p className="mt-3 text-sm leading-6 text-black/70">“{c.text}”</p>
                <div className="mt-4 font-bold text-sm">{c.name}</div>
                <div className="text-xs text-black/40">Verified Resident</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/testimonials" className="inline-flex rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold hover:bg-black hover:text-white">Read stories →</Link>
          </div>
        </div>
      </section>

      {/* PRICING — GoSEMSAS Choose the right plan */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black" style={{fontFamily:"var(--font-urbanist)"}}>Always free under NEMSAS</h2>
            <p className="mt-2 text-sm text-black/60">48-hour stabilization is free for all Nigerians — no plan needed. Support the system through awareness & partnership.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {name:"Citizen", price:"Free", desc:"Call 0703 382 5646, pre-hospital care, transport", cta:"Call Now", dark:false},
              {name:"RESCUE", price:"Free", desc:"Volunteer driver + CEMTTOS network, community sensitization", cta:"Join RESMAT", dark:true},
              {name:"Partner", price:"Support", desc:"For donors, facilities, FRSC/NEMA — fleet & training support", cta:"Partner →", dark:false},
            ].map(card=> (
              <div key={card.name} className={`rounded-[24px] p-6 border ${card.dark ? "bg-[#0a0a0a] text-white border-[#dc2626]" : "bg-white border-black/5"}`}>
                <div className="text-sm font-bold tracking-widest opacity-60">{card.name.toUpperCase()}</div>
                <div className="mt-2"><span className="text-3xl font-black">{card.price}</span> <span className="text-sm opacity-60">/ NEMSAS</span></div>
                <p className="mt-3 text-sm leading-6 opacity-70">{card.desc}</p>
                <a href={card.name==="Citizen"?"tel:07033825646": card.name==="RESCUE"?"/contact":"/partners"} className={`mt-6 inline-flex w-full justify-center rounded-full py-3 text-sm font-bold ${card.dark ? "bg-white text-black" : "bg-[#0a0a0a] text-white"}`}>{card.cta}</a>
                <div className="mt-4 text-xs opacity-50">• 11 LGAs • 24/7 • 55 ambulances</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW — GoSEMSAS CTA bridge to dashboard */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6 mb-2">
        <div className="rounded-[32px] bg-[#0a0a0a] text-white p-6 border-t-4 border-[#dc2626] md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-sm font-bold tracking-widest text-white/50">LIVE TRANSPARENCY</div>
            <h3 className="mt-2 text-2xl font-black">Watch operations live — 11 slides, 48 seconds</h3>
            <p className="mt-2 text-sm text-white/60">Fleet by LGA, RESMAT, facilities, calls, transport — auto-rotates + polls every 15s.</p>
          </div>
          <Link href="/dashboard" className="rounded-full bg-white text-black px-7 py-3.5 text-sm font-black hover:bg-[#ffce8a]">Open Live Dashboard →</Link>
        </div>
      </section>

      {/* PARTNERS — Healixx pill style, acronyms underlined red, no dots, moves right → */}
      <section className="mx-auto max-w-[1280px] px-4 mt-6">
        <div className="rounded-[32px] bg-white border border-black/5 p-4 md:p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="text-xs font-black tracking-widest text-black/40">OUR PARTNERS • MOVING RIGHT →</div>
            <Link href="/partners" className="text-xs font-bold underline decoration-[#dc2626] decoration-2 underline-offset-4 text-[#dc2626]">View all →</Link>
          </div>
          <div className="relative overflow-hidden rounded-full border border-black/5 bg-[#f0f5f6] py-2.5">
            <div className="flex animate-[marquee_22s_linear_infinite] whitespace-nowrap gap-6 pl-6">
              {[
                { acronym: "FMOH", name: "Federal Ministry of Health" },
                { acronym: "NEMSAS", name: "National Emergency Medical Service & Ambulance System" },
                { acronym: "FRSC", name: "Federal Road Safety Corps" },
                { acronym: "NEMA", name: "National Emergency Management Agency" },
                { acronym: "GOS-EMA", name: "Gombe State Emergency Management Agency" },
                { acronym: "GSSH", name: "Gombe State Specialist Hospital" },
                { acronym: "NPF", name: "Nigerian Police Force" },
                { acronym: "NRCS", name: "Nigerian Red Cross Society" },
                { acronym: "FMOH", name: "Federal Ministry of Health" },
                { acronym: "NEMSAS", name: "National Emergency Medical Service & Ambulance System" },
                { acronym: "FRSC", name: "Federal Road Safety Corps" },
                { acronym: "NEMA", name: "National Emergency Management Agency" },
                { acronym: "GOS-EMA", name: "Gombe State Emergency Management Agency" },
                { acronym: "GSSH", name: "Gombe State Specialist Hospital" },
                { acronym: "NPF", name: "Nigerian Police Force" },
                { acronym: "NRCS", name: "Nigerian Red Cross Society" },
              ].map((p,i)=> (
                <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-black tracking-wide shrink-0">
                  <span className="underline decoration-[#dc2626] decoration-2 underline-offset-4 text-[#dc2626]">{p.acronym}</span>
                  <span className="text-black/40 font-semibold hidden sm:inline">— {p.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
