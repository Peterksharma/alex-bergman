import { serviceAreaCities, serviceAreaRegion } from "@/data/global/serviceAreas";

/*
 * ServiceAreaStrip — the amber band under the hero naming every city
 * we serve, in the mono annotation voice, followed by one plain-prose
 * sentence that says what we do and where. That sentence is the home
 * page's only body-text statement of the service area, so it carries
 * the local-search phrases ("drafting services in Seattle", "Tacoma")
 * as real sentences rather than a list.
 */
export default function ServiceAreaStrip() {
  return (
    <div className="bg-amber-500 text-ink py-4 px-4">
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
      <p className="max-w-3xl mx-auto mt-2 text-center text-sm leading-relaxed text-ink/90">
        From our office on 6th Avenue in Tacoma we provide architectural
        drafting services across Pierce County, and drafting services in
        Seattle and King County: permit-ready plans for custom homes,
        remodels, additions, garages, and ADUs throughout {serviceAreaRegion}.
      </p>
    </div>
  );
}
