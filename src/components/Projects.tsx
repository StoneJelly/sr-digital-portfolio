import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";
import Reveal from "./ui/Reveal";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

// Grid placement on md+ (design's .projects-grid): the first project is the tall
// feature card spanning two rows beside projects 2 and 3; any project after
// that runs full width so the grid never leaves an empty cell.
function placement(index: number) {
  if (index === 0) return "md:row-span-2";
  if (index >= 3) return "md:col-span-2";
  return undefined;
}

export default function Projects() {
  return (
    <section id="projects" className="section bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="03 / Selected work"
          title="Selected Projects"
          subtitle="A look at the types of digital experiences we can build."
        />

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-[1.08fr_0.92fr]">
          {projects.map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={i * 0.06}
              className={cn("flex", placement(i))}
            >
              <ProjectCard
                index={i}
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
