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
    const { title } = await req.json();

    const existing = await prisma.savedCareerPath.findFirst({
      where: { userId, title },
    });

    if (existing) {
      await prisma.savedCareerPath.delete({ where: { id: existing.id } });
    } else {
      await prisma.savedCareerPath.create({ data: { userId, title } });
    }

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ saved: !existing }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
