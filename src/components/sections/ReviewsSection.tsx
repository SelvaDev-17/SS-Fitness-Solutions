"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    name: "Kamali Duraisamy",
    date: "2 months ago",
    rating: 5,
    text: "Good supplement shop with a wide variety of products.. affordable price and genuine supplement.highly recommended..",
  },
  {
    id: 2,
    name: "Meshach Paul",
    date: "2 months ago",
    rating: 5,
    text: "Ive purchased supplements from SS fitness solutions they have genuine products and they provide them with a best price trust worthy place for any kind of supplements ..",
  },
  {
    id: 3,
    name: "Ragul Varun",
    date: "2 months ago",
    rating: 5,
    text: "One the best in Alwarpet, they all handling the customers with kind heart",
  },
  {
    id: 4,
    name: "Amritha Anand",
    date: "2 days ago",
    rating: 5,
    text: "Extremely good products",
  },
  {
    id: 5,
    name: "Abu Barish",
    date: "1 week ago",
    rating: 4,
    text: "One of the best supplements store good quality",
  },
  {
    id: 6,
    name: "Siva",
    date: "1 month ago",
    rating: 5,
    text: "The best supplement shop in town. All genuine imported products. Great consultancy from srini anna.",
  },
  {
    id: 7,
    name: "GOWRISH H ME",
    date: "1 month ago",
    rating: 3.5,
    text: "One stop solution for all ur protein needs ;)",
  },
  {
    id: 8,
    name: "Yogesh Waran",
    date: "30 days ago",
    rating: 4.5,
    text: "Best place for supplements. And genuine products. Been getting products from here for more than 5 years! Worth the money and best prices.",
  },
  {
    id: 9,
    name: "Srinivasan Lakshminarayan",
    date: "Recent",
    rating: 4,
    text: "Awesome whey products variety which great service.. must visit supplement store",
  },
  {
    id: 10,
    name: "Divya Avinash",
    date: "2 months ago",
    rating: 5,
    text: "Best store for purchase of genuine supplements. All kinds of vitamins , protein supplements available here. Mr.Srinivasan guides us in appropriate way on how to go about the routine..\nThe one stop go to solution for your fitness journey.",
  },
  {
    id: 11,
    name: "Lalith Dev",
    date: "2 months ago",
    rating: 4.5,
    text: "One of best supplements store in this area. Prices are good and they have huge varieties of whey proteins. Highly recommended.",
  },
  {
    id: 12,
    name: "Mohan Dasu",
    date: "1 month ago",
    rating: 4,
    text: "Best supplement shop and best price.. Highly recommend..",
  },
  {
    id: 13,
    name: "Lakshmi Durai",
    date: "2 months ago",
    rating: 3,
    text: "Best shop for genuine products..price are fair and service is good 😊 …",
  },
  {
    id: 14,
    name: "Praveen Praveen s",
    date: "2 months ago",
    rating: 4.5,
    text: "Great service with authentic products.. most recommended..",
  },
  {
    id: 15,
    name: "Param Pannu",
    date: "Recent",
    rating: 5,
    text: "",
  },
  {
    id: 16,
    name: "S “Laks” Lakshan",
    date: "Recent",
    rating: 5,
    text: "",
  },
  {
    id: 17,
    name: "Sarathi _1808",
    date: "Recent",
    rating: 5,
    text: "",
  },
  {
    id: 18,
    name: "AJAY VIGNESH",
    date: "Recent",
    rating: 5,
    text: "",
  },
  {
    id: 19,
    name: "mohanasundram vadivel",
    date: "Recent",
    rating: 5,
    text: "",
  },
  {
    id: 20,
    name: "Seshadhri M",
    date: "Recent",
    rating: 5,
    text: "",
  }
];

const ROW1 = REVIEWS.slice(0, 10);
const ROW2 = REVIEWS.slice(10, 20);

// Duplicate to create seamless infinite loop
const ROW1_DUP = [...ROW1, ...ROW1];
const ROW2_DUP = [...ROW2, ...ROW2];

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-lg hover:border-neon/50 hover:shadow-[0_0_20px_rgba(255,107,0,0.15)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden w-[350px] md:w-[450px] shrink-0 mr-8">
      <div className="absolute top-0 left-0 w-1 h-full bg-neon/20 group-hover:bg-neon transition-colors duration-300"></div>
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => {
          const isFull = i < Math.floor(review.rating);
          const isHalf = !isFull && i < review.rating;
          
          if (isFull) {
            return <Star key={i} className="w-5 h-5 fill-neon text-neon" />;
          } else if (isHalf) {
            return (
              <div key={i} className="relative w-5 h-5">
                <Star className="w-5 h-5 fill-transparent text-muted-foreground absolute inset-0" />
                <StarHalf className="w-5 h-5 fill-neon text-neon absolute inset-0" />
              </div>
            );
          } else {
            return <Star key={i} className="w-5 h-5 fill-transparent text-muted-foreground" />;
          }
        })}
      </div>
      <p className="text-muted-foreground leading-relaxed flex-1 italic text-lg mb-8 whitespace-pre-line">
        {review.text ? `"${review.text}"` : ""}
      </p>
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800/50">
        <h3 className="text-white font-bold uppercase tracking-wide">{review.name}</h3>
        <span className="text-sm text-muted-foreground">{review.date}</span>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-black relative border-t border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <SectionHeading 
          title="Customer Reviews" 
          subtitle="See what our community has to say about SS Fitness Solutions."
          centered={true}
        />
      </div>
        
      <div className="flex flex-col gap-8 w-full pb-8">
        {/* First Row: Left to Right */}
        {/* Left to right means it starts at -50% and moves to 0% */}
        <motion.div 
          className="flex w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
        >
          {ROW1_DUP.map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </motion.div>

        {/* Second Row: Right to Left */}
        {/* Right to left means it starts at 0% and moves to -50% */}
        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
        >
          {ROW2_DUP.map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

