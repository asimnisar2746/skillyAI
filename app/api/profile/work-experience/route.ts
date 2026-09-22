import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { workExperiences } = await req.json();

    await prisma.$transaction(
      async (tx) => {
        await tx.workExperience.deleteMany({ where: { userId } });

        const validExperiences = workExperiences.filter(
          (exp: { jobTitle: string }) => exp.jobTitle,
        );

        if (validExperiences.length > 0) {
          await tx.workExperience.createMany({
            data: validExperiences.map(
              (exp: {
                jobTitle: string;
                company: string;
                responsibilities: string;
                isInternship: boolean;
                startDate: string;
                endDate: string;
                isCurrentlyWorking: boolean;
              }) => ({
                userId,
                jobTitle: exp.jobTitle,
                company: exp.company,
                rolesAndResponsibilities: exp.responsibilities,
                isInternship: exp.isInternship,
                startDate: new Date(exp.startDate),
                endDate:
                  exp.isCurrentlyWorking || !exp.endDate
                    ? null
                    : new Date(exp.endDate),
              }),
            ),
          });
        }
      },
      {
        timeout: 20000,
      },
    );

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
