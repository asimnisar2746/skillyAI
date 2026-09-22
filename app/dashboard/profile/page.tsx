import Certifications from "@/components/dashboard/profile/certifications";
import CareerPreferences from "@/components/dashboard/profile/careerPreferences";
import CoreSkills from "@/components/dashboard/profile/coreSkills";
import { ProfileCard } from "@/components/dashboard/profile/profileCard";
import WorkExperience from "@/components/dashboard/profile/workExperience";
import AcademicSummary from "@/components/dashboard/profile/academicSummary";
import Languages from "@/components/dashboard/profile/languages";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { auth } from "@/auth";
import { getCachedProfileData } from "@/lib/getProfileData";

export default async function ProfilePage() {
  const session = await auth();
  const userId = session!.user!.id!;

  let data;

  try {
    data = await getCachedProfileData(userId);
  } catch (error) {
    console.error("Failed to load profile data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <p className="text-lg font-medium">
            Something went wrong loading your profile.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  const {
    profile,
    careerInterests,
    certifications,
    user,
    userSkills,
    userLanguages,
    workExperiences,
  } = data;

  return (
    <div className="bg-secondary px-4">
      <div className="max-w-300 mx-auto min-h-screen my-8">
        <section className="w-full flex sm:flex-row flex-col sm:justify-between gap-4 sm:items-center my-4">
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Your Profile Overview
            </h1>
            <p className="text-chart-3 sm:text-lg">
              Review and manage your foundational career data.
            </p>
          </div>
          <a href="/api/resume">
            <Button className={cn("bg-accent-foreground py-5 px-5")}>
              <Download />
              Export Resume
            </Button>
          </a>
        </section>

        {/* Row 1: Profile card + Academic/Languages summary */}
        <div className="flex sm:flex-row flex-col gap-4 my-6">
          <div className="sm:w-[30%]">
            <ProfileCard
              values={{
                name: user?.name ?? "",
                email: user?.email ?? "",
                location: user?.location ?? "",
                role: profile?.jobTitle ?? "",
                picture: user?.image ?? "",
                website: careerInterests?.portfolioUrl ?? "",
              }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <AcademicSummary
              jobTitle={profile?.jobTitle ?? ""}
              highestDegree={profile?.highestDegree ?? ""}
              fieldOfStudy={profile?.fieldOfStudy ?? ""}
            />
            <Languages
              values={userLanguages.map((ul) => ({
                name: ul.language.name,
                proficiency: ul.proficiency,
              }))}
            />
          </div>
        </div>

        <CoreSkills
          values={userSkills.map((us) => ({
            name: us.skill.name,
            type:
              us.skill.type === "PROGRAMMING_LANGUAGE"
                ? "Programming Language"
                : us.skill.type === "FRAMEWORK"
                  ? "Framework"
                  : "Soft Skill",
            proficiency: us.proficiency,
          }))}
        />

        <WorkExperience
          values={workExperiences.map((exp) => ({
            Role: exp.jobTitle,
            company: exp.company,
            duration: `${new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${
              exp.endDate
                ? new Date(exp.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Present"
            }`,
            location: "",
            para: exp.rolesAndResponsibilities,
          }))}
          editValues={workExperiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: new Date(exp.startDate).toISOString().split("T")[0],
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString().split("T")[0]
              : "",
            isCurrentlyWorking: !exp.endDate,
            isInternship: exp.isInternship,
            responsibilities: exp.rolesAndResponsibilities,
          }))}
        />

        {/* Certifications — now full-width, grid layout, scales with many entries */}
        <Certifications
          values={certifications.map((c) => ({
            name: c.name,
            platform: c.platform,
            completionDate: c.completionDate
              ? new Date(c.completionDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "",
          }))}
          editValues={certifications.map((c) => ({
            name: c.name,
            organization: c.platform,
            issueDate: c.completionDate
              ? new Date(c.completionDate).toISOString().split("T")[0]
              : "",
            expirationDate: c.expirationDate
              ? new Date(c.expirationDate).toISOString().split("T")[0]
              : "",
            url: c.credentialUrl ?? "",
          }))}
        />

        <CareerPreferences
          values={[
            {
              title: "Target Role",
              value:
                careerInterests?.preferredJobRoles?.join(", ") || "Not set",
            },
            {
              title: "Preferred Industries",
              value: careerInterests?.preferredIndustries || "Not set",
            },
            {
              title: "Career Goals",
              value: careerInterests?.careerGoals || "Not set",
            },
          ]}
          editValues={{
            preferredJobRoles: careerInterests?.preferredJobRoles ?? [],
            preferredIndustries: careerInterests?.preferredIndustries ?? "",
            careerGoals: careerInterests?.careerGoals ?? "",
          }}
        />
      </div>
    </div>
  );
}
