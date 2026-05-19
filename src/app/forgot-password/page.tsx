"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-y-auto px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon/5 via-background to-background z-0" />
      
      <Link href="/" className="z-10 mb-8 flex items-center gap-2 group relative">
        <span className="text-3xl font-black tracking-tighter uppercase text-white group-hover:text-neon transition-colors duration-300">
          <span className="text-neon mr-2.5">SS</span>
          <span className="mr-2.5">Fitness</span>
          <span>Solutions</span><span className="text-neon">.</span>
        </span>
      </Link>

      <div className="bg-card border border-border/50 rounded-2xl p-8 w-full max-w-md z-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon/0 via-neon to-neon/0" />
        
        <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Enter your email to receive a reset link.
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm px-4 py-3 rounded mb-6 text-center">
            Password reset link sent! Check your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 transition-all rounded shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <div className="mt-8 text-center text-sm text-gray-400">
          Remembered your password?{" "}
          <Link href="/login" className="text-neon hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
