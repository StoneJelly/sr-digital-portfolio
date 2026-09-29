export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Website",
    price: "RM500",
    description:
      "Pilot offer for a small number of clients — simple professional online presence in exchange for a testimonial.",
    features: [
      "1-page website",
      "Responsive design",
      "Business information",
      "Services section",
      "Contact section",
      "WhatsApp button",
      "Google Maps",
      "Social media links",
      "Basic SEO",
      "Website deployment",
      "1 revision",
    ],
    cta: "Get Started",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20the%20Starter%20Website%20package%20(RM500).",
  },
  {
    name: "Business + Automation",
    price: "RM800 – RM1,200",
    description:
      "For businesses that want a complete website plus WhatsApp automation to capture and follow up on leads.",
    features: [
      "Up to 5 pages",
      "Custom responsive design",
      "About & services section",
      "Gallery / Portfolio",
      "WhatsApp auto-reply",
      "Lead capture form",
      "Automated follow-up",
      "Google Maps",
      "Social media integration",
      "Basic SEO",
      "Website deployment",
      "2 revisions",
      "RM150–300/mo care plan (hosting, updates, automation upkeep)",
    ],
    cta: "Get Started",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20the%20Business%20%2B%20Automation%20package%20(RM800%E2%80%93RM1%2C200).",
    popular: true,
  },
  {
    name: "Custom Web App",
    price: "From RM1,500",
    description:
      "For businesses that need functionality beyond a standard website.",
    features: [
      "User authentication",
      "Database integration",
      "Admin dashboards",
      "CRUD functionality",
      "Booking systems",
      "Inventory systems",
      "Customer management",
      "Reports",
      "API integrations",
      "Custom business logic",
    ],
    cta: "Request a Quote",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27d%20like%20to%20request%20a%20quote%20for%20a%20custom%20web%20application.",
  },
];
