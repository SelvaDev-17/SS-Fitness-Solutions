"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { 
  Copy, 
  Check, 
  Upload, 
  X, 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  Smartphone, 
  QrCode, 
  FileText,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { 
  GooglePayIcon, 
  PhonePeIcon, 
  PaytmIcon, 
  UpiIcon, 
  QrCodeIcon 
} from "./icons";

interface UPIPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  upiId?: string;
  businessName?: string;
  onPaymentSuccess?: (utr: string, screenshotFile: File | null) => void;
}

export function UPIPaymentModal({
  isOpen,
  onClose,
  amount,
  upiId = "brownboyvibe17-1@oksbi",
  businessName = "SS fitness solutions",
  onPaymentSuccess,
}: UPIPaymentModalProps) {
  // States
  const [deviceType, setDeviceType] = useState<"android" | "ios" | "desktop">("desktop");
  const [step, setStep] = useState<"pay" | "verify" | "success">("pay");
  const [copied, setCopied] = useState(false);
  const [selectedApp, setSelectedApp] = useState<"gpay" | "phonepe" | "paytm" | "generic" | "qr">("generic");
  
  // Verification states
  const [utrNumber, setUtrNumber] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // QR generation state
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect platform on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (/android/.test(ua)) {
        setDeviceType("android");
        setSelectedApp("generic"); // on Android, default to generic chooser
      } else if (/iphone|ipad|ipod/.test(ua)) {
        setDeviceType("ios");
        setSelectedApp("generic"); // on iOS, default to generic chooser
      } else {
        setDeviceType("desktop");
        setSelectedApp("qr"); // on desktop, default to QR code
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || step === "success") return;
    
    setTimeLeft(300); // Reset timer when opened
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, step]);

  // Construct UPI links
  const formattedAmount = amount.toFixed(2);
  const encodedName = encodeURIComponent(businessName);
  
  // Standard UPI deep link
  const baseUpiLink = `upi://pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR`;

  // Get deep link based on platform and selected app
  const getPayLink = (app: typeof selectedApp) => {
    if (deviceType === "android") {
      switch (app) {
        case "gpay":
          return `intent://pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
        case "phonepe":
          return `intent://pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR#Intent;scheme=upi;package=com.phonepe.app;end`;
        case "paytm":
          return `intent://pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR#Intent;scheme=upi;package=net.one97.paytm;end`;
        default:
          return baseUpiLink;
      }
    } else if (deviceType === "ios") {
      switch (app) {
        case "gpay":
          return `tez://upi/pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR`;
        case "phonepe":
          return `phonepe://pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR`;
        case "paytm":
          return `paytmmp://pay?pa=${upiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR`;
        default:
          return baseUpiLink;
      }
    }
    return baseUpiLink;
  };

  // Generate QR Code URL
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(baseUpiLink, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [isOpen, baseUpiLink]);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Actions
  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy UPI ID:", err);
    }
  };

  const handleAppLaunch = (app: typeof selectedApp) => {
    setSelectedApp(app);
    if (deviceType !== "desktop" && app !== "qr") {
      const link = getPayLink(app);
      window.location.href = link;
    }
  };

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMsg("Please upload an image file (PNG/JPG/WEBP).");
        return;
      }
      setScreenshotFile(file);
      setErrorMsg("");
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMsg("Please upload an image file (PNG/JPG/WEBP).");
        return;
      }
      setScreenshotFile(file);
      setErrorMsg("");
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit Verification Form
  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate inputs - UTR must be exactly 12 digits or screenshot must be uploaded
    if (!utrNumber && !screenshotFile) {
      setErrorMsg("Please enter the 12-digit UTR number or upload a payment screenshot.");
      return;
    }

    if (utrNumber && !/^\d{12}$/.test(utrNumber)) {
      setErrorMsg("UPI UTR Number must be exactly 12 digits.");
      return;
    }

    setIsSubmitting(true);

    // Simulate server submission
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      if (onPaymentSuccess) {
        onPaymentSuccess(utrNumber, screenshotFile);
      }
    }, 2000);
  };

  // Reset modal state on close
  const handleClose = () => {
    setStep("pay");
    setUtrNumber("");
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setErrorMsg("");
    setSelectedApp(deviceType === "desktop" ? "qr" : "generic");
    onClose();
  };

  // Format timer values
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(255,153,0,0.15)] text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/30">
          <div className="flex items-center gap-2">
            {step === "verify" && (
              <button 
                onClick={() => setStep("pay")}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                title="Back to payment"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h3 className="font-bold text-lg tracking-wide uppercase text-white">
                {step === "pay" ? "UPI Payment" : step === "verify" ? "Verify Payment" : "Success"}
              </h3>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                {businessName}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Only if not success) */}
        {step !== "success" && (
          <div className="flex items-center bg-zinc-900/10 border-b border-zinc-900 px-6 py-2 text-xs font-semibold uppercase tracking-wider">
            <span className={`transition-colors ${step === "pay" ? "text-neon" : "text-zinc-500"}`}>
              1. Pay
            </span>
            <span className="mx-2 text-zinc-700">/</span>
            <span className={`transition-colors ${step === "verify" ? "text-neon" : "text-zinc-500"}`}>
              2. Verify Transfer
            </span>
            <div className="ml-auto flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 text-neon" />
              <span className={timeLeft < 60 ? "text-red-500 font-bold" : ""}>{formatTime(timeLeft)}</span>
            </div>
          </div>
        )}

        {/* Step 1: Pay */}
        {step === "pay" && (
          <div className="p-6 space-y-6">
            
            {/* Amount details */}
            <div className="text-center bg-zinc-900/50 border border-zinc-900 rounded-xl p-4">
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-widest block mb-1">
                Amount to Pay
              </span>
              <h2 className="text-4xl font-black text-neon tracking-tight">
                ₹{formattedAmount}
              </h2>
            </div>

            {/* Quick Actions (UPI App Choice) - Mobile-first */}
            <div className="space-y-3">
              <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
                {deviceType !== "desktop" ? "Choose UPI App" : "Scan or Copy UPI ID"}
              </label>

              {/* UPI Brand Grid */}
              <div className="grid grid-cols-2 gap-3">
                {deviceType !== "desktop" && (
                  <>
                    {/* Google Pay */}
                    <button
                      onClick={() => handleAppLaunch("gpay")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold text-left transition-all duration-200 ${
                        selectedApp === "gpay" 
                          ? "border-neon bg-neon/10 text-white" 
                          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 text-zinc-300"
                      }`}
                    >
                      <GooglePayIcon className="w-6 h-6 shrink-0" />
                      <span>Google Pay</span>
                    </button>

                    {/* PhonePe */}
                    <button
                      onClick={() => handleAppLaunch("phonepe")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold text-left transition-all duration-200 ${
                        selectedApp === "phonepe" 
                          ? "border-neon bg-neon/10 text-white" 
                          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 text-zinc-300"
                      }`}
                    >
                      <PhonePeIcon className="w-6 h-6 shrink-0" />
                      <span>PhonePe</span>
                    </button>

                    {/* Paytm */}
                    <button
                      onClick={() => handleAppLaunch("paytm")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold text-left transition-all duration-200 ${
                        selectedApp === "paytm" 
                          ? "border-neon bg-neon/10 text-white" 
                          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 text-zinc-300"
                      }`}
                    >
                      <PaytmIcon className="w-6 h-6 shrink-0" />
                      <span>Paytm</span>
                    </button>
                  </>
                )}

                {/* Scan QR Code option */}
                <button
                  onClick={() => handleAppLaunch("qr")}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-bold text-left transition-all duration-200 ${
                    selectedApp === "qr" 
                      ? "border-neon bg-neon/10 text-white" 
                      : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 text-zinc-300"
                  } ${deviceType === "desktop" ? "col-span-2 justify-center" : ""}`}
                >
                  <QrCodeIcon className="w-6 h-6 shrink-0" />
                  <span>Scan QR Code</span>
                </button>

                {/* Pay with Any UPI App */}
                {deviceType !== "desktop" && (
                  <button
                    onClick={() => handleAppLaunch("generic")}
                    className={`col-span-2 flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm font-bold transition-all duration-200 ${
                      selectedApp === "generic" 
                        ? "border-neon bg-neon/10 text-white" 
                        : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 text-zinc-300"
                    }`}
                  >
                    <UpiIcon className="h-4.5 shrink-0" />
                    <span>Pay with Other UPI App</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Content: QR Code or Pay Action Button */}
            <div className="transition-all duration-300 ease-in-out">
              {selectedApp === "qr" || deviceType === "desktop" ? (
                /* QR CODE DISPLAY */
                <div className="flex flex-col items-center justify-center p-4 border border-zinc-900 bg-zinc-900/20 rounded-2xl relative">
                  
                  {/* QR Image Wrapper */}
                  <div className="bg-white p-4 rounded-xl shadow-lg relative flex items-center justify-center overflow-hidden">
                    {qrCodeUrl ? (
                      <img 
                        src={qrCodeUrl} 
                        alt="UPI Payment QR Code" 
                        className="w-56 h-56 select-none"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-56 h-56 flex items-center justify-center text-zinc-400 font-mono text-sm">
                        Generating QR Code...
                      </div>
                    )}

                    {/* Styled Center Badge overlay (Custom GPay/UPI center badge) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-zinc-100">
                        {/* A clean double arrows UPI logo inside */}
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                          <path d="M4 14.5L12 6.5L20 14.5" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 17.5L12 9.5L20 17.5" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-zinc-400 text-xs font-semibold mt-3 text-center uppercase tracking-wider">
                    Scan to pay with any UPI app
                  </p>
                </div>
              ) : (
                /* INTENT ACTION BUTTON (On Mobile) */
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-5 text-center space-y-4">
                  <div className="flex justify-center text-neon">
                    <Smartphone className="w-12 h-12" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Pay via App Intent</h4>
                    <p className="text-zinc-400 text-xs mt-1">
                      Click the button below to launch your selected UPI application.
                    </p>
                  </div>
                  
                  <a
                    href={getPayLink(selectedApp)}
                    className="inline-flex items-center justify-center w-full h-12 bg-neon text-neon-foreground font-black uppercase tracking-widest text-sm rounded-xl hover:bg-neon/90 transition-colors shadow-[0_0_20px_rgba(255,153,0,0.3)]"
                  >
                    Open {selectedApp === "gpay" ? "Google Pay" : selectedApp === "phonepe" ? "PhonePe" : selectedApp === "paytm" ? "Paytm" : "UPI App"}
                  </a>
                </div>
              )}
            </div>

            {/* UPI ID Clipboard Copy bar */}
            <div className="flex items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-900 rounded-xl px-4 py-3 text-sm">
              <div className="overflow-hidden">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                  UPI ID (VPA)
                </span>
                <span className="font-mono text-zinc-300 font-semibold block truncate">
                  {upiId}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUPI}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-300 hover:text-white transition-colors border border-zinc-800"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>

            {/* Pay Now / Proceed to Verification */}
            <div className="pt-2">
              <button
                onClick={() => setStep("verify")}
                className="flex items-center justify-center w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl font-bold uppercase tracking-widest text-sm text-white hover:bg-zinc-850 hover:border-zinc-700 transition-colors gap-2"
              >
                <span>Verify Payment Details</span>
                <Clock className="w-4 h-4 text-neon" />
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 mt-3 font-semibold uppercase tracking-wider text-center">
                <AlertCircle className="w-3.5 h-3.5 text-neon" />
                <span>Complete the transfer, then click verify above.</span>
              </div>
            </div>

          </div>
        )}

        {/* Step 2: Verify */}
        {step === "verify" && (
          <form onSubmit={handleSubmitVerification} className="p-6 space-y-6">
            
            {/* Amount confirmation badge */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/30 border border-zinc-900 rounded-xl text-sm">
              <span className="text-zinc-400 font-semibold">Payment Amount</span>
              <span className="font-mono text-neon font-black text-lg">₹{formattedAmount}</span>
            </div>

            {/* Instruction Banner */}
            <div className="bg-neon/5 border border-neon/20 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-neon shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                  Success Instruction
                </h5>
                <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                  After payment, upload screenshot or enter UTR number.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex gap-2.5 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Verification Inputs */}
            <div className="space-y-4">
              {/* UTR Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-zinc-500" />
                  <span>UPI UTR / Ref Number</span>
                  <span className="text-[10px] text-zinc-600 font-normal normal-case">(12 digits)</span>
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={utrNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setUtrNumber(val);
                    if (val) setErrorMsg("");
                  }}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                  placeholder="e.g. 123456789012"
                />
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-900"></div>
                <span className="flex-shrink mx-3 text-[10px] text-zinc-600 font-bold uppercase tracking-wider">OR</span>
                <div className="flex-grow border-t border-zinc-900"></div>
              </div>

              {/* Screenshot Upload */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-zinc-500" />
                  <span>Upload Screenshot</span>
                </label>
                
                {screenshotPreview ? (
                  /* Screenshot Preview Container */
                  <div className="relative border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/20 aspect-video flex items-center justify-center p-2 group">
                    <img 
                      src={screenshotPreview} 
                      alt="Screenshot upload preview" 
                      className="max-h-full max-w-full object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-zinc-800"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-zinc-300 max-w-[80%] truncate">
                      {screenshotFile?.name}
                    </div>
                  </div>
                ) : (
                  /* Drag and Drop Zone */
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/10 hover:bg-zinc-900/20 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-zinc-600 group-hover:text-neon mx-auto mb-2.5 transition-colors" />
                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white block transition-colors">
                      Drag & drop image here
                    </span>
                    <span className="text-[11px] text-zinc-500 mt-1 block">
                      or click to browse from device (JPG, PNG, WEBP)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submission buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full h-14 bg-neon text-neon-foreground font-black uppercase tracking-widest text-sm rounded-xl hover:bg-neon/90 transition-colors shadow-[0_0_20px_rgba(255,153,0,0.3)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Verifying Transfer...</span>
                  </span>
                ) : (
                  <span>Submit For Verification</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep("pay")}
                className="w-full text-center py-2.5 text-xs text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-wider transition-colors"
              >
                Back to QR Code / Payment Links
              </button>
            </div>

          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === "success" && (
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black uppercase tracking-wider text-white">
                Payment Submitted!
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for the transfer. Our support team is verifying your payment. Your order will be activated shortly.
              </p>
            </div>

            {/* Display info if submitted */}
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4 text-xs font-mono text-zinc-400 space-y-1.5 max-w-xs mx-auto text-left">
              {utrNumber && (
                <div className="flex justify-between">
                  <span>UTR Reference:</span>
                  <span className="text-white font-bold">{utrNumber}</span>
                </div>
              )}
              {screenshotFile && (
                <div className="flex justify-between">
                  <span>Screenshot:</span>
                  <span className="text-white font-bold truncate max-w-[150px]">{screenshotFile.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-yellow-500 font-bold uppercase tracking-wider">Pending Verification</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="w-full h-12 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 rounded-xl font-bold uppercase tracking-widest text-xs text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Footer info banner */}
        <div className="px-6 py-4 bg-zinc-900/20 border-t border-zinc-900 flex items-center justify-center gap-1.5 text-[10px] text-zinc-600 font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Secured, direct peer-to-peer UPI transfer</span>
        </div>

      </div>
    </div>
  );
}
