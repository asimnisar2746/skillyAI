import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — Skilly",
  description: "Reset your Skilly account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm border bg-background p-4 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">Skilly</h1>
        <h5 className="text-foreground font-medium">Forgot Password</h5>
        <p className="text-muted-foreground text-sm">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
