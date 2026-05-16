import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Are your supplements 100% genuine?",
    answer: "Yes! We source all our products directly from official importers and authorized distributors. Every product comes with an authentic verifiable seal and batch number."
  },
  {
    question: "What is your return or exchange policy?",
    answer: "We offer returns or exchanges on unsealed and unopened products within 7 days of purchase. If the product seal is broken, we cannot accept returns for safety and hygiene reasons."
  },
  {
    question: "How long does delivery take?",
    answer: "We offer same-day delivery within the city for orders placed before 4 PM. Standard shipping takes 2-4 business days depending on your location."
  },
  {
    question: "Do you offer expert consultation for beginners?",
    answer: "Absolutely! We don't just sell products; we guide you. Our experienced team can help you pick the exact supplements you need based on your fitness goals, body type, and current routine."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major Credit/Debit Cards, UPI, Google Pay, and Cash at our physical store."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-card/30 relative border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about our products and services."
          centered={true}
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion className="w-full space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-background border border-border px-6 py-2 rounded-lg data-[state=open]:border-neon transition-colors"
              >
                <AccordionTrigger className="text-lg font-bold text-white hover:text-neon hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
