"use client";

import { DollarSign, Zap, Smartphone, MessageSquare } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

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
    <section className="section border-y border-border bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why us"
          title="Why Choose SR Digital Solution?"
          subtitle="Professional digital solutions without the complicated agency process."
        />

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
          {features.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={index * 0.06}
              className="lg:border-l lg:border-border lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-accent-soft text-accent">
                <feature.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-text-secondary">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
