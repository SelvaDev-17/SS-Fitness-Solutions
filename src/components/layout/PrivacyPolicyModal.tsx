"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ShieldCheck } from "lucide-react";

export function PrivacyPolicyModal({ className, text = "Privacy Policy" }: { className?: string, text?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(true);

  useEffect(() => {
    setMounted(true);
    const accepted = localStorage.getItem("privacy_accepted");
    if (!accepted) {
      setHasAccepted(false);
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("privacy_accepted", "true");
    setHasAccepted(true);
    setIsOpen(false);
  };

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
          <div className="bg-card border border-neon/30 p-8 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] max-w-2xl w-full relative max-h-[90vh] flex flex-col">
            {hasAccepted && (
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-neon transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
            )}
            
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold uppercase text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-neon" />
                {text}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="overflow-y-auto pr-4 space-y-6 text-muted-foreground leading-relaxed custom-scrollbar pb-4">
              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Information We Collect</h3>
                <p>When you visit SS Fitness Solutions, we collect certain information to process your orders and improve your experience. This includes:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Personal details (Name, Email, Phone Number, WhatsApp Number)</li>
                  <li>Shipping and billing addresses</li>
                  <li>Order history and fitness preferences</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. How We Use Your Information</h3>
                <p>Your privacy is our priority. We use your data exclusively for:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Processing and delivering your supplement orders</li>
                  <li>Sending order updates and tracking links via Email/WhatsApp</li>
                  <li>Providing personalized consultation and product recommendations</li>
                  <li>Sending exclusive offers (only if you've opted into our newsletter)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Data Protection & Sharing</h3>
                <p>We do not sell, trade, or rent your personal identification information to others. Your data is securely stored and only shared with trusted third parties strictly necessary for our operations, such as:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Secure payment gateways to process your transactions</li>
                  <li>Logistics and delivery partners to ship your orders</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Your Rights</h3>
                <p>You have the right to request access to, correction of, or deletion of your personal data at any time. If you wish to opt-out of our marketing communications on WhatsApp or Email, simply contact us or use the unsubscribe link provided in our messages.</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">5. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="mt-2 text-white font-medium">ssfitnesssolutions2004@gmail.com</p>
                <p className="text-white font-medium">+91 98400 18555</p>
              </section>
            </div>
            
            <div className="flex-shrink-0 pt-6 mt-2 border-t border-border/50">
              <button 
                onClick={handleClose}
                className="w-full bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase h-12 rounded-md transition-all"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

