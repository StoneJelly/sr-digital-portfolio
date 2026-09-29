import { ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { siteConfig } from "@/data/site";

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-foreground py-[85px] text-center text-white md:pt-[120px] md:pb-[125px]"
    >
      <Reveal className="container-page flex flex-col items-center">
        <p className="eyebrow !text-accent-on-dark">Start your project</p>
        <h2
          id="cta-heading"
          className="mt-[18px] mb-5 text-[clamp(2.6875rem,6.5vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.08em] text-white"
        >
          Ready to Build{" "}
          <em className="not-italic text-accent-on-dark">Your Website?</em>
        </h2>
        <p className="mx-auto mb-8 max-w-[410px] text-sm leading-relaxed text-on-dark-muted">
          Tell us what you need and let&apos;s create a professional online
          presence for your business.
        </p>
        <Button href={siteConfig.whatsappQuoteUrl} variant="light"
          size="lg"
          className="focus-visible:outline-accent-on-dark"
        >
          Get a Free Quote
          <ArrowUpRight aria-hidden="true" className="h-[17px] w-[17px]" />
        </Button>
        <p className="mt-6 text-xs text-on-dark-muted">
          Websites starting from{" "}
          <span className="font-bold text-white">RM500</span>
        </p>
      </Reveal>
    </section>
  );
}
