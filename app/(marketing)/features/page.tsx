import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Radar,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Skilly",
  description:
    "See how Skilly's AI-powered career matching, skill gap analysis, and personalized learning plans guide you from your current skills to your dream role.",
};

const matchTags = ["Profile Analysis", "Skill Matching", "Career Fit"];

const sampleMatches = [
  { skill: "User Research", percent: 85, gap: false },
  { skill: "Prototyping (Figma)", percent: 95, gap: false },
  { skill: "Design Systems", percent: 40, gap: true },
];

const learningFeatures = [
  {
    icon: GraduationCap,
    title: "Curated Course Links",
    description:
      "Every skill gap comes with a suggested course to help close it, so you always know exactly what to learn next.",
    cta: "See how it works",
    href: "#skill-gap-analysis",
  },
  {
    icon: CheckCircle2,
    title: "Track Your Progress",
    description:
      "Build a personal learning plan from your skill gaps, and check off skills as you master them.",
    cta: "View your plan",
    href: "/login",
  },
  {
    icon: TrendingUp,
    title: "Trending Skills",
    description:
      "See which skills are in demand for your target field, so your learning stays aligned with what employers actually want.",
    cta: "Explore trends",
    href: "/login",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-secondary">
      <section className="max-w-4xl mx-auto text-center px-4 pt-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight">
          Supercharge Your Career Journey
        </h1>
        <p className="text-chart-3 sm:text-lg mt-1 sm:mt-2">
          Discover how Skilly&apos;s intelligent features guide you from your
          current skills to your dream role with precision and personalized
          insights.
        </p>
      </section>

      {/* AI-Powered Career Matching */}
      <section className="max-w-300 mx-auto px-4 py-10">
        <div className="flex lg:flex-row flex-col items-center lg:gap-8">
          <div className="flex-1 space-y-3">
            <div className="size-12 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="text-primary size-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              AI-Powered Career Matching
            </h2>
            <p className="text-chart-3">
              We analyze your profile, work experience, and career interests
              using AI to suggest career paths ranked by how well they fit you.
              Stop guessing and start aligning your strengths with real
              opportunities.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {matchTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 text-primary text-sm font-semibold px-4 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold text-foreground border-b pb-3 mb-4">
              Target Role: Senior Product Designer
            </h3>
            <div className="space-y-3">
              {sampleMatches.map((match) => (
                <div key={match.skill}>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-foreground font-medium">{match.skill}</p>
                    <p
                      className={cn(
                        "font-semibold",
                        match.gap ? "text-destructive" : "text-primary",
                      )}
                    >
                      {match.percent}% Match{match.gap && " — Gap Identified"}
                    </p>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        match.gap ? "bg-destructive" : "bg-primary",
                      )}
                      style={{ width: `${match.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skill-gap-analysis" className="max-w-300 mx-auto px-4 py-8">
        <div className="flex lg:flex-row-reverse flex-col items-center gap-12">
          <div className="flex-1">
            <div className="size-12 rounded-lg bg-accent flex items-center justify-center mb-2">
              <Radar className="text-primary size-6" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">
              Skill Gap Analysis
            </h2>
            <p className="text-chart-3">
              See exactly what&apos;s standing between you and your target role.
              Skilly compares your current skills against your top career match
              and highlights precisely where to focus next.
            </p>
          </div>

          <div className="flex-1 w-full bg-white rounded-lg shadow-md p-5">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Skills to Close the Gap
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="size-2 rounded-full bg-destructive shrink-0" />
                <p className="text-foreground text-sm">
                  Design Systems — build a component library from scratch
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="size-2 rounded-full bg-destructive shrink-0" />
                <p className="text-foreground text-sm">
                  Advanced Prototyping — high-fidelity interactive flows
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Learning */}
      <section className="max-w-300 mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground">
            Personalized Learning Plans
          </h2>
          <p className="text-chart-3 mt-2">
            Based on your identified skill gaps, Skilly curates the exact next
            steps to level up efficiently.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {learningFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="size-10 rounded-full bg-accent flex items-center justify-center mb-4">
                <feature.icon className="text-primary size-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-chart-3 text-sm mt-2">{feature.description}</p>
              <Link
                href={feature.href}
                className="text-primary text-sm font-medium flex items-center gap-1 mt-4"
              >
                {feature.cta} <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto text-center px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Ready to see your career path?
        </h2>
        <p className="text-chart-3 mt-1 sm:mt-3">
          Build your profile in minutes and get your first AI-powered career
          analysis today.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/register" />}
          className={cn("mt-4 py-6 px-8 text-lg")}
        >
          Get Started
        </Button>
      </section>
    </div>
  );
}
