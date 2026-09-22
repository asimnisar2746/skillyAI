"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type ResetValues = { password: string; confirmPassword: string };

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<ResetValues>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetValues) {
    setError("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: values.password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/login");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="py-6">
      {error && <p className="text-destructive text-sm mb-4">{error}</p>}
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Must be at least 8 characters" },
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>New Password</FieldLabel>
              <Input {...field} type="password" autoComplete="new-password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === form.getValues("password") || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Confirm New Password</FieldLabel>
              <Input {...field} type="password" autoComplete="new-password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        className="w-full mt-5 py-5"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
