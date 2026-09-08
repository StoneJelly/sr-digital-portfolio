interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-16 ${className ?? ""}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg">{subtitle}</p>
      )}
    </div>
  );
}
