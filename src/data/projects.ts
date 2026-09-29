export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  objective: string;
  solution: string;
  features: string[];
  technologies: string[];
  image?: string;
  liveDemo?: string;
  demo?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    slug: "spice-and-co",
    name: "Spice & Co.",
    category: "Restaurant Website",
    description:
      "A modern restaurant website designed to showcase the menu, location, gallery and make it easy for customers to contact the restaurant.",
    objective:
      "Spice & Co. needed a professional online presence to attract new customers, showcase their menu and make it easy for diners to find the restaurant location and get in touch.",
    solution:
      "We designed a warm, inviting single-page website with a clean layout that highlights the menu, includes an image gallery, displays opening hours, and provides direct WhatsApp contact and Google Maps integration.",
    features: [
      "Digital menu",
      "Gallery",
      "Opening hours",
      "Google Maps",
      "WhatsApp contact",
      "Responsive design",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    image: "/demos/spice-and-co/hero.jpg",
    demo: "/demos/spice-and-co/index.html",
  },
  {
    slug: "ironbloom",
    name: "Ironbloom Fitness Studio",
    category: "Fitness Studio Website",
    description:
      "A bold fitness studio website concept with a weekly class timetable, membership plans and instant WhatsApp booking for free trial classes.",
    objective:
      "Ironbloom Fitness Studio needed a website that shows the weekly class schedule at a glance, presents membership pricing clearly, and turns visitors into trial-class bookings without back-and-forth phone calls.",
    solution:
      "We designed an energetic single-page website with a filterable weekly timetable that switches to day tabs on mobile, programme and coach profiles, transparent RM pricing, and WhatsApp CTAs set up for auto-replies to enquiries and trial bookings.",
    features: [
      "Class timetable",
      "Programmes",
      "Trainer profiles",
      "Membership plans",
      "WhatsApp trial booking",
      "Gallery",
      "Google Maps",
      "Responsive design",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    image: "/demos/ironbloom/hero.jpg",
    demo: "/demos/ironbloom/index.html",
  },
  {
    slug: "elite-autocare",
    name: "Elite AutoCare",
    category: "Automotive Business Website",
    description:
      "A professional website concept for an automotive workshop to showcase services, build customer trust and generate enquiries.",
    objective:
      "Elite AutoCare wanted a website that would establish credibility, clearly present their automotive services, and make it effortless for potential customers to reach out for bookings.",
    solution:
      "We built a professional multi-section website featuring service listings with pricing, an about section, customer review highlights, and prominent WhatsApp enquiry and location integration.",
    features: [
      "Services",
      "Pricing",
      "About section",
      "Customer reviews",
      "WhatsApp enquiry",
      "Location",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    demo: "/demos/elite-autocare/index.html",
    image: "/demos/elite-autocare/image2.jpg",
  },
  {
    slug: "serai-and-silk",
    name: "Serai & Silk",
    category: "Beauty Salon Website",
    description:
      "An elegant website concept for a boutique beauty salon to present its service menu, show before-and-after looks and take appointment requests on WhatsApp.",
    objective:
      "Serai & Silk needed a polished online presence that reflects the calm, premium feel of the studio, lists hair, nail and facial prices clearly, and turns visitors into booked appointments without a complicated booking system.",
    solution:
      "We designed a refined single-page website with a priced service menu, interactive before/after comparison sliders, stylist profiles and a simple booking helper that sends the chosen service, date and time straight to the salon's WhatsApp.",
    features: [
      "Service menu with prices",
      "Before/after gallery",
      "WhatsApp appointment booking",
      "Stylist profiles",
      "Client reviews",
      "Opening hours & Google Maps",
      "Responsive design",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    image: "/demos/serai-and-silk/hero.jpg",
    demo: "/demos/serai-and-silk/index.html",
  },
  {
    slug: "novatech-solutions",
    name: "NovaTech Solutions",
    category: "Corporate Website",
    description:
      "A modern corporate website concept designed for a technology company to showcase its services, projects and company information.",
    objective:
      "NovaTech Solutions needed a polished, corporate-grade website to present their technology services, showcase past projects, and generate business leads from potential clients.",
    solution:
      "We designed a sleek corporate website with dedicated sections for company profile, services, portfolio showcase, about the team, and a lead generation contact form.",
    features: [
      "Company profile",
      "Services",
      "Portfolio",
      "About",
      "Contact",
      "Lead generation",
    ],
    technologies: ["Angular", "TypeScript", "HTML", "CSS", "Node.js"],
    demo: "/demos/novatech-solutions/index.html",
    image: "/demos/novatech-solutions/image1.jpg",
  },
  {
    slug: "tunas-minda",
    name: "Tunas Minda Learning Centre",
    category: "Tuition Centre Website",
    description:
      "A friendly tuition centre website concept that helps parents compare classes, check the weekly schedule and send enquiries straight to WhatsApp.",
    objective:
      "Tunas Minda Learning Centre wanted to look trustworthy to parents, answer common questions about subjects, timetables and fees upfront, and turn more website visitors into trial-class bookings.",
    solution:
      "We designed a bright, welcoming website with subjects by level, a filterable weekly class schedule, teacher profiles, clear monthly fees and a parent enquiry form that opens WhatsApp with the child's details prefilled, ready for an instant auto-reply.",
    features: [
      "Subjects & levels",
      "Filterable class schedule",
      "Teacher profiles",
      "Monthly fees",
      "Parent enquiry form",
      "WhatsApp auto-reply ready",
      "Google Maps",
      "Responsive design",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    image: "/demos/tunas-minda/hero.jpg",
    demo: "/demos/tunas-minda/index.html",
  },
  {
    slug: "business-management-system",
    name: "Business Management System",
    category: "Web Application",
    description:
      "BizFlow — A comprehensive business management system with customer management, product inventory, order tracking, and real-time reporting dashboards.",
    objective:
      "To build a full-featured business management dashboard that centralizes customer data, product inventory, orders, and reporting into a single, easy-to-use interface — demonstrating ability beyond marketing websites.",
    solution:
      "We developed a complete web application with user authentication, a responsive admin dashboard, full CRUD operations for customers and products, order tracking with status management, and dynamic reporting with interactive Chart.js visualizations.",
    features: [
      "Login & authentication",
      "Interactive dashboard",
      "Customer CRUD (add/edit/delete)",
      "Product inventory management",
      "Order tracking & status",
      "Revenue & sales reports",
      "Search & filtering",
      "Responsive design",
    ],
    technologies: [
      "JavaScript",
      "Chart.js",
      "HTML5",
      "CSS3",
      "localStorage",
    ],
    demo: "/demos/bizflow/login.html",
    image: "/demos/bizflow/image5.jpg",
  },
];
