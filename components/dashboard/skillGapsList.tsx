"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

type SkillGap = { skillName: string; note: string; suggestedCourse: string };

export function SkillGapsList({
  gaps,
  addedSkillNames,
}: {
  gaps: SkillGap[];
  addedSkillNames: string[];
}) {
  const router = useRouter();
  const [added, setAdded] = useState<Set<string>>(new Set(addedSkillNames));
  const [error, setError] = useState("");

  async function toggle(gap: SkillGap) {
    setError("");
    const wasAdded = added.has(gap.skillName);

    // optimistic update — flip the checkbox instantly, before the request finishes
    setAdded((prev) => {
      const next = new Set(prev);
      wasAdded ? next.delete(gap.skillName) : next.add(gap.skillName);
      return next;
    });

    const res = await fetch("/api/insights/skill-goal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skillName: gap.skillName,
        courseTitle: gap.suggestedCourse,
      }),
    });

    if (!res.ok) {
      // revert on failure — undo the optimistic flip
      setAdded((prev) => {
        const next = new Set(prev);
        wasAdded ? next.add(gap.skillName) : next.delete(gap.skillName);
        return next;
      });
      setError("Couldn't update your learning plan. Please try again.");
      return;
    }

    router.refresh();
  }

  if (gaps.length === 0) {
    return <p className="text-chart-3 text-sm">No skill gaps identified.</p>;
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-destructive text-sm">{error}</p>}
      <p className="text-chart-3 text-sm">
        Check a skill to add it to your learning plan below.
      </p>
      {gaps.map((gap, index) => (
        <div key={index} className="flex items-start gap-3">
          <Checkbox
            id={`gap-${index}`}
            checked={added.has(gap.skillName)}
            onCheckedChange={() => toggle(gap)}
            className="mt-1 border-black/50"
          />
          <label htmlFor={`gap-${index}`} className="flex-1">
            <p className="text-foreground font-medium">{gap.skillName}</p>
            <p className="text-chart-3 text-sm">{gap.note}</p>
          </label>
        </div>
      ))}
    </div>
  );
}
