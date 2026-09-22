// app/api/resume/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/components/resume/resumeDocument";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const [user, profile, workExperiences, userSkills, certifications] =
      await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: { name: true, email: true, location: true },
        }),
        prisma.profile.findUnique({ where: { userId } }),
        prisma.workExperience.findMany({
          where: { userId },
          orderBy: { startDate: "desc" },
        }),
        prisma.userSkill.findMany({
          where: { userId },
          include: { skill: true },
        }),
        prisma.certification.findMany({ where: { userId } }),
      ]);

    const buffer = await renderToBuffer(
      <ResumeDocument
        data={{
          name: user?.name ?? "Your Name",
          email: user?.email ?? "",
          location: user?.location ?? undefined,
          jobTitle: profile?.jobTitle ?? undefined,
          highestDegree: profile?.highestDegree ?? undefined,
          fieldOfStudy: profile?.fieldOfStudy ?? undefined,
          workExperiences,
          skills: userSkills.map((us) => us.skill.name),
          certifications,
        }}
      />,
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${user?.name ?? "resume"}-resume.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate resume" },
      { status: 500 },
    );
  }
}
