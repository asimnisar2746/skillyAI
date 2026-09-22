"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2, X } from "lucide-react";
import { SKILL_SUGGESTIONS, type SkillCategory } from "@/lib/skill-suggestions";
import { StarRating } from "@/components/onboarding/starRating";
import { cn } from "@/lib/utils";

type SkillEntry = {
  name: string;
  type: SkillCategory;
  proficiency: number;
};

type SkillsFormValues = {
  skills: SkillEntry[];
};

const TYPE_STYLES: Record<string, string> = {
  "Programming Language": "bg-accent text-accent-foreground",
  Framework: "bg-orange-100 text-orange-700",
  "Soft Skill": "bg-secondary text-secondary-foreground",
};

export function EditSkillsDialog({
  defaultValues,
}: {
  defaultValues: SkillEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const form = useForm<SkillsFormValues>({
    defaultValues: { skills: defaultValues },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const addedNames = fields.map((f) => f.name.toLowerCase());
  const suggestions =
    query.trim().length > 0
      ? SKILL_SUGGESTIONS.filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) &&
            !addedNames.includes(s.name.toLowerCase()),
        )
      : [];

  function handleSelect(skill: { name: string; type: SkillCategory }) {
    append({ name: skill.name, type: skill.type, proficiency: 3 });
    setQuery("");
  }

  async function onSubmit(values: SkillsFormValues) {
    try {
      setError("");
      const res = await fetch("/api/profile/skills", {
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
      <DialogTrigger render={<button aria-label="Edit core skills" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Core Skills</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Python, Project Management, Figma..."
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md max-h-48 overflow-y-auto">
                {suggestions.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => handleSelect(s)}
                    className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted text-left"
                  >
                    <span>{s.name}</span>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-xs",
                        TYPE_STYLES[s.type],
                      )}
                    >
                      {s.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {fields.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No skills added yet.
              </p>
            )}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center justify-between rounded-lg border px-4 py-3"
              >
                <div>
                  <p className="font-medium">{field.name}</p>
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs",
                      TYPE_STYLES[field.type],
                    )}
                  >
                    {field.type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Controller
                    name={`skills.${index}.proficiency`}
                    control={form.control}
                    render={({ field: rhfField }) => (
                      <StarRating
                        value={rhfField.value}
                        onChange={rhfField.onChange}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label={`Remove ${field.name}`}
                  >
                    <X className="size-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>

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
