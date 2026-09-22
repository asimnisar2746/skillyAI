import type { Metadata } from "next";
import { OnboardingForm } from "@/components/onboarding/onboardingForm";

export const metadata: Metadata = {
  title: "Complete Your Profile — Skilly",
};

export default function OnboardingPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <OnboardingForm />
    </div>
  );
}
