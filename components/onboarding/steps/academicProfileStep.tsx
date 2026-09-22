import { OnboardingValues } from "../onboardingForm";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, Control } from "react-hook-form";

export function AcademicProfileStep({
  control,
}: {
  control: Control<OnboardingValues>;
}) {
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">Tell us about your background</h1>
        <p className="text-sm text-chart-3">
          This helps us tailor your career recommendations and skill insights.
        </p>
      </div>
      <FieldGroup className="mt-4">
        <Controller
          name="jobTitle"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Current or Target Job Title</FieldLabel>
              <Input
                {...field}
                id="jobTitle"
                placeholder="e.g. Product Designer"
                className="bg-white"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="highestDegree"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Highest Degree Achieved</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="highestDegree" className="bg-white w-full">
                    <SelectValue placeholder="Select Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High Shool">High School</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="Master">Master's Degree</SelectItem>
                    <SelectItem value="Doctorate">Doctorate / Phd</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="fieldOfStudy"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Field of Study</FieldLabel>
                <Input
                  {...field}
                  id="fieldOfStudy"
                  placeholder="e.g. Computer Science"
                  className="bg-white"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="academicAchievements"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Academic Achievements or Certifications (Optional)
              </FieldLabel>
              <Textarea
                {...field}
                id="academicAchievements"
                placeholder="List any notable honors, awards, or relevant coursework..."
                className="bg-white min-h-22"
                rows={4}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
}
