import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { MOCK_PRODUCTS } from "../src/lib/mock-data";

async function main() {
  console.log("Starting data seeding...");

  for (const product of MOCK_PRODUCTS) {
    // Determine category based on product logic or hardcode mapping if needed.
    // mock-data.ts does not explicitly export 'category' in the Product type in the same way, wait, let me check the MOCK_PRODUCTS.
    // Actually, looking at mock-data.ts earlier, Product has id, name, price, rating, reviews, description, features, image, category, isFeatured, additionalImages, nutritionalInfo.
    
    // Check if product already exists to avoid duplicates
    const existingProduct = await prisma.product.findUnique({
      where: { id: product.id }
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          rating: product.rating,
          reviews: product.reviews,
          description: product.description,
          features: product.features,
          image: product.image,
          category: product.category,
          isFeatured: product.isFeatured || false,
          additionalImages: product.additionalImages || [],
          nutritionalInfo: product.nutritionalInfo as any, // Cast as any for Json type
        }
      });
      console.log(`Created product: ${product.name}`);
    } else {
      console.log(`Product already exists: ${product.name}`);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
