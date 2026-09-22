"use client";

import { useState } from "react";
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

type PasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function SecurityForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const form = useForm<PasswordValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: PasswordValues) {
    setError("");
    setSuccess(false);

    const res = await fetch("/api/account/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    setSuccess(true);
    form.reset();
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-foreground">Security</h2>
      <p className="text-chart-3 text-sm mt-1">
        Update your password and secure your account.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
        {error && <p className="text-destructive text-sm mb-4">{error}</p>}
        {success && (
          <p className="text-primary text-sm mb-4">
            Password updated successfully.
          </p>
        )}

        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            rules={{ required: "Current password is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Current Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Controller
              name="newPassword"
              control={form.control}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>New Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              rules={{
                required: "Please confirm your new password",
                validate: (value) =>
                  value === form.getValues("newPassword") ||
                  "Passwords do not match",
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirm New Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>

        <div className="flex justify-end mt-6 pt-4 border-t">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
