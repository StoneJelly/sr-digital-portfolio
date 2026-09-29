import { Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { pricingPlans } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="section border-t border-border bg-background">
      <div className="container-page">
        <SectionHeading
          eyebrow="04 / Pricing"
          title="Simple & Transparent Pricing"
          subtitle="Affordable starting packages for businesses of different sizes."
        />

        {/* Hairline grid, same language as Services */}
        <div className="grid grid-cols-1 border-l border-t border-border lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col border-b border-r border-border p-6 sm:p-7",
                  plan.popular
                    ? "bg-surface shadow-[inset_0_2px_0_var(--color-accent)]"
                    : "bg-surface/45"
                )}
              >
                <div className="flex min-h-4 items-center">
                  {plan.popular && (
                    <p className="eyebrow">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-highlight"
                        aria-hidden="true"
                      />
                      Most popular
                    </p>
                  )}
                </div>

                <h3 className="mt-5 text-[17px] font-bold tracking-[-0.03em] text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-text-secondary">
                  {plan.description}
                </p>

                <p className="mt-7 text-[clamp(2.25rem,3.4vw,3rem)] font-bold leading-none tracking-[-0.05em] text-foreground">
                  {plan.price}
                </p>

                <hr className="my-7 border-border" />

                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[13px] leading-5 text-text-secondary"
                    >
                      <Check
                        className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={plan.href}
                  variant={plan.popular ? "primary" : "secondary"}
                  className="mt-auto w-full"
                  ariaLabel={`${plan.cta}: ${plan.name}`}
                >
                  {plan.cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-text-tertiary">
          Custom projects are quoted based on requirements.
        </p>
      </div>
    </section>
  );
}
