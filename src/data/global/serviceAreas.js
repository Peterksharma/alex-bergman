/**
 * Cities and regions the business serves. Single source of truth for
 * the home-page service-area strip, the contact page chips, and every
 * schema.org areaServed list (LocalBusiness and each Service).
 */
export const serviceAreaCities = [
  "Tacoma",
  "Seattle",
  "Olympia",
  "Puyallup",
  "Gig Harbor",
  "Lakewood",
  "University Place",
];

/**
 * Counties containing the cities above. Search queries are often phrased
 * by county ("drafting services king county"), and Google's local
 * entity graph resolves counties cleanly, so they are listed explicitly
 * rather than implied by the cities.
 */
export const serviceAreaCounties = [
  "Pierce County",
  "King County",
  "Thurston County",
];

export const serviceAreaRegion = "Western Washington";

/**
 * areaServed — the schema.org list every business/service node shares.
 *
 * Cities map to City, counties and the region to AdministrativeArea,
 * which is what Google's LocalBusiness documentation expects. Pure
 * function so each JSON-LD node gets its own fresh array.
 */
export function areaServed() {
  return [
    ...serviceAreaCities.map((name) => ({ "@type": "City", name })),
    ...serviceAreaCounties.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    { "@type": "AdministrativeArea", name: serviceAreaRegion },
  ];
}
