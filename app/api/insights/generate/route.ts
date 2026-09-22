import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateWithRetry(prompt: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              careerPaths: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    matchScore: { type: Type.INTEGER },
                    rationale: { type: Type.STRING },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["title", "matchScore", "rationale", "tags"],
                },
              },
              skillGaps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skillName: { type: Type.STRING },
                    note: { type: Type.STRING },
                    suggestedCourse: { type: Type.STRING },
                  },
                  required: ["skillName", "note", "suggestedCourse"],
                },
              },
              inDemandSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["careerPaths", "skillGaps", "inDemandSkills"],
          },
        },
      });
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      const isRetryable =
        error instanceof Error && error.message.includes("503");

      if (isLastAttempt || !isRetryable) {
        throw error;
      }

      const delayMs = attempt * 2000;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("Failed after retries");
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const [profile, workExperiences, userSkills, careerInterests] =
      await Promise.all([
        prisma.profile.findUnique({ where: { userId } }),
        prisma.workExperience.findMany({ where: { userId } }),
        prisma.userSkill.findMany({
          where: { userId },
          include: { skill: true },
        }),
        prisma.careerInterests.findUnique({ where: { userId } }),
      ]);

    const prompt = `
You are a career guidance advisor. Based on the following user profile,
suggest suitable career paths, identify skill gaps, and list in-demand
skills for their field.

ACADEMIC BACKGROUND:
Job Title: ${profile?.jobTitle ?? "Not specified"}
Highest Degree: ${profile?.highestDegree ?? "Not specified"}
Field of Study: ${profile?.fieldOfStudy ?? "Not specified"}

WORK EXPERIENCE:
${workExperiences.map((exp) => `- ${exp.jobTitle} at ${exp.company}: ${exp.rolesAndResponsibilities}`).join("\n") || "None listed"}

CURRENT SKILLS:
${userSkills.map((us) => `- ${us.skill.name} (${us.skill.type}, proficiency ${us.proficiency}/5)`).join("\n") || "None listed"}

CAREER INTERESTS:
Preferred Roles: ${careerInterests?.preferredJobRoles?.join(", ") || "Not specified"}
Preferred Industries: ${careerInterests?.preferredIndustries || "Not specified"}
Career Goals: ${careerInterests?.careerGoals || "Not specified"}

Suggest 4-6 career paths ranked by fit, with a match percentage, a short
explanation, and 2-3 relevant tags for each. List 5-8 skills currently in
demand for their preferred industry. Identify 3-5 skill gaps between their
current skills and their top career match, each with a suggested course
or resource title to help close it.
`;

    const response = await generateWithRetry(prompt);

    const text = response.text;
    if (!text) {
      throw new Error("Gemini returned an empty response");
    }
    const result = JSON.parse(text);

    const recommendation = await prisma.recommendation.create({
      data: {
        userId,
        careerPaths: result.careerPaths,
        skillGaps: result.skillGaps,
        inDemandSkills: result.inDemandSkills,
      },
    });

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ recommendation }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error && error.message.includes("503")
        ? "The AI service is experiencing high demand right now. Please try again in a moment."
        : "Failed to generate suggestions";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
