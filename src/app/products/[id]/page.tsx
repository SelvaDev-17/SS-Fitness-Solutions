import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";

// Pre-generate static params
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const product = await prisma.product.findUnique({
    where: { id: p.id }
  });
  
  if (!product) return { title: "Not Found" };
  
  return {
    title: `${product.name} | SS Fitness Solutions`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const product = await prisma.product.findUnique({
    where: { id: p.id }
  });

  if (!product) {
    notFound();
  }
  
  const nutritionalInfo = product.nutritionalInfo as { label: string, value: string }[] || [];

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image Gallery */}
            <div className="space-y-6">
              <ProductImageGallery 
                name={product.name} 
                images={[product.image, ...(product.additionalImages || [])]} 
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2 text-neon font-bold tracking-widest uppercase text-sm">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-neon">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-neon' : ''}`} />
                  ))}
                </div>
                <span className="text-white font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="text-4xl font-black text-white mb-8 border-b border-border pb-8">
                ₹{product.price.toFixed(2)}
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Add to Cart Client Component */}
              <AddToCartButton product={product} />

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="w-8 h-8 text-neon shrink-0" />
                  <span className="text-sm font-medium uppercase tracking-wider">Premium Quality</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Truck className="w-8 h-8 text-neon shrink-0" />
                  <span className="text-sm font-medium uppercase tracking-wider">Fast Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <RefreshCw className="w-8 h-8 text-neon shrink-0" />
                  <span className="text-sm font-medium uppercase tracking-wider">30-Day Returns</span>
                </div>
              </div>

              {/* Nutritional Info & Features */}
              <div className="mt-16 space-y-12">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6 flex items-center">
                    Key Features <span className="flex-1 h-[1px] bg-border ml-6"></span>
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-neon mt-2 shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-6 flex items-center">
                    Nutritional Facts <span className="flex-1 h-[1px] bg-border ml-6"></span>
                  </h3>
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    {nutritionalInfo.map((info, i) => (
                      <div key={i} className={`flex justify-between p-4 ${i !== nutritionalInfo.length - 1 ? 'border-b border-border' : ''}`}>
                        <span className="font-medium text-white">{info.label}</span>
                        <span className="text-neon font-bold">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
