import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

async function fetchProfileData(userId: string) {
  const [
    profile,
    workExperiences,
    userSkills,
    userLanguages,
    careerInterests,
    certifications,
    user,
  ] = await Promise.all([
    prisma.profile.findUnique({ where: { userId } }),
    prisma.workExperience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    }),
    prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    }),
    prisma.userLanguage.findMany({
      where: { userId },
      include: { language: true },
    }),
    prisma.careerInterests.findUnique({ where: { userId } }),
    prisma.certification.findMany({ where: { userId } }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        image: true,
        isOnboarded: true,
        location: true,
        emailVerified: true,
      },
    }),
  ]);

  return {
    profile,
    workExperiences,
    userSkills,
    userLanguages,
    careerInterests,
    certifications,
    user,
  };
}

export function getCachedProfileData(userId: string) {
  return unstable_cache(
    () => fetchProfileData(userId),
    [`profile-data-${userId}`],
    { tags: [`profile-${userId}`], revalidate: 300 },
  )();
}
