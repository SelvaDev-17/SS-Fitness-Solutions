"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Secure Checkout" 
            subtitle="Review your items and complete your order."
            centered={false}
          />

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-card border border-border rounded-lg mt-8">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Trash2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 text-lg">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/#shop" className="inline-flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 h-14 px-8 text-lg font-bold uppercase tracking-widest rounded-none mt-8">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 mt-12">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-6 border-b border-border bg-muted/50 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>
                  <ul className="divide-y divide-border">
                    {items.map((item) => (
                      <motion.li 
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-12 gap-4 p-6 items-center"
                      >
                        <div className="col-span-6 flex items-center gap-6">
                          <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden shrink-0 hidden sm:block">
                            <div className="absolute inset-0 bg-gradient-to-tr from-neon/10 to-transparent z-10"></div>
                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                          </div>
                          <div>
                            <Link href={`/products/${item.id}`} className="font-bold text-lg text-white hover:text-neon transition-colors line-clamp-2">
                              {item.name}
                            </Link>
                            <p className="text-muted-foreground mt-1">₹{item.price.toFixed(2)}</p>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-red-400 text-sm flex items-center gap-1 mt-3 transition-colors uppercase tracking-wider font-bold"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </div>
                        <div className="col-span-3 flex justify-center">
                          <div className="flex items-center border border-border rounded-md overflow-hidden bg-background h-10">
                            <button 
                              className="px-3 h-full text-muted-foreground hover:text-white hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium text-white">{item.quantity}</span>
                            <button 
                              className="px-3 h-full text-muted-foreground hover:text-white hover:bg-muted transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="font-bold text-lg text-neon">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-96 shrink-0">
                <div className="bg-card border border-border rounded-lg p-6 sm:p-8 lg:sticky lg:top-32">
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="text-white">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-white">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax</span>
                      <span className="text-white">₹{tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-white uppercase tracking-wider">Total</span>
                      <span className="text-3xl font-black text-neon">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout"
                    className="w-full h-14 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 rounded-none shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all mb-6 flex items-center justify-center"
                  >
                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
                    <ShieldCheck className="w-4 h-4 text-neon" />
                    <span>Secure encrypted checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
