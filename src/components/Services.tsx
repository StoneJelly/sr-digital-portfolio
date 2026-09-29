import {
  AppWindow,
  ArrowUpRight,
  Check,
  Globe,
  LayoutTemplate,
} from "lucide-react";
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
          eyebrow="02 / What we build"
          title="What We Build"
          subtitle="From simple business websites to custom web applications."
        />

        {/* Shared hairline grid: container draws top/left, cells draw right/bottom */}
        <div className="grid grid-cols-1 border-l border-t border-border min-[50rem]:grid-cols-3">
          {services.map((service, index) => {
            const Icon =
              iconByTitle[service.title] ??
              fallbackIcons[index % fallbackIcons.length];
            return (
              <Reveal key={service.title} delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col border-b border-r border-border bg-surface/45 p-6 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-[3px] hover:bg-surface min-[50rem]:px-[27px] min-[50rem]:py-[26px]">
                  <div className="flex items-start justify-between">
                    <span
                      className="grid h-[41px] w-[41px] place-items-center rounded-full bg-accent-soft text-accent"
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span
                      className="text-[10px] tracking-[0.1em] text-text-tertiary"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[17px] font-bold tracking-[-0.03em] text-foreground min-[50rem]:mt-[38px]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[275px] text-[13px] leading-[1.6] text-text-secondary">
                    {service.description}
                  </p>

                  <ul className="mt-5 flex-1 space-y-1.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[12.5px] leading-5 text-text-secondary"
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

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 border-t border-border pt-5">
                    <div>
                      {!hasPriceQualifier(service.price) && (
                        <p className="text-[10px] uppercase tracking-[0.1em] text-text-tertiary">
                          Starting from
                        </p>
                      )}
                      <p className="text-2xl font-bold tracking-[-0.05em] text-foreground">
                        {service.price}
                      </p>
                    </div>
                    <Button
                      href={service.href}
                      variant="link"
                      size="sm"
                      className="gap-1.5 border-b-0 pb-0 text-xs text-accent hover:text-accent-hover"
                      ariaLabel={`${service.cta}: ${service.title}`}
                    >
                      {service.cta}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-text-tertiary">
          Final pricing depends on project requirements and complexity.
        </p>
      </div>
    </section>
  );
}
