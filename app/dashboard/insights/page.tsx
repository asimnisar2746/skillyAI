import { auth } from "@/auth";
import { getCachedInsightsData } from "@/lib/getInsightsData";
import { CareerMatchesGrid } from "@/components/dashboard/careerMatchesGrid";
import { GetSuggestionsButton } from "@/components/dashboard/getSuggestionsButton";
import { SlidersHorizontal, TrendingUp, History } from "lucide-react";
import { SkillGapsList } from "@/components/dashboard/skillGapsList";
import { LearningPlanList } from "@/components/dashboard/learningPlanList";
import { timeAgo } from "@/lib/timeAgo";

type CareerPath = {
  title: string;
  matchScore: number;
  rationale: string;
  tags: string[];
};
type SkillGap = { skillName: string; note: string; suggestedCourse: string };

export default async function InsightsPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const {
    latestRecommendation,
    recentRecommendations,
    savedCareerPaths,
    skillGoals,
  } = await getCachedInsightsData(userId);

  const careerPaths =
    (latestRecommendation?.careerPaths as CareerPath[] | undefined) ?? [];
  const skillGaps =
    (latestRecommendation?.skillGaps as SkillGap[] | undefined) ?? [];
  const inDemandSkills =
    (latestRecommendation?.inDemandSkills as string[] | undefined) ?? [];

  const careerMatches = careerPaths.map((path) => ({
    heading: path.title,
    match: `${path.matchScore}% Match`,
    para: path.rationale,
    tags: path.tags,
  }));

  if (!latestRecommendation) {
    return (
      <div className="bg-secondary min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Discover your ideal career path
          </h1>
          <p className="text-chart-3 mb-6">
            Run your first AI analysis to see personalized career matches, skill
            gaps, and growth opportunities.
          </p>
          <GetSuggestionsButton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary">
      <div className="max-w-300 mx-auto min-h-screen my-6 sm:my-8 px-4">
        <section className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Your Career Insights
            </h1>
            <p className="text-chart-3">
              AI-powered analysis of your career path, skill gaps, and growth
              opportunities.
            </p>
          </div>
          <div className="space-y-2 flex flex-col md:items-end">
            <GetSuggestionsButton />
            <p className="text-chart-3 text-xs sm:text-sm">
              Last updated: {timeAgo(latestRecommendation.createdAt)}
            </p>
          </div>
        </section>

        <div className="flex lg:flex-row flex-col justify-between gap-6 items-start my-6 sm:my-10">
          <div className="flex-1 min-w-0 lg:min-w-[60%] w-full space-y-8">
            <section>
              <h3 className="text-lg sm:text-2xl font-semibold text-foreground">
                Top Career Matches
              </h3>
              <CareerMatchesGrid
                savedTitles={savedCareerPaths?.map((s) => s.title)}
                matches={careerMatches}
              />

              <div className="w-full shadow-md rounded-lg p-3 sm:p-6 bg-white">
                <div className="flex justify-between items-center gap-2">
                  <h3 className="text-lg sm:text-2xl text-foreground font-semibold">
                    Skills to Close the Gap
                  </h3>
                  <SlidersHorizontal className="text-chart-3 size-5 sm:size-6" />
                </div>
                <SkillGapsList
                  gaps={skillGaps}
                  addedSkillNames={skillGoals.map((g) => g.skillName)}
                />
              </div>
            </section>
          </div>

          <div className="w-full lg:max-w-[30%] space-y-6">
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
              <div className="flex gap-3 items-center">
                <TrendingUp className="text-primary size-5 sm:size-6" />
                <h3 className="sm:text-xl font-semibold text-foreground">
                  Trending in Your Field
                </h3>
              </div>
              <div className="flex gap-2 sm:gap-3 flex-wrap text-sm font-medium sm:font-semibold text-primary mt-4 sm:mt-6">
                {inDemandSkills.map((tag, index) => (
                  <p
                    key={index}
                    className="rounded-full bg-primary/10 px-4 py-1 text-nowrap"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
              <h3 className="sm:text-xl font-semibold text-foreground">
                Your Learning Plan
              </h3>
              <p className="text-chart-3 text-sm mt-1">
                Check off skills as you complete them.
              </p>
              <LearningPlanList goals={skillGoals} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
              <div className="flex gap-3 items-center">
                <History className="text-primary" />
                <h3 className="sm:text-xl font-semibold text-foreground">
                  Recommendation History
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                {recentRecommendations.map((rec) => (
                  <div key={rec.id} className="border-l-2 border-primary pl-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
