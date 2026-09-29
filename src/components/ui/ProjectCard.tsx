import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image?: string;
}

const MAX_FEATURES = 4;

export default function ProjectCard({
  slug,
  name,
  category,
  description,
  features,
  image,
}: ProjectCardProps) {
  const extra = features.length - MAX_FEATURES;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex w-full flex-col rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow-xs)] transition-[box-shadow,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface-muted">
        {image ? (
          // Static screenshots served from /public/demos; a plain <img> keeps the framed crop simple.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${name} — ${category} concept website preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-surface shadow-[var(--shadow-xs)]">
              <span aria-hidden="true" className="font-display text-2xl font-bold text-accent">
                {name.charAt(0)}
              </span>
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-border bg-surface px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary shadow-[var(--shadow-xs)]">
          CONCEPT PROJECT
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
          {category}
        </p>
        <h3 className="mt-2 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
          {name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key features">
          {features.slice(0, MAX_FEATURES).map((feature) => (
            <li
              key={feature}
              className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-text-secondary"
            >
              {feature}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs text-text-tertiary">
              +{extra} more
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
          View Project
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
