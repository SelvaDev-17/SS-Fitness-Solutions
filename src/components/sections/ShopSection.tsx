"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES } from "@/lib/mock-data";
import { Product } from "@prisma/client";
import { Search, X } from "lucide-react";

export function ShopSection({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");

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

  // 1. First filter by search text matching name, description, category, or key features
  const searchedProducts = searchQuery.trim() !== ""
    ? initialProducts.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query))
        );
      })
    : initialProducts;

  // 2. Second filter by active category selection
  const products = activeCategory
    ? searchedProducts.filter((p) => p.category === activeCategory)
    : searchedProducts;

  return (
    <section id="shop" className="py-24 relative bg-[#F9FAFB]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="All Products" 
          subtitle="Engineered for peak performance and absolute purity."
          centered={true}
          light={true}
        />

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="md:sticky md:top-32 space-y-8">
              {/* Search Bar */}
              <div className="relative">
                <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-900 mb-4">Search</h3>
                <div className="w-12 h-[2px] bg-neon mb-5"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-zinc-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-10 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all duration-300 shadow-sm text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 text-zinc-400 hover:text-zinc-900 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-900 mb-4">Categories</h3>
                <div className="w-12 h-[2px] bg-neon mb-6"></div>
                <ul className="space-y-0 md:space-y-3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 gap-4 md:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  <li>
                    <button 
                      onClick={() => handleCategoryClick(null)}
                      className={`text-lg whitespace-nowrap transition-colors ${!activeCategory ? 'text-neon font-bold' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                      All Products
                    </button>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button 
                        onClick={() => handleCategoryClick(cat)}
                        className={`text-lg whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-neon font-bold' : 'text-zinc-500 hover:text-zinc-900'}`}
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
              <div className="text-center py-24 border border-[#E5E7EB] bg-white rounded-2xl shadow-sm px-6">
                <h3 className="text-2xl font-bold text-black mb-2">No products found</h3>
                <p className="text-zinc-500 mb-6">
                  {searchQuery 
                    ? `We couldn't find any products matching "${searchQuery}".`
                    : "Try selecting a different category."
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center justify-center bg-neon text-neon-foreground hover:bg-neon/90 font-bold tracking-widest uppercase rounded-none h-12 px-8 transition-colors shadow-lg shadow-neon/10"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
