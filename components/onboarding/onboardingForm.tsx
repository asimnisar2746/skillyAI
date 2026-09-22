"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useState } from "react";
import { AcademicProfileStep } from "./steps/academicProfileStep";
import { StepProgressBar } from "./stepProgressBar";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { OnboardingNavbar } from "./onboardingNavbar";
import { WorkExperienceStep } from "./steps/workExperienceStep";
import { SkillsStep } from "./steps/skillsStep";
import { SkillCategory } from "@/lib/skill-suggestions";
import { LanguageStep } from "./steps/languageStep";
import { CertificationsStep } from "./steps/certificationsStep";
import { InsightsStep } from "./steps/insightsStep";
import { useRouter } from "next/navigation";

export type WorkExperienceEntry = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  isInternship: boolean;
  responsibilities: string;
};
export type SkillEntry = {
  name: string;
  type: SkillCategory;
  proficiency: number;
};
export type LanguageEfficiency =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Native / Bilingual";
export type LanguageEntry = {
  language: string;
  proficiency: LanguageEfficiency;
};
export type Certifications = {
  name: string;
  organization: string;
  issueDate: string;
  expirationDate: string;
  url: string;
};
export type CareerInterests = {
  preferredJobRoles: string[];
  preferredIndustry: string;
  careerGoals: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
};
export type OnboardingValues = {
  jobTitle: string;
  highestDegree: string;
  fieldOfStudy: string;
  academicAchievements: string;
  workExperiences: WorkExperienceEntry[];
  skills: SkillEntry[];
  languages: LanguageEntry[];
  certifications: Certifications[];
  careerInterests: CareerInterests;
};

const TOTAL_STEPS = 6;
const STEP_LABELS = [
  "Academic Profile",
  "Work Experience",
  "Skills",
  "Languages",
  "Certifications",
  "Career Interests",
];

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<OnboardingValues>({
    defaultValues: {
      jobTitle: "",
      highestDegree: "",
      fieldOfStudy: "",
      academicAchievements: "",
      workExperiences: [
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          isInternship: false,
          responsibilities: "",
          isCurrentlyWorking: false,
        },
      ],
      skills: [],
      languages: [{ language: "", proficiency: "Beginner" }],
      certifications: [
        {
          name: "",
          organization: "",
          issueDate: "",
          expirationDate: "",
          url: "",
        },
      ],
      careerInterests: {
        preferredJobRoles: [],
        preferredIndustry: "",
        careerGoals: "",
        linkedinUrl: "",
        githubUrl: "",
        portfolioUrl: "",
      },
    },
  });

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, TOTAL_STEPS));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  async function onFinalSubmit(values: OnboardingValues) {
    setSubmitError(null);

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      setSubmitError(
        "Something went wrong saving your profile. Please try again.",
      );
      return;
    }

    router.push("dashboard");
  }
  return (
    <>
      <OnboardingNavbar currentStep={currentStep} />
      <form
        onSubmit={form.handleSubmit(onFinalSubmit)}
        className="max-w-150 w-full bg-white shadow-md p-5 rounded-lg mx-auto mb-4"
      >
        <div className="flex justify-between items-center w-full text-xs font-medium">
          <p>Step {currentStep} of 6</p>
          <p className="text-primary">{STEP_LABELS[currentStep - 1]}</p>
        </div>
        <StepProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        {currentStep === 1 && <AcademicProfileStep control={form.control} />}
        {currentStep === 2 && <WorkExperienceStep control={form.control} />}
        {currentStep === 3 && <SkillsStep control={form.control} />}
        {currentStep === 4 && <LanguageStep control={form.control} />}
        {currentStep === 5 && <CertificationsStep control={form.control} />}
        {currentStep === 6 && <InsightsStep control={form.control} />}

        <div
          className={cn(
            "flex mt-6",
            currentStep == 1 ? "justify-end" : "justify-between",
          )}
        >
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              className={cn("py-5 px-4 rounded-sm")}
            >
              Back
            </Button>
          )}

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={goNext}
              className={cn(
                "py-5 px-4 rounded-sm bg-accent-foreground hover:bg-primary",
              )}
            >
              Continue
              <ArrowRight />
            </Button>
          ) : (
            <Button
              type="submit"
              className={cn(
                "py-5 px-4 rounded-sm bg-accent-foreground hover:bg-primary",
              )}
            >
              {form.formState.isSubmitting ? "Finishing..." : "Finish Setup"}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
