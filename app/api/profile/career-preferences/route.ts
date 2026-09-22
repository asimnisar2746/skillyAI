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
    const { preferredJobRoles, preferredIndustries, careerGoals } =
      await req.json();

    await prisma.careerInterests.upsert({
      where: { userId },
      create: { userId, preferredJobRoles, preferredIndustries, careerGoals },
      update: { preferredJobRoles, preferredIndustries, careerGoals },
    });

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
