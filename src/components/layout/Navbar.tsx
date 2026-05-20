"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Loader2 } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ContactModal } from "./ContactModal";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/#shop" },
  { name: "Location", href: "/#location" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products when search is opened
  useEffect(() => {
    if (isSearchOpen && allProducts.length === 0) {
      setIsFetchingProducts(true);
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setAllProducts(data);
          }
        })
        .catch((err) => console.error("Error fetching products", err))
        .finally(() => setIsFetchingProducts(false));
    }
  }, [isSearchOpen, allProducts]);

  // Lock body scroll and focus input when search is opened
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Ctrl+K to open, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim() !== ""
    ? allProducts.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.features && product.features.some((f: string) => f.toLowerCase().includes(query)))
        );
      })
    : [];

  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-lg"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center text-white hover:text-neon w-10 h-10 rounded-md">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-r-border/30 pt-16">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "text-2xl font-bold uppercase tracking-wider transition-colors",
                      pathname === link.href ? "text-neon" : "text-white hover:text-neon/80"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                  <button 
                    onClick={() => { setIsContactOpen(true); setIsOpen(false); }}
                    className="text-2xl font-bold uppercase tracking-wider transition-colors text-white hover:text-neon/80 text-left" 
                  >
                    Contact
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
  
          {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group relative z-10">
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter uppercase text-white group-hover:text-neon transition-colors duration-300 whitespace-nowrap">
            <span className="text-neon mr-1 md:mr-2.5">SS</span>
            <span className="mr-1 md:mr-2.5">Fitness</span>
            <span>Solutions</span><span className="text-neon">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-sm font-bold uppercase tracking-widest transition-all duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-neon after:transition-all hover:after:w-full",
                pathname === link.href ? "text-neon after:w-full" : "text-gray-300 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <ContactModal 
            text="Contact" 
            className="text-sm font-bold uppercase tracking-widest transition-all duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-neon after:transition-all hover:after:w-full text-gray-300 hover:text-white"
          />
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center gap-2 sm:gap-4 relative z-10">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-300 hover:text-neon p-2.5 transition-colors duration-300 relative flex items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Open search"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <CartDrawer />
        </div>
      </div>

      {isContactOpen && (
        <ContactModal 
          isOpenProp={isContactOpen} 
          onCloseProp={() => setIsContactOpen(false)} 
        />
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex justify-center items-start pt-6 sm:pt-16 md:pt-28 px-4 md:px-6 overflow-y-auto pb-10">
          <div className="w-full max-w-3xl flex flex-col gap-6 md:gap-8 relative">
            {/* Search Header Row (Input + Close Button) */}
            <div className="flex items-center gap-3 md:gap-4 border-b border-zinc-800 pb-3 md:pb-4 w-full">
              <div className="relative flex-1 flex items-center group">
                <Search className="w-5 h-5 md:w-7 md:h-7 text-zinc-500 mr-2 md:mr-3 group-focus-within:text-neon transition-colors shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-lg sm:text-xl md:text-2xl text-white outline-none placeholder-zinc-600 font-bold md:font-black tracking-tight"
                />
                {isFetchingProducts ? (
                  <Loader2 className="w-5 h-5 text-neon animate-spin shrink-0 ml-2" />
                ) : searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-zinc-500 hover:text-white transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : (
                  <span className="hidden sm:inline text-xs font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800 shrink-0 select-none ml-2">
                    ESC
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-white p-2 transition-all duration-300 bg-zinc-900/60 hover:bg-zinc-900/90 rounded-full border border-border/50 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95"
                aria-label="Close search"
              >
                <X className="w-5 h-5 md:w-6 h-6" />
              </button>
            </div>

            {/* Results / Suggestions Container */}
            <div className="flex flex-col gap-4 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {searchQuery.trim() === "" ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-neon uppercase tracking-widest mb-3">Suggested Formulations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-4 p-3 bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700/80 rounded-xl transition-all duration-300 group"
                          >
                            <div className="relative w-12 h-12 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-sm text-white group-hover:text-neon transition-colors truncate">{product.name}</h5>
                              <p className="text-xs text-zinc-500 uppercase font-semibold">{product.category}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-zinc-500">Loading products...</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Search Results ({filteredProducts.length})</h4>
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-4 bg-zinc-900/20 hover:bg-zinc-900/60 border border-zinc-800/40 hover:border-neon/20 rounded-xl transition-all duration-300 group"
                    >
                      <div className="relative w-14 h-14 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-white group-hover:text-neon transition-colors truncate">{product.name}</h5>
                        <p className="text-xs text-zinc-500 uppercase font-semibold">{product.category}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-black text-neon text-base sm:text-lg">₹{product.price.toFixed(2)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-zinc-500 text-lg">No formulations matching &quot;{searchQuery}&quot;</p>
                  <p className="text-sm text-zinc-600 mt-1">Check spelling or search for categories like Whey, Creatine, Gainer, etc.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
