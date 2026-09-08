import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image?: string;
}

export default function ProjectCard({
  slug,
  name,
  category,
  description,
  features,
  image,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300"
    >
      <div className="aspect-video bg-gradient-to-br from-surface-hover to-border relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-2xl font-bold">
                  {name.charAt(0)}
                </span>
              </div>
              <span className="text-text-secondary text-sm">{category}</span>
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-accent/20 text-accent text-xs font-medium px-3 py-1 rounded-full">
            CONCEPT PROJECT
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
          {name}
        </h3>
        <p className="text-text-secondary text-sm mb-3">{category}</p>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="bg-surface-hover text-text-secondary text-xs px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {features.length > 4 && (
            <span className="bg-surface-hover text-text-secondary text-xs px-3 py-1 rounded-full">
              +{features.length - 4} more
            </span>
          )}
        </div>
        <div className="flex items-center text-accent text-sm font-medium group-hover:gap-3 gap-2 transition-all">
          View Project <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
