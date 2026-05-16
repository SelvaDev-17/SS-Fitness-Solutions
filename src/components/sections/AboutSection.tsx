import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlaskConical, Dna, ShieldCheck, Award } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          <div className="space-y-8">
            <SectionHeading 
              title="Our Story" 
              subtitle="Born from frustration. Built for the elite."
              centered={false}
            />
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                SS Fitness Solutions was founded with a single, uncompromising goal: to create the supplements we actually wanted to take. For years, we were frustrated by an industry saturated with proprietary blends, under-dosed ingredients, and misleading marketing.
              </p>
              <p>
                We grew tired of "fairy dusting"—the practice of adding just enough of a premium ingredient to list it on the label, but nowhere near the clinical dose required to actually work.
              </p>
              <p>
                So, we decided to build something better. We partnered with leading sports nutritionists and biochemists to engineer formulas based entirely on clinical science. No shortcuts. No fillers. Just the exact ingredients, at the exact dosages, proven to enhance human performance.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] border border-border bg-card p-4 overflow-hidden group">
            <div className="absolute inset-0 bg-neon/5 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
            <div className="w-full h-full bg-muted flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon/20 to-transparent"></div>
               <div className="text-center relative z-10 p-8">
                  <span className="text-9xl font-black text-white/5 uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">EST. 2004</span>
                  <h3 className="text-4xl font-black uppercase text-white tracking-widest relative z-10">We Demand<br/>Better</h3>
               </div>
            </div>
          </div>
        </div>

        {/* Our Pillars */}
        <div className="">
          <SectionHeading 
            title="The SS Fitness Solutions Pillars" 
            subtitle="The core principles that guide everything we formulate, test, and produce."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="bg-card border border-border p-8 hover:border-neon transition-colors group">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-neon/10 transition-colors">
                <FlaskConical className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Science First</h3>
              <p className="text-muted-foreground">Every ingredient must be backed by peer-reviewed human trials. No fads, no hype. Just proven science.</p>
            </div>
            
            <div className="bg-card border border-border p-8 hover:border-neon transition-colors group">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-neon/10 transition-colors">
                <Dna className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Clinical Dosing</h3>
              <p className="text-muted-foreground">We use the exact dosages proven effective in clinical studies. Never less, just to save a few cents.</p>
            </div>
            
            <div className="bg-card border border-border p-8 hover:border-neon transition-colors group">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-neon/10 transition-colors">
                <ShieldCheck className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Full Transparency</h3>
              <p className="text-muted-foreground">Zero proprietary blends. You have the right to know exactly what you are putting into your body.</p>
            </div>
            
            <div className="bg-card border border-border p-8 hover:border-neon transition-colors group">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-neon/10 transition-colors">
                <Award className="w-8 h-8 text-neon" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Premium Quality</h3>
              <p className="text-muted-foreground">We source only the highest quality, patented ingredients from around the world. No cheap fillers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
