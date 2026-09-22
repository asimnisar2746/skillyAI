"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function GetSuggestionsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleClick() {
    setIsLoading(true);
    setError("");

    const res = await fetch("/api/insights/generate", { method: "POST" });
    setIsLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleClick}
        disabled={isLoading}
        className={cn("py-5 sm:py-6 px-7 sm:text-lg")}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Analyzing your profile...
          </>
        ) : (
          <>
            <Zap />
            Get Career Suggestions
          </>
        )}
      </Button>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
