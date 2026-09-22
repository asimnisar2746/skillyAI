import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SecurityForm } from "@/components/dashboard/settings/securityForm";
import { DeleteAccountSection } from "@/components/dashboard/settings/deleteAccountSection";

export const metadata: Metadata = {
  title: "Settings — Skilly",
};

export default function SettingsPage() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="flex items-center gap-3 mb-4">
          <ArrowLeft className="text-foreground size-5" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </Link>

        <div className="w-full mx-auto space-y-8">
          <SecurityForm />
          <DeleteAccountSection />
        </div>
      </div>
    </div>
  );
}
