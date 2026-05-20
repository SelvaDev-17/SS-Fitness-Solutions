import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageSlideshow } from "@/components/locations/ImageSlideshow";

const STORE_IMAGES = [
  "https://lh3.googleusercontent.com/p/AF1QipPeKsAbUbS7NNJ5KtX9uTQ6qy_6vbeLKtNxfnyf=s0",
  "https://lh3.googleusercontent.com/p/AF1QipN6flSvACVDB54Fmv3YcRDY9XcD_XYc7VINKk3C=s0",
  "https://lh3.googleusercontent.com/p/AF1QipNykqFe7Nbr875Gf-lOOytg9PHPr2337K0Tz73V=s0",
  "https://lh3.googleusercontent.com/gps-cs/ACgwaOs6Ob8t6kUJ9uBjI69mshVwvu46S03TM_uaR7i8nZCxXzsU-pMHlTBx0Hfp_FEQ9zEnYFIv1q0K38jJIpIJcJH2T-3SrEC_Ebr0YDKWqhu1yXUm-KsaNYLU5Dxx7PdygCLvPcubYPy0WeiJ=s0",
  "https://lh3.googleusercontent.com/p/AF1QipN4NEiE_JlBI_B-_swjfHV3Y3e260XJCRcqqN-Y=s0",
  "https://lh3.googleusercontent.com/p/AF1QipP7vTGlghxFFrlzKsm4JnRMj4FOU9T2_kCbZXSl=s0"
];

export function LocationSection() {
  return (
    <section id="location" className="py-24 bg-zinc-950/60 relative border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Our Location" 
          subtitle="Find the SS Fitness Solutions flagship store."
          centered={true}
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shop Image Slideshow */}
          <div className="h-[400px] lg:h-[600px] bg-zinc-950 border border-zinc-800/80 rounded-lg overflow-hidden flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
            <ImageSlideshow images={STORE_IMAGES} />
          </div>

          {/* Venues */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 rounded-lg hover:border-neon transition-colors">
              <h3 className="text-xl font-bold uppercase text-white mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon"></div>
                Alwarpet (Flagship Store)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Shop No.7, Saptagiri Complex, TTK Rd<br />
                opp. to Fab india, Sriram Colony<br />
                Alwarpet, Chennai, Tamil Nadu 600018
              </p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-2">
                <p><strong className="text-white font-medium">Email:</strong> <a href="mailto:ssfitnesssolutions2004@gmail.com" className="hover:text-neon transition-colors">ssfitnesssolutions2004@gmail.com</a></p>
                <p><strong className="text-white font-medium">Phone:</strong> <a href="tel:+919840018555" className="hover:text-neon transition-colors">+91 98400 18555</a></p>
              </div>
              <a href="https://google.com/maps?ftid=0x3a5267d90f449f01:0xa553ca40200c679" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-neon hover:underline text-sm font-bold uppercase tracking-wider">
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
