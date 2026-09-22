"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function OnboardingNavbar({ currentStep }: { currentStep: number }) {
  const router = useRouter();

  const stepLabels = [
    "Academic Profile",
    "Work Experience",
    "Skills",
    "Languages",
    "Certifications",
    "Career Interests",
  ];

  return (
    <div className="flex justify-center items-center w-full border-b mb-3">
      <div className="flex justify-between items-center bg-secondary max-w-300 w-full py-3 px-4">
        <Link href="/dashboard">
          <ArrowLeft className="text-primary" />
        </Link>

        <p className="text-primary font-semibold text-lg">
          Complete Your {stepLabels[currentStep - 1]}
        </p>

        <Link href="/dashboard" className="text-primary text-sm font-medium">
          Save and Exit
        </Link>
      </div>
    </div>
  );
}
