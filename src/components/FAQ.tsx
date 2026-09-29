import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import AccordionItem from "./ui/AccordionItem";
import Reveal from "./ui/Reveal";
import { faqs } from "@/data/faq";

export default function FAQ() {
  return (
    <section id="faq" className="section border-t border-border bg-surface">
      <div className="container-page grid grid-cols-1 gap-[45px] md:grid-cols-[1fr_1.05fr] md:gap-[60px] lg:gap-[120px]">
        <div className="self-start md:sticky md:top-28">
          <SectionHeading
            eyebrow="07 / FAQ"
            align="left"
            title="Frequently Asked"
            highlight="Questions"
            subtitle="Common questions about our services and process."
            className="mb-8 md:mb-10"
          />
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-secondary">
            Still have questions?
            <a href="#contact" className="text-link text-foreground">
              Contact
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </p>
        </div>

        <Reveal>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              index={i}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
