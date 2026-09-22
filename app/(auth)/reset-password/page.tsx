import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — Skilly",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="w-full max-w-sm text-center">
        <p className="text-destructive">This reset link is invalid.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm border bg-background p-4 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">Skilly</h1>
        <h5 className="text-foreground font-medium">Set a New Password</h5>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
