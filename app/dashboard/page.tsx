import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Compass, CheckCircle2, History } from "lucide-react";
import Link from "next/link";
import { getCachedProfileData } from "@/lib/getProfileData";
import { getCachedInsightsData } from "@/lib/getInsightsData";
import { CareerMatchesGrid } from "@/components/dashboard/careerMatchesGrid";
import { timeAgo } from "@/lib/timeAgo";
import { VerifyEmailBanner } from "@/components/dashboard/verifyEmailBanner";

type CareerPath = {
  title: string;
  matchScore: number;
  rationale: string;
  tags: string[];
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  let profileData, insightsData;
  try {
    [profileData, insightsData] = await Promise.all([
      getCachedProfileData(userId),
      getCachedInsightsData(userId),
    ]);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <p className="text-lg font-medium">
            Something went wrong loading your dashboard.
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
    user,
    workExperiences,
    userSkills,
    userLanguages,
    certifications,
    careerInterests,
  } = profileData;
  const {
    latestRecommendation,
    recentRecommendations,
    savedCareerPaths,
    skillGoals,
  } = insightsData;

  const completionChecks = [
    !!(profile?.jobTitle && profile?.highestDegree),
    workExperiences.length > 0,
    userSkills.length > 0,
    userLanguages.length > 0,
    certifications.length > 0,
    !!(
      careerInterests?.preferredJobRoles &&
      careerInterests.preferredJobRoles.length > 0
    ),
  ];
  const completionPercent = Math.round(
    (completionChecks.filter(Boolean).length / completionChecks.length) * 100,
  );

  const careerPaths =
    (latestRecommendation?.careerPaths as CareerPath[] | undefined) ?? [];
  const topMatches = careerPaths.slice(0, 2).map((path) => ({
    heading: path.title,
    match: `${path.matchScore}% Match`,
    para: path.rationale,
    tags: path.tags,
  }));

  const activeGoals = skillGoals.filter((g) => !g.isCompleted).slice(0, 3);

  return (
    <div className="bg-secondary">
      {!user?.emailVerified && <VerifyEmailBanner />}
      <div className="min-h-screen max-w-300 w-full m-auto py-6 sm:py-10 px-4">
        {/* first row */}
        <div className="flex flex-col sm:flex-row justify-between lg:gap-0 gap-3 sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-wrap capitalize">
              Hello {user?.name?.split(" ")[0]}! Ready to discover your path?
            </h1>
            <p className="text-chart-3 text-sm sm:text-base mt-1 sm:mt-0">
              Here is your daily career snapshot and recommended next steps.
            </p>
          </div>
          {!user?.isOnboarded ? (
            <Button
              nativeButton={false}
              render={<Link href="/onboarding" />}
              className={cn("px-5 py-5 sm:py-6 sm:px-7 sm:text-lg")}
            >
              <Compass className="size-5 sm:size-6" />
              Complete Your Profile
            </Button>
          ) : (
            <Button
              nativeButton={false}
              render={<Link href="/dashboard/insights" />}
              className={cn("px-5 py-5 sm:py-6 sm:px-7 sm:text-lg")}
            >
              <Compass className="size-5 sm:size-6" />
              Take Assessment
            </Button>
          )}
        </div>

        {/* second row */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <div className="bg-white rounded-lg p-3 sm:p-5 flex flex-col justify-between sm:max-w-90">
            <div>
              <div className="w-full flex justify-between gap-3">
                <h5 className="sm:text-lg font-medium">Profile Completion</h5>
                <p className="text-primary font-semibold text-xl sm:text-2xl">
                  {completionPercent}%
                </p>
              </div>
              <div className="w-full h-1 bg-secondary rounded-full mb-2 sm:mb-0 mt-1">
                <div
                  className="h-1 bg-primary rounded-full"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
            <p className="text-chart-3 text-sm sm:text-base mb-2 sm:mb-0">
              Complete your profile to get more accurate career recommendations.
            </p>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/dashboard/profile" />}
              className={cn(
                "border-primary w-full bg-transparent py-5 text-primary font-medium hover:text-primary",
              )}
            >
              Complete Profile
            </Button>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-5 space-y-4 flex-1">
            <div className="w-full flex justify-between gap-3">
              <h5 className="sm:text-lg font-medium">
                AI-Driven Career Matches
              </h5>
              <Link
                href="/dashboard/insights"
                className="text-xs sm:text-sm text-primary font-medium"
              >
                View all
              </Link>
            </div>

            {topMatches.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-chart-3 text-sm">
                  Run your first AI analysis to see career matches here.
                </p>
                <Button
                  nativeButton={false}
                  render={<Link href="/dashboard/insights" />}
                  className="mt-3"
                  variant="outline"
                >
                  Get Career Suggestions
                </Button>
              </div>
            ) : (
              <CareerMatchesGrid
                matches={topMatches}
                savedTitles={savedCareerPaths.map((s) => s.title)}
              />
            )}
          </div>
        </div>

        {/* third row */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <div className="bg-white rounded-lg p-3 sm:p-5 flex-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary size-5" />
              <h5 className="sm:text-lg font-medium">Skills to Develop</h5>
            </div>
            {activeGoals.length === 0 ? (
              <p className="text-chart-3 text-sm mt-3">
                No active skill goals yet. Check a skill gap on your{" "}
                <Link
                  href="/dashboard/insights"
                  className="text-primary font-medium"
                >
                  Insights page
                </Link>{" "}
                to add one.
              </p>
            ) : (
              <div className="space-y-3 mt-3">
                {activeGoals.map((goal) => (
                  <div key={goal.id}>
                    <p className="font-medium text-foreground text-sm">
                      {goal.skillName}
                    </p>
                    {goal.courseTitle && (
                      <p className="text-chart-3 text-sm">{goal.courseTitle}</p>
                    )}
                  </div>
                ))}
                <Link
                  href="/dashboard/insights"
                  className="text-primary text-sm font-medium inline-block"
                >
                  + Add Skill Goal
                </Link>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-5 flex-1">
            <div className="flex items-center gap-2">
              <History className="text-primary size-5" />
              <h5 className="sm:text-lg font-medium">Recent Activity</h5>
            </div>
            {recentRecommendations.length === 0 ? (
              <p className="text-chart-3 text-sm mt-3">No activity yet.</p>
            ) : (
              <div className="space-y-3 mt-3">
                {recentRecommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="border-l-2 border-primary pl-3">
                    <p className="text-xs text-chart-3">
                      {timeAgo(rec.createdAt)}
                    </p>
                    <p className="text-sm text-foreground">
                      Ran career analysis —{" "}
                      {(rec.careerPaths as CareerPath[]).length} matches found
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
