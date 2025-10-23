import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Portfolio() {

  function renderImageGrid() {
    return projects.map((project, index) => (
      <div key={index} className="w-[400px] p-4">
        <Link href={project.url}>
         <div className="relative w-[400px] h-[300px] overflow-hidden bg-gray-100">

          <Image
            src={`/assets/portfolio/${project.folder}/1.jpg`}
            alt={`${project.name} - Preview`}
            fill
            className="object-cover"
          />
          </div>
        </Link>
      </div>
    ))
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="p-8">
          <h1 className="text-center text-4xl font-bold pb-8"> Portfolio </h1>
          <div className='grid grid-cols-3'>
          {renderImageGrid()}
          </div>
        </div>
      </div>
    </div>
  );
}
