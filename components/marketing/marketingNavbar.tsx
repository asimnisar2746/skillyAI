"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNavbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-300 h-16 justify-between items-center px-4">
        <Link href="/" className="font-bold text-primary text-2xl">
          Skilly
        </Link>

        {/* Desktop nav — unchanged */}
        <nav className="hidden sm:flex items-center gap-8 font-medium list-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-foreground hover:text-primary",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-full origin-center bg-primary transition-transform duration-300",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop auth buttons — unchanged, hidden below sm */}
        <div className="hidden sm:flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-primary" />
          ) : session ? (
            <Button
              nativeButton={false}
              render={<Link href="/dashboard" className="px-5 py-4" />}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                nativeButton={false}
                variant="ghost"
                render={<Link href="/login" />}
              >
                Login
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/register" className="px-5 py-4" />}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger — only below sm */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button className="sm:hidden p-2" aria-label="Open menu">
                <Menu className="size-6 text-foreground" />
              </button>
            }
          />
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-primary text-xl font-bold text-left">
                Skilly
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4 mt-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-3 px-2 rounded-md font-medium transition-colors",
                      isActive
                        ? "text-primary bg-accent"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 px-4 mt-6">
              {status === "loading" ? (
                <div className="h-9 w-full animate-pulse rounded-md bg-primary" />
              ) : session ? (
                <Button
                  nativeButton={false}
                  render={
                    <Link href="/dashboard" onClick={() => setOpen(false)} />
                  }
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link href="/login" onClick={() => setOpen(false)} />
                    }
                  >
                    Login
                  </Button>
                  <Button
                    nativeButton={false}
                    render={
                      <Link href="/register" onClick={() => setOpen(false)} />
                    }
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
