import { Briefcase, Pencil } from "lucide-react";
import { EditWorkExperienceDialog } from "./editWorkExperiences";

type Work = {
  Role: string;
  company: string;
  location: string;
  duration: string;
  para?: string;
};

type WorkExperienceProps = {
  values: Work[];
  editValues: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrentlyWorking: boolean;
    isInternship: boolean;
    responsibilities: string;
  }[];
};

export default function WorkExperience({
  values,
  editValues,
}: WorkExperienceProps) {
  return (
    <section className="flex-1 bg-white p-4 rounded-lg my-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <Briefcase className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Work Experience</h4>
        </div>

        <EditWorkExperienceDialog defaultValues={editValues} />
      </div>

      <div className="p-3 mt-2 sm:mt0 sm:p-6 space-y-6 sm:space-y-8">
        {values.map((work, index) => (
          <div key={index} className="flex gap-3 sm:gap-6">
            <div className="relative flex flex-col items-center">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-primary z-10" />

              {index !== values.length && (
                <div className="flex-1 w-0.5 bg-primary mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 sm:pb-8">
              <h3 className="sm:text-lg font-semibold">{work.Role}</h3>

              <p className="text-chart-3 text-sm sm:text-base">
                {work.company} • <span>{work.location}</span>
              </p>

              <p className="text-chart-3 text-xs sm:text-sm font-medium">
                {work.duration}
              </p>

              {work.para && (
                <p className="text-chart-3 mt-2 text-sm">{work.para}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
