import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/onboarding") && isLoggedIn) {
    const userId = req.auth?.user?.id;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { isOnboarded: true },
      });

      if (user?.isOnboarded) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
      }
    }
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};
