import { Fragment } from "react";
import { BadgeDollarSign, MousePointerClick, Zap } from "lucide-react";
import Reveal from "./ui/Reveal";
import { GithubIcon, LinkedinIcon } from "./ui/icons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const techStack = {
  Frontend: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript"],
  Backend: ["Node.js", "Express"],
  Database: ["MySQL", "Firebase"],
  Other: ["REST APIs", "Git", "GitHub", "AI-assisted development"],
};

// Value words lifted verbatim from the About copy: "affordability, usability and fast delivery".
const values = [
  { label: "Affordability", Icon: BadgeDollarSign },
  { label: "Usability", Icon: MousePointerClick },
  { label: "Fast delivery", Icon: Zap },
];

const socialLinks = [
  { label: "Sebastian Raj on GitHub", href: siteConfig.githubUrl, Icon: GithubIcon },
  { label: "Sebastian Raj on LinkedIn", href: siteConfig.linkedinUrl, Icon: LinkedinIcon },
];

export default function About() {
  return (
    <section id="about" className="section bg-surface">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-[110px]">
        {/* Copy */}
        <div className="lg:order-2">
          <Reveal>
            <p className="eyebrow">05 / About</p>
            <h2 className="heading-display mt-4">
              About <span>SR Digital Solution</span>
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="mb-9 mt-7 max-w-[30rem] space-y-4 text-[15px] leading-relaxed text-text-secondary">
            <p className="font-medium text-foreground">
              Professional digital solutions for businesses of all sizes.
            </p>
            <p>
              SR Digital Solution is a freelance web development service focused
              on helping small businesses, startups and individuals establish a
              professional online presence.
            </p>
            <p>
              We build modern, responsive websites and custom web applications
              with a focus on affordability, usability and fast delivery.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol aria-label="What we focus on" className="max-w-[30rem] border-t border-border">
              {values.map(({ label }, index) => (
                <li
                  key={label}
                  className="flex items-baseline gap-4 border-b border-border py-4"
                >
                  <span className="text-[10px] tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-bold text-foreground">{label}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        {/* Visual: Meet the Developer card on a gridded panel */}
        <Reveal className="relative grid lg:order-1 min-h-[350px] place-items-center overflow-hidden border border-border bg-surface-muted px-3 py-8 sm:px-6 lg:min-h-[430px] lg:py-12">
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />

          <article
            aria-labelledby="developer-name"
            className="relative w-full max-w-[30rem] bg-surface p-4 shadow-[var(--shadow-lg)] sm:w-[88%] sm:p-5 lg:w-[82%]"
          >
            <div className="flex items-center gap-2.5 border-b border-border pb-4 text-[10px] uppercase tracking-[0.08em] text-text-tertiary">
              <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
              <span>Meet the developer</span>
              <span aria-hidden="true" className="ml-auto tracking-normal">
                •••
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3.5">
              <div
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent"
              >
                SR
              </div>
              <div className="min-w-0 flex-1">
                <h3 id="developer-name" className="text-base font-bold leading-tight tracking-[-0.02em] text-foreground">
                  Sebastian Raj
                </h3>
                <p className="mt-0.5 text-xs text-text-secondary">Freelance web developer</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-8 w-8 place-items-center rounded-full border border-border text-text-secondary transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-surface"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
              A Computer Science (Artificial Intelligence) graduate and freelance
              web developer passionate about building practical digital solutions
              for businesses.
            </p>

            {/* Flow of our own value words (middle node active, as in the design) */}
            <div
              aria-hidden="true"
              className="my-5 flex items-start justify-between gap-1 border-y border-border py-6"
            >
              {values.map(({ label, Icon }, index) => {
                const active = index === 1;
                return (
                  <Fragment key={label}>
                    {index > 0 && (
                      <span
                        className="mt-[19px] w-[14%] shrink border-t border-dashed border-border-strong"
                      />
                    )}
                    <span className="flex min-w-0 flex-1 flex-col items-center text-center">
                      <span
                        className={cn(
                          "mb-2.5 grid h-[38px] w-[38px] place-items-center rounded-full border",
                          active
                            ? "border-accent bg-accent text-surface"
                            : "border-border text-text-tertiary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[10px] font-bold text-foreground sm:text-[11px]">
                        {label}
                      </span>
                    </span>
                  </Fragment>
                );
              })}
            </div>

            <div className="space-y-3">
              {Object.entries(techStack).map(([category, techs]) => (
                <div key={category}>
                  <h4 className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
                    {category}
                  </h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {techs.map((tech) => (
                      <li
                        key={tech}
                        className="border border-border px-2 py-1 text-[10px] leading-none text-text-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

      </div>
    </section>
  );
}
