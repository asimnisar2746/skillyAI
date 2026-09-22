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
    const { languages } = await req.json();

    await prisma.$transaction(
      async (tx) => {
        await tx.userLanguage.deleteMany({ where: { userId } });

        const validLanguages = languages.filter(
          (l: { language: string }) => l.language,
        );

        if (validLanguages.length > 0) {
          const resolvedLanguages = await Promise.all(
            validLanguages.map((l: { language: string }) =>
              tx.language.upsert({
                where: { name: l.language },
                create: { name: l.language },
                update: {},
              }),
            ),
          );

          await tx.userLanguage.createMany({
            data: resolvedLanguages.map((language, i) => ({
              userId,
              languageId: language.id,
              proficiency: validLanguages[i].proficiency,
            })),
          });
        }
      },
      { timeout: 20000 },
    );

    revalidateTag(`profile-${userId}`, { expire: 0 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
