import { Pencil, SlidersHorizontal } from "lucide-react";
import { EditCareerPreferencesDialog } from "./editCareerPreferences";

type Preference = {
  title: string;
  value: string;
};

type CareerPreferencesProps = {
  values: Preference[];
  editValues: {
    preferredJobRoles: string[];
    preferredIndustries: string;
    careerGoals: string;
  };
};

export default function CareerPreferences({
  values,
  editValues,
}: CareerPreferencesProps) {
  return (
    <section className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <SlidersHorizontal className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Career Preferences</h4>
        </div>

        <EditCareerPreferencesDialog defaultValues={editValues} />
      </div>

      <div className="flex flex-wrap gap-3 items-center mt-4">
        {values.map((item, index) => (
          <div
            key={index}
            className="bg-secondary p-3 sm:p-6 rounded-lg flex-1 min-w-55"
          >
            <p className="text-chart-3 text-sm font-medium uppercase">
              {item.title}
            </p>
            <p className="font-medium text-sm sm:text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
