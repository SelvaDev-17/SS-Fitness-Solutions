"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Mail, Phone, X } from "lucide-react";

export function ContactModal({ className, text = "Contact Us" }: { className?: string, text?: string }) {
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
          <div className="bg-card border border-neon/30 p-8 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] max-w-md w-full relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold uppercase text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              Reach Out To Us
            </h2>
            
            <div className="space-y-6">
              <a href="tel:+919840018555" className="flex items-center gap-4 group p-4 rounded-lg border border-border hover:border-neon transition-all hover:bg-neon/5">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-muted-foreground group-hover:text-neon group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-white font-medium text-lg">+91 98400 18555</p>
                </div>
              </a>
              
              <a href="mailto:ssfitnesssolutions2004@gmail.com" className="flex items-center gap-4 group p-4 rounded-lg border border-border hover:border-neon transition-all hover:bg-neon/5">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-muted-foreground group-hover:text-neon group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-white font-medium text-[14px] sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">ssfitnesssolutions2004@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

