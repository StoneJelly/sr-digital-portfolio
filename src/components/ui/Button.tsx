"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
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
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg whitespace-nowrap";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 hover:shadow-accent/30",
    secondary:
      "bg-surface text-foreground border border-border hover:bg-surface-hover hover:border-text-secondary/30",
    ghost:
      "text-text-secondary hover:text-foreground hover:bg-surface",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
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
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
