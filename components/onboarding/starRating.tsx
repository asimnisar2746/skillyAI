// components/onboarding/starRating.tsx
import { Star } from "lucide-react";

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} out of 5`}
        >
          <Star
            className={
              star <= value
                ? "size-4 fill-primary text-primary"
                : "size-4 text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
}
