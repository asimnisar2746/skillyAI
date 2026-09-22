import Link from "next/link";
import { XCircle } from "lucide-react";

export default function VerifyErrorPage() {
  return (
    <div className="w-full max-w-sm text-center border bg-background p-6 rounded-lg shadow-md">
      <XCircle className="text-destructive size-12 mx-auto mb-4" />
      <h1 className="text-xl font-bold text-foreground">
        Link Invalid or Expired
      </h1>
      <p className="text-muted-foreground text-sm mt-2">
        This verification link is no longer valid. You can request a new one
        from your dashboard.
      </p>
      <Link
        href="/login"
        className="text-primary font-medium mt-4 inline-block"
      >
        Back to Login
      </Link>
    </div>
  );
}
