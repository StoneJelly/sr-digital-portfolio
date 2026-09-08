"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Tell us about your business and what you need.",
  },
  {
    number: "02",
    title: "Proposal",
    description: "Receive a clear project scope and quotation.",
  },
  {
    number: "03",
    title: "Development",
    description: "We design and develop your website or web application.",
  },
  {
    number: "04",
    title: "Review",
    description: "Review the project and request the included revisions.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Your website goes live and is ready for your customers.",
  },
];

export default function Process() {
  return (
    <section className="py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How It Works"
          subtitle="A simple, transparent process from start to finish."
        />

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface border-2 border-accent flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold text-sm sm:text-lg">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2 sm:pt-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
