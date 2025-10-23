"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Button } from "../ui/button";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const tags = [{ tagName: "This Tag" }, { tagName: "This Tag" }];

export default function Project({ project }) {
  const projectImages = useMemo(() => {
    return Array.from({ length: project.imageCount }, (_, i) => ({
      src: `/assets/portfolio/${project.folder}/${i + 1}.jpg`,
      alt: `${project.name} - Image ${i + 1}`,
    }));
  }, [project.folder, project.imageCount, project.name]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTumbnails, setCurrentThumbnails] = useState(0);

  const countOfThumbnailsShowing = 5;

  const renderTags = () => {
    return tags.map((tag, index) => (
      <div className="rounded-full bg-amber-200 border-1 border-amber-300 width=[100px] px-8 py-2">
        {tag.tagName}
      </div>
    ));
  };

  const seeNextThumbnails = () => {
    const nextStart = currentTumbnails + countOfThumbnailsShowing;

    if (nextStart >= project.imageCount) {
      setCurrentThumbnails(0);
    } else {
      setCurrentThumbnails(nextStart);
    }
  };

  const seePreviousThumbnails = () => {
    const prevStart = currentTumbnails - countOfThumbnailsShowing;

    if (prevStart < 0) {
      const lastStart =
        Math.floor((project.imageCount - 1) / countOfThumbnailsShowing) *
        countOfThumbnailsShowing;
      setCurrentThumbnails(lastStart);
    } else {
      setCurrentThumbnails(prevStart);
    }
  };

  function renderThumbnails() {
    const startIndex = currentTumbnails;
    const endIndex = startIndex + countOfThumbnailsShowing;

    console.log("There are this many images:", project.imageCount);

    return projectImages.slice(startIndex, endIndex).map((image, index) => {
      const actualIndex = startIndex + index;

      return (
        <div
          key={actualIndex}
          className={`cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0 ${
            currentImageIndex === actualIndex
              ? "ring-4 ring-blue-500 rounded"
              : ""
          }`}
          onClick={() => {
            setCurrentImageIndex(actualIndex);
          }}
        >
          <div className="relative w-[150px] h-[100px] overflow-hidden border-2 border-gray-300 rounded-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={150}
              height={100}
              className="object-cover rounded border-2 border-gray-300"
            />
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="bg-gray-900 p-8">
        <div className="text-center pb-16 text-4xl pt-8 font-bold text-gray-100">
          {project.name}
        </div>
        <div className="grid grid-cols-3 pr-16">
          <div className="pl-16 col-span-2">
            <div className="relative w-[925px] h-[600px] overflow-hidden rounded-2xl border-2 border-gray-300">
              <Image
                src={projectImages[currentImageIndex].src}
                alt={projectImages[currentImageIndex].alt}
                width={925}
                height={600}
              />
            </div>
            <div className="pt-4 overflow-x-auto">
              <div className="flex gap-4 pb-2">
                <Button className="h-[100px]" onClick={seePreviousThumbnails}>
                  <FaAngleLeft />
                </Button>
                {renderThumbnails()}
                <Button className="h-[100px]" onClick={seeNextThumbnails}>
                  <FaAngleRight />
                </Button>
              </div>
            </div>
          </div>
          <div className="p-8 bg-gray-700 self-start h-[700px] overflow-y-auto rounded-2xl">
            <div className="py-8 text-center text-3xl text-gray-100">About the project</div>
            <div className="flex gap-4 justify-around pb-8">{renderTags()}</div>
            <div className="bg-gray-900 h-[70%] rounded-2xl p-8 text-gray-100">
              {project.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
