import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type Notification = {
  id: string;
  message: string;
  href: string;
};

async function fetchNotifications(userId: string): Promise<Notification[]> {
  const [user, certifications, latestRecommendation] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { isOnboarded: true },
    }),
    prisma.certification.findMany({ where: { userId } }),
    prisma.recommendation.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const notifications: Notification[] = [];
  const now = Date.now();

  if (!user?.isOnboarded) {
    notifications.push({
      id: "onboarding",
      message:
        "Complete your profile to get personalized career recommendations.",
      href: "/onboarding",
    });
  }

  for (const cert of certifications) {
    if (!cert.expirationDate) continue;
    const daysLeft = Math.ceil(
      (new Date(cert.expirationDate).getTime() - now) / 86400000,
    );
    if (daysLeft > 0 && daysLeft <= 30) {
      notifications.push({
        id: `cert-${cert.id}`,
        message: `Your "${cert.name}" certification expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}.`,
        href: "/dashboard/profile",
      });
    }
  }

  if (latestRecommendation) {
    const daysSince = Math.floor(
      (now - new Date(latestRecommendation.createdAt).getTime()) / 86400000,
    );
    if (daysSince <= 3) {
      notifications.push({
        id: `rec-${latestRecommendation.id}`,
        message: "Your latest career analysis is ready to view.",
        href: "/dashboard/insights",
      });
    }
  }

  return notifications;
}

export function getCachedNotifications(userId: string) {
  return unstable_cache(
    () => fetchNotifications(userId),
    [`notifications-${userId}`],
    { tags: [`profile-${userId}`], revalidate: 300 },
  )();
}
