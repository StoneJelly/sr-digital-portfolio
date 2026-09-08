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
      "For small businesses that need a simple professional online presence.",
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
    name: "Business Website",
    price: "RM800",
    description:
      "For businesses that need a more complete online presence.",
    features: [
      "Up to 5 pages",
      "Custom responsive design",
      "About section",
      "Services section",
      "Gallery / Portfolio",
      "Contact page",
      "WhatsApp integration",
      "Google Maps",
      "Social media integration",
      "Basic SEO",
      "Website deployment",
      "2 revisions",
    ],
    cta: "Get Started",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20the%20Business%20Website%20package%20(RM800).",
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
