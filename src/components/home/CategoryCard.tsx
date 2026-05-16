"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

interface CategoryCardProps {
  category: string;
  images: string[];
}

export function CategoryCard({ category, images }: CategoryCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Link 
      href="/#shop"
      className="group relative h-64 bg-background border border-border flex flex-col items-center justify-center p-6 overflow-hidden hover:border-neon transition-colors"
    >
      {/* Slideshow Background with opacity */}
      {images.length > 0 && (
        <div className="absolute inset-0 z-0 bg-background/90">
          {images.map((img, index) => (
            <Image
              key={img}
              src={img}
              alt={`${category} representation ${index + 1}`}
              fill
              className={clsx(
                "object-contain p-4 opacity-0 transition-opacity duration-1000",
                index === currentIndex && "opacity-[0.6]"
              )}
              unoptimized
            />
          ))}
          {/* A gradient overlay to make text pop more */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
      
      <h3 className="text-2xl font-black uppercase tracking-widest z-20 text-white group-hover:text-neon transition-colors drop-shadow-md">
        {category}
      </h3>
      <div className="mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all z-20 text-white flex items-center font-bold">
        Shop Now <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </Link>
  );
}
