"use client";

import { useState } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  useWatch,
  Control,
} from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2, Trash2, Plus } from "lucide-react";

type WorkExperienceEntry = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  isInternship: boolean;
  responsibilities: string;
};

type WorkExperienceFormValues = {
  workExperiences: WorkExperienceEntry[];
};

function ExperienceEntry({
  control,
  index,
  onRemove,
  canRemove,
}: {
  control: Control<WorkExperienceFormValues>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const isCurrentlyWorking = useWatch({
    control,
    name: `workExperiences.${index}.isCurrentlyWorking`,
  });

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="font-medium">Experience {index + 1}</p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove Experience ${index + 1}`}
          >
            <Trash2 className="size-4 text-destructive" />
          </button>
        )}
      </div>

      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name={`workExperiences.${index}.jobTitle`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Field>
                <FieldLabel>Job Title / Role</FieldLabel>
                <Input {...field} placeholder="e.g. HR Intern" />
              </Field>
            )}
          />
          <Controller
            name={`workExperiences.${index}.company`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Field>
                <FieldLabel>Company / Organization</FieldLabel>
                <Input {...field} placeholder="e.g. Acme Corp" />
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name={`workExperiences.${index}.startDate`}
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Field>
                <FieldLabel>Start Date</FieldLabel>
                <Input {...field} type="date" />
              </Field>
            )}
          />
          <Controller
            name={`workExperiences.${index}.endDate`}
            control={control}
            rules={{
              required: isCurrentlyWorking ? false : "This field is required",
            }}
            render={({ field }) => (
              <Field>
                <FieldLabel>End Date</FieldLabel>
                <Input {...field} type="date" disabled={isCurrentlyWorking} />
              </Field>
            )}
          />
        </div>

        <Controller
          name={`workExperiences.${index}.isCurrentlyWorking`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Switch
                id={`currently-working-${index}`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={`currently-working-${index}`} className="text-sm">
                I currently work here
              </label>
            </div>
          )}
        />

        <Controller
          name={`workExperiences.${index}.isInternship`}
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <Checkbox
                id={`is-internship-${index}`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={`is-internship-${index}`} className="text-sm">
                This was an internship
              </label>
            </div>
          )}
        />

        <Controller
          name={`workExperiences.${index}.responsibilities`}
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Key Responsibilities & Achievements</FieldLabel>
              <Textarea {...field} className="min-h-24" />
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
}

export function EditWorkExperienceDialog({
  defaultValues,
}: {
  defaultValues: WorkExperienceEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const emptyEntry: WorkExperienceEntry = {
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    isCurrentlyWorking: false,
    isInternship: false,
    responsibilities: "",
  };

  const form = useForm<WorkExperienceFormValues>({
    defaultValues: {
      workExperiences: defaultValues.length > 0 ? defaultValues : [emptyEntry],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  async function onSubmit(values: WorkExperienceFormValues) {
    try {
      setError("");
      const res = await fetch("/api/profile/work-experience", {
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
      setError("Update failed. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button aria-label="Edit work experience" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto md:min-w-150">
        <DialogHeader>
          <DialogTitle>Edit Work Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <ExperienceEntry
                key={field.id}
                control={form.control}
                index={index}
                onRemove={() => remove(index)}
                canRemove={fields.length > 1}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => append(emptyEntry)}
            className="w-full mt-4"
          >
            <Plus className="size-4" />
            Add Another Role
          </Button>

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
