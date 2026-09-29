import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";
import Reveal from "./ui/Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section bg-surface-muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Projects"
          subtitle="A look at the types of digital experiences we can build."
          align="left"
        />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.06} className="flex">
              <ProjectCard
                slug={project.slug}
                name={project.name}
                category={project.category}
                description={project.description}
                features={project.features}
                image={project.image}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
