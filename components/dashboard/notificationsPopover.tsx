"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Notification } from "@/lib/getNotifications";

export function NotificationsPopover({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <button className="relative" aria-label="Notifications">
            <Bell className="text-primary" />
            {notifications.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-destructive text-white text-[10px] font-medium flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        }
      />
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 border-b font-medium text-sm text-foreground">
          Notifications
        </div>
        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">
            You&apos;re all caught up.
          </p>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className="block p-3 text-sm text-foreground border-b last:border-b-0 hover:bg-muted"
              >
                {n.message}
              </Link>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
