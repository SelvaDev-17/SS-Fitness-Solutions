"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText } from "lucide-react";

export function TermsOfServiceModal({ className, text = "Terms of Service" }: { className?: string, text?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }} 
        className={className || "hover:text-white transition-colors"}
      >
        {text}
      </button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-neon/30 p-8 rounded-lg shadow-[0_0_20px_rgba(255,165,0,0.2)] max-w-2xl w-full relative max-h-[90vh] flex flex-col">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold uppercase text-white mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6 text-neon" />
                {text}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="overflow-y-auto pr-4 space-y-6 text-muted-foreground leading-relaxed custom-scrollbar pb-4">
              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Acceptance of Terms</h3>
                <p>By accessing and placing an order with SS Fitness Solutions, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Medical & Health Disclaimer</h3>
                <p>The products and claims made about specific products on or through this site have not been evaluated by the FDA or equivalent food regulatory agencies and are not approved to diagnose, treat, cure or prevent disease. The information provided on this site is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Products and Pricing</h3>
                <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Accuracy of Billing and Account Information</h3>
                <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">5. User Comments, Feedback and Other Submissions</h3>
                <p>If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">6. Governing Law</h3>
                <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</p>
              </section>
            </div>
            
            <div className="flex-shrink-0 pt-6 mt-2 border-t border-border/50">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase h-12 rounded-md transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
