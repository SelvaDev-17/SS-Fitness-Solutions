import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/home/CategoryCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ShopSection } from "@/components/sections/ShopSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />

        {/* Featured Products */}
        <section className="py-24 bg-card/30 relative">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading 
              title="Elite Formulations" 
              subtitle="Our best-selling, scientifically backed supplements for maximum performance."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/#shop" className="inline-flex items-center justify-center border border-neon text-neon hover:bg-neon hover:text-neon-foreground font-bold tracking-widest uppercase rounded-none h-12 px-8 transition-colors">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 relative overflow-hidden border-y border-border">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/50"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {CATEGORIES.map((category, index) => {
                const categoryImages = products.filter(p => p.category === category).map(p => p.image);
                return (
                  <CategoryCard key={index} category={category} images={categoryImages} />
                );
              })}
            </div>
          </div>
        </section>



        <ShopSection initialProducts={products} />
        <FAQSection />
        <LocationSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
