import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | SR Digital Solution`,
    description: project.description,
  };
}

// Mirrors the primary (ink) Button styles. The demo is a same-origin static file,
// so it needs a plain <a target="_blank"> (Button would route it through next/link).
const demoLinkClasses =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] border border-transparent bg-foreground px-5 text-[0.8125rem] font-bold text-white transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent active:translate-y-0";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const contentSections = [
    { title: "Description", body: project.description },
    { title: "Objective", body: project.objective },
    { title: "Solution", body: project.solution },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background pt-28 pb-20 sm:pt-36 lg:pb-28">
        <div className="container-page">
          <Link href="/#projects" className="text-link text-text-secondary">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Projects
          </Link>

          <header className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="eyebrow">
                CONCEPT PROJECT
                <span aria-hidden="true" className="text-border-strong">/</span>
                <span className="text-text-secondary">{project.category}</span>
              </p>
              <h1 className="mt-5 text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.06em] text-foreground">
                {project.name}
              </h1>
            </div>

            {(project.demo || project.github) && (
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={demoLinkClasses}
                  >
                    Open Full Demo
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                )}
                {project.github && (
                  <Button href={project.github} variant="secondary">
                    <GithubIcon className="h-4 w-4" />
                    View Code
                  </Button>
                )}
              </div>
            )}
          </header>

          <div className="mt-12 border border-border-strong bg-surface shadow-[var(--shadow-lg)] sm:mt-14">
            <div className="flex h-10 items-center gap-4 border-b border-border px-4">
              <div className="flex shrink-0 gap-1" aria-hidden="true">
                <span className="h-[5px] w-[5px] rounded-full bg-border-strong" />
                <span className="h-[5px] w-[5px] rounded-full bg-border-strong" />
                <span className="h-[5px] w-[5px] rounded-full bg-border-strong" />
              </div>
              <span className="min-w-0 flex-1 truncate text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
                {project.demo ?? project.category}
              </span>
            </div>
            {project.demo ? (
              <div className="aspect-[4/3] w-full sm:aspect-video">
                <iframe
                  src={project.demo}
                  className="h-full w-full border-0 bg-surface"
                  title={`${project.name} Live Demo`}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center bg-surface-muted">
                <span aria-hidden="true" className="text-5xl font-bold text-accent">
                  {project.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div className="border-t border-border">
              {contentSections.map((section, i) => (
                <section key={section.title} className="flex gap-5 border-b border-border py-7">
                  <span className="pt-1 text-[11px] font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-[-0.02em] text-foreground">
                      {section.title}
                    </h2>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-text-secondary">
                      {section.body}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
                <section>
                  <h2 className="eyebrow">Features</h2>
                  <ul className="mt-4 space-y-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6 border-t border-border pt-6">
                  <h2 className="eyebrow">Technologies</h2>
                  <ul className="mt-4 flex flex-wrap gap-[7px]">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border border-border px-2 py-1 text-[11px] text-text-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
