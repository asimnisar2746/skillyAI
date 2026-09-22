"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroActions() {
  const { data: session, status } = useSession();

  const primaryHref = session ? "/dashboard" : "/login";
  const primaryLabel = session ? "Go to Dashboard" : "Get Started";

  return (
    <div className="flex gap-4">
      {status === "loading" ? (
        <div className="h-11 w-32 animate-pulse rounded-sm bg-primary/30" />
      ) : (
        <Button
          nativeButton={false}
          render={<Link href={primaryHref} />}
          className={cn("rounded-sm h-11 px-5")}
        >
          {primaryLabel}
        </Button>
      )}

      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/features" />}
        className={cn(
          "border-2 h-11 px-5 border-primary text-accent-foreground rounded-sm hover:text-primary",
        )}
      >
        See How It Works
      </Button>
    </div>
  );
}
