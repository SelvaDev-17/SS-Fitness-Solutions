"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface ProductImageGalleryProps {
  name: string;
  images: string[];
}

export function ProductImageGallery({ name, images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!images || images.length === 0) return null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold (50px)
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      else if (e.key === "ArrowLeft") goToPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Main Showcase Container */}
      <div 
        className="relative aspect-square w-full bg-white rounded-3xl overflow-hidden border border-border/80 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.6)] flex items-center justify-center p-8 group transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(255,153,0,0.12)]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glow behind product */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,153,0,0.03)_0%,_transparent_70%)] z-0 pointer-events-none" />

        {/* Sliding Images Container */}
        <div className="relative w-full h-full flex items-center justify-center z-10 overflow-hidden">
          {images.map((img, index) => {
            const isActive = index === currentIndex;
            const isPrev = index < currentIndex;
            
            return (
              <div
                key={img}
                className={clsx(
                  "absolute w-full h-full flex items-center justify-center p-4 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)",
                  isActive 
                    ? "translate-x-0 opacity-100 scale-100 rotate-0 z-10 pointer-events-auto"
                    : isPrev 
                      ? "-translate-x-full opacity-0 scale-90 -rotate-3 z-0 pointer-events-none" 
                      : "translate-x-full opacity-0 scale-90 rotate-3 z-0 pointer-events-none"
                )}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={img} 
                    alt={`${name} image ${index + 1}`} 
                    fill
                    className="object-contain p-2 select-none"
                    priority={index === 0}
                    unoptimized
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons (Only render if there are multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-neon text-white hover:text-black p-3 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,153,0,0.4)] border border-border/40"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-neon text-white hover:text-black p-3 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,153,0,0.4)] border border-border/40"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Visual Progress Line Bar */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-muted-foreground/10 z-20">
            <div 
              className="h-full bg-neon transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Interactive Thumbnail Previews */}
      {images.length > 1 && (
        <div className="flex gap-4 justify-center items-center overflow-x-auto py-2 px-1 max-w-full">
          {images.map((img, index) => {
            const isActive = index === currentIndex;
            
            return (
              <button
                key={img}
                onClick={() => setCurrentIndex(index)}
                className={clsx(
                  "relative w-20 h-20 rounded-2xl p-2 bg-white flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 shrink-0 border-2 outline-none",
                  isActive 
                    ? "border-neon shadow-[0_0_20px_rgba(255,153,0,0.35)] scale-105 z-10" 
                    : "border-border/60 hover:border-neon/40 opacity-70 hover:opacity-100"
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
