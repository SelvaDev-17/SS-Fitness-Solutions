import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className, centered = true }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl text-lg font-medium mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn("w-24 h-1 bg-neon mt-6", centered ? "mx-auto" : "ml-0")}></div>
    </div>
  );
}
