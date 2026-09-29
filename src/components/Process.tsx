import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Tell us about your business and what you need.",
  },
  {
    number: "02",
    title: "Proposal",
    description: "Receive a clear project scope and quotation.",
  },
  {
    number: "03",
    title: "Development",
    description: "We design and develop your website or web application.",
  },
  {
    number: "04",
    title: "Review",
    description: "Review the project and request the included revisions.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Your website goes live and is ready for your customers.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section bg-surface-muted">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="How It Works"
            subtitle="A simple, transparent process from start to finish."
          />
        </Reveal>

        <ol className="mx-auto max-w-xl lg:grid lg:max-w-none lg:grid-cols-5 lg:gap-6">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <Reveal
                as="li"
                key={step.number}
                delay={index * 0.06}
                className="relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0"
              >
                {/* Connector: vertical on mobile/tablet, horizontal on desktop */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[19px] top-10 bottom-0 w-px bg-border-strong lg:left-10 lg:right-[-1.5rem] lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-display text-sm font-bold tabular-nums text-accent shadow-[var(--shadow-xs)] ring-4 ring-surface-muted"
                >
                  {step.number}
                </span>

                <div className="pt-1.5 lg:pt-0 lg:mt-5 lg:pr-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    <span className="sr-only">Step {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
