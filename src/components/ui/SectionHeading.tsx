import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** Optional second line rendered in the accent colour. */
  highlight?: string;
  subtitle?: string;
  /** Kicker, e.g. "02 / What we build". */
  eyebrow?: string;
  /**
   * split: heading left, subtitle right (bottom-aligned) — default.
   * left: stacked, left-aligned.
   * center: stacked, centred.
   */
  align?: "split" | "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  eyebrow,
  align = "split",
  className,
}: SectionHeadingProps) {
  const heading = (
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn("heading-display", eyebrow && "mt-4")}>
        {title}
        {highlight && (
          <>
            <br />
            <span>{highlight}</span>
          </>
        )}
      </h2>
    </div>
  );

  if (align === "split") {
    return (
      <div
        className={cn(
          "mb-10 md:mb-14 md:flex md:items-end md:justify-between md:gap-12",
          className
        )}
      >
        {heading}
        {subtitle && (
          <p className="mt-5 md:mt-0 md:mb-1 max-w-72 shrink-0 text-sm leading-relaxed text-text-secondary">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-10 md:mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {heading}
      {subtitle && (
        <p
          className={cn(
            "mt-6 max-w-xl text-base leading-relaxed text-text-secondary",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
