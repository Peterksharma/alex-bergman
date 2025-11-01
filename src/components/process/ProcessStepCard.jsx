import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProcessStepCard({ step, index }) {
  return (
    <div key={step.id} className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'}`}>
      <Card className={`relative bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
        <div className={`absolute -top-4 -left-4 ${index % 2 === 0 ? 'lg:-left-4' : 'lg:-right-4'} bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10`}>
          {step.id}
        </div>

        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            {step.icon}
            <CardTitle className="text-2xl font-bold text-white">
              {step.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-300 leading-relaxed text-base">
            {step.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-600">
            <div>
              <p className="text-sm font-semibold text-blue-400 mb-1">Timeline</p>
              <p className="text-gray-300">{step.duration}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-400 mb-1">Deliverable</p>
              <p className="text-gray-300">{step.deliverable}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

