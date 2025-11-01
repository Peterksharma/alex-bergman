import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function TestimonialCard({ testimonial }) {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${index < rating ? "text-yellow-400" : "text-gray-600"} text-lg`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <FaQuoteLeft className="text-blue-400 text-3xl opacity-50" />
          {renderStars(testimonial.rating)}
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            {testimonial.name}
          </h3>
          <p className="text-blue-400 font-medium text-sm">
            {testimonial.project}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-300 leading-relaxed mb-4">
          &quot;{testimonial.text}&quot;
        </p>

        <p className="text-gray-500 text-sm">
          {testimonial.date}
        </p>
      </CardContent>
    </Card>
  );
}

