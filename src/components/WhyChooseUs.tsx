"use client";

import { DollarSign, Zap, Smartphone, MessageSquare } from "lucide-react";
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
    <section
      aria-labelledby="why-heading"
      className="border-y border-border bg-surface py-[72px] min-[800px]:py-[105px]"
    >
      <div className="container-page grid gap-10 min-[800px]:grid-cols-[1fr_2fr] min-[800px]:gap-20">
        <Reveal>
          <p className="eyebrow">01 / Why choose us</p>
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <h2 id="why-heading" className="heading-display">
              Why Choose <span>SR Digital Solution?</span>
            </h2>
            <p className="mt-7 max-w-[575px] text-base leading-[1.65] text-text-secondary">
              Professional digital solutions without the complicated agency
              process.
            </p>
          </Reveal>

          <ol className="mt-10 grid gap-x-10 md:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal
                as="li"
                key={feature.title}
                delay={index * 0.06}
                className="grid grid-cols-[35px_1fr_20px] items-start gap-2.5 border-t border-border py-[21px] last:border-b md:[&:nth-last-child(2)]:border-b"
              >
                <span className="pt-0.5 text-[0.6875rem] font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="mb-[7px] text-[0.9375rem] font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-[0.8125rem] leading-[1.5] text-text-secondary">
                    {feature.description}
                  </p>
                </div>
                <feature.icon
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 text-accent"
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
