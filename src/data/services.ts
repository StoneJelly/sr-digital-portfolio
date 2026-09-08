export interface Service {
  title: string;
  description: string;
  features: string[];
  price: string;
  cta: string;
  href: string;
}

export const services: Service[] = [
  {
    title: "Starter",
    description:
      "For small businesses that need a simple online presence.",
    features: [
      "1-page website",
      "Responsive design",
      "Business information",
      "Services section",
      "WhatsApp button",
      "Google Maps",
      "Social media links",
      "Basic SEO",
      "Deployment",
      "1 revision",
    ],
    price: "RM500",
    cta: "Get Started",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20the%20Starter%20Website%20package%20(RM500).",
  },
  {
    title: "Business",
    description:
      "For businesses that need a more complete website.",
    features: [
      "Up to 5 pages",
      "Custom design",
      "Responsive layout",
      "Contact form",
      "WhatsApp integration",
      "Google Maps",
      "Gallery/portfolio",
      "Basic SEO",
      "Deployment",
      "2 revisions",
    ],
    price: "RM800",
    cta: "Get Started",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20the%20Business%20Website%20package%20(RM800).",
  },
  {
    title: "Custom Web App",
    description:
      "For businesses requiring functionality beyond a standard website.",
    features: [
      "User authentication",
      "Database",
      "Admin dashboard",
      "CRUD functionality",
      "Booking systems",
      "Inventory",
      "Reports",
      "API integrations",
    ],
    price: "From RM1,500",
    cta: "Request a Quote",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27d%20like%20to%20request%20a%20quote%20for%20a%20custom%20web%20application.",
  },
];
