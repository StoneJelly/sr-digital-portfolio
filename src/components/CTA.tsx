"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";

export default function CTA() {
  return (
    <section className="py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-accent/10 via-surface to-accent/5 border border-accent/20 rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Ready to Build Your Website?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Tell us what you need and let&apos;s create a professional online
              presence for your business.
            </p>

            <Button href="https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20your%20web%20development%20services." size="lg">
              Get a Free Quote
            </Button>

            <p className="text-text-secondary text-sm mt-6">
              Websites starting from{" "}
              <span className="text-accent font-semibold">RM500</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
