"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Truck, RotateCcw } from "lucide-react";

export function ShippingReturnsModal({ className, text = "Shipping & Returns" }: { className?: string, text?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }} 
        className={className || "text-muted-foreground hover:text-neon transition-colors"}
      >
        {text}
      </button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-neon/30 p-8 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.2)] max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold uppercase text-white mb-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              {text}
            </h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center text-neon">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Shipping Policy</h3>
                </div>
                <div className="text-muted-foreground space-y-3 leading-relaxed pl-13">
                  <p>We take pride in fast, secure shipping for all our premium supplements.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-gray-300">Local Delivery:</strong> Same-day delivery within the city for orders placed before 4:00 PM.</li>
                    <li><strong className="text-gray-300">Nationwide Shipping:</strong> Delivered within 3-5 business days across India via our secure logistics partners.</li>
                    <li><strong className="text-gray-300">Tracking:</strong> You will receive a tracking link via WhatsApp/Email once your order is dispatched.</li>
                  </ul>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-border/50"></div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-neon/10 flex items-center justify-center text-neon">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Returns & Exchanges</h3>
                </div>
                <div className="text-muted-foreground space-y-3 leading-relaxed pl-13">
                  <p>Due to the consumable nature of sports nutrition supplements, we have a strict policy to ensure authenticity and safety for all customers.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-gray-300">Accepted Returns:</strong> Unopened products with intact seals can be returned or exchanged within 7 days of delivery.</li>
                    <li><strong className="text-gray-300">Non-Returnable:</strong> Once the seal is broken or tampered with, the product cannot be returned under any circumstances.</li>
                    <li><strong className="text-gray-300">Damaged Transit:</strong> If your product arrives damaged, please record an unboxing video and contact us within 24 hours for a replacement.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
