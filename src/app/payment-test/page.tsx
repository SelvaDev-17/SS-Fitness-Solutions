"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UPIPaymentModal } from "@/components/payment/UPIPaymentModal";
import { Info, HelpCircle, Shield, Sparkles, CreditCard } from "lucide-react";

export default function PaymentTestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(499);
  const [customAmount, setCustomAmount] = useState("499");
  
  // Custom configuration states
  const [upiId, setUpiId] = useState("brownboyvibe17-1@oksbi");
  const [businessName, setBusinessName] = useState("SS fitness solutions");
  
  const [paymentLog, setPaymentLog] = useState<{
    utr: string;
    screenshotName: string | null;
    timestamp: string;
  } | null>(null);

  const handleAmountPreset = (preset: number) => {
    setAmount(preset);
    setCustomAmount(preset.toString());
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handlePaymentSuccess = (utr: string, file: File | null) => {
    setPaymentLog({
      utr: utr || "None entered (Uploaded screenshot only)",
      screenshotName: file ? file.name : null,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-32 pb-24 min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neon/10 border border-neon/30 rounded-full text-xs font-semibold text-neon uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UPI Intent & QR Component Demo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
              Payment Gateway sandbox
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Test dynamic amounts, mobile app redirection, and desktop QR code scaling. This sandbox showcases our custom Razorpay-free UPI payment flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Control panel */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-card border-zinc-800 text-white rounded-2xl overflow-hidden shadow-2xl">
                <CardHeader className="border-b border-zinc-900 bg-zinc-900/10">
                  <CardTitle className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-neon" />
                    <span>Transaction Parameters</span>
                  </CardTitle>
                  <CardDescription className="text-zinc-500">
                    Configure checkout inputs to test modal reactivity.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6 space-y-6">
                  {/* Preset amounts */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Preset Amounts (INR)
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[199, 499, 999, 1499].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleAmountPreset(preset)}
                          className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                            amount === preset
                              ? "border-neon bg-neon/10 text-neon"
                              : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300"
                          }`}
                        >
                          ₹{preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom amount */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Or Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-4 py-3.5 text-sm font-semibold text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Merchant Name
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="Merchant / Business Name"
                      />
                    </div>

                    {/* UPI ID */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Merchant UPI ID (VPA)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="UPI Address"
                      />
                    </div>
                  </div>

                </CardContent>

                <CardFooter className="bg-zinc-900/10 border-t border-zinc-900 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-zinc-500 font-semibold block uppercase tracking-wider">Total Charge</span>
                    <span className="text-3xl font-black text-neon">₹{amount.toFixed(2)}</span>
                  </div>
                  
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="w-full sm:w-auto px-10 h-14 bg-neon text-neon-foreground hover:bg-neon/90 font-black uppercase tracking-widest text-sm rounded-none shadow-[0_0_20px_rgba(255,153,0,0.3)] transition-all hover:shadow-[0_0_30px_rgba(255,153,0,0.5)]"
                  >
                    Pay Now
                  </Button>
                </CardFooter>
              </Card>

              {/* Log results */}
              {paymentLog && (
                <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>Transaction Log Submitted</span>
                  </h4>
                  <div className="text-xs font-mono text-zinc-400 space-y-2 bg-zinc-950 p-4 border border-zinc-900 rounded-xl">
                    <div className="flex justify-between">
                      <span>UTR/Txn Reference:</span>
                      <span className="text-white font-bold">{paymentLog.utr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Screenshot File:</span>
                      <span className="text-white font-bold">{paymentLog.screenshotName || "None (Submitted UTR only)"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Received Timestamp:</span>
                      <span className="text-zinc-500">{paymentLog.timestamp}</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-900 pt-2 mt-2">
                      <span>Payment Verification:</span>
                      <span className="text-yellow-500 font-bold uppercase tracking-wider">Awaiting Staff Review</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guide sidebar */}
            <div className="space-y-6">
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-neon" />
                  <span>Integration specs</span>
                </h4>
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex gap-2">
                    <span className="text-neon font-bold">•</span>
                    <span><strong>Platform Redirection</strong>: Generates customized URLs tailored for Android deep linking and iOS schemes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon font-bold">•</span>
                    <span><strong>QR Resolution</strong>: Uses vector math in `qrcode` library to render clean black-white grids in real-time.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon font-bold">•</span>
                    <span><strong>Zero Fees</strong>: Removes dependencies on payment intermediaries, preventing processing fees.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon font-bold">•</span>
                    <span><strong>Fallback Support</strong>: Copies UPI ID to clipboard if auto-redirection fails.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 space-y-3">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-zinc-500" />
                  <span>How to test?</span>
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Toggle your browser developer tools to responsive mobile layout (Android/iOS User Agent) to see the app redirect grid. Switch back to Desktop mode to scan the QR code using any smartphone camera or UPI app interface.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Main UPI Payment Dialog */}
      <UPIPaymentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        amount={amount}
        upiId={upiId}
        businessName={businessName}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <Footer />
    </>
  );
}
