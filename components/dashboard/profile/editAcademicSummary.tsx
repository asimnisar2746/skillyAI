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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";

type AcademicSummaryValues = {
  jobTitle: string;
  highestDegree: string;
  fieldOfStudy: string;
};

export function EditAcademicSummaryDialog({
  defaultValues,
}: {
  defaultValues: AcademicSummaryValues;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<AcademicSummaryValues>({ defaultValues });

  async function onSubmit(values: AcademicSummaryValues) {
    setError("");

    try {
      const res = await fetch("/api/profile/academic-summary", {
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
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button aria-label="Edit academic background" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Academic Background</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}
          <FieldGroup>
            <Controller
              name="jobTitle"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Current or Target Job Title</FieldLabel>
                  <Input {...field} placeholder="e.g. Product Designer" />
                </Field>
              )}
            />

            <Controller
              name="highestDegree"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Highest Degree Achieved</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Bachelor">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="Master">Master's Degree</SelectItem>
                      <SelectItem value="Doctorate">Doctorate / PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="fieldOfStudy"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Field of Study</FieldLabel>
                  <Input {...field} placeholder="e.g. Computer Science" />
                </Field>
              )}
            />
          </FieldGroup>

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
