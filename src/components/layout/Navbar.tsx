"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ContactModal } from "./ContactModal";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/#shop" },
  { name: "Location", href: "/#location" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                <div onClick={() => setIsOpen(false)}>
                  <ContactModal 
                    text="Contact" 
                    className="text-2xl font-bold uppercase tracking-wider transition-colors text-white hover:text-neon/80 text-left" 
                  />
                </div>
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

        {/* Cart */}
        <div className="flex items-center gap-4">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
