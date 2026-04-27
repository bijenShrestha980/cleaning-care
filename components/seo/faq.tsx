import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/lib/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import type { FaqItem } from "@/lib/seo/faqs";

type Props = {
  heading?: string;
  subheading?: string;
  items: FaqItem[];
  includeSchema?: boolean;
};

export const Faq = ({
  heading = "Frequently Asked Questions",
  subheading,
  items,
  includeSchema = true,
}: Props) => {
  if (!items || items.length === 0) return null;
  return (
    <section className="w-full flex flex-col items-center" aria-labelledby="faq-heading">
      <div className="mb-8 max-w-[765px] flex flex-col items-center">
        <h2
          id="faq-heading"
          className="text-primary text-3xl md:text-[42px] font-semibold mb-3 text-center"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="text-[#191919] opacity-60 text-base md:text-xl text-center">
            {subheading}
          </p>
        ) : null}
      </div>
      <div className="w-full max-w-[900px]">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#191919] opacity-80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {includeSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </section>
  );
};
