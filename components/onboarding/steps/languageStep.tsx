"use client";
import { useFieldArray, Control, Controller } from "react-hook-form";
import { OnboardingValues } from "../onboardingForm";
import { Globe, Trash2, Plus } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LanguageCombobox } from "../languageComboBox";

export function LanguageStep({
  control,
}: {
  control: Control<OnboardingValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium flex items-center gap-2">
          <Globe className="text-primary" />
          Languages
        </h1>
        <p className="text-sm text-muted-foreground">
          What languages do you speak? Add them to highlight your communication
          skills.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {fields.map((languageField, index) => (
          <div key={languageField.id} className="flex items-end gap-3">
            <Controller
              name={`languages.${index}.language`}
              control={control}
              rules={{ required: "Select a language" }}
              render={({ field }) => (
                <Field className="flex-1">
                  <FieldLabel>Language</FieldLabel>
                  <LanguageCombobox
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />

            <Controller
              name={`languages.${index}.proficiency`}
              control={control}
              rules={{ required: "Select a proficiency" }}
              render={({ field }) => (
                <Field className="flex-1">
                  <FieldLabel>Proficiency</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white w-full">
                      <SelectValue placeholder="Select Proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Native / Bilingual">
                        Native / Bilingual
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove language ${index + 1}`}
                className="mb-2"
              >
                <Trash2 className="size-4 text-destructive cursor-pointer" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ language: "", proficiency: "Beginner" })}
          className="border-primary mt-4"
        >
          <Plus className="size-4" />
          Add another language
        </Button>
      </div>
    </>
  );
}
