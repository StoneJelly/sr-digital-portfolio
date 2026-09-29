import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { siteConfig } from "@/data/site";

export default function CTA() {
  return (
    <section className="section bg-background" aria-labelledby="cta-heading">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-accent/15 bg-accent-soft px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            {/* Faint dotted texture, faded toward the text side */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(color-mix(in_srgb,var(--color-accent)_22%,transparent)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_65%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-px bg-accent/30 sm:inset-x-12 lg:inset-x-16"
            />

            <div className="relative flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <h2
                  id="cta-heading"
                  className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  Ready to Build Your Website?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                  Tell us what you need and let&apos;s create a professional
                  online presence for your business.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-4 lg:items-end">
                <Button href={siteConfig.whatsappQuoteUrl} size="lg">
                  Get a Free Quote
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
                <p className="text-sm text-text-secondary">
                  Websites starting from{" "}
                  <span className="font-semibold text-accent">RM500</span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
