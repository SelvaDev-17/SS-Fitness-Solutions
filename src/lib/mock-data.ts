export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  nutritionalInfo: { label: string; value: string }[];
  image: string;
  category: string;
  isFeatured?: boolean;
  additionalImages?: string[];
}

export const CATEGORIES = ["Protein", "Pre-Workout", "Recovery", "Vitamins"];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "MuscleTech Platinum Whey Isolate",
    price: 8200,
    rating: 4.9,
    reviews: 1240,
    description: "The purest, fastest-absorbing whey protein isolate on the market. Formulated for elite athletes who demand the absolute best in muscle recovery and lean growth.",
    features: ["25g Protein per serving", "Zero Sugar", "Net WT: 1.81kg", "Flavor: Milk Chocolate"],
    nutritionalInfo: [
      { label: "Calories", value: "110" },
      { label: "Protein", value: "25g" },
      { label: "Carbs", value: "1g" },
      { label: "Fat", value: "0.5g" },
    ],
    image: "/mock-images/muscletech-whey.png",
    category: "Protein",
    isFeatured: true,
    additionalImages: [
      "/mock-images/muscletech-promo-1.png",
      "/mock-images/muscletech-promo-2.png"
    ]
  },
  {
    id: "p2",
    name: "GNC Pro Performance Pre-Workout",
    price: 1099,
    rating: 4.8,
    reviews: 890,
    description: "Explosive energy and laser focus. Surge combines clinical doses of Citrulline, Beta-Alanine, and natural caffeine for skin-tearing pumps and relentless endurance.",
    features: ["Clinical Doses", "No Jitters or Crash", "Net WT: 360g", "Flavor: Fruit Punch"],
    nutritionalInfo: [
      { label: "L-Citrulline", value: "6g" },
      { label: "Beta-Alanine", value: "3.2g" },
      { label: "Caffeine", value: "300mg" },
      { label: "Alpha-GPC", value: "400mg" },
    ],
    image: "/mock-images/gnc-preworkout.png",
    category: "Pre-Workout",
    isFeatured: true,
    additionalImages: [
      "/mock-images/gnc-promo-1.png",
      "/mock-images/gnc-promo-2.png"
    ]
  },
  {
    id: "p3",
    name: "Optimum Nutrition BCAA, For Muscle Recovery & Endurance",
    price: 899,
    rating: 4.7,
    reviews: 512,
    description: "Support muscle endurance and recovery with ON Instantized BCAA 5000 Powder. Delivers 5g of BCAAs in a proven 2:1:1 ratio.",
    features: ["5g BCAAs", "2:1:1 Ratio", "Zero Added Sugar", "Flavor: Green Apple", "Net WT: 250g (30 Servings)"],
    nutritionalInfo: [
      { label: "BCAAs", value: "5g" },
      { label: "Carbohydrates", value: "<3g" },
    ],
    image: "/mock-images/on-bcaa.png",
    category: "Recovery",
    additionalImages: [
      "/mock-images/on-bcaa-promo-1.png",
      "/mock-images/on-bcaa-promo-2.jpg"
    ]
  },
  {
    id: "p4",
    name: "Wellcore - Pure Micronised Creatine Monohydrate",
    price: 1139,
    rating: 4.9,
    reviews: 3200,
    description: "The most researched and proven supplement in history. Increase strength, power, and muscle mass with our ultra-pure, micronized creatine.",
    features: ["100% Pure Creatine", "Micronized for Absorption", "Net WT: 307g (83 Servings)", "Flavor: Tropical Tango"],
    nutritionalInfo: [
      { label: "Creatine Monohydrate", value: "3g" },
    ],
    image: "/mock-images/wellcore-creatine.png",
    category: "Recovery",
    isFeatured: true,
    additionalImages: [
      "/mock-images/wellcore-promo-1.png",
      "/mock-images/wellcore-promo-2.png"
    ]
  },
  {
    id: "p5",
    name: "MuscleBlaze MB-VITE Daily Multivitamin",
    price: 579,
    rating: 4.6,
    reviews: 420,
    description: "Fill your nutritional gaps. A high-potency blend of 51 essential ingredients and 6 vital blends designed specifically for hard-training athletes.",
    features: ["51 Premium Ingredients", "6 Essential Blends", "60 Tablets per Bottle", "Immune Defense"],
    nutritionalInfo: [
      { label: "Vitamin D3", value: "2000 IU" },
      { label: "Zinc", value: "15mg" },
      { label: "Magnesium", value: "200mg" },
      { label: "Vitamin B12", value: "100mcg" },
    ],
    image: "/mock-images/mb-vite.png",
    category: "Vitamins",
    additionalImages: [
      "/mock-images/mb-vite-promo-1.png",
      "/mock-images/mb-vite-promo-2.png"
    ]
  },
  {
    id: "p6",
    name: "Real Mass Gainer",
    price: 1699,
    rating: 4.5,
    reviews: 310,
    description: "High protein muscle mass gainer from BigMuscles Nutrition. Designed to help build and maintain muscle, and fuel intense workouts.",
    features: ["21% Protein", "4g Added Glutamine", "Flavor: Chocolate", "Net Weight: 1 kg (2.2 lbs)"],
    nutritionalInfo: [
      { label: "Protein", value: "21%" },
      { label: "Added Glutamine", value: "4g" },
    ],
    image: "/mock-images/real-mass-gainer.png",
    category: "Protein",
    additionalImages: [
      "/mock-images/real-mass-promo-1.png",
      "/mock-images/real-mass-promo-2.jpg"
    ]
  },
  {
    id: "p7",
    name: "Avvatar Mass Gainer",
    price: 2309,
    rating: 4.8,
    reviews: 150,
    description: "Premium muscle mass gainer loaded with 45.6g protein, 122g carbohydrates, and 21 essential vitamins and minerals.",
    features: ["45.6g Protein", "122g Carbohydrates", "Flavor: Belgian Chocolate", "Net WT: 2 KG (33 Servings)", "Sugar-Free"],
    nutritionalInfo: [
      { label: "Protein", value: "45.6g" },
      { label: "Carbohydrates", value: "122g" },
      { label: "Vitamins & Minerals", value: "21" },
    ],
    image: "/mock-images/avvatar-mass-gainer.png",
    category: "Protein",
    isFeatured: true,
    additionalImages: [
      "/mock-images/avvatar-promo-1.png",
      "/mock-images/avvatar-promo-2.png"
    ]
  },
  {
    id: "p8",
    name: "wellversed Dynamite Pre-Workout",
    price: 1379,
    rating: 4.7,
    reviews: 120,
    description: "Explosive pre-workout formula designed to give you intense energy, laser focus, and skin-tearing pumps.",
    features: ["200mg Caffeine", "200mg Alpha GPC", "6500mg Citrulline Complex", "Flavor: Valencia Orange", "Net WT: 420g (30 Servings)"],
    nutritionalInfo: [
      { label: "Caffeine", value: "200mg" },
      { label: "Alpha GPC", value: "200mg" },
      { label: "Citrulline Complex", value: "6500mg" },
    ],
    image: "/mock-images/dynamite-preworkout.png",
    category: "Pre-Workout",
    additionalImages: [
      "/mock-images/dynamite-promo-1.png",
      "/mock-images/dynamite-promo-2.png"
    ]
  },
  {
    id: "p9",
    name: "MuscleBlaze Pre Workout WrathX",
    price: 2139,
    rating: 4.8,
    reviews: 450,
    description: "Extreme pre-workout formula featuring Creapure®, Nitroblaze™, and BioPerine® for maximum performance and pumps.",
    features: ["Creapure® Powder", "Nitroblaze™", "BioPerine®", "Flavor: Fruit Fury", "Net WT: 510g"],
    nutritionalInfo: [
      { label: "Creapure®", value: "Included" },
      { label: "Nitroblaze™", value: "Included" },
      { label: "BioPerine®", value: "Included" },
    ],
    image: "/mock-images/mb-wrathx.png",
    category: "Pre-Workout",
    additionalImages: [
      "/mock-images/mb-wrathx-promo-1.png",
      "/mock-images/mb-wrathx-promo-2.png"
    ]
  },
  {
    id: "p10",
    name: "BIG MUSCLES Karnage Black",
    price: 1599,
    rating: 4.6,
    reviews: 230,
    description: "The end of pre-workouts. Karnage Black provides unstoppable energy and tunnel-vision focus for the most grueling training sessions.",
    features: ["Flavor: Sex on the Beach", "Net WT: 420g"],
    nutritionalInfo: [
      { label: "Energy", value: "High" },
    ],
    image: "/mock-images/karnage-black.png",
    category: "Pre-Workout",
    additionalImages: [
      "/mock-images/karnage-promo-1.png",
      "/mock-images/karnage-promo-2.png"
    ]
  },
  {
    id: "p11",
    name: "MuscleBlaze Pre Workout Crea-Xtreme",
    price: 979,
    rating: 4.5,
    reviews: 180,
    description: "Advanced pre-workout infused with creatine for explosive power and endurance.",
    features: ["200mg Caffeine", "3000mg L-Citrulline", "3000mg Creatine Monohydrate", "Flavor: Berry Lime Flavour", "Net WT: 200g"],
    nutritionalInfo: [
      { label: "Caffeine", value: "200mg" },
      { label: "Citrulline", value: "3000mg" },
      { label: "Creatine", value: "3000mg" },
    ],
    image: "/mock-images/mb-crea-xtreme.png",
    category: "Pre-Workout",
    additionalImages: [
      "/mock-images/mb-creaxtreme-promo-1.png",
      "/mock-images/mb-creaxtreme-promo-2.jpg"
    ]
  },
  {
    id: "p12",
    name: "optimum nutrition Gold Standard 100% Whey Protein Powder",
    price: 8999,
    rating: 4.9,
    reviews: 1250,
    description: "The world's best-selling whey protein powder. Formulated with whey protein isolate as the primary source to support muscle building and recovery.",
    features: ["24g Protein", "5.5g BCAAs", "Whey Protein Isolate Primary Source", "Flavor: Double Rich Chocolate", "Net WT: 2.27 kg (5 lb)"],
    nutritionalInfo: [
      { label: "Protein", value: "24g" },
      { label: "BCAAs", value: "5.5g" },
    ],
    image: "/mock-images/on-gold-standard-whey.png",
    category: "Protein",
    additionalImages: [
      "/mock-images/on-whey-promo-1.jpg",
      "/mock-images/on-whey-promo-2.png"
    ]
  },
  {
    id: "p13",
    name: "optimum nutrition Micronised Creatine Powder",
    price: 889,
    rating: 4.8,
    reviews: 850,
    description: "Pure micronised creatine monohydrate to support strength, power, and muscle size.",
    features: ["100% Creatine Monohydrate", "3g Per Serving", "Banned Substance Tested", "Flavor: Unflavoured", "Net WT: 250 g (83 Servings)"],
    nutritionalInfo: [
      { label: "Creatine Monohydrate", value: "3g" },
    ],
    image: "/mock-images/on-creatine.png",
    category: "Recovery",
    additionalImages: [
      "/mock-images/on-creatine-promo-1.png",
      "/mock-images/on-creatine-promo-2.jpg"
    ]
  },
  {
    id: "p14",
    name: "MuscleBlaze Creatine Monohydrate CreAMP",
    price: 1019,
    rating: 4.7,
    reviews: 420,
    description: "High-quality micronised creatine monohydrate to elevate your performance and amplify muscle growth.",
    features: ["3g Creatine Monohydrate", "Trustified Certified", "Flavor: Watermelon Kool Aid", "Net WT: 320g"],
    nutritionalInfo: [
      { label: "Creatine Monohydrate", value: "3g" },
    ],
    image: "/mock-images/mb-creamp.png",
    category: "Recovery",
    additionalImages: [
      "/mock-images/mb-creamp-promo-1.png",
      "/mock-images/mb-creamp-promo-2.jpg"
    ]
  },
  {
    id: "p15",
    name: "wellversed YouWeFit Omega-3 Fish Oil",
    price: 899,
    rating: 4.6,
    reviews: 310,
    description: "Triple strength omega-3 fish oil for heart, brain, and joint health support.",
    features: ["1250mg Fish Oil", "540mg EPA", "360mg DHA", "3X Strength", "60 Capsules"],
    nutritionalInfo: [
      { label: "EPA", value: "540mg" },
      { label: "DHA", value: "360mg" },
    ],
    image: "/mock-images/youwefit-omega3.png",
    category: "Vitamins",
    additionalImages: [
      "/mock-images/youwefit-promo-1.png",
      "/mock-images/youwefit-promo-2.png"
    ]
  },
  {
    id: "p16",
    name: "MuscleBlaze Liquid L-Carnitine 1100mg",
    price: 759,
    rating: 4.5,
    reviews: 150,
    description: "Fast-acting liquid L-Carnitine formula that converts fat into energy, boosting metabolism and athletic performance.",
    features: ["1100mg L-Carnitine", "Rapid Absorption", "Great Tasting Tangy Flavour", "Net Volume: 450ml"],
    nutritionalInfo: [
      { label: "L-Carnitine", value: "1100mg" },
    ],
    image: "/mock-images/mb-lcarnitine.png",
    category: "Pre-Workout",
    additionalImages: [
      "/mock-images/mb-lcarnitine-promo-1.png",
      "/mock-images/mb-lcarnitine-promo-2.png"
    ]
  }
];
