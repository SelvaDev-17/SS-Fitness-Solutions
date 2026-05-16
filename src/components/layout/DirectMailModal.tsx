"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Mail, Send, X, CheckCircle2 } from "lucide-react";

export function DirectMailModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => setIsSent(false), 300); // reset state after modal closes
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <div onClick={(e) => { e.preventDefault(); setIsOpen(true); }} className="cursor-pointer inline-flex">
        {children}
      </div>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-neon/30 p-8 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.2)] max-w-md w-full relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold uppercase text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              Email Us Directly
            </h2>
            
            {!isSent ? (
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-background border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sender-email" className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-background border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-background border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all resize-none"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase h-12 rounded-md transition-all mt-6 disabled:opacity-70"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-neon-foreground border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 rounded-full bg-neon/10 text-neon flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Message Sent!</h3>
                  <p className="text-muted-foreground">We've received your email and will get back to you shortly.</p>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
