import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { SkillType } from "@prisma/client";

function mapSkillType(type: string): SkillType {
  if (type === "Programming Language") return "PROGRAMMING_LANGUAGE";
  if (type === "Framework") return "FRAMEWORK";
  return "SOFT_SKILL";
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const { skills } = await req.json();

    await prisma.$transaction(
      async (tx) => {
        await tx.userSkill.deleteMany({ where: { userId } });

        if (skills.length > 0) {
          const resolvedSkills = await Promise.all(
            skills.map((s: { name: string; type: string }) =>
              tx.skill.upsert({
                where: { name: s.name },
                create: { name: s.name, type: mapSkillType(s.type) },
                update: {},
              }),
            ),
          );

          await tx.userSkill.createMany({
            data: resolvedSkills.map((skill, i) => ({
              userId,
              skillId: skill.id,
              proficiency: skills[i].proficiency,
            })),
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
