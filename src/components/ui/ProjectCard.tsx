import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectCardLayout = "tall" | "stacked" | "half" | "wide";

interface ProjectCardProps {
  index: number;
  /** The card's slot in the Projects grid; sets the preview height. */
  layout: ProjectCardLayout;
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image?: string;
}

const MAX_TAGS = 3;

// Preview tints from the reference design (.project-one/two/three), cycled by
// index. They are the design's preview backgrounds; there are no tokens for them.
const tints = ["bg-[#d9ebe6]", "bg-[#f3e8d9]", "bg-[#e3e6f0]"];

// Screenshot frame position + tilt, cycled by index so neighbours differ.
const frames = [
  "left-[15%] top-[15%] h-[70%] w-[70%] -rotate-5 group-hover:-rotate-3",
  "left-[18%] top-[19%] h-[64%] w-[64%] rotate-5 group-hover:rotate-3",
  "left-[15%] top-[15%] h-[70%] w-[70%] -rotate-3 group-hover:-rotate-2",
  "left-[15%] top-[15%] h-[70%] w-[70%] rotate-3 group-hover:rotate-2",
];

// Preview height per grid slot (the grid is one column below md).
const heights: Record<ProjectCardLayout, string> = {
  tall: "min-h-[390px] md:min-h-[620px]",
  stacked: "min-h-[270px] md:min-h-[300px]",
  half: "min-h-[270px] md:min-h-[340px]",
  wide: "min-h-[270px] md:min-h-[360px]",
};

// Full-width card: narrower frame so the screenshot keeps a natural ratio.
const wideFrame = "md:left-[27%] md:top-[13%] md:h-[74%] md:w-[46%]";

export default function ProjectCard({
  index,
  layout,
  slug,
  name,
  category,
  description,
  features,
  image,
}: ProjectCardProps) {
  const extra = features.length - MAX_TAGS;

  return (
    <Link href={`/projects/${slug}`} className="group flex w-full flex-col">
      <div
        className={cn(
          "relative flex-1 overflow-hidden rounded-[var(--radius-card)]",
          tints[index % tints.length],
          heights[layout]
        )}
      >
        <div
          className={cn(
            "absolute flex flex-col bg-surface p-2.5 shadow-[var(--shadow-md)] transition-transform duration-300 ease-out sm:p-3.5",
            frames[index % frames.length],
            layout === "wide" && wideFrame
          )}
        >
          <div className="flex gap-1 border-b border-border pb-2.5" aria-hidden="true">
            <span className="h-[5px] w-[5px] rounded-full bg-border-strong" />
            <span className="h-[5px] w-[5px] rounded-full bg-border-strong" />
            <span className="h-[5px] w-[5px] rounded-full bg-border-strong" />
          </div>
          <div className="relative mt-2.5 flex-1 overflow-hidden bg-surface-muted">
            {image ? (
              // Static screenshots served from /public/demos; a plain <img> keeps the framed crop simple.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={`${name} — ${category} concept website preview`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span aria-hidden="true" className="text-3xl font-bold text-accent">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        <span className="absolute left-4 top-4 border border-border bg-surface px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
          CONCEPT PROJECT
        </span>
        <span className="absolute bottom-4 left-5 text-[10px] font-medium uppercase tracking-[0.1em] text-text-secondary">
          {category}
        </span>
      </div>

      <div className="flex justify-between gap-5 px-0.5 pt-5">
        <div className="min-w-0">
          <h3 className="text-[19px] font-bold tracking-[-0.04em] text-foreground transition-colors group-hover:text-accent">
            {name}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-text-secondary">
            {description}
          </p>
          <ul className="mt-3.5 flex flex-wrap gap-[7px]" aria-label="Key features">
            {features.slice(0, MAX_TAGS).map((feature) => (
              <li
                key={feature}
                className="border border-border px-2 py-1 text-[10px] text-text-tertiary"
              >
                {feature}
              </li>
            ))}
            {extra > 0 && (
              <li className="border border-border px-2 py-1 text-[10px] text-text-tertiary">
                +{extra}
                <span className="sr-only"> more features</span>
              </li>
            )}
          </ul>
        </div>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
        >
          <ArrowUpRight className="h-[18px] w-[18px]" />
        </span>
      </div>
    </Link>
  );
}
