"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

export function VerifyEmailBanner() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function resend() {
    setStatus("sending");
    const res = await fetch("/api/auth/resend-verification", {
      method: "POST",
    });
    setStatus(res.ok ? "sent" : "idle");
  }

  return (
    <div className="bg-accent border border-primary/30 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2 text-sm text-accent-foreground">
        <AlertTriangle className="size-4 shrink-0" />
        {status === "sent"
          ? "Verification email sent. Check your inbox."
          : "Please verify your email address to unlock all features."}
      </div>
      {status !== "sent" && (
        <Button
          size="sm"
          variant="outline"
          onClick={resend}
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-3 animate-spin" />
              Sending...
            </>
          ) : (
            "Resend Email"
          )}
        </Button>
      )}
    </div>
  );
}
