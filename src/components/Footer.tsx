"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./ui/icons";
import Button from "./ui/Button";

const socialLinks = [
  { icon: MessageCircle, href: siteConfig.whatsappUrl, label: "WhatsApp" },
  { icon: GithubIcon, href: siteConfig.githubUrl, label: "GitHub" },
  { icon: LinkedinIcon, href: siteConfig.linkedinUrl, label: "LinkedIn" },
];

const columnTitle =
  "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary";
const columnLink =
  "link-underline text-sm text-text-secondary hover:text-foreground";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const resolveHref = (href: string) =>
    isHome || !href.startsWith("#") ? href : `/${href}`;

  return (
    <footer className="border-t border-border bg-surface-muted">
      <h2 className="sr-only">Footer</h2>
      <div className="container-page pt-16 pb-8 lg:pt-20">
        {/* Top row: brand + start-a-project */}
        <div className="flex flex-col gap-8 border-b border-border pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-[var(--radius-control)]"
              aria-label={`${siteConfig.name} — home`}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold tracking-tight text-white shadow-[var(--shadow-sm)]"
              >
                SR
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                SR Digital{" "}
                <span className="font-semibold text-text-secondary transition-colors group-hover:text-accent">
                  Solution
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={siteConfig.whatsappQuoteUrl}
              variant="whatsapp"
              ariaLabel="Get a free quote on WhatsApp (opens in a new tab)"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Get a Free Quote
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="secondary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email Us
            </Button>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3">
          <div>
            <h3 className={columnTitle}>Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={resolveHref(link.href)} className={columnLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={columnTitle}>Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`${columnLink} break-all`}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={columnLink}
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className={columnTitle}>Follow Us</h3>
            <ul className="flex gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface text-text-secondary shadow-[var(--shadow-xs)] transition-[color,border-color,transform] duration-150 hover:-translate-y-px hover:border-border-strong hover:text-foreground"
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-border pt-8 text-sm text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 SR Digital Solution. All rights reserved.</p>
          <p>{siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
