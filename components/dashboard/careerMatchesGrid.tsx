"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CareerMatchCard } from "./careerMatchCard";

type CareerMatch = {
  heading: string;
  match: string;
  para: string;
  tags: string[];
};

export function CareerMatchesGrid({
  matches,
  savedTitles,
}: {
  matches: CareerMatch[];
  savedTitles: string[];
}) {
  const router = useRouter();
  const [saved, setSaved] = useState<Set<string>>(new Set(savedTitles));

  async function toggleSave(heading: string) {
    const wasSaved = saved.has(heading);

    // flip instantly, before the request finishes
    setSaved((prev) => {
      const next = new Set(prev);
      wasSaved ? next.delete(heading) : next.add(heading);
      return next;
    });

    const res = await fetch("/api/insights/save-career-path", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: heading }),
    });

    if (!res.ok) {
      // revert on failure
      setSaved((prev) => {
        const next = new Set(prev);
        wasSaved ? next.add(heading) : next.delete(heading);
        return next;
      });
      return;
    }

    router.refresh();
  }

  return (
    <div className="my-4 grid gap-4 sm:grid-cols-2">
      {matches.map((match, index) => (
        <CareerMatchCard
          key={index}
          values={{
            ...match,
            isSaved: saved.has(match.heading),
            onToggleSave: () => toggleSave(match.heading),
          }}
        />
      ))}
    </div>
  );
}
