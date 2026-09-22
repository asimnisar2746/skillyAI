"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

type LoginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function LoginForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      remember: values.rememberMe ? "true" : "false",
      redirect: false,
    });

    if (result?.error) {
      setServerError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {serverError && (
        <p className="text-destructive text-sm text-center mb-2 sm:mb-4">
          {serverError}
        </p>
      )}
      <FieldGroup className="py-4 sm:py-6">
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
              <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                aria-invalid={fieldState.invalid}
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Remember me + Forgot password */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-center gap-1 sm:gap-2">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="text-foreground/80 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
            )}
          />
        </div>
        <Link href="/forgot-password" className="text-primary">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full mt-3 sm:mt-5 py-5"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
      {/* Register link */}
      <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-5">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </form>
  );
}
