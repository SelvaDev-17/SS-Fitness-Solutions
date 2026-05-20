import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, centered = true, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className={cn("text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4", light ? "text-zinc-900" : "text-white")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-2xl text-lg font-medium mx-auto", light ? "text-zinc-500" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
      <div className={cn("w-24 h-1 bg-neon mt-6", centered ? "mx-auto" : "ml-0")}></div>
    </div>
  );
}
