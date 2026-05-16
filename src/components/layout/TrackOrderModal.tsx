"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Package, Search, MapPin, Truck, CheckCircle2 } from "lucide-react";

export function TrackOrderModal({ className, text = "Track Order" }: { className?: string, text?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | 'found' | 'error'>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setIsTracking(true);
    setTrackingResult(null);
    
    // Simulate network request
    setTimeout(() => {
      setIsTracking(false);
      // Simple mock logic: if order id contains 'err', show error, else show found
      if (orderId.toLowerCase().includes('err')) {
        setTrackingResult('error');
      } else {
        setTrackingResult('found');
      }
    }, 1500);
  };

  const closeAndReset = () => {
    setIsOpen(false);
    setTimeout(() => {
      setOrderId("");
      setTrackingResult(null);
      setIsTracking(false);
    }, 300); // reset after animation
  };

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
          <div className="bg-card border border-neon/30 p-8 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.2)] max-w-md w-full relative">
            <button 
              onClick={closeAndReset}
              className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold uppercase text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon"></div>
              {text}
            </h2>
            
            {!trackingResult && (
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Order ID or Tracking Number
                  </label>
                  <input
                    id="orderId"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. SSF-12345"
                    className="w-full bg-background border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Associated with your order"
                    className="w-full bg-background border border-border text-white px-4 py-3 rounded-md focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isTracking}
                  className="w-full flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase h-12 rounded-md transition-all mt-6 disabled:opacity-70"
                >
                  {isTracking ? (
                    <div className="w-5 h-5 border-2 border-neon-foreground border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" /> Track Package
                    </>
                  )}
                </button>
              </form>
            )}

            {trackingResult === 'found' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-neon/10 flex items-center justify-center">
                    <Package className="w-8 h-8 text-neon" />
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">In Transit</h3>
                  <p className="text-muted-foreground">Order <span className="text-neon font-medium">{orderId.toUpperCase()}</span></p>
                </div>

                <div className="relative pl-6 space-y-6 border-l-2 border-border ml-4">
                  <div className="relative">
                    <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-neon ring-4 ring-background"></div>
                    <p className="text-white font-medium">Out for Delivery</p>
                    <p className="text-sm text-muted-foreground">Today, 09:41 AM - Chennai Hub</p>
                  </div>
                  <div className="relative opacity-70">
                    <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-muted-foreground ring-4 ring-background"></div>
                    <p className="text-white font-medium">Arrived at Local Hub</p>
                    <p className="text-sm text-muted-foreground">Yesterday, 14:30 PM</p>
                  </div>
                  <div className="relative opacity-70">
                    <div className="absolute -left-[35px] w-4 h-4 rounded-full bg-muted-foreground ring-4 ring-background"></div>
                    <p className="text-white font-medium">Order Dispatched</p>
                    <p className="text-sm text-muted-foreground">2 days ago, 10:15 AM</p>
                  </div>
                </div>

                <button
                  onClick={() => setTrackingResult(null)}
                  className="w-full border border-border text-white hover:text-neon hover:border-neon font-bold tracking-widest uppercase h-12 rounded-md transition-all mt-8"
                >
                  Track Another Order
                </button>
              </div>
            )}

            {trackingResult === 'error' && (
              <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                  <X className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase">Order Not Found</h3>
                  <p className="text-muted-foreground">We couldn't find an order matching that ID and email combination.</p>
                </div>
                <button
                  onClick={() => setTrackingResult(null)}
                  className="w-full bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase h-12 rounded-md transition-all"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
