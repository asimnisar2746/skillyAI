import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function VerifySuccessPage() {
  return (
    <div className="w-full max-w-sm text-center border bg-background p-6 rounded-lg shadow-md">
      <CheckCircle2 className="text-primary size-12 mx-auto mb-4" />
      <h1 className="text-xl font-bold text-foreground">Email Verified</h1>
      <p className="text-muted-foreground text-sm mt-2">
        Your email has been verified. You can now log in.
      </p>
      <Link
        href="/login"
        className="text-primary font-medium mt-4 inline-block"
      >
        Go to Login
      </Link>
    </div>
  );
}
