"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type CareerCardProps = {
  match: string;
  heading: string;
  para: string;
  tags: string[];
  isSaved?: boolean;
  onToggleSave?: () => void;
};

export function CareerMatchCard({ values }: { values: CareerCardProps }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white sm:max-w-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={values.onToggleSave}
          aria-label={
            values.isSaved
              ? `Unsave ${values.heading}`
              : `Save ${values.heading}`
          }
          className="p-2"
        >
          <Bookmark
            className={cn(
              "size-5 text-primary transition-colors",
              values.isSaved && "fill-primary",
            )}
          />
        </button>

        <p className="font-bold text-xs px-3 py-1 bg-primary text-white rounded-tr-lg rounded-bl-lg">
          {values.match}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3 px-4 py-4">
        <h3 className="sm:text-xl font-semibold">{values.heading}</h3>

        <div>
          <p className={cn("text-chart-3", !expanded && "line-clamp-3")}>
            {values.para}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-primary text-sm font-medium mt-1 cursor-pointer"
          >
            {expanded ? "See less" : "See more"}
          </button>
        </div>

        <div className="flex gap-2 flex-wrap text-sm font-semibold text-primary">
          {values.tags.map((tag, index) => (
            <p
              key={index}
              className="rounded-full bg-primary/10 px-4 py-1 text-nowrap"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
