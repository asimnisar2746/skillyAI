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
    const { certifications } = await req.json();

    await prisma.$transaction(
      async (tx) => {
        await tx.certification.deleteMany({ where: { userId } });

        const validCertifications = certifications.filter(
          (c: { name: string }) => c.name,
        );

        if (validCertifications.length > 0) {
          await tx.certification.createMany({
            data: validCertifications.map(
              (c: {
                name: string;
                organization: string;
                issueDate: string;
                expirationDate: string;
                url: string;
              }) => ({
                userId,
                name: c.name,
                platform: c.organization,
                completionDate: c.issueDate ? new Date(c.issueDate) : null,
                expirationDate: c.expirationDate
                  ? new Date(c.expirationDate)
                  : null,
                credentialUrl: c.url || null,
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
