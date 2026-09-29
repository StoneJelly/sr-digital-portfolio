"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { homeHref, navLinks, siteConfig } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./ui/icons";
import { BrandLogo } from "./ui/BrandMark";

const socialLinks = [
  { icon: MessageCircle, href: siteConfig.whatsappUrl, label: "WhatsApp" },
  { icon: GithubIcon, href: siteConfig.githubUrl, label: "GitHub" },
  { icon: LinkedinIcon, href: siteConfig.linkedinUrl, label: "LinkedIn" },
];

const mutedLink = "transition-colors duration-150 hover:text-accent";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border bg-background">
      <h2 className="sr-only">Footer</h2>

      {/* Top row: brand / tagline / nav */}
      <div className="container-page grid grid-cols-1 items-center gap-[22px] py-[42px] min-[801px]:grid-cols-3 min-[801px]:gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="justify-self-start rounded-[var(--radius-control)]"
        >
          <BrandLogo />
        </Link>
        <p className="text-xs text-text-secondary min-[801px]:text-center">
          {siteConfig.tagline}
        </p>
        <nav aria-label="Footer" className="min-[801px]:justify-self-end">
          <ul className="flex flex-wrap gap-x-[22px] gap-y-2 text-xs text-text-secondary">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={homeHref(link.href, pathname)} className={mutedLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Contact row: email, WhatsApp, quote link, social icons */}
      <div className="container-page flex flex-col gap-5 border-t border-border py-6 min-[801px]:flex-row min-[801px]:items-center min-[801px]:justify-between">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-text-secondary">
          <li>
            <a href={`mailto:${siteConfig.email}`} className={`${mutedLink} break-all`}>
              {siteConfig.email}
            </a>
          </li>
          <li>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={mutedLink}
            >
              WhatsApp Us
            </a>
          </li>
          <li>
            <a
              href={siteConfig.whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get a Free Quote on WhatsApp (opens in a new tab)"
              className="text-link"
            >
              Get a Free Quote
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <ul className="flex gap-2">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-secondary transition-colors duration-150 hover:border-accent hover:bg-accent hover:text-white"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar */}
      <div className="container-page flex flex-col gap-2 border-t border-border pt-[17px] pb-[23px] text-[11px] text-text-tertiary min-[801px]:flex-row min-[801px]:justify-between">
        <p>&copy; 2026 SR Digital Solution. All rights reserved.</p>
        <p>{siteConfig.location}</p>
      </div>
    </footer>
  );
}
