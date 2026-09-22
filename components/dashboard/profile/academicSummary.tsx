import { GraduationCap, Pencil } from "lucide-react";
import { EditAcademicSummaryDialog } from "./editAcademicSummary";

type AcademicSummaryProps = {
  jobTitle: string;
  highestDegree: string;
  fieldOfStudy: string;
};

export default function AcademicSummary({
  jobTitle,
  highestDegree,
  fieldOfStudy,
}: AcademicSummaryProps) {
  const hasData = highestDegree || fieldOfStudy;

  return (
    <section className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <GraduationCap className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Academic Background</h4>
        </div>
        <EditAcademicSummaryDialog
          defaultValues={{ jobTitle, highestDegree, fieldOfStudy }}
        />
      </div>

      <div className="sm:p-6 p-3">
        {hasData ? (
          <div className="space-y-0.5">
            {jobTitle && (
              <h3 className="sm:text-lg font-semibold">{jobTitle}</h3>
            )}
            {highestDegree && (
              <p className="text-chart-3 text-sm sm:text-base">
                {highestDegree}
              </p>
            )}
            {fieldOfStudy && (
              <p className="text-chart-3 text-sm sm:text-base">
                {fieldOfStudy}
              </p>
            )}
          </div>
        ) : (
          <p className="text-chart-3 text-sm">
            No academic background added yet.
          </p>
        )}
      </div>
    </section>
  );
}
