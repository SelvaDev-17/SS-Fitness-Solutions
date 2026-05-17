"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/#shop");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const cb = urlParams.get("callbackUrl");
      if (cb) setCallbackUrl(cb);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background styling */}
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
          Access Account
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Enter your credentials to continue.
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 transition-all rounded shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-neon hover:underline font-medium">
            Create One
          </Link>
        </div>
      </div>
    </div>
  );
}
