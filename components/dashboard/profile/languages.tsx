import { Globe, Pencil } from "lucide-react";
import { EditLanguagesDialog } from "./editLanguages";

type LanguageDisplay = {
  name: string;
  proficiency: string;
};

type LanguagesProps = {
  values: LanguageDisplay[];
};

export default function Languages({ values }: LanguagesProps) {
  return (
    <section className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <Globe className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Languages</h4>
        </div>
        <EditLanguagesDialog
          defaultValues={values.map((v) => ({
            language: v.name,
            proficiency: v.proficiency,
          }))}
        />
      </div>

      <div className="p-3 sm:p-6">
        {values.length === 0 ? (
          <p className="text-chart-3 text-sm">No languages added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {values.map((lang) => (
              <span
                key={lang.name}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground"
              >
                {lang.name}{" "}
                <span className="text-chart-3 font-normal">
                  · {lang.proficiency}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
