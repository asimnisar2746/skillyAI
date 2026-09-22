import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Radar, GraduationCap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Skilly",
  description:
    "Skilly is an AI-powered career guidance platform built as a BS Computer Science thesis project at the University of Malakand.",
};

const pillars = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description:
      "Career suggestions generated from your real profile — education, work experience, skills, and career interests — not generic advice.",
  },
  {
    icon: Radar,
    title: "Skill Gap Analysis",
    description:
      "See exactly what separates you from your target role, with a clear, actionable path to close each gap.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description:
      "Every identified gap comes with a suggested course, so your next step is never a guess.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-secondary">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-4 py-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight">
          About Skilly
        </h1>
        <p className="text-chart-3 sm:text-lg sm:mt-3">
          An AI-powered career guidance platform, built to help students and job
          seekers turn their skills and experience into a clear career
          direction.
        </p>
      </section>

      {/* The problem */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-lg sm:text-2xl font-bold text-foreground">
          The Problem
        </h2>
        <p className="text-chart-3 mt-3">
          Many students finish their degrees without a clear sense of which
          career path actually fits their skills and interests. Career advice is
          often generic, and figuring out which skills to learn next is usually
          left to guesswork. Skilly was built to close that gap — turning a
          user&apos;s own profile into a concrete, personalized starting point.
        </p>
      </section>

      {/* Approach */}
      <section className="max-w-300 mx-auto px-4 py-8">
        <h2 className="text-lg sm:text-2xl font-bold text-foreground text-center mb-3 sm:mb-6">
          How Skilly Approaches It
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="size-10 rounded-full bg-accent flex items-center justify-center mb-4">
                <pillar.icon className="text-primary size-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-chart-3 text-sm mt-2">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic context */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-lg sm:text-2xl font-bold text-foreground">
          The Project
        </h2>
        <p className="text-chart-3 mt-3">
          Skilly is a BS Computer Science final year thesis project at the
          University of Malakand, built to demonstrate a full-stack,
          AI-integrated web application from initial design through to a working
          product — including its database design, authentication, and AI-driven
          recommendation engine.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto text-center px-4 py-8">
        <h2 className="text-lg sm:text-3xl font-bold text-foreground">
          See how it works for you
        </h2>
        <p className="text-chart-3 sm:mt-2">
          Build your profile and get your first AI-powered career analysis.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/register" />}
          className={cn("mt-4 py-6 px-8 text-lg")}
        >
          Get Started
          <ArrowRight className="size-4" />
        </Button>
      </section>
    </div>
  );
}
