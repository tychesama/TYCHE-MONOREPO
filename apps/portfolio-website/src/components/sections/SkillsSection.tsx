"use client";
import React, { useMemo, useState } from "react";

interface Skill {
  name: string;
  proficiency: number;
  description?: string;
}

interface Skills {
  technical: Skill[];
  tools: Skill[];
  softSkills: Skill[];
}

interface SkillsSectionProps {
  skills: Skills;
}

type SkillsStyle = "Default" | "List" | "Uma";

const GROUP_COLORS = {
  Technical: { bg: "#60a5fa", text: "#bfdbfe" },
  Tools: { bg: "#34d399", text: "#bbf7d0" },
  "Soft Skills": { bg: "#a3a3a3", text: "#e5e5e5" },
};

const proficiencyToStars = (p: number) => {
  if (p <= 50) return 1;
  if (p <= 85) return 2;
  return 3;
};


const renderStars = (count: number) => {
  return (
    <div className="flex -mt-1.5 gap-x-1.5 w-full justify-center">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-yellow-500 text-lg drop-shadow-lg ${i <= count ? "opacity-100" : "opacity-30"}`}
          style={{ WebkitTextStroke: "1px rgba(0,0,0,0.3)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [styleMode, setStyleMode] = useState<SkillsStyle>("Default");

  const flatSkills = useMemo(
    () => [
      ...skills.technical.map((s) => ({ ...s, group: "Technical" as const })),
      ...skills.tools.map((s) => ({ ...s, group: "Tools" as const })),
      ...skills.softSkills.map((s) => ({ ...s, group: "Soft Skills" as const })),
    ],
    [skills]
  );

  const headers = ["Technical", "Tools", "Soft Skills"];
  const maxRows = Math.max(
    skills.technical.length,
    skills.tools.length,
    skills.softSkills.length
  );

  return (
    <div className="flex flex-col gap-4 w-full h-full -mt-7">
      {/* Style Switcher */}
      <div className="flex items-center justify-end">
        <select
          value={styleMode}
          onChange={(e) => setStyleMode(e.target.value as SkillsStyle)}
          className="bg-[var(--color-card)] text-[var(--color-text-main)] border border-gray-600 text-xs rounded px-2 py-1"
        >
          <option value="Default">Default</option>
          <option value="List">List</option>
          <option value="Uma">Uma</option>
        </select>
      </div>

      <div className="w-full h-[500] rounded-xl bg-[var(--color-mini-card)] border border-[rgba(255,255,255,0.06)] shadow-[inset_0_6px_16px_rgba(0,0,0,0.35)] flex flex-col p-4">
        {/* Normal List */}
        {styleMode === "Default" && (
          <div className="w-full h-full overflow-y-auto scrollbar-hide pr-1">
            <ul className="space-y-2">
              {flatSkills.map((s) => {
                const pct = Math.max(0, Math.min(100, s.proficiency));
                const color = GROUP_COLORS[s.group].bg;

                return (
                  <li
                    key={`${s.group}-${s.name}`}
                    className="group rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-3 py-2.5 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.10)] hover:shadow-md transition-all duration-150"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-text-main)] truncate">
                          {s.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[var(--color-text-subtle)] opacity-80">
                          {pct}% proficiency
                        </p>
                      </div>

                      <span
                        className="text-[10px] px-2 py-[3px] rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.18)] text-[var(--color-text-subtle)] whitespace-nowrap"
                        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                      >
                        {s.group}
                      </span>
                    </div>

                    <div className="mt-2.5 h-2 w-full rounded-full bg-[rgba(0,0,0,0.25)] overflow-hidden border border-[rgba(255,255,255,0.05)]">
                      <div
                        className="h-full rounded-full transition-[width,filter] duration-300 group-hover:brightness-110"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${color}, color-mix(in_srgb, ${color} 70%, white))`,
                          boxShadow: `0 0 10px color-mix(in_srgb, ${color} 45%, transparent)`,
                        }}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}



        {/* LIST */}
        {styleMode === "List" && (
          <div className="w-full">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="text-left border-b border-[var(--color-text-subtle)] pb-2 font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: maxRows }).map((_, rowIdx) => (
                  <tr key={rowIdx} className="align-top">
                    <td className="py-1 pr-4">{skills.technical[rowIdx]?.name || ""}</td>
                    <td className="py-1 pr-4">{skills.tools[rowIdx]?.name || ""}</td>
                    <td className="py-1">{skills.softSkills[rowIdx]?.name || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Umamusume Style */}
        {styleMode === "Uma" && (
          <div className="flex flex-col gap-6 px-8 py-2">
            <div>
              <p className="text-sm font-semibold text-blue-400 mb-2">Technical</p>
              <div className="grid grid-cols-[repeat(auto-fill,140px)] gap-3 justify-center">
                {skills.technical.map((skill, idx) => (
                  <div
                    key={idx}
                    className="cursor-default group relative px-2 py-2 text-xs w-[140px] h-[35px] rounded-md bg-blue-500/70 text-white border border-blue-400/30 flex flex-col items-start transition-all duration-150 hover:scale-105 hover:brightness-103 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                  >                    <span>🟡 {skill.name}</span>
                    {renderStars(proficiencyToStars(skill.proficiency))}

                    {skill.description && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[240px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 opacity-0 pointer-events-none shadow-lg transition group-hover:opacity-100 z-50">
                        {skill.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-green-400 mb-2">Tools</p>
              <div className="grid grid-cols-[repeat(auto-fill,140px)] gap-3 justify-center">
                {skills.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="cursor-default group relative px-2 py-2 text-xs w-[140px] h-[35px] rounded-md bg-green-500/80 text-white border border-blue-400/30 flex flex-col items-start transition-all duration-150 hover:scale-105 hover:brightness-103 hover:shadow-[0_0_12px_rgba(34,197,94,0.2)]"

                  >
                    <span>🟢 {tool.name}</span>
                    {renderStars(proficiencyToStars(tool.proficiency))}

                    {tool.description && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[240px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 opacity-0 pointer-events-none shadow-lg transition group-hover:opacity-100 z-50">
                        {tool.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-2">Soft Skills</p>
              <div className="grid grid-cols-[repeat(auto-fill,140px)] gap-3 justify-center">
                {skills.softSkills.map((soft, idx) => (
                  <div
                    key={idx}
                    className="cursor-default group relative px-2 py-2 text-xs w-[140px] h-[35px] rounded-md bg-gray-500/90 text-white border border-blue-400/30 flex flex-col items-start transition-all duration-150 hover:scale-105 hover:brightness-103 hover:shadow-[0_0_10px_rgba(200,200,200,0.2)]"
                  >
                    <span>🟤 {soft.name}</span>
                    {renderStars(proficiencyToStars(soft.proficiency))}

                    {soft.description && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[240px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 opacity-0 pointer-events-none shadow-lg transition group-hover:opacity-100 z-50">
                        {soft.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
