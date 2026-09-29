import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { GithubIcon, LinkedinIcon } from "./ui/icons";
import { siteConfig } from "@/data/site";

const techStack = {
  Frontend: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript"],
  Backend: ["Node.js", "Express"],
  Database: ["MySQL", "Firebase"],
  Other: ["REST APIs", "Git", "GitHub", "AI-assisted development"],
};

const values = ["Affordability", "Usability", "Fast delivery"];

const socialLinks = [
  { label: "Sebastian Raj on GitHub", href: siteConfig.githubUrl, Icon: GithubIcon },
  { label: "Sebastian Raj on LinkedIn", href: siteConfig.linkedinUrl, Icon: LinkedinIcon },
];

export default function About() {
  return (
    <section id="about" className="section bg-surface">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="About"
              title="About SR Digital Solution"
              subtitle="Professional digital solutions for businesses of all sizes."
              className="mb-8 lg:mb-10"
            />
          </Reveal>

          <Reveal delay={0.05} className="max-w-2xl space-y-5">
            <p className="text-lg leading-relaxed text-foreground">
              SR Digital Solution is a freelance web development service focused
              on helping small businesses, startups and individuals establish a
              professional online presence.
            </p>
            <p className="text-lg leading-relaxed text-text-secondary">
              We build modern, responsive websites and custom web applications
              with a focus on affordability, usability and fast delivery.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul
              aria-label="Our focus"
              className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
            >
              {values.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-3 bg-surface px-5 py-4 font-display text-base font-semibold text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} as="article" className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <p className="eyebrow mb-5">Meet the Developer</p>

            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-lg font-bold text-accent"
              >
                SR
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-foreground">Sebastian Raj</h3>
                <p className="text-sm text-text-secondary">
                  Freelance web developer
                </p>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-text-secondary">
              A Computer Science (Artificial Intelligence) graduate and freelance
              web developer passionate about building practical digital solutions
              for businesses.
            </p>

            <div className="mt-6 space-y-5 border-t border-border pt-6">
              {Object.entries(techStack).map(([category, techs]) => (
                <div key={category}>
                  <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                    {category}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
