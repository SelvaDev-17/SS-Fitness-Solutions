import Link from "next/link";
import { Globe, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "./ContactModal";
import { ShippingReturnsModal } from "./ShippingReturnsModal";
import { TrackOrderModal } from "./TrackOrderModal";
import { DirectMailModal } from "./DirectMailModal";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { TermsOfServiceModal } from "./TermsOfServiceModal";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-neon/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter uppercase text-white">
                <span className="text-neon mr-2.5">SS</span>
                <span className="mr-2.5">Fitness</span>
                <span>Solutions</span><span className="text-neon">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Premium sports nutrition designed for those who demand the absolute best. Elevate your performance with our elite formulations.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.google.com/maps?ftid=0x3a5267d90f449f01:0xa553ca40200c679" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-neon hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919840018555" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-neon hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <DirectMailModal>
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-neon hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
              </DirectMailModal>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/products?category=Protein" className="text-muted-foreground hover:text-neon transition-colors">Protein</Link></li>
              <li><Link href="/products?category=Pre-Workout" className="text-muted-foreground hover:text-neon transition-colors">Pre-Workout</Link></li>
              <li><Link href="/products?category=Recovery" className="text-muted-foreground hover:text-neon transition-colors">Recovery & BCAAs</Link></li>
              <li><Link href="/products?category=Vitamins" className="text-muted-foreground hover:text-neon transition-colors">Vitamins & Health</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-neon transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/#faq" className="text-muted-foreground hover:text-neon transition-colors">FAQ</Link></li>
              <li><ShippingReturnsModal /></li>
              <li><ContactModal /></li>
              <li><TrackOrderModal /></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Join The Elite</h4>
            <p className="text-muted-foreground mb-6">Follow the SS Fitness Solutions channel on WhatsApp for exclusive offers, training tips, and new product drops.</p>
            <a 
              href="https://whatsapp.com/channel/0029VbCmULbBvvsjGFAd2b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase h-12 px-6 rounded-md transition-all w-full sm:w-auto group"
            >
              <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" /> 
              Follow on WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SS Fitness Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <PrivacyPolicyModal />
            <TermsOfServiceModal />
          </div>
        </div>
      </div>
    </footer>
  );
}

