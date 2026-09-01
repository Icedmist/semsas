import PageHero from "@/components/PageHero";
export default function About() {
  return (<div className="bg-white">
    <PageHero kicker="About GoSEMSAS" title="Bridging emergency and care" subtitle="GoSEMSAS is the Gombe State implementation of Nigeria's National Emergency Medical Services and Ambulance System (NEMSAS)."/>
    <section className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-[24px] bg-white border border-black/5 p-6 md:p-8"><h3 className="font-black text-xl" style={{fontFamily:"var(--font-urbanist)"}}>Mission</h3><p className="mt-3 text-sm leading-7 text-black/60">To deliver rapid, equitable emergency medical response across Gombe State, reducing preventable deaths through timely dispatch, pre-hospital stabilization, and coordinated referrals.</p><img src="/images/7gnlc03XoyHyqj0OEHZP5aunt6Y.png" alt="" className="mt-6 rounded-2xl w-full h-48 object-cover border border-black/5"/></div>
        <div className="rounded-[24px] bg-[#0a0a0a] text-white p-6 md:p-8"><h3 className="font-black text-xl" style={{fontFamily:"var(--font-urbanist)"}}>Vision</h3><p className="mt-3 text-sm leading-7 text-white/70">A resilient emergency medical system where no life is lost due to distance or delay — 11 LGAs, one coordinated network, aligned to FMOH → NEMSAS National → Gombe SEMSAS.</p><div className="mt-6 grid grid-cols-3 gap-2 text-center"><div className="rounded-2xl bg-white/10 p-3"><div className="font-black">55</div><div className="text-xs opacity-60">Ambulances</div></div><div className="rounded-2xl bg-white/10 p-3"><div className="font-black">662</div><div className="text-xs opacity-60">RESMAT</div></div><div className="rounded-2xl bg-white/10 p-3"><div className="font-black">111</div><div className="text-xs opacity-60">Facilities</div></div></div></div>
      </div>
    </section>
    <section className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="rounded-[40px] bg-white border border-black/5 p-6 md:p-10">
        <h3 className="font-black text-xl">Core Values</h3>
        <div className="grid md:grid-cols-3 gap-3 mt-6">{["Professionalism","Integrity","Compassion","Rapid Response","Teamwork","Excellence"].map(v=><div key={v} className="rounded-2xl bg-[#f0f5f6] p-5 font-semibold text-sm border border-black/5">{v}</div>)}</div>
        <h3 className="font-black text-xl mt-10">Strategic Objectives</h3>
        <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">{["Statewide rapid response (≤15min)","Strengthen referral & handover","Workforce capacity (CEMTTOS/EMTs)","Disaster & mass-casualty support","Community awareness & first-aid","Fleet & equipment sustainability","Data-driven M&E","Partner coordination (FRSC/NEMA/SEMA)"].map(o=><div key={o} className="bg-white border border-black/5 rounded-2xl p-4">{o}</div>)}</div>
      </div>
    </section>
  </div>);
}
