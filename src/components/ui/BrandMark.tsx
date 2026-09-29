import { cn } from "@/lib/utils";

const bars = ["h-[13px]", "h-5", "h-[26px]"];

/** Three skewed teal bars rising left to right (decorative). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex h-[26px] w-[26px] shrink-0 items-end gap-[3px]", className)}
    >
      {bars.map((height) => (
        <span
          key={height}
          className={cn(
            "block w-1.5 -skew-x-[15deg] rounded-t-[4px] rounded-b-[2px] bg-accent",
            height
          )}
        />
      ))}
    </span>
  );
}

/** Brand lockup: mark + "SR Digital Solution" wordmark. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[11px] whitespace-nowrap text-base tracking-[-0.03em] text-foreground",
        className
      )}
    >
      <BrandMark />
      <span className="font-semibold">
        SR <span className="font-normal text-text-secondary">Digital Solution</span>
      </span>
    </span>
  );
}
