"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES } from "@/lib/mock-data";
import { Product } from "@prisma/client";

export function ShopSection({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory(null);
    }
  }, [categoryParam]);

  const handleCategoryClick = (cat: string | null) => {
    setActiveCategory(cat);
    if (cat) {
      router.push(`/?category=${encodeURIComponent(cat)}#shop`, { scroll: false });
    } else {
      router.push(`/#shop`, { scroll: false });
    }
  };

  const products = activeCategory
    ? initialProducts.filter((p) => p.category === activeCategory)
    : initialProducts;

  return (
    <section id="shop" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="All Products" 
          subtitle="Engineered for peak performance and absolute purity."
          centered={true}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="md:sticky md:top-32 space-y-8">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Categories</h3>
                <div className="w-12 h-[2px] bg-neon mb-6"></div>
                <ul className="space-y-0 md:space-y-3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-4 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  <li>
                    <button 
                      onClick={() => handleCategoryClick(null)}
                      className={`text-lg whitespace-nowrap transition-colors ${!activeCategory ? 'text-neon font-bold' : 'text-muted-foreground hover:text-white'}`}
                    >
                      All Products
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button 
                        onClick={() => handleCategoryClick(cat)}
                        className={`text-lg whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-neon font-bold' : 'text-muted-foreground hover:text-white'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-border bg-card">
                <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                <p className="text-muted-foreground">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
