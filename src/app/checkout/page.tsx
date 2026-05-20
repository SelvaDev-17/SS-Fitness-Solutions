"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import Script from "next/script";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, totalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Guest Details State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handlePayment = async () => {
    if (items.length === 0) return;
    
    if (!name || !email || !address || !city || !deliveryState || !zip || !phone) {
      alert("Please fill in all delivery and contact details.");
      return;
    }
    
    setLoading(true);

    try {
      // 1. Create order on the backend
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items, 
          total: finalTotal,
          name,
          email,
          address,
          city,
          state: deliveryState,
          zip,
          phone 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create order. Please check Razorpay API keys.");
      }

      const orderData = await res.json();

      // 2. Initialize Razorpay checkout
      const options = {
        key: orderData.key_id, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SS Fitness Solutions",
        description: "Premium Supplements Order",
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. Verify payment on the backend
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: orderData.dbOrderId,
            }),
          });

          if (verifyRes.ok) {
            setSuccess(true);
            clearCart();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#ff9900", // Neon Orange
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed! Reason: " + response.error.description);
      });
      rzp.open();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong initializing the payment.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center h-full mt-20">
            <div className="bg-card border border-border p-12 rounded-xl flex flex-col items-center text-center max-w-lg shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <CheckCircle2 className="w-24 h-24 text-neon mb-6" />
              <h1 className="text-4xl font-black uppercase tracking-widest text-white mb-4">Payment Successful!</h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Thank you for your order, {name.split(' ')[0] || 'Athlete'}. Your supplements are being prepared for dispatch.
              </p>
              <Button onClick={() => router.push("/#shop")} className="bg-neon text-neon-foreground hover:bg-neon/90 w-full h-14 text-lg font-bold uppercase tracking-widest rounded-none">
                Return to Shop
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />
      <main className="flex-1 flex flex-col pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Finalize Order" 
            subtitle="Choose your payment method and complete the checkout."
            centered={false}
          />

          <div className="flex flex-col lg:flex-row gap-12 mt-12">
            {/* Order Details */}
            <div className="flex-1">
              <div className="bg-card border border-border rounded-lg overflow-hidden p-8">
                <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">Items ({totalItems})</h3>
                <ul className="divide-y divide-border mb-8">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white line-clamp-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-neon">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">Delivery Details</h3>
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                      placeholder="123 Fitness St."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="Mumbai"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">State</label>
                      <input
                        type="text"
                        value={deliveryState}
                        onChange={(e) => setDeliveryState(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="MH"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">ZIP Code</label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="400001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                        placeholder="9876543210"
                        required
                      />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod("upi")}
                    className={`rounded-lg p-4 cursor-pointer flex items-center justify-between transition-colors ${paymentMethod === "upi" ? 'border border-neon bg-neon/5' : 'border border-border hover:border-border/80 bg-muted/20'}`}
                  >
                    <div>
                      <h4 className="font-bold text-white uppercase">UPI / QR Code</h4>
                      <p className="text-xs text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${paymentMethod === "upi" ? 'bg-neon' : 'border border-muted-foreground'}`}></div>
                  </div>
                  <div 
                    onClick={() => setPaymentMethod("cards")}
                    className={`rounded-lg p-4 cursor-pointer flex items-center justify-between transition-colors ${paymentMethod === "cards" ? 'border border-neon bg-neon/5' : 'border border-border hover:border-border/80 bg-muted/20'}`}
                  >
                    <div>
                      <h4 className="font-bold text-white uppercase">Cards</h4>
                      <p className="text-xs text-muted-foreground">Credit or Debit</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${paymentMethod === "cards" ? 'bg-neon' : 'border border-muted-foreground'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-card border border-border rounded-lg p-6 sm:p-8 lg:sticky lg:top-32 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6">Summary</h3>
                
                <div className="space-y-4 mb-6 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
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

                <Button 
                  onClick={handlePayment}
                  disabled={loading || items.length === 0}
                  className="w-full h-14 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 rounded-none shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all flex items-center justify-center"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay Now"}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6 bg-muted/20 p-3 rounded">
                  <ShieldCheck className="w-5 h-5 text-neon" />
                  <span>Secured by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
