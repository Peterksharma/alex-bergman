'use client'

import Placeholder from "@/assets/portfolio/placeholder.jpg";
import Placeholder2 from "@/assets/portfolio/placeholder2.jpg";
import Placeholder3 from "@/assets/portfolio/placeholder3.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Carousel() {
    const[imageIndex, setImageIndex] = useState(0)

  const slides = [
    { id: 1, image: Placeholder, alt: "Placeholder Image" },
    { id: 2, image: Placeholder2, alt: "Placeholder Image 2" },
    { id: 3, image: Placeholder3, alt: "Placeholder Image 3" },
  ];

  const nextSlide = () => {
    setImageIndex((previousImage) => (previousImage + 1) % slides.length) 
    }


  const previousSlide = () => {
        setImageIndex((previousImage) => (previousImage - 1 + slides.length) % slides.length)
  };
  
  const renderThumbnail = () => { 
    const prevIndex = (imageIndex - 1 + slides.length) % slides.length;
    const nextIndex = (imageIndex + 1) % slides.length;
    
    return(
      <div className="flex gap-2">
        <Image src={slides[prevIndex].image} alt={slides[prevIndex].alt} width={100} height={100} />
        <Image src={slides[imageIndex].image} alt={slides[imageIndex].alt} width={100} height={100} />
        <Image src={slides[nextIndex].image} alt={slides[nextIndex].alt} width={100} height={100} />
      </div>
    )
  }


  return (
    <div>
    <div >

      <div className="min-w-full h-full relative">
        
        <Image src={slides[imageIndex].image} alt={slides[imageIndex].alt} />
      </div>
      <div className="p-2">
        {renderThumbnail()}
      </div>
      <Button onClick={previousSlide}>Previous Slide</Button>
      <Button onClick={nextSlide}>Next Slide</Button>
    </div>
    </div>
  );
}
