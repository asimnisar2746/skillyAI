import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="text-center">
        <p className="text-primary font-bold text-6xl">404</p>
        <h1 className="text-2xl font-bold text-foreground mt-4">
          Page not found
        </h1>
        <p className="text-chart-3 mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className={cn("mt-6 py-5 px-6")}
        >
          <Compass className="size-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
