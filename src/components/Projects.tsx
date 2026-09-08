"use client";

import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Selected Projects"
          subtitle="A look at the types of digital experiences we can build."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              name={project.name}
              category={project.category}
              description={project.description}
              features={project.features}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
