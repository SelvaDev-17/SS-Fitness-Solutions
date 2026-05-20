"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

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
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <Link 
        href={`/?category=${encodeURIComponent(category)}#shop`}
        className="group relative h-80 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-500 shadow-2xl hover:border-neon hover:shadow-[0_0_30px_rgba(255,107,0,0.15)] block"
      >
        {/* Slideshow Background with zoom effect */}
        {images.length > 0 && (
          <div className="absolute inset-0 z-0 bg-black overflow-hidden rounded-2xl">
            {images.map((img, index) => (
              <div
                key={img}
                className={clsx(
                  "absolute inset-0 transition-opacity duration-1500 ease-in-out",
                  index === currentIndex ? "opacity-35" : "opacity-0"
                )}
              >
                <Image
                  src={img}
                  alt={`${category} representation ${index + 1}`}
                  fill
                  className={clsx(
                    "object-contain p-6 transition-transform duration-[4000ms] ease-out",
                    index === currentIndex ? "scale-110" : "scale-100"
                  )}
                  unoptimized
                />
              </div>
            ))}
            {/* A gradient overlay for maximum premium aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-1" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/90 z-1" />
          </div>
        )}

        {/* Subtle glowing center spot */}
        <div className="absolute w-48 h-48 rounded-full bg-neon/10 blur-[80px] pointer-events-none z-1 group-hover:bg-neon/20 transition-colors duration-500"></div>

        {/* Diagonal border sheen */}
        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-[1000ms] group-hover:left-[150%] z-2 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-between h-full py-6 w-full">
          {/* Subtle Accent Tag */}
          <span className="text-[10px] tracking-[0.25em] font-extrabold text-zinc-500 group-hover:text-neon transition-colors duration-300 uppercase">
            Formulation
          </span>

          {/* Heading */}
          <h3 className="text-3xl font-black uppercase tracking-[0.15em] text-white text-center group-hover:text-neon transition-all duration-300 select-none group-hover:scale-105 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {category}
          </h3>

          {/* Action button */}
          <div className="inline-flex items-center gap-1 bg-white/5 group-hover:bg-neon text-white group-hover:text-black text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border border-white/10 group-hover:border-neon transition-all duration-300 shadow-md">
            Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

