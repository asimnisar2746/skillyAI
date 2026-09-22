import { Pencil, Zap } from "lucide-react";
import { EditSkillsDialog } from "./editSkills";
import { SkillCategory } from "@/lib/skill-suggestions";

type SkillEntry = {
  name: string;
  type: SkillCategory;
  proficiency: number;
};

type CoreSkillsProps = {
  values: SkillEntry[];
};

export default function CoreSkills({ values }: CoreSkillsProps) {
  return (
    <section className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <Zap className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Core Skills & Competencies</h4>
        </div>

        <EditSkillsDialog defaultValues={values} />
      </div>

      <div className="flex flex-wrap gap-3 items-center text-sm text-accent-foreground font-medium mt-4">
        {values.map((skill, index) => (
          <p key={skill.name} className="bg-accent px-4 py-1 rounded-full">
            {skill.name}
          </p>
        ))}
      </div>
    </section>
  );
}
