"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";

type PersonalDetailsValues = {
  name: string;
  role: string;
  location: string;
  website: string;
};

export function EditPersonalDetailsDialog({
  defaultValues,
}: {
  defaultValues: PersonalDetailsValues;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<PersonalDetailsValues>({ defaultValues });

  async function onSubmit(values: PersonalDetailsValues) {
    setError("");

    try {
      const res = await fetch("/api/profile/personal-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Update failed. Please try again.");
        return;
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button aria-label="Edit personal details" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Personal Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />

            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Role / Job Title</FieldLabel>
                  <Input
                    {...field}
                    placeholder="e.g. Junior Software Developer"
                  />
                </Field>
              )}
            />

            <Controller
              name="location"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input {...field} placeholder="e.g. Islamabad, Pakistan" />
                </Field>
              )}
            />

            <Controller
              name="website"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Website</FieldLabel>
                  <Input {...field} placeholder="https://" />
                </Field>
              )}
            />
          </FieldGroup>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
