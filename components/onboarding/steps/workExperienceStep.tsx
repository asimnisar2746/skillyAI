import { useFieldArray, Control, Controller, useWatch } from "react-hook-form";
import { OnboardingValues } from "../onboardingForm";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function WorkExperienceStep({
  control,
}: {
  control: Control<OnboardingValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperiences",
  });

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">Tell us about your experience</h1>
        <p className="text-sm text-chart-3">
          Add relevant work experience, internships, or volunteer roles to help
          tailor your path.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {fields.map((experienceField, index) => (
          <div key={experienceField.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium">Experience {index + 1}</p>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove Experience ${index + 1}`}
                >
                  <Trash2 className="size-4 text-destructive cursor-pointer" />
                </button>
              )}
            </div>

            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`workExperiences.${index}.jobTitle`}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Job Title / Role</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. HR Intern"
                        className="bg-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`workExperiences.${index}.company`}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Company / Organization</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. Acme Corp"
                        className="bg-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`workExperiences.${index}.startDate`}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Start Date</FieldLabel>
                      <Input {...field} type="date" className="bg-white" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`workExperiences.${index}.endDate`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>End Date</FieldLabel>
                      <Input {...field} type="date" className="bg-white" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                      <label
                        htmlFor={`currently-working-${index}`}
                        className="text-sm"
                      >
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
                        className={cn("border-chart-3/30")}
                      />
                      <label
                        htmlFor={`is-internship-${index}`}
                        className="text-sm"
                      >
                        This was an internship
                      </label>
                    </div>
                  )}
                />
              </div>

              <Controller
                name={`workExperiences.${index}.responsibilities`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Key Responsibilities & Achievements</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Describe what you did and the impact you made..."
                      className="bg-white min-h-24"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              jobTitle: "",
              company: "",
              startDate: "",
              endDate: "",
              isInternship: false,
              responsibilities: "",
              isCurrentlyWorking: false,
            })
          }
          className="w-fit mt-4 border-primary text-primary hover:text-primary cursor-pointer"
        >
          <Plus className="size-4" />
          Add Another Role
        </Button>
      </div>
    </>
  );
}
