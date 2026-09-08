"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What We Build"
          subtitle="From simple business websites to custom web applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/20 transition-colors flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <div className="space-y-2.5 mb-6 flex-1">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-border">
                <span className="text-xl font-bold text-accent">
                  {service.price}
                </span>
                <Button href={service.href} variant="secondary" size="sm">
                  {service.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-text-secondary text-sm mt-8">
          Final pricing depends on project requirements and complexity.
        </p>
      </div>
    </section>
  );
}
