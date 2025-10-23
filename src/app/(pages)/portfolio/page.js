import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  function renderImageGrid() {
    return projects.map((project, index) => (
      <div key={index} className="p-4">
        <Link href={project.url}>
          <Card className='group transition-all duration-300 hover:border-2  hover:border-blue-700 hover:shadow-xl bg-gray-800 flex flex-col h-full overflow-hidden p-0 border-2 border-gray-700'>
            <CardTitle className='text-center text-lg text-gray-100 p-4'>
              {project.name}
            </CardTitle>
            <div className="relative w-full h-[300px] bg-gray-100 mt-auto overflow-hidden">
              <Image
                src={`/assets/portfolio/${project.folder}/1.jpg`}
                alt={`${project.name} - Preview`}
                fill
                className="object-cover block transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          </Card>
        </Link>
      </div>
    ))
  }
  
  return (
    <div className="bg-gray-900">
      <div className="flex justify-center items-center z-2">
        <div className="p-8">
          <h1 className="text-center text-gray-100 text-4xl font-bold pb-8">
            Portfolio
          </h1>
          <h2 className="text-center text-gray-100 text-xl pb-8">
            Click on a card to see more details about projects that we have done in the past.
          </h2>
          <div className='grid grid-cols-3 gap-4'>
            {renderImageGrid()}
          </div>
        </div>
      </div>
    </div>
  );
}