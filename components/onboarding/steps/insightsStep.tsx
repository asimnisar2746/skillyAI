import { Control, Controller } from "react-hook-form";
import { OnboardingValues } from "../onboardingForm";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { JobRoleTagInput } from "../jobRoleTagInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function InsightsStep({
  control,
}: {
  control: Control<OnboardingValues>;
}) {
  return (
    <>
      <div className="mt-6">
        <h1 className="text-2xl font-medium flex items-center gap-2">
          Career Interests & Links
        </h1>
        <p className="text-sm text-muted-foreground">
          Tell us where you want to go, and let's connect your professional
          footprint.
        </p>
      </div>
      <FieldGroup className="mt-6">
        <div className="flex justify-between gap-3">
          <Controller
            name="careerInterests.preferredJobRoles"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || "Add atleast one job role",
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Preferred Job Roles</FieldLabel>
                <JobRoleTagInput
                  value={field.value}
                  onChange={field.onChange}
                />
              </Field>
            )}
          />
          <Controller
            name="careerInterests.preferredIndustry"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Preferred Industry</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>
        <Controller
          name="careerInterests.careerGoals"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Career Goals (Short term & Long term)</FieldLabel>
              <Textarea
                {...field}
                placeholder="Describe where you see yourself in the next 1-5 years..."
                className="bg-white min-h-20"
              />
            </Field>
          )}
        />
        <div className="mt-3 space-y-6">
          <h4 className="font-medium text-2xl">Professional Links</h4>
          <Controller
            name="careerInterests.linkedinUrl"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>LinkedIn URL</FieldLabel>
                <Input {...field} placeholder="https://linkedin.com/in/..." />
              </Field>
            )}
          />
          <Controller
            name="careerInterests.githubUrl"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>GitHub / Repo URL</FieldLabel>
                <Input {...field} placeholder="https://github.com/..." />
              </Field>
            )}
          />
          <Controller
            name="careerInterests.portfolioUrl"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Personal Portfolio Website</FieldLabel>
                <Input {...field} placeholder="https://" />
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </>
  );
}
