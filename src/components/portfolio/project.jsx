'use client'

import Image from "next/image"
import { useState, useMemo } from "react"

export default function Project({ project }) {

    const projectImages = useMemo(() => {
        return Array.from({ length: project.imageCount }, (_, i) => ({
            src: `/assets/portfolio/${project.folder}/${i + 1}.jpg`,
            alt: `${project.name} - Image ${i + 1}`
        }));
    }, [project.folder, project.imageCount, project.name]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    function renderThumbnails() {
        return (
            projectImages.map((image, index) => (
                <div
                    key={index}
                    className={`cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0 ${currentImageIndex === index ? 'ring-4 ring-blue-500 rounded' : ''
                        }`}
                    onClick={() => {
                        setCurrentImageIndex(index)
                    }}
                >
                    <div className="relative w-[150px] h-[100px] overflow-hidden rounded border-2 border-gray-300">

                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={150}
                            height={100}
                            className="object-cover rounded border-2 border-gray-300"
                        />
                    </div>
                </div>
            ))
        )
    }

    return (
        <div>
            <div className='bg-white p-8'>
                <div className="text-center pb-16">
                    {project.id}
                </div>
                <div className='grid grid-cols-3 pr-16'>
                    <div className="pl-16 col-span-2">
                          <div className="relative w-[800px] h-[600px] overflow-hidden rounded border-2 border-gray-300">

                        <Image
                            src={projectImages[currentImageIndex].src}
                            alt={projectImages[currentImageIndex].alt}
                            width={1200}
                            height={800}
                        />
    </div>
                        <div className="pt-4 overflow-x-auto">
                            <div className="flex gap-4 pb-2">
                                {renderThumbnails()}
                            </div>
                        </div>
                    </div>
                    <div className="p-16 bg-gray-200 self-start h-[700px] overflow-y-auto">
                        <div className="pb-8 text-center">
                            {project.name}
                        </div>
                        <div>
                            {project.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}