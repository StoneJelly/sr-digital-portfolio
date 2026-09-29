"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/data/site";
import Button from "./ui/Button";

const MENU_ID = "mobile-menu";
// Tailwind `md` breakpoint (48rem).
const DESKTOP_QUERY = "(min-width: 48rem)";

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-[0.8125rem] font-bold tracking-tight text-white shadow-[var(--shadow-sm)]"
    >
      SR
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // On non-home routes, section anchors must point back to the home page.
  const resolveHref = (href: string) =>
    isHome || !href.startsWith("#") ? href : `/${href}`;

  // Scrolled state (passive listener).
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active-section highlight (home page only).
  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Body scroll lock, Esc to close, close on resize to desktop.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isOpen]);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const showSolid = scrolled || isOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        showSolid
          ? "border-border bg-background/85 shadow-[var(--shadow-xs)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav aria-label="Main" className="container-page">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-[var(--radius-control)]"
            aria-label={`${siteConfig.name} — home`}
          >
            <BrandMark />
            <span className="font-display text-[1.0625rem] font-bold tracking-tight text-foreground">
              SR Digital{" "}
              <span className="font-semibold text-text-secondary transition-colors group-hover:text-accent">
                Solution
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = isHome && activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <Link
                    href={resolveHref(link.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors duration-150 lg:px-3.5",
                      isActive
                        ? "bg-surface text-foreground shadow-[var(--shadow-xs)]"
                        : "text-text-secondary hover:bg-surface-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button href={resolveHref("#contact")} size="sm">
              Get a Free Quote
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            className="-mr-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius-control)] text-foreground transition-colors hover:bg-surface-muted md:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Scrim: tap outside the panel to close */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={closeMenu}
              className="absolute inset-0 h-full w-full cursor-default bg-foreground/10"
            />
            <motion.div
              id={MENU_ID}
              className="container-page relative pt-3"
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow-lg)]">
                <ul className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = isHome && activeId === link.href.slice(1);
                    return (
                      <li key={link.href}>
                        <Link
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={resolveHref(link.href)}
                          onClick={closeMenu}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex h-12 items-center rounded-[var(--radius-control)] px-4 text-base font-medium transition-colors",
                            isActive
                              ? "bg-accent-soft text-accent"
                              : "text-foreground hover:bg-surface-muted"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 border-t border-border pt-3">
                  <Button
                    href={resolveHref("#contact")}
                    className="w-full"
                    onClick={closeMenu}
                  >
                    Get a Free Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
