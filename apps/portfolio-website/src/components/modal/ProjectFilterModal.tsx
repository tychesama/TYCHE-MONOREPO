"use client";

import React from "react";
import ReusableModal from "@shared/ui/ReusableModal";
import { IoClose } from "react-icons/io5";

interface TagCategory {
  [key: string]: string[];
}

interface ProjectFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTags: Set<string>;
  tagCategories: TagCategory;
  onToggleTag: (tag: string) => void;
  onSelectCategory: (category: string, tag: string) => void;
  onClearFilters: () => void;
}

const labelFromTag = (tag: string) => {
  const labels: Record<string, string> = {
    "ai:none": "None",
    "ai:minimal": "Minimal",
    "ai:directed": "Directed",
    "platform:web": "Web",
    "platform:mobile": "Mobile",
    "platform:desktop": "Desktop",
    "platform:application": "Application",
    "stack:flutter-dart": "Flutter / Dart",
    "stack:javascript-react": "JavaScript / React",
    "stack:javascript-next": "JavaScript / Next",
    "stack:typescript-react": "TypeScript / React",
    "stack:node-express": "Node.js / Express",
    "stack:python-django": "Python / Django",
    "stack:python-flask": "Python / Flask",
    "stack:python": "Python",
    "stack:html-css": "HTML / CSS",
    "stack:sql-databases": "SQL / Databases",
    "stack:unity-csharp": "Unity / C#",
    "stack:esp32-arduino": "ESP32 / Arduino",
    "stack:cpp": "C++",
    "stack:java": "Java",
    "purpose:hobby": "Hobby",
    "purpose:academics": "Academics",
    "deployed:yes": "Yes",
    "deployed:no": "No",
    "status:completed": "Completed",
    "status:active": "Active",
    "status:paused": "Paused",
  };
  if (labels[tag]) return labels[tag];

  const parts = tag.split(":");
  return parts.length > 1 ? parts.slice(1).join(":") : tag;
};

const ProjectFilterModal: React.FC<ProjectFilterModalProps> = ({
  isOpen,
  onClose,
  selectedTags,
  tagCategories,
  onToggleTag,
  onSelectCategory,
  onClearFilters,
}) => {
  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      CloseIcon={IoClose}
      color="var(--color-primary)"
      title={`Filters ${selectedTags.size > 0 ? `(${selectedTags.size})` : ""}`}
    >
      <div className="w-full sm:w-[780px] max-w-[92vw]">
        {/* Body */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-6">
          {Object.entries(tagCategories).map(([category, tags]) => {
            const isStackCategory = category === "Language / Framework";
            const selectedValue = tags.find((tag) => selectedTags.has(tag)) ?? "";
            const gridClass = isStackCategory
              ? "sm:col-span-6"
              : category === "Platform"
                ? "sm:col-span-4"
                : category === "Deployed"
                  ? "sm:col-span-2"
                  : "sm:col-span-2";

            return (
              <div
                key={category}
                className={`${gridClass} rounded-lg border border-[rgba(255,255,255,0.07)] bg-[var(--color-mini-card)] p-3`}
              >
                <label
                  htmlFor={isStackCategory ? undefined : `project-filter-${category}`}
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]"
                >
                  {category}
                </label>

                {isStackCategory ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {tags.map((tag) => {
                      const active = selectedTags.has(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => onToggleTag(tag)}
                          className={[
                            "flex min-h-[40px] min-w-0 items-center justify-center whitespace-normal rounded-md border px-2 py-2 text-center text-[11px] leading-tight transition-colors",
                            active
                              ? "border-[rgba(255,255,255,0.16)] bg-[var(--color-primary)] text-white shadow-sm"
                              : "border-[rgba(255,255,255,0.07)] bg-[var(--color-card)] text-[var(--color-text-subtle)] hover:border-[rgba(255,255,255,0.14)] hover:text-[var(--color-text-main)]",
                          ].join(" ")}
                          aria-pressed={active}
                        >
                          {labelFromTag(tag)}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <select
                    id={`project-filter-${category}`}
                    value={selectedValue}
                    onChange={(event) => onSelectCategory(category, event.target.value)}
                    className="w-full rounded-md border border-[rgba(255,255,255,0.08)] bg-[var(--color-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none transition-colors hover:border-[rgba(255,255,255,0.16)] focus:border-[var(--color-primary)]"
                  >
                    <option value="">All</option>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>{labelFromTag(tag)}</option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-[rgba(255,255,255,0.07)] pt-3">
          <p className="text-xs text-[var(--color-text-subtle)] opacity-70">
            {selectedTags.size > 0
              ? `${selectedTags.size} selected`
              : "Combine filters to narrow the project list"}
          </p>

          <button
            type="button"
            onClick={onClearFilters}
            disabled={selectedTags.size === 0}
            className={[
              "px-3 py-1.5 rounded text-xs font-medium transition",
              selectedTags.size > 0
                ? "bg-[var(--color-mini-card)] text-[var(--color-text-main)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(81,86,94,0.12)]"
                : "bg-[rgba(81,86,94,0.08)] text-[var(--color-text-subtle)] opacity-50 cursor-not-allowed",
            ].join(" ")}
          >
            Clear
          </button>
        </div>
      </div>
    </ReusableModal>
  );
};

export default ProjectFilterModal;