"use client";

import { motion } from "framer-motion";
import { DollarSign, Zap, Smartphone, MessageSquare } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const features = [
  {
    icon: DollarSign,
    title: "Affordable",
    description:
      "Professional websites at prices designed to be accessible to small businesses.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Efficient development using modern development tools and AI-assisted workflows to deliver projects quickly.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Every website is designed to work beautifully across phones, tablets and desktop devices.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description:
      "Work directly with the developer from the initial idea through to launch.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose SR Digital Solution?"
          subtitle="Professional digital solutions without the complicated agency process."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
