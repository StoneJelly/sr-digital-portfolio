import { ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import AccordionItem from "./ui/AccordionItem";
import Reveal from "./ui/Reveal";
import { faqs } from "@/data/faq";

export default function FAQ() {
  return (
    <section id="faq" className="section bg-background">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionHeading
            eyebrow="FAQ"
            align="left"
            title="Frequently Asked Questions"
            subtitle="Common questions about our services and process."
            className="mb-6 lg:mb-8"
          />
          <p className="text-sm text-text-secondary">
            Still have questions?{" "}
            <a
              href="#contact"
              className="group inline-flex items-center gap-1 font-semibold text-accent link-underline"
            >
              Contact
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </p>
        </div>

        <Reveal className="lg:col-span-8">
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
