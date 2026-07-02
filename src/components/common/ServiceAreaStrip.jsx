import { serviceAreaCities, serviceAreaRegion } from "@/data/global/serviceAreas";

/*
 * ServiceAreaStrip — the amber band under the hero naming every city
 * we serve, in the mono annotation voice. Doubles as on-page evidence
 * for local search queries ("drafting services in seattle", …).
 */
export default function ServiceAreaStrip() {
  return (
    <div className="bg-amber-500 text-ink py-3 px-4">
      <p className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest font-medium text-center">
        <span className="font-semibold">Serving</span>
        {serviceAreaCities.map((city) => (
          <span key={city} className="flex items-center gap-x-3">
            {city}
            <span aria-hidden="true">◆</span>
          </span>
        ))}
        <span>All of {serviceAreaRegion}</span>
      </p>
    </div>
  );
}
