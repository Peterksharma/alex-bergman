import { trustIndicators } from "./data/trustIndicatorsData";

export default function TrustIndicators() {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {trustIndicators.map((indicator, index) => (
        <div key={index} className="p-6">
          <div className="text-4xl font-bold text-blue-400 mb-2">{indicator.value}</div>
          <div className="text-gray-300 font-medium">{indicator.label}</div>
        </div>
      ))}
    </div>
  );
}

