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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Loader2,
  Trash2,
  Plus,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { LANGUAGES } from "@/lib/languages";
import { cn } from "@/lib/utils";

type LanguageEntry = {
  language: string;
  proficiency: string;
};

type LanguagesFormValues = {
  languages: LanguageEntry[];
};

function LanguageCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {value || "Select language..."}
            <ChevronsUpDown className="size-4 opacity-50" />
          </Button>
        }
      />
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {LANGUAGES.map((lang) => (
                <CommandItem
                  key={lang}
                  value={lang}
                  onSelect={() => {
                    onChange(lang);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === lang ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {lang}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function EditLanguagesDialog({
  defaultValues,
}: {
  defaultValues: LanguageEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<LanguagesFormValues>({
    defaultValues: {
      languages:
        defaultValues.length > 0
          ? defaultValues
          : [{ language: "", proficiency: "Beginner" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  async function onSubmit(values: LanguagesFormValues) {
    setError("");

    try {
      const res = await fetch("/api/profile/languages", {
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
      setError("Something went wrong, try again");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button aria-label="Edit languages" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Languages</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                <Controller
                  name={`languages.${index}.language`}
                  control={form.control}
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
                  control={form.control}
                  rules={{ required: "Select a proficiency" }}
                  render={({ field }) => (
                    <Field className="flex-1">
                      <FieldLabel>Proficiency</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
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
                    <Trash2 className="size-4 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ language: "", proficiency: "Beginner" })}
            className="w-full mt-4"
          >
            <Plus className="size-4" />
            Add another language
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
