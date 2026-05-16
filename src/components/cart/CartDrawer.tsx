"use client";

import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger 
        onClick={() => setIsCartOpen(true)} 
        className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-white/10 hover:text-neon transition-colors relative w-10 h-10"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-neon text-neon-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-l-border/30 flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-neon" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 mt-4">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-4"
              >
                <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">Your cart is empty.</p>
                <Link href="/#shop" onClick={() => setIsCartOpen(false)} className="inline-flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-wider uppercase h-10 px-4 py-2 rounded-md mt-4">
                  Start Shopping
                </Link>
              </motion.div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <motion.li 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4"
                  >
                    <div className="w-20 h-20 bg-muted rounded-md relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-neon/10 to-transparent z-10"></div>
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-white line-clamp-2">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-md overflow-hidden bg-background">
                          <button 
                            className="px-2 py-1 text-muted-foreground hover:text-white hover:bg-muted transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-muted-foreground hover:text-white hover:bg-muted transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-neon">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="pt-6 border-t border-border mt-auto">
            <div className="flex justify-between text-lg font-bold text-white mb-6">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full flex items-center justify-center h-12 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] rounded-md">
              Checkout Now
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
