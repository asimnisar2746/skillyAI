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
    const { skillName, courseTitle } = await req.json();

    const existing = await prisma.skillGoal.findUnique({
      where: { userId_skillName: { userId, skillName } },
    });

    if (existing) {
      await prisma.skillGoal.delete({ where: { id: existing.id } });
    } else {
      await prisma.skillGoal.create({
        data: { userId, skillName, courseTitle },
      });
    }

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ added: !existing }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
