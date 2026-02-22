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
  onClearFilters: () => void;
}

const labelFromTag = (tag: string) => {
  const parts = tag.split(":");
  return parts.length > 1 ? parts.slice(1).join(":") : tag;
};

const ProjectFilterModal: React.FC<ProjectFilterModalProps> = ({
  isOpen,
  onClose,
  selectedTags,
  tagCategories,
  onToggleTag,
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
      <div className="w-[640px] max-w-[92vw]">
        {/* Body */}
        <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4 scrollbar-hide">
          {Object.entries(tagCategories).map(([category, tags]) => (
            <div
              key={category}
              className="bg-[var(--color-card)] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold tracking-wide text-[var(--color-text-subtle)] uppercase opacity-80">
                  {category}
                </p>

                {/* Optional: category count */}
                <span className="text-[11px] text-[var(--color-text-subtle)] opacity-60">
                  {tags.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const active = selectedTags.has(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onToggleTag(tag)}
                      className={[
                        "px-2.5 py-1 rounded-md text-xs transition",
                        "border",
                        active
                          ? "bg-[var(--color-primary)] text-white border-[rgba(255,255,255,0.12)] shadow-sm"
                          : "bg-[var(--color-mini-card)] text-[var(--color-text-subtle)] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(81,86,94,0.10)]",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      {labelFromTag(tag)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-subtle)] opacity-70">
            {selectedTags.size > 0
              ? `${selectedTags.size} selected`
              : "Select tags to filter projects"}
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