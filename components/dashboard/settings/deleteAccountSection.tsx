"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export function DeleteAccountSection() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setIsDeleting(true);
    setError("");

    const res = await fetch("/api/account/delete", { method: "POST" });

    if (!res.ok) {
      setIsDeleting(false);
      setError("Failed to delete your account. Please try again.");
      return;
    }

    await signOut({ callbackUrl: "/" });
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-foreground">
        Account Management
      </h2>
      <p className="text-chart-3 text-sm mt-1">
        Manage your account lifecycle.
      </p>

      <div className="mt-6 border border-destructive/50 rounded-lg p-4 flex sm:flex-row flex-col sm:items-center justify-between gap-4">
        <div>
          <p className="text-destructive font-semibold">Delete Account</p>
          <p className="text-chart-3 text-sm mt-1">
            Permanently delete your Skilly account and all associated data. This
            action cannot be undone.
          </p>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10 shrink-0"
              >
                Delete Account
              </Button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account, profile, work
                experience, skills, and every AI recommendation you&apos;ve
                generated. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, delete my account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
