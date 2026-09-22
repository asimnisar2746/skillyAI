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
import Link from "next/link";

type ForgotPasswordValues = { email: string };

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ForgotPasswordValues>({ defaultValues: { email: "" } });

  async function onSubmit(values: ForgotPasswordValues) {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <p className="text-center text-sm text-muted-foreground py-6">
          If an account exists for that email, we've sent a password reset link.
        </p>
        <Button render={<Link href={"process.env.NEXTAUTH_URL"} />}>
          Go back to home page
        </Button>
      </>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="py-6">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forgot-email">Email Address</FieldLabel>
              <Input
                {...field}
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
              />
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
            Sending...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </form>
  );
}
