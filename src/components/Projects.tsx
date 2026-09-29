import type { CSSProperties } from "react";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard, { type ProjectCardLayout } from "./ui/ProjectCard";
import Reveal from "./ui/Reveal";
import { projects } from "@/data/projects";

interface Placement {
  layout: ProjectCardLayout;
  /** CSS grid-column / grid-row values, applied from md up. */
  column: string;
  row: string;
}

// Grid placement on md+ (design's .projects-grid), as a pure function of the
// project's index and the total count, so any number of projects fills the
// grid with no empty cells:
//   - Projects come in blocks of 3: one tall card beside two stacked cards.
//     Blocks alternate sides (tall left, then tall right, ...).
//   - A leftover single project runs full width; a leftover pair splits the
//     row into two equal cards.
// The grid has four tracks (.92fr .08fr .08fr .92fr): the tall card spans
// three (1.08fr) beside a stacked card in one (.92fr), keeping the design's
// 1.08fr/.92fr proportion on either side, and a pair splits exactly in half.
// Rows are explicit so placement never depends on auto-flow rules.
function placement(index: number, total: number): Placement {
  const fullBlocks = Math.floor(total / 3);
  const block = Math.floor(index / 3);
  const firstRow = block * 2 + 1;

  if (block < fullBlocks) {
    const tallOnRight = block % 2 === 1;
    const position = index % 3;
    if (position === 0) {
      return {
        layout: "tall",
        column: tallOnRight ? "2 / 5" : "1 / 4",
        row: `${firstRow} / span 2`,
      };
    }
    return {
      layout: "stacked",
      column: tallOnRight ? "1 / 2" : "4 / 5",
      row: String(firstRow + position - 1),
    };
  }

  // Leftover row (1 or 2 projects) after the last full block.
  if (total - fullBlocks * 3 === 1) {
    return { layout: "wide", column: "1 / -1", row: String(firstRow) };
  }
  return {
    layout: "half",
    column: index % 3 === 0 ? "1 / 3" : "3 / 5",
    row: String(firstRow),
  };
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

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-[0.92fr_0.08fr_0.08fr_0.92fr]">
          {projects.map((project, i) => {
            const { layout, column, row } = placement(i, projects.length);
            return (
              <li
                key={project.slug}
                className="flex md:[grid-column:var(--project-col)] md:[grid-row:var(--project-row)]"
                style={{ "--project-col": column, "--project-row": row } as CSSProperties}
              >
                {/* Stagger restarts per block so later cards don't lag behind. */}
                <Reveal delay={(i % 3) * 0.06} className="flex w-full">
                  <ProjectCard
                    index={i}
                    layout={layout}
                    slug={project.slug}
                    name={project.name}
                    category={project.category}
                    description={project.description}
                    features={project.features}
                    image={project.image}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
