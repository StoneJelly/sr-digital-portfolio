"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeHref, navLinks, siteConfig } from "@/data/site";
import Button from "./ui/Button";
import { BrandLogo } from "./ui/BrandMark";

const MENU_ID = "mobile-menu";
// Design breakpoint: mobile nav at <=800px.
const DESKTOP_QUERY = "(min-width: 801px)";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  // While open: body scroll lock, Esc to close, close on resize to desktop,
  // and move focus to the first link.
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
    const frame = requestAnimationFrame(() => firstLinkRef.current?.focus());

    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const contactHref = homeHref("#contact", pathname);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur-[14px] transition-colors duration-200",
        scrolled || isOpen ? "border-border" : "border-transparent"
      )}
    >
      <nav aria-label="Main" className="container-page">
        <div className="flex h-[76px] items-center gap-10">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label={`${siteConfig.name} home`}
            className="rounded-[var(--radius-control)]"
          >
            <BrandLogo />
          </Link>

          <ul className="ml-auto hidden items-center gap-8 min-[801px]:flex">
            {navLinks.map((link) => {
              const isActive = isHome && activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <Link
                    href={homeHref(link.href, pathname)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "text-[13px] transition-colors duration-150 hover:text-accent",
                      isActive ? "font-semibold text-accent" : "text-text-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={contactHref}
            className="hidden items-center gap-[9px] border-b border-foreground pt-[9px] pb-[7px] pl-[18px] text-[13px] font-semibold text-foreground transition-colors duration-200 hover:border-accent hover:text-accent min-[801px]:inline-flex"
          >
            Get a Free Quote
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            className="-mr-2 ml-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius-control)] text-foreground min-[801px]:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Scrim below the panel: tap outside to close. Absolute, not fixed:
                the header's backdrop-filter is the containing block. */}
            <motion.button
              key="mobile-scrim"
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={closeMenu}
              className="absolute inset-x-0 top-[76px] -z-10 h-[100dvh] w-full cursor-default bg-foreground/20 min-[801px]:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.nav
              key="mobile-menu"
              id={MENU_ID}
              aria-label="Mobile"
              className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-border bg-background min-[801px]:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container-page pt-2.5 pb-[22px]">
                <ul className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = isHome && activeId === link.href.slice(1);
                    return (
                      <li key={link.href} className="border-b border-border">
                        <Link
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={homeHref(link.href, pathname)}
                          onClick={closeMenu}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "block py-[15px] text-[15px] transition-colors hover:text-accent",
                            isActive ? "font-semibold text-accent" : "text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  href={contactHref}
                  size="lg"
                  className="mt-[17px] w-full"
                  onClick={closeMenu}
                >
                  Get a Free Quote
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
