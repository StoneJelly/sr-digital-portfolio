"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

function isExternalLink(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("wa:") ||
    href.startsWith("mailto:")
  );
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-control)] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    primary:
      "bg-accent text-white shadow-[var(--shadow-sm)] hover:bg-accent-hover hover:shadow-[var(--shadow-md)] hover:-translate-y-px active:translate-y-0",
    secondary:
      "bg-surface text-foreground border border-border shadow-[var(--shadow-xs)] hover:border-border-strong hover:bg-surface-hover hover:-translate-y-px active:translate-y-0",
    ghost:
      "text-text-secondary hover:text-foreground hover:bg-surface-muted",
    whatsapp:
      "bg-whatsapp text-white shadow-[var(--shadow-sm)] hover:bg-whatsapp-hover hover:-translate-y-px active:translate-y-0",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-[0.9375rem]",
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    !disabled && "cursor-pointer",
    className
  );

  if (href) {
    if (isExternalLink(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
