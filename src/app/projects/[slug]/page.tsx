import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
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

// Mirrors the primary Button styles. The demo is a same-origin static file, so
// it needs a plain <a target="_blank"> (Button would route it through next/link).
const demoLinkClasses =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] bg-accent px-5 text-sm font-semibold text-white shadow-[var(--shadow-sm)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:bg-accent-hover hover:shadow-[var(--shadow-md)] active:translate-y-0";

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
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span className="link-underline">Back to Projects</span>
          </Link>

          <header className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <span className="inline-block rounded-full border border-border bg-surface px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary shadow-[var(--shadow-xs)]">
                CONCEPT PROJECT
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-3 text-base font-medium text-accent sm:text-lg">
                {project.category}
              </p>
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
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    Open Full Demo
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

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lg)] sm:mt-12">
            <div className="flex items-center gap-3 border-b border-border bg-surface-muted px-4 py-3">
              <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              </div>
              <div className="min-w-0 flex-1 truncate rounded-md border border-border bg-surface px-3 py-1 text-xs text-text-tertiary">
                {project.demo ?? `/projects/${project.slug}`}
              </div>
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
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
                    <span aria-hidden="true" className="font-display text-3xl font-bold text-accent">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary">{project.category}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <div className="space-y-10">
              {contentSections.map((section) => (
                <section key={section.title}>
                  <h2 className="eyebrow mb-3">{section.title}</h2>
                  <p className="max-w-prose text-base leading-relaxed text-text-secondary sm:text-lg">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-sm)]">
                <section>
                  <h2 className="text-base font-bold text-foreground">Features</h2>
                  <ul className="mt-4 space-y-3">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                          <Check aria-hidden="true" className="h-3 w-3 text-accent" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6 border-t border-border pt-6">
                  <h2 className="text-base font-bold text-foreground">Technologies</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-text-secondary"
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
