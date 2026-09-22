import { FeatureCard } from "@/components/marketing/featureCard";
import Image from "next/image";
import { FileEdit, Brain, TrendingUp, Award } from "lucide-react";
import { HeroActions } from "@/components/marketing/heroActions";

function Page() {
  return (
    <div className="">
      {/* hero section */}
      <div className="max-w-300 mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 py-6 sm:py-12">
        <div className="flex-1 space-y-4 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Navigate Your Future with{" "}
            <span className="text-primary">AI-Powered</span> Clarity
          </h1>
          <p className="text-chart-3 text-sm sm:text-base">
            Skilly translates your unique skills and aspirations into
            structured, actionable career paths. Designed for ambitious students
            and job seekers seeking intelligent guidance.
          </p>
          <HeroActions />
        </div>

        <div className="relative w-full flex-1 aspect-6/4 overflow-hidden rounded-2xl">
          <Image
            src="/marketing/hero-image.webp"
            alt="Illustration of students using Skilly's AI-powered career guidance"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-6 sm:py-12 bg-[#EFF4FF]">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h3 className="text-foreground font-semibold text-xl sm:text-3xl">
            How Skilly Works
          </h3>
          <p className="text-chart-3 px-4 sm:px-0 text-sm sm:text-base text-center">
            Three simple steps to unlock your personalized career roadmap.
          </p>
        </div>
        <div className="max-w-300 mx-auto px-4 flex flex-col sm:flex-row md:flex-wrap lg:flex-nowrap mt-6 sm:mt-8 gap-4 sm:gap-8">
          <FeatureCard
            icon={FileEdit}
            heading="Fill Profile"
            description="Detail your education, current skills, and professional interests to give Skilly a complete picture of your starting point."
          />
          <FeatureCard
            icon={FileEdit}
            heading="Get AI Analysis"
            description="Our advanced algorithms analyze your data against current market trends and industry demands to find your optimal fit."
          />
          <FeatureCard
            icon={FileEdit}
            heading="View Career Suggestions"
            description="Receive a curated list of potential career paths, complete with required skill gaps and actionable steps to reach your goals."
          />
        </div>
      </div>
      <div className="py-6 sm:py-12">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h3 className="text-foreground font-semibold text-xl sm:text-3xl">
            Why Skilly
          </h3>
          <p className="text-chart-3 px-4 sm:px-0 text-sm sm:text-base text-center">
            Built to turn your profile into a clear, actionable career
            direction.
          </p>
        </div>
        <div className="max-w-300 mx-auto px-4 grid sm:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
          <FeatureCard
            icon={Brain}
            heading="Personalized, Not Generic"
            description="Recommendations are generated from your actual profile — your education, experience, and skills — not one-size-fits-all advice."
          />
          <FeatureCard
            icon={TrendingUp}
            heading="Know What's In Demand"
            description="See which skills are trending in your target field, so you always know what to focus on next."
          />
          <FeatureCard
            icon={Award}
            heading="Track Real Progress"
            description="Build a learning plan from your skill gaps and check off each one as you close it."
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
