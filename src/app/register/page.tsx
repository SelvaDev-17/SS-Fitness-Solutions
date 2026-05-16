"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
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
          Create Account
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Join the elite and track your progress.
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              minLength={6}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-lg font-bold uppercase tracking-widest bg-neon text-neon-foreground hover:bg-neon/90 transition-all rounded shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-neon hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
