import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

export default function PortfolioCTA() {
  return (
    <div className="text-center mt-16">
      <Button
        asChild
        className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <Link href="/contact" className="flex items-center gap-3">
          Start Your Project
          <FaArrowRight />
        </Link>
      </Button>
    </div>
  );
}

