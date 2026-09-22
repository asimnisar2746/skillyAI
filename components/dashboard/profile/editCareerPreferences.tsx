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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2, X } from "lucide-react";

type CareerPreferencesValues = {
  preferredJobRoles: string[];
  preferredIndustries: string;
  careerGoals: string;
};

function JobRoleTagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const safeValue = value ?? [];
  const [inputValue, setInputValue] = useState("");

  function addTag() {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  }

  function removeTag(tagToRemove: string) {
    onChange(value.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={addTag}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder="Type your target role and press enter"
      />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1 text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function EditCareerPreferencesDialog({
  defaultValues,
}: {
  defaultValues: CareerPreferencesValues;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<CareerPreferencesValues>({ defaultValues });

  async function onSubmit(values: CareerPreferencesValues) {
    try {
      setError("");
      const res = await fetch("/api/profile/career-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
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
      <DialogTrigger render={<button aria-label="Edit career preferences" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Career Preferences</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <FieldGroup>
            <Controller
              name="preferredJobRoles"
              control={form.control}
              rules={{
                validate: (value) =>
                  value.length > 0 || "Add at least one role",
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Target Roles</FieldLabel>
                  <JobRoleTagInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="preferredIndustries"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Preferred Industries</FieldLabel>
                  <Input {...field} placeholder="e.g. Technology, Healthcare" />
                </Field>
              )}
            />

            <Controller
              name="careerGoals"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Career Goals</FieldLabel>
                  <Textarea {...field} className="min-h-24" />
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
