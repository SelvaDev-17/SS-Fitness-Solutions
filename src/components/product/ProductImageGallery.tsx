"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface ProductImageGalleryProps {
  name: string;
  images: string[];
}

export function ProductImageGallery({ name, images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden border border-border flex items-center justify-center p-10">
        <Image 
          src={images[0]} 
          alt={name} 
          fill
          className="object-contain p-8 z-10"
          unoptimized
        />
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden border border-border group flex items-center justify-center p-10">
      
      {/* Images */}
      {images.map((img, index) => (
        <Image 
          key={img}
          src={img} 
          alt={`${name} image ${index + 1}`} 
          fill
          className={clsx(
            "object-contain p-8 transition-opacity duration-500",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
          unoptimized
        />
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-1.5 md:p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon hover:text-black border border-border/50"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-1.5 md:p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon hover:text-black border border-border/50"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              "h-2 md:h-2.5 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-neon w-6 md:w-8" : "bg-white/50 hover:bg-white w-2 md:w-2.5"
            )}
          />
        ))}
      </div>
    </div>
  );
}
