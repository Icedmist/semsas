export default function PageHero({ title, subtitle, kicker, crumb, badge, image, imageAlt }: { title: string; subtitle?: string; kicker?: string; crumb?: string; badge?: string; image?: string; imageAlt?: string }) {
  const label = kicker || badge || crumb;
  return (
    <div className="bg-[#f0f5f6] border-b border-red-200">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:py-20">
        {label && <div className="text-xs font-bold tracking-widest text-red-700 uppercase mb-3 bg-red-100 inline-block px-3 py-1.5 rounded-full">{label}</div>}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none max-w-3xl" style={{fontFamily:"var(--font-urbanist)"}}>{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-black/60 max-w-2xl leading-7">{subtitle}</p>}
      </div>
    </div>
  );
}
