"use client";
import { useState } from "react";
import { useFieldArray, Controller, Control } from "react-hook-form";
import { OnboardingValues } from "../onboardingForm";
import { Input } from "@/components/ui/input";
import { StarRating } from "../starRating";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILL_SUGGESTIONS, type SkillCategory } from "@/lib/skill-suggestions";

const TYPE_STYLES: Record<string, string> = {
  "Programming Language": "bg-accent text-accent-foreground",
  Framework: "bg-orange-100 text-orange-700",
  "Soft Skill": "bg-secondary text-secondary-foreground",
};

export function SkillsStep({
  control,
}: {
  control: Control<OnboardingValues>;
}) {
  const [query, setQuery] = useState("");
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const addedNames = fields.map((f) => f.name.toLowerCase());

  const suggestions =
    query.trim().length > 0
      ? SKILL_SUGGESTIONS.filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) &&
            !addedNames.includes(s.name.toLowerCase()),
        )
      : [];

  function handleSelect(skill: {
    name: string;
    type: "Programming Language" | "Framework" | "Soft Skill";
  }) {
    append({ name: skill.name, type: skill.type, proficiency: 3 });
    setQuery("");
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">What are your superpowers?</h1>
        <p className="text-sm text-muted-foreground">
          Add the skills you possess and rate your proficiency. This helps us
          tailor your career path.
        </p>
      </div>

      <div className="relative mt-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Python, Project Management, Figma..."
          className="bg-white"
        />
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md">
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

      <div className="mt-6">
        <p className="font-semibold mb-2">Added Skills</p>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3"
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
                  control={control}
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
                  <X className="size-4 text-muted-foreground hover:text-destructive cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
