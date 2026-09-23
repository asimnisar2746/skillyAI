"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotificationsPopover } from "./notificationsPopover";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import type { Notification } from "@/lib/getNotifications";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/insights", label: "Insights" },
  { href: "/dashboard/profile", label: "Profile" },
];

export function DashboardNavbar({
  notifications,
}: {
  notifications: Notification[];
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-300 h-12 sm:h-16 justify-between items-center px-4">
        <Link href="/" className="font-bold text-primary text-lg sm:text-2xl">
          Skilly
        </Link>

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

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <NotificationsPopover notifications={notifications} />
          <Link href="/dashboard/settings">
            <Settings className="text-primary" />
          </Link>

          <Popover>
            <PopoverTrigger
              render={
                <button className="h-7 w-7 rounded-full border overflow-hidden relative">
                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  )}
                </button>
              }
            />
            <PopoverContent align="end" className="w-65 p-2">
              <p className="font-medium pl-3 mt-2">{session?.user?.name}</p>
              <p className="text-sm text-muted-foreground pl-3 break-all">
                {session?.user?.email}
              </p>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button className="sm:hidden p-2" aria-label="Open menu">
                <Menu className="size-6 text-primary" />
              </button>
            }
          />
          <SheetContent side="right" className="w-72 flex flex-col">
            <SheetHeader>
              <SheetTitle className="text-primary text-xl font-bold text-left">
                Skilly
              </SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between gap-3 px-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full border overflow-hidden relative shrink-0">
                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{session?.user?.name}</p>
                  <p className="text-muted-foreground text-sm truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <NotificationsPopover notifications={notifications} />
            </div>

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

            <div className="flex flex-col gap-1 px-4 pb-4 mt-auto border-t pt-4">
              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-3 px-2 rounded-md font-medium text-foreground hover:bg-muted"
              >
                <Settings className="size-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-2 py-3 px-2 rounded-md font-medium text-destructive hover:bg-muted text-left"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
