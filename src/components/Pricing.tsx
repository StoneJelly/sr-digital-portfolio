"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { pricingPlans } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Simple & Transparent Pricing"
          subtitle="Affordable starting packages for businesses of different sizes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative bg-surface border rounded-2xl p-8 flex flex-col",
                plan.popular
                  ? "border-accent shadow-lg shadow-accent/10"
                  : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                    <Star className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <p className="text-text-secondary text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold">
                  {plan.price}
                </span>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                href={plan.href}
                variant={plan.popular ? "primary" : "secondary"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-text-secondary text-sm mt-8">
          Custom projects are quoted based on requirements.
        </p>
      </div>
    </section>
  );
}
