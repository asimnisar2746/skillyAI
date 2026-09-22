import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session?.user?.id;

  try {
    const { jobTitle, highestDegree, fieldOfStudy } = await req.json();

    await prisma.profile.upsert({
      where: { userId },
      create: { userId, jobTitle, highestDegree, fieldOfStudy },
      update: { jobTitle, highestDegree, fieldOfStudy },
    });

    revalidateTag(`profile-${userId}`, { expire: 0 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Update failed, try again" },
      { status: 500 },
    );
  }
}
