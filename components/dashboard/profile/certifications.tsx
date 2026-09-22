import { Award, Pencil } from "lucide-react";
import { EditCertificationsDialog } from "./editCertifications";

type Certification = {
  name: string;
  platform: string;
  completionDate: string;
};

type CertificationsProps = {
  values: Certification[];
  editValues: {
    name: string;
    organization: string;
    issueDate: string;
    expirationDate: string;
    url: string;
  }[];
};

export default function Certifications({
  values,
  editValues,
}: CertificationsProps) {
  return (
    <section className="bg-white p-4 rounded-lg my-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <Award className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Certifications</h4>
        </div>
        <EditCertificationsDialog defaultValues={editValues} />
      </div>

      <div className="p-3 sm:p-6 mt-2 sm:mt-0">
        {values.length === 0 ? (
          <p className="text-chart-3 text-sm">No certifications added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((certification, index) => (
              <div
                key={index}
                className="flex gap-3 items-start rounded-lg border p-3"
              >
                <Award className="bg-secondary rounded-lg size-8 sm:size-10 p-2 shrink-0" />
                <div className="space-y-0.5 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">
                    {certification.name}
                  </h3>
                  <p className="text-chart-3 text-sm">
                    {certification.platform}
                  </p>
                  <p className="text-chart-3 text-sm">
                    {certification.completionDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
