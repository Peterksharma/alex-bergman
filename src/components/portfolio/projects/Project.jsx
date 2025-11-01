"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const tags = [{ tagName: "Residential" }, { tagName: "Remodel" }];

export default function Project({ project }) {
  const projectImages = useMemo(() => {
    return Array.from({ length: project.imageCount }, (_, i) => ({
      src: `/assets/portfolio/${project.folder}/${i + 1}.jpg`,
      alt: `${project.name} - Image ${i + 1}`,
    }));
  }, [project.folder, project.imageCount, project.name]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentThumbnails, setCurrentThumbnails] = useState(0);
  const [countOfThumbnailsShowing, setCountOfThumbnailsShowing] = useState(5);
  const thumbnailContainerRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Calculate how many thumbnails can fit based on screen width
  useEffect(() => {
    const calculateThumbnailCount = () => {
      if (!thumbnailContainerRef.current) return;

      const containerWidth = thumbnailContainerRef.current.offsetWidth;
      
      // Approximate thumbnail sizes including padding and gaps
      // Mobile: 100px + 8px padding (p-1 * 2) + 6px gap = ~114px
      // Small: 120px + 16px padding (p-2 * 2) + 8px gap = ~144px
      // Medium+: 150px + 16px padding (p-2 * 2) + 8px gap = ~174px
      
      let thumbnailWidth;
      if (containerWidth < 640) {
        // Mobile
        thumbnailWidth = 114; // 100px + 8px padding + 6px gap
      } else if (containerWidth < 768) {
        // Small
        thumbnailWidth = 144; // 120px + 16px padding + 8px gap
      } else {
        // Medium and up
        thumbnailWidth = 174; // 150px + 16px padding + 8px gap
      }

      // Calculate how many thumbnails can fit (subtract a bit for safety margin)
      const availableWidth = containerWidth - 20; // small margin
      const count = Math.floor(availableWidth / thumbnailWidth);
      
      // Ensure at least 2 thumbnails are shown, and at most the total image count
      const newCount = Math.max(2, Math.min(count, project.imageCount));
      setCountOfThumbnailsShowing(newCount);
    };

    // Use setTimeout to ensure the container is rendered
    const timeoutId = setTimeout(() => {
      calculateThumbnailCount();
      
      // Also use ResizeObserver for more accurate measurements
      if (thumbnailContainerRef.current && window.ResizeObserver) {
        // Disconnect existing observer if any
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
        resizeObserverRef.current = new ResizeObserver(() => {
          calculateThumbnailCount();
        });
        resizeObserverRef.current.observe(thumbnailContainerRef.current);
      }
    }, 0);
    
    const handleResize = () => {
      calculateThumbnailCount();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [project.imageCount]);

  // Adjust currentThumbnails when count changes to prevent out-of-bounds
  useEffect(() => {
    const maxStart = Math.max(0, project.imageCount - countOfThumbnailsShowing);
    if (currentThumbnails > maxStart) {
      setCurrentThumbnails(Math.max(0, maxStart));
    }
  }, [countOfThumbnailsShowing, project.imageCount, currentThumbnails]);

  const renderTags = () => {
    return tags.map((tag, index) => (
      <div
        key={index}
        className="rounded-full bg-blue-600/20 border border-blue-500/50 px-6 py-2 text-blue-400 font-medium text-sm backdrop-blur-sm"
      >
        {tag.tagName}
      </div>
    ));
  };

  const seeNextThumbnails = () => {
    const nextStart = currentThumbnails + countOfThumbnailsShowing;

    if (nextStart >= project.imageCount) {
      setCurrentThumbnails(0);
    } else {
      setCurrentThumbnails(nextStart);
    }
  };

  const seePreviousThumbnails = () => {
    const prevStart = currentThumbnails - countOfThumbnailsShowing;

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
    const startIndex = currentThumbnails;
    const endIndex = startIndex + countOfThumbnailsShowing;

    return projectImages.slice(startIndex, endIndex).map((image, index) => {
      const actualIndex = startIndex + index;

      return (
        <div
          key={actualIndex}
          className="flex-shrink-0 p-1 sm:p-2"
          onClick={() => {
            setCurrentImageIndex(actualIndex);
          }}
        >
          <div
            className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${currentImageIndex === actualIndex
                ? "ring-2 sm:ring-4 ring-blue-500 scale-105 shadow-xl"
                : "hover:ring-1 sm:hover:ring-2 hover:ring-gray-400 hover:scale-105"
              }`}
          >
            <div className="relative w-[100px] h-[66px] sm:w-[120px] sm:h-[80px] md:w-[150px] md:h-[100px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      );
    });
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight px-4">
            {project.name}
          </h1>
          <div className="h-1 w-16 sm:w-24 bg-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery Section - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl shadow-2xl border-2 border-gray-700">
                <Image
                  src={projectImages[currentImageIndex].src}
                  alt={projectImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navigation Arrows on Image */}
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <FaAngleLeft className="text-2xl" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <FaAngleRight className="text-2xl" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={seePreviousThumbnails}
                variant="outline"
                className="h-[80px] sm:h-[100px] px-2 sm:px-4 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white flex-shrink-0"
                aria-label="Previous thumbnails"
              >
                <FaAngleLeft className="text-lg sm:text-xl" />
              </Button>

              <div 
                ref={thumbnailContainerRef}
                className="flex gap-1.5 sm:gap-2 flex-1 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {renderThumbnails()}
              </div>

              <Button
                onClick={seeNextThumbnails}
                variant="outline"
                className="h-[80px] sm:h-[100px] px-2 sm:px-4 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white flex-shrink-0"
                aria-label="Next thumbnails"
              >
                <FaAngleRight className="text-lg sm:text-xl" />
              </Button>
            </div>
          </div>

          {/* Project Details Section - 1/3 width */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-0 shadow-2xl sticky top-8">
              <CardHeader className="border-b border-gray-600">
                <CardTitle className="text-3xl text-white text-center">
                  Project Details
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {renderTags()}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    About This Project
                  </h3>
                  <div className="bg-gray-900/50 rounded-lg p-6 text-gray-200 leading-relaxed backdrop-blur-sm border border-gray-700">
                    {project.description || "This project showcases our expertise in architectural drafting and design. Each detail was carefully planned and executed to meet the client's vision and needs."}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <a href="/contact">Start Your Project</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}