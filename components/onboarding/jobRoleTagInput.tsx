import { useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

export function JobRoleTagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  function addTag() {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  }

  function removeTag(tagToRemove: string) {
    onChange(value.filter((tag) => tag !== tagToRemove));
  }
  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder="e.g. UX Designer, Software Engineer"
      />
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1 text-sm"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X className="size-3 cursor-pointer hover:text-destructive" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
