import { Code2, FileText, MessagesSquare, Rocket, SearchCheck } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Tell us about your business and what you need.",
    Icon: MessagesSquare,
  },
  {
    number: "02",
    title: "Proposal",
    description: "Receive a clear project scope and quotation.",
    Icon: FileText,
  },
  {
    number: "03",
    title: "Development",
    description: "We design and develop your website or web application.",
    Icon: Code2,
  },
  {
    number: "04",
    title: "Review",
    description: "Review the project and request the included revisions.",
    Icon: SearchCheck,
  },
  {
    number: "05",
    title: "Launch",
    description: "Your website goes live and is ready for your customers.",
    Icon: Rocket,
  },
];

export default function Process() {
  return (
    <section id="process" className="section border-t border-border bg-background">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="06 / How it works"
            title="How It Works"
            subtitle="A simple, transparent process from start to finish."
          />
        </Reveal>

        <ol className="lg:grid lg:grid-cols-5 lg:border-t lg:border-border">
          {steps.map(({ number, title, description, Icon }, index) => (
            <Reveal
              as="li"
              key={number}
              delay={index * 0.06}
              className={cn(
                "relative border-t border-border pb-6 pl-[55px] pt-5",
                "lg:border-t-0 lg:pb-2.5 lg:pl-0 lg:pr-5 lg:pt-7",
                index > 0 && "lg:pl-6"
              )}
            >
              <span className="block text-[10px] tabular-nums text-accent">
                <span className="sr-only">Step </span>
                {number}
              </span>
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className="absolute left-0 top-[22px] h-6 w-6 text-accent lg:static lg:mb-5 lg:mt-7"
              />
              <h3 className="mt-2 text-[17px] font-bold tracking-[-0.02em] text-foreground lg:mt-0">
                {title}
              </h3>
              <p className="mt-2.5 max-w-[190px] text-[13px] leading-relaxed text-text-secondary lg:text-xs">
                {description}
              </p>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[5px] -top-1 hidden h-2 w-2 rounded-full border border-accent bg-background lg:block"
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
