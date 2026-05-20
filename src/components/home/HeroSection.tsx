"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Fluid Moving Gradient Style */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fluid-motion {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-fluid-gradient {
          background: linear-gradient(
            to right,
            #ff1a00,
            #ff6000,
            #ffb300,
            #ff0055,
            #ff7a00,
            #ff1a00
          );
          background-size: 200% auto;
          animation: fluid-motion 5s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          will-change: background-position;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
      `}} />
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon/10 via-background to-background" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-neon/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border mb-8"
        >
          <Zap className="w-4 h-4 text-neon" />
          <span className="text-sm font-medium text-white uppercase tracking-wider">New Premium Pre-Workout Drop</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-tight md:leading-[0.9] mb-6"
        >
          Unleash Your <br className="hidden sm:block" />
          <span className="animate-fluid-gradient bg-clip-text">True Potential</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-medium leading-relaxed px-2"
        >
          Elite supplements engineered for those who refuse to be average. 
          Experience the pinnacle of sports nutrition with SS Fitness Solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/#shop" 
            className="inline-flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 font-bold uppercase tracking-widest px-8 py-4 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all"
          >
            Shop Now <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </section>
  );
}

