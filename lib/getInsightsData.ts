import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

async function fetchInsightsData(userId: string) {
  const [
    latestRecommendation,
    recentRecommendations,
    savedCareerPaths,
    skillGoals,
  ] = await Promise.all([
    prisma.recommendation.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.recommendation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.savedCareerPath.findMany({
      where: { userId },
      select: { title: true },
    }),
    prisma.skillGoal.findMany({ where: { userId } }),
  ]);

  return {
    latestRecommendation,
    recentRecommendations,
    savedCareerPaths,
    skillGoals,
  };
}

export function getCachedInsightsData(userId: string) {
  return unstable_cache(
    () => fetchInsightsData(userId),
    [`insights-data-${userId}`],
    { tags: [`profile-${userId}`], revalidate: 300 },
  )();
}
