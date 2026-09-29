"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import Button from "./ui/Button";
import { siteConfig } from "@/data/site";

const trustItems = ["Fast Delivery", "Mobile Responsive", "WhatsApp Integration"];

const ease = [0.22, 1, 0.36, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease },
  };
}

function ProductVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.12, ease }}
      className="relative grid min-h-[380px] min-w-0 place-items-center min-[800px]:min-h-[488px]"
    >
      {/* Thin orbit ellipses behind the window */}
      <div
        aria-hidden="true"
        className="absolute h-[370px] w-[370px] rotate-[24deg] scale-x-[0.62] rounded-full border border-border-strong/70 min-[800px]:h-[460px] min-[800px]:w-[460px]"
      />
      <div
        aria-hidden="true"
        className="absolute h-[290px] w-[290px] -rotate-[40deg] scale-x-[0.72] rounded-full border border-border-strong/70 min-[800px]:h-[360px] min-[800px]:w-[360px]"
      />

      <div className="relative z-[1] w-full max-w-[540px] -rotate-3 scale-[0.91] border border-border-strong bg-surface/85 shadow-[var(--shadow-lg)] min-[800px]:-rotate-4 min-[800px]:scale-100">
        <div className="flex h-10 items-center justify-between gap-3 border-b border-border px-4 text-[0.5625rem] text-text-tertiary">
          <span aria-hidden="true" className="flex gap-1">
            <i className="h-[5px] w-[5px] rounded-full bg-border-strong" />
            <i className="h-[5px] w-[5px] rounded-full bg-border-strong" />
            <i className="h-[5px] w-[5px] rounded-full bg-border-strong" />
          </span>
          <span className="truncate uppercase tracking-[0.12em]">
            Concept project / Spice &amp; Co.
          </span>
          <span className="flex items-center gap-1 text-accent">
            <span
              aria-hidden="true"
              className="h-[5px] w-[5px] rounded-full bg-success"
            />
            Demo
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demos/spice-and-co/hero.jpg"
          alt="Spice & Co. restaurant website concept"
          width={1080}
          height={675}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="aspect-[16/10] w-full object-cover"
        />
      </div>

      <div className="absolute right-[-5px] bottom-5 z-[2] flex rotate-4 items-center gap-2.5 bg-surface px-4 py-3 shadow-[var(--shadow-md)] min-[800px]:right-0 min-[800px]:bottom-[55px]">
        <span
          aria-hidden="true"
          className="grid h-[25px] w-[25px] place-items-center rounded-full bg-success-soft text-success"
        >
          <Check size={13} />
        </span>
        <div>
          <small className="mb-1 block text-[0.5625rem] text-text-tertiary">
            Concept project
          </small>
          <b className="block text-[0.6875rem] text-foreground">
            Restaurant website
          </b>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pt-[8.75rem] pb-6 min-[800px]:pt-[10.5rem] min-[800px]:pb-8"
    >
      <div className="container-page grid items-center gap-6 min-[800px]:grid-cols-[1fr_1.08fr] min-[800px]:gap-[45px] min-[1101px]:gap-[70px]">
        <div className="min-w-0">
          <motion.p {...rise(0)} className="eyebrow">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-highlight"
            />
            Websites from RM500
          </motion.p>

          <motion.h1
            {...rise(0.06)}
            className="mt-[22px] mb-[26px] text-[clamp(2.75rem,6vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.06em] text-foreground"
          >
            Affordable Websites.{" "}
            <span className="text-accent">Built for Your Business.</span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="max-w-[435px] text-[1.0625rem] leading-[1.65] text-text-secondary"
          >
            Modern, responsive websites and web applications for businesses,
            startups and individuals — without the high agency price.
          </motion.p>

          <motion.div
            {...rise(0.18)}
            className="mt-[34px] flex flex-wrap items-center gap-x-7 gap-y-5"
          >
            <Button href={siteConfig.whatsappQuoteUrl} size="lg">
              Get a Free Quote
              <ArrowUpRight aria-hidden="true" size={17} />
            </Button>
            <Button href="#projects" variant="link">
              View Our Work
              <ChevronRight aria-hidden="true" size={16} />
            </Button>
          </motion.div>

          <motion.p
            {...rise(0.24)}
            className="mt-[50px] flex items-center gap-[11px] text-[0.6875rem] text-text-secondary min-[800px]:mt-20"
          >
            <span aria-hidden="true" className="h-px w-[27px] shrink-0 bg-highlight" />
            {trustItems.join(" · ")}
          </motion.p>
        </div>

        <ProductVisual />
      </div>

      <div className="container-page mt-12 flex items-center gap-3.5 text-[0.625rem] uppercase tracking-[0.13em] text-text-tertiary min-[800px]:mt-20">
        <span className="shrink-0">Based in {siteConfig.location}</span>
        <div aria-hidden="true" className="h-px flex-1 bg-border" />
        <span className="shrink-0">Websites · Web Applications</span>
      </div>
    </section>
  );
}
