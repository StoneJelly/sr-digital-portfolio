"use client";

import { motion } from "framer-motion";
import { Zap, Smartphone, MessageCircle, ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import { siteConfig } from "@/data/site";

const trustItems = [
  { icon: Zap, label: "Fast Delivery" },
  { icon: Smartphone, label: "Mobile Responsive" },
  { icon: MessageCircle, label: "WhatsApp Integration" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease },
  };
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      {/* Faint dotted grid, fading out towards the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border-strong)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_30%,transparent_100%)]"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy */}
        <div className="min-w-0">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground shadow-[var(--shadow-xs)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Websites from RM500
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.06)}
            className="mt-6 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]"
          >
            Affordable Websites.{" "}
            <span className="text-accent">Built for Your Business.</span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            Modern, responsive websites and web applications for businesses,
            startups and individuals — without the high agency price.
          </motion.p>

          <motion.div
            {...rise(0.18)}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={siteConfig.whatsappQuoteUrl} size="lg">
              Get a Free Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button href="#projects" variant="secondary" size="lg">
              View Our Work
            </Button>
          </motion.div>

          <motion.ul
            {...rise(0.24)}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-text-secondary"
          >
            {trustItems.map((item, i) => (
              <li key={item.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="mr-3 hidden h-4 w-px bg-border-strong sm:block"
                  />
                )}
                <item.icon aria-hidden="true" className="h-4 w-4 text-accent" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Supporting visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.12, ease }}
          className="relative min-w-0 pb-10 pl-0 sm:pb-14 sm:pl-10 lg:pl-8"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lg)]">
            <div className="flex items-center gap-3 border-b border-border bg-surface-muted px-4 py-3">
              <div aria-hidden="true" className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              </div>
              <div
                aria-hidden="true"
                className="flex-1 truncate rounded-md border border-border bg-surface px-3 py-1 text-xs text-text-tertiary"
              >
                spice-and-co.demo
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/spice-and-co/hero.jpg"
              alt="Spice & Co. restaurant website concept"
              width={1200}
              height={800}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-4 w-[46%] max-w-[240px] overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-[var(--shadow-lg)] sm:left-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/elite-autocare/image1.jpg"
              alt="Elite AutoCare website concept"
              width={480}
              height={320}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full rounded-lg object-cover"
            />
            <span className="mt-1.5 mb-0.5 ml-1 inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-[0.6875rem] font-semibold text-accent">
              Concept project
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
