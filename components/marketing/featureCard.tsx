import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  heading: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  heading,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 sm:gap-4 rounded-2xl border bg-card p-4 sm:p-8">
      <div className="flex size-11 sm:size-14 items-center justify-center rounded-full bg-accent">
        <Icon className="size-5 sm:size-7 text-primary" />
      </div>
      <h3 className="sm:text-lg font-semibold text-foreground">{heading}</h3>
      <p className="text-muted-foreground text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
}
