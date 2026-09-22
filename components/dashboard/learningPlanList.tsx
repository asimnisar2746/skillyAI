"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildCourseSearchUrl } from "@/lib/courseLink";

type SkillGoal = {
  id: string;
  skillName: string;
  courseTitle: string | null;
  courseUrl: string | null;
  isCompleted: boolean;
};

export function LearningPlanList({ goals }: { goals: SkillGoal[] }) {
  const router = useRouter();
  const [completed, setCompleted] = useState<Record<string, boolean>>(
    Object.fromEntries(goals.map((g) => [g.id, g.isCompleted])),
  );

  async function toggleComplete(goalId: string, current: boolean) {
    setCompleted((prev) => ({ ...prev, [goalId]: !current }));

    const res = await fetch("/api/insights/skill-goal/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goalId, isCompleted: !current }),
    });

    if (!res.ok) {
      setCompleted((prev) => ({ ...prev, [goalId]: current }));
      return;
    }

    router.refresh();
  }

  if (goals.length === 0) {
    return (
      <p className="text-chart-3 text-sm">
        Check a skill gap on the left to add it here.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {goals.map((goal) => {
        const isDone = completed[goal.id] ?? goal.isCompleted;
        return (
          <div key={goal.id} className="flex items-start gap-3">
            <Checkbox
              id={`goal-${goal.id}`}
              checked={isDone}
              onCheckedChange={() => toggleComplete(goal.id, isDone)}
              className="mt-1"
            />
            <label
              htmlFor={`goal-${goal.id}`}
              className={cn(
                "flex-1",
                isDone && "line-through text-muted-foreground",
              )}
            >
              <p className="font-medium text-foreground">{goal.skillName}</p>
              {goal.courseTitle && (
                <a
                  href={
                    goal.courseUrl ?? buildCourseSearchUrl(goal.courseTitle)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm flex items-center gap-1 mt-1"
                >
                  {goal.courseTitle} <ExternalLink className="size-3" />
                </a>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
}
