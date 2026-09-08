"use client";

import SectionHeading from "./ui/SectionHeading";
import AccordionItem from "./ui/AccordionItem";
import { faqs } from "@/data/faq";

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Common questions about our services and process."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
