import { SignupForm } from "@/components/auth/signupForm";
import Link from "next/link";

export default function Register() {
  return (
    <div className="w-full max-w-sm sm:my-6">
      <div className="text-center sm:space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">Skilly</h1>
        <h5 className="text-foreground font-medium sm:text-base text-sm">
          Create an account
        </h5>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Join Skilly and start your career journey.
        </p>
      </div>
      <div className="border bg-background mt-3 rounded-lg shadow-md">
        <div className="w-full h-1 rounded-t-lg bg-linear-to-r from-primary to-secondary" />
        <div className="px-4">
          <SignupForm />
        </div>
      </div>
      <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-5">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
