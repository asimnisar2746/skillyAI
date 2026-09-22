import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SkillType } from "@prisma/client";
import type {
  WorkExperienceEntry,
  SkillEntry,
  LanguageEntry,
  Certifications,
  CareerInterests,
} from "@/components/onboarding/onboardingForm";
import { revalidateTag } from "next/cache";

function mapSkillType(type: string): SkillType {
  if (type === "Programming Language") return "PROGRAMMING_LANGUAGE";
  if (type === "Framework") return "FRAMEWORK";
  return "SOFT_SKILL";
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const data = await req.json();
    const {
      jobTitle,
      highestDegree,
      fieldOfStudy,
      academicAchievements,
      workExperiences,
      skills,
      languages,
      certifications,
      careerInterests,
    }: {
      jobTitle: string;
      highestDegree: string;
      fieldOfStudy: string;
      academicAchievements: string;
      workExperiences: WorkExperienceEntry[];
      skills: SkillEntry[];
      languages: LanguageEntry[];
      certifications: Certifications[];
      careerInterests: CareerInterests;
    } = data;

    await prisma.$transaction(
      async (tx) => {
        await tx.profile.upsert({
          where: { userId },
          create: {
            userId,
            jobTitle,
            highestDegree,
            fieldOfStudy,
            academicAchievements,
          },
          update: {
            jobTitle,
            highestDegree,
            fieldOfStudy,
            academicAchievements,
          },
        });

        await tx.workExperience.deleteMany({ where: { userId } });
        if (workExperiences.length > 0) {
          await tx.workExperience.createMany({
            data: workExperiences.map((exp) => ({
              userId,
              jobTitle: exp.jobTitle,
              company: exp.company,
              rolesAndResponsibilities: exp.responsibilities,
              isInternship: exp.isInternship,
              startDate: new Date(exp.startDate),
              endDate:
                exp.isCurrentlyWorking || !exp.endDate
                  ? null
                  : new Date(exp.endDate),
            })),
          });
        }

        await tx.userSkill.deleteMany({ where: { userId } });
        if (skills.length > 0) {
          const resolvedSkills = await Promise.all(
            skills.map((s) =>
              tx.skill.upsert({
                where: { name: s.name },
                create: { name: s.name, type: mapSkillType(s.type) },
                update: {},
              }),
            ),
          );
          await tx.userSkill.createMany({
            data: resolvedSkills.map((skill, i) => ({
              userId,
              skillId: skill.id,
              proficiency: skills[i].proficiency,
            })),
          });
        }

        await tx.userLanguage.deleteMany({ where: { userId } });
        const validLanguages = languages.filter((l) => l.language);
        if (validLanguages.length > 0) {
          const resolvedLanguages = await Promise.all(
            validLanguages.map((l) =>
              tx.language.upsert({
                where: { name: l.language },
                create: { name: l.language },
                update: {},
              }),
            ),
          );
          await tx.userLanguage.createMany({
            data: resolvedLanguages.map((language, i) => ({
              userId,
              languageId: language.id,
              proficiency: validLanguages[i].proficiency,
            })),
          });
        }

        await tx.certification.deleteMany({ where: { userId } });
        const validCertifications = certifications.filter((c) => c.name);
        if (validCertifications.length > 0) {
          await tx.certification.createMany({
            data: validCertifications.map((c) => ({
              userId,
              name: c.name,
              platform: c.organization,
              completionDate: c.issueDate ? new Date(c.issueDate) : null,
              expirationDate: c.expirationDate
                ? new Date(c.expirationDate)
                : null,
              credentialUrl: c.url || null,
            })),
          });
        }

        await tx.careerInterests.upsert({
          where: { userId },
          create: {
            userId,
            preferredJobRoles: careerInterests.preferredJobRoles,
            preferredIndustries: careerInterests.preferredIndustry,
            careerGoals: careerInterests.careerGoals,
            linkedinUrl: careerInterests.linkedinUrl,
            githubUrl: careerInterests.githubUrl,
            portfolioUrl: careerInterests.portfolioUrl,
          },
          update: {
            preferredJobRoles: careerInterests.preferredJobRoles,
            preferredIndustries: careerInterests.preferredIndustry,
            careerGoals: careerInterests.careerGoals,
            linkedinUrl: careerInterests.linkedinUrl,
            githubUrl: careerInterests.githubUrl,
            portfolioUrl: careerInterests.portfolioUrl,
          },
        });

        // Mark the user as fully onboarded
        await tx.user.update({
          where: { id: userId },
          data: { isOnboarded: true },
        });
      },
      {
        timeout: 20000,
      },
    );

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
