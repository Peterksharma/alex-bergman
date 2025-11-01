import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa";

export default function PortfolioCard({ project }) {
  return (
    <Link href={project.url} className="group">
      <Card className='transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col h-full overflow-hidden border-0 hover:scale-105'>
        <div className="relative w-full h-[280px] overflow-hidden">
          <Image
            src={`/assets/portfolio/${project.folder}/1.jpg`}
            alt={`${project.name} - Preview`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-blue-600 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <FaArrowRight className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <CardTitle className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>
            {project.name}
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">
            Click to view project details
          </CardDescription>
        </div>
      </Card>
    </Link>
  );
}

