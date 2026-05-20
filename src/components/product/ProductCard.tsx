"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { SafeProduct, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: SafeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:border-neon transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
    >
      <Link href={`/products/${product.id}`} className="relative h-64 w-full bg-white flex-shrink-0 block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.isFeatured && (
            <motion.span 
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0px 0px 0px 0px rgba(255, 255, 255, 0)",
                  "0px 0px 8px 2px rgba(255, 255, 255, 0.6)",
                  "0px 0px 0px 0px rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-neon text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded shadow-lg"
            >
              Featured
            </motion.span>
          )}
        </div>
        {/* We use a placeholder logic if image fails, but Next Image is robust */}
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-contain group-hover:scale-110 transition-transform duration-500 p-4"
          unoptimized // for mock purposes if images are not real paths
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2 text-neon">
          <Star className="w-4 h-4 fill-neon" />
          <span className="text-sm font-bold text-black">{product.rating}</span>
          <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <Link href={`/products/${product.id}`} className="block mb-2 group-hover:text-neon transition-colors">
          <h3 className="text-lg font-black text-black line-clamp-2 transition-colors">{product.name}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E5E7EB]">
          <span className="text-xl font-black text-black">₹{product.price.toFixed(2)}</span>
          <Button 
            onClick={() => addToCart(product)}
            className="bg-transparent border border-neon text-neon hover:bg-neon hover:text-neon-foreground transition-all uppercase font-bold tracking-wider rounded-full h-10 w-10 p-0 flex items-center justify-center shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
