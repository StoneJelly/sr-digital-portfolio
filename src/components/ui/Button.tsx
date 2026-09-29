"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp" | "light" | "link";
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
    "inline-flex items-center justify-center gap-2 font-bold rounded-[var(--radius-control)] whitespace-nowrap border border-transparent transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    // Ink button that turns teal on hover (design's "button-dark")
    primary:
      "bg-foreground text-white hover:bg-accent hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-surface text-foreground border-border hover:border-accent hover:text-accent hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "text-text-secondary hover:text-foreground hover:bg-surface-hover",
    whatsapp:
      "bg-whatsapp text-white hover:bg-whatsapp-hover hover:-translate-y-0.5 active:translate-y-0",
    // White button for use on the dark ink CTA band (design's "button-light")
    light:
      "bg-white text-foreground hover:bg-accent-soft hover:-translate-y-0.5 active:translate-y-0",
    // Text link with bottom rule (design's "text-link")
    link:
      "!h-auto !px-0 pb-1.5 rounded-none border-0 border-b border-current hover:text-accent",
  };

  const sizes = {
    sm: "h-9 px-4 text-[0.8125rem]",
    md: "h-11 px-5 text-[0.8125rem]",
    lg: "h-12 px-6 text-sm",
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
