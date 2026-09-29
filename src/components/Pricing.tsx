import { Check, Star } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { pricingPlans } from "@/data/pricing";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-background">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple & Transparent Pricing"
          subtitle="Affordable starting packages for businesses of different sizes."
        />

        <div className="rounded-[1.5rem] border border-border bg-surface-muted p-3 sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {pricingPlans.map((plan, index) => (
              <Reveal
                key={plan.name}
                delay={index * 0.06}
                className="h-full"
              >
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl border bg-surface p-6 lg:p-7",
                    plan.popular
                      ? "border-accent ring-1 ring-accent/10 shadow-[var(--shadow-lg)]"
                      : "border-border shadow-[var(--shadow-xs)]"
                  )}
                >
                  <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
                        <Star className="h-3 w-3" fill="currentColor" aria-hidden="true" />
                        Most popular
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {plan.description}
                  </p>

                  <p className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </p>

                  <hr className="my-6 border-border" />

                  <ul className="mb-8 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                            plan.popular
                              ? "bg-accent text-white"
                              : "bg-accent-soft text-accent"
                          )}
                          aria-hidden="true"
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-6 text-text-secondary">
                          {feature}
                        </span>
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
        </div>

        <p className="mt-10 text-center text-sm text-text-tertiary">
          Custom projects are quoted based on requirements.
        </p>
      </div>
    </section>
  );
}
