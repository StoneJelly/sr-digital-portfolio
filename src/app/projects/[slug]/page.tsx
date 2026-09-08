import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="mb-8">
            <span className="bg-accent/20 text-accent text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
              CONCEPT PROJECT
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              {project.name}
            </h1>
            <p className="text-accent font-medium text-lg">
              {project.category}
            </p>
          </div>

          {project.demo ? (
            <div className="mb-12 rounded-2xl overflow-hidden border border-border bg-surface">
              <div className="aspect-video w-full">
                <iframe
                  src={project.demo}
                  className="w-full h-full border-0"
                  title={`${project.name} Live Demo`}
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-surface to-border rounded-2xl mb-12 flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-3xl font-bold">
                    {project.name.charAt(0)}
                  </span>
                </div>
                <span className="text-text-secondary">{project.category}</span>
              </div>
            </div>
          )}

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold mb-3">Description</h2>
              <p className="text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Objective</h2>
              <p className="text-text-secondary leading-relaxed">
                {project.objective}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Solution</h2>
              <p className="text-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 bg-surface border border-border rounded-xl p-4"
                  >
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-text-secondary text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-surface-hover text-text-secondary text-sm px-4 py-2 rounded-full border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-accent-hover transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Full Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-surface border border-border text-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-surface-hover transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
