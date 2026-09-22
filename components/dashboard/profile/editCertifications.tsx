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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2, Trash2, Plus } from "lucide-react";

type CertificationEntry = {
  name: string;
  organization: string;
  issueDate: string;
  expirationDate: string;
  url: string;
};

type CertificationsFormValues = {
  certifications: CertificationEntry[];
};

export function EditCertificationsDialog({
  defaultValues,
}: {
  defaultValues: CertificationEntry[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const emptyEntry: CertificationEntry = {
    name: "",
    organization: "",
    issueDate: "",
    expirationDate: "",
    url: "",
  };

  const form = useForm<CertificationsFormValues>({
    defaultValues: {
      certifications: defaultValues.length > 0 ? defaultValues : [emptyEntry],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  async function onSubmit(values: CertificationsFormValues) {
    try {
      setError("");
      const res = await fetch("/api/profile/certifications", {
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
      <DialogTrigger render={<button aria-label="Edit certifications" />}>
        <Pencil className="text-chart-3 size-4 sm:size-5" />
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Certifications</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-lg p-4">
                <div className="flex justify-end mb-2">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      aria-label={`Remove Certification ${index + 1}`}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  )}
                </div>

                <FieldGroup>
                  <Controller
                    name={`certifications.${index}.name`}
                    control={form.control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Certification Name</FieldLabel>
                        <Input
                          {...field}
                          placeholder="e.g. AWS Certified Solutions Architect"
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name={`certifications.${index}.organization`}
                    control={form.control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Issuing Organization</FieldLabel>
                        <Input
                          {...field}
                          placeholder="e.g. Amazon Web Services"
                        />
                      </Field>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name={`certifications.${index}.issueDate`}
                      control={form.control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Issue Date</FieldLabel>
                          <Input {...field} type="date" />
                        </Field>
                      )}
                    />
                    <Controller
                      name={`certifications.${index}.expirationDate`}
                      control={form.control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Expiration Date (Optional)</FieldLabel>
                          <Input {...field} type="date" />
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name={`certifications.${index}.url`}
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Credential URL (Optional)</FieldLabel>
                        <Input {...field} placeholder="https://" />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => append(emptyEntry)}
            className="w-full mt-4"
          >
            <Plus className="size-4" />
            Add another Certificate
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
