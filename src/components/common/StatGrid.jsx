import { cn } from "@/lib/utils";

/**
 * StatGrid — a centered grid of stat tiles (big blue value over a label),
 * e.g. "15+ Years Experience". Replaces the testimonials TrustIndicators.
 *
 * items: [{ value, label }]
 */
export default function StatGrid({ items, className }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 text-center", className)}>
      {items.map((item) => (
        <div key={item.label} className="p-6">
          <div className="text-4xl font-bold text-blue-400 mb-2">{item.value}</div>
          <div className="text-gray-300 font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
