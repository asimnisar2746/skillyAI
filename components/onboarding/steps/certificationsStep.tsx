"use client";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { OnboardingValues } from "../onboardingForm";
import { Award, Plus, Trash2 } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CertificationsStep({
  control,
}: {
  control: Control<OnboardingValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });
  return (
    <>
      <div>
        <h1 className="text-2xl font-medium flex items-center gap-2">
          <Award className="text-primary" />
          Certifications
        </h1>
        <p className="text-sm text-muted-foreground">
          Showcase relevant certifications or licenses to stand out.
        </p>
      </div>
      <div className="rounded-lg mt-4">
        {fields.map((certificateField, index) => (
          <div key={certificateField.id}>
            {fields.length > 1 && (
              <div className="w-full flex justify-end mt-3">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove Certification ${index + 1}`}
                >
                  <Trash2 className="size-4 text-destructive cursor-pointer" />
                </button>
              </div>
            )}

            <FieldGroup>
              <Controller
                name={`certifications.${index}.name`}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Certification Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. AWS Certified Solutions Architect"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={`certifications.${index}.organization`}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Issuing Organization</FieldLabel>
                    <Input {...field} placeholder="e.g. Amazon Web Services" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex justify-between gap-3 items-center">
                <Controller
                  name={`certifications.${index}.issueDate`}
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Issue Date</FieldLabel>
                      <Input {...field} type="date" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`certifications.${index}.expirationDate`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Expiration Date (optional)</FieldLabel>
                      <Input {...field} type="date" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name={`certifications.${index}.url`}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Credential URL (Optional)</FieldLabel>
                    <Input {...field} placeholder="https://" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                name: "",
                organization: "",
                expirationDate: "",
                issueDate: "",
                url: "",
              })
            }
            className="mt-4 border-primary cursor-pointer"
          >
            <Plus className="size-4" />
            Add another Certificate
          </Button>
        </div>
      </div>
    </>
  );
}
