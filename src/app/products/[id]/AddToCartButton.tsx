"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/mock-data";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, quantity);
    // Could add a toast notification here
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center border border-border rounded-none h-14 bg-card w-full sm:w-auto">
        <button 
          className="px-4 h-full text-muted-foreground hover:text-white hover:bg-muted transition-colors flex items-center justify-center"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="w-16 text-center font-bold text-xl text-white">{quantity}</span>
        <button 
          className="px-4 h-full text-muted-foreground hover:text-white hover:bg-muted transition-colors flex items-center justify-center"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <Button 
        onClick={handleAdd}
        className="flex-1 h-14 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 rounded-none shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}
