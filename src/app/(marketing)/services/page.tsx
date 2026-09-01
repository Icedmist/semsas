import PageHero from "@/components/PageHero";
const services = [
  ["Emergency Ambulance","24/7 ambulance fleet, GPS-tracked dispatch","/images/7gnlc03XoyHyqj0OEHZP5aunt6Y.png"],
  ["Dispatch Centre","0703 382 5646 triage & routing to nearest unit","/images/CzT5Uj890xo8WuZWLcMHca8t5z0.svg"],
  ["Pre-hospital Care","BLS/ACLS, stabilization on scene","/images/GauOKPXoID5u4TK522YskKGLSbo.svg"],
  ["Road Traffic Crash Response","Joint FRSC highway team","/images/rQoypmdcRYr3cYhJsOOHbuPHk.svg"],
  ["Patient Referral","Inter-facility transfer with pre-alert","/images/lVYuJYb0vDNzkg0D24OddlJkvo.svg"],
  ["Disaster & Mass Casualty","Triage, field hospital, evacuation","/images/m4tV45lRjvUIf0z18FxwA50BM.svg"],
  ["Training","CEMTTOS, NURTW, volunteer drivers","/images/Ob2seBZcyIMDMk2KWTvjhy7tRMQ.svg"],
  ["Community Awareness","Outreach, maternal sensitization","/images/IKmgiiZNxMLX4DiulVDfeE0JoU.svg"],
  ["Medical Event Coverage","Public gatherings, sports, festivals","/images/jfsby3cSVAlAkLyUBexf98vDKvU.svg"],
  ["Fleet Management","55 ambulances, maintenance, tracking","/images/CzT5Uj890xo8WuZWLcMHca8t5z0.svg"],
  ["Equipment Support","Oxygen, monitors, resuscitation kits","/images/EJqRHXCIjPnoKaS1xpoO6sZ98.svg"],
  ["Hospital Coordination","Receiving facility readiness","/images/XQ8wwxBjV22q7TXs6WsE7MFcUGc.svg"],
];
export default function Services() {
  return (<div className="bg-white">
    <PageHero kicker="Services" title="12 Services, One System" subtitle="Everything from call to care — dispatch, stabilization, transport, and handover."/>
    <section className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="rounded-[40px] bg-[#f0f5f6] p-6 md:p-10">
        <div className="grid md:grid-cols-3 gap-4">
          {services.map(([t,d,img])=><div key={t} className="rounded-[24px] bg-white border border-black/5 p-6 flex flex-col"><img src={img} alt={t} className="w-10 h-10 object-contain"/><div className="font-bold mt-4 text-sm">{t}</div><div className="text-sm text-black/60 mt-1 leading-6">{d}</div><div className="mt-4 text-xs font-bold text-black/20">GoSEMSAS • 24/7</div></div>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1280px] px-4 mt-6">
      <div className="rounded-[40px] bg-white border border-black/5 p-6 md:p-10">
        <h3 className="font-black text-xl" style={{fontFamily:"var(--font-urbanist)"}}>Patient-Care Workflow — 6 Steps</h3>
        <div className="grid md:grid-cols-6 gap-3 mt-6">{["Call","Verify","Assign","Dispatch","Stabilization","Transit"].map((s,i)=><div key={s} className="rounded-2xl bg-[#f0f5f6] border border-black/5 p-4 text-center"><div className="w-8 h-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-sm font-black mx-auto">{i+1}</div><div className="text-sm font-bold mt-2">{s}</div></div>)}</div>
        <img src="/images/TXIbSKRPFAwuK68w77ilsUwHjqE.png" alt="Workflow" className="mt-6 rounded-[24px] w-full h-64 object-cover border border-black/5"/>
      </div>
    </section>
  </div>);
}
