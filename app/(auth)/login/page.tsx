import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/loginForm";

export const metadata: Metadata = {
  title: "Login — Skilly",
  description: "Log in to your Skilly account.",
};

export default function Login() {
  return (
    <div className="w-full max-w-sm border bg-background p-4 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">Skilly</h1>
        <h5 className="text-foreground font-medium sm:text-base text-sm">
          Welcome Back
        </h5>
        <p className="text-muted-foreground text-sm">
          Please log in to continue
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
