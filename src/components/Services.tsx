import { AppWindow, Check, Globe, LayoutTemplate } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { services } from "@/data/services";

// Icon per service, keyed by title with an index-based fallback.
const iconByTitle: Record<string, LucideIcon> = {
  Starter: Globe,
  Business: LayoutTemplate,
  "Custom Web App": AppWindow,
};
const fallbackIcons: LucideIcon[] = [Globe, LayoutTemplate, AppWindow];

function hasPriceQualifier(price: string) {
  return /^(from|starting)/i.test(price.trim());
}

export default function Services() {
  return (
    <section id="services" className="section bg-background">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="What We Build"
          subtitle="From simple business websites to custom web applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => {
            const Icon =
              iconByTitle[service.title] ??
              fallbackIcons[index % fallbackIcons.length];
            return (
              <Reveal
                key={service.title}
                delay={index * 0.06}
                className="h-full"
              >
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-[var(--shadow-xs)] transition-[box-shadow,transform,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)]">
                  <div
                    className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] bg-accent-soft text-accent"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {service.description}
                  </p>

                  <hr className="my-6 border-border" />

                  <ul className="flex-1 space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-accent"
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-6 text-text-secondary">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
                    <div>
                      {!hasPriceQualifier(service.price) && (
                        <p className="text-xs font-medium text-text-tertiary">
                          Starting from
                        </p>
                      )}
                      <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                        {service.price}
                      </p>
                    </div>
                    <Button
                      href={service.href}
                      variant="secondary"
                      size="sm"
                      ariaLabel={`${service.cta}: ${service.title}`}
                    >
                      {service.cta}
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-text-tertiary">
          Final pricing depends on project requirements and complexity.
        </p>
      </div>
    </section>
  );
}
