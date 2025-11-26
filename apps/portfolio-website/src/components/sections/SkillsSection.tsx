"use client";
import React, { useMemo, useState } from "react";

interface Skill {
  name: string;
  stars: number; // 0..3
}

interface Skills {
  technical: Skill[];
  tools: Skill[];
  softSkills: Skill[];
}

interface SkillsSectionProps {
  skills: Skills;
}

type SkillsStyle = "Default" | "List" | "Uma" | "Bar" | "Pie";

const GROUP_COLORS = {
  Technical: { bg: "#60a5fa", text: "#bfdbfe" }, // blue-400/200
  Tools: { bg: "#34d399", text: "#bbf7d0" },     // green-400/200
  "Soft Skills": { bg: "#a3a3a3", text: "#e5e5e5" }, // neutral
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

  // Flatten for Default list
  const flatSkills = useMemo(
    () => [
      ...skills.technical.map((s) => ({ ...s, group: "Technical" as const })),
      ...skills.tools.map((s) => ({ ...s, group: "Tools" as const })),
      ...skills.softSkills.map((s) => ({ ...s, group: "Soft Skills" as const })),
    ],
    [skills]
  );

  // Headers + rows for List
  const headers = ["Technical", "Tools", "Soft Skills"];
  const maxRows = Math.max(
    skills.technical.length,
    skills.tools.length,
    skills.softSkills.length
  );

  // Pie data (by count share)
  const pieData = useMemo(() => {
    const counts = {
      Technical: skills.technical.length,
      Tools: skills.tools.length,
      "Soft Skills": skills.softSkills.length,
    };
    const total = Math.max(1, counts.Technical + counts.Tools + counts["Soft Skills"]);
    return (["Technical", "Tools", "Soft Skills"] as const).map((k) => ({
      key: k,
      value: counts[k],
      pct: counts[k] / total,
      color: GROUP_COLORS[k].bg,
    }));
  }, [skills]);

  return (
    <div className="flex flex-col gap-4 w-[890px] h-full -mt-8">
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
          <option value="Bar">Bar Graph</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </div>

      {/* DEFAULT: Vertical scrollable list with colored bars */}
      {styleMode === "Default" && (
        <div className="w-full overflow-y-auto scrollbar-hide pr-1">
          <ul className="space-y-2">
            {flatSkills.map((s, i) => {
              const pct = Math.max(0, Math.min(100, Math.round((s.stars / 3) * 100)));
              const color = GROUP_COLORS[s.group].bg;
              return (
                <li
                  key={`${s.name}-${i}`}
                  className="group rounded-md border border-[color-mix(in_srgb,var(--color-text-subtle)_22%,transparent)] px-3 py-2
                             hover:bg-[color-mix(in_srgb,var(--color-mini-card)_60%,transparent)]
                             transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate text-sm">
                      <span className="opacity-90">{s.name}</span>
                    </div>
                    <span className="text-[10px] opacity-60 whitespace-nowrap">{s.group}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-[color-mix(in_srgb,var(--color-mini-card)_55%,transparent)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width,filter] duration-300 group-hover:brightness-110"
                      style={{ width: `${pct}%`, background: color }}
                      aria-label={`${s.name} proficiency`}
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

      {/* LIST: 3-column neutral table (no colors) */}
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

      {/* UMA: your current chips/cards with stars */}
      {styleMode === "Uma" && (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-blue-400 mb-2">Technical</p>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-2 py-2 text-xs w-[140px] h-[35px] rounded-md bg-blue-500/70 text-white border border-blue-400/30 flex flex-col items-start"
                >
                  <span>🟡 {skill.name}</span>
                  {renderStars(skill.stars)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-green-400 mb-2">Tools</p>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="px-2 py-2 text-xs w-[140px] h-[35px] rounded-md bg-green-500/80 text-white border border-blue-400/30 flex flex-col items-start"
                >
                  <span>🟢 {tool.name}</span>
                  {renderStars(tool.stars)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-2">Soft Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.softSkills.map((soft, idx) => (
                <div
                  key={idx}
                  className="px-2 py-2 text-xs w-[140px] h-[35px] rounded-md bg-gray-500/90 text-white border border-blue-400/30 flex flex-col items-start"
                >
                  <span>🟤 {soft.name}</span>
                  {renderStars(soft.stars)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BAR: Matplotlib-like bar chart for Technical only */}
      {styleMode === "Bar" && (
        <div className="w-full flex flex-col items-center">
          <p className="text-sm font-semibold mb-4">Technical Skills (Bar Chart)</p>
          <svg
            viewBox={`0 0 400 220`}
            className="w-full max-w-[640px] bg-[var(--color-surface)] rounded"
          >
            {/* Axes */}
            <line x1="40" y1="200" x2="380" y2="200" stroke="gray" strokeWidth="1" />
            <line x1="40" y1="20" x2="40" y2="200" stroke="gray" strokeWidth="1" />

            {/* Y ticks & labels */}
            {[0, 1, 2, 3].map((val) => (
              <g key={val}>
                <line
                  x1="35"
                  y1={200 - val * 60}
                  x2="40"
                  y2={200 - val * 60}
                  stroke="gray"
                  strokeWidth="1"
                />
                <text
                  x="28"
                  y={205 - val * 60}
                  fontSize="10"
                  textAnchor="end"
                  fill="var(--color-text-subtle)"
                >
                  {val}
                </text>
              </g>
            ))}

            {/* Bars */}
            {skills.technical.map((t, i) => {
              const barWidth = 10;
              const gap = 10;
              const x = 60 + i * (barWidth + gap);
              const height = (t.stars / 3) * 180;
              const y = 200 - height;

              return (
                <g key={t.name}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    fill="#60a5fa"
                    stroke="black"
                    strokeWidth="0.5"
                  />
                  <text
                    x={x + barWidth / 2}
                    y="215"
                    fontSize="10"
                    textAnchor="middle"
                    fill="var(--color-text-subtle)"
                  >
                    {t.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}


      {/* PIE: Shares by group (count of skills) */}
      {styleMode === "Pie" && (
        <div className="w-full flex items-center gap-6">
          {/* Pie SVG */}
          <svg viewBox="0 0 42 42" width="160" height="160" className="shrink-0">
            {/* background ring */}
            <circle cx="21" cy="21" r="15.915" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            {(() => {
              const c = 2 * Math.PI * 15.915; // circumference ~ 100
              let offset = 0;
              return pieData.map((slice) => {
                const len = slice.pct * c;
                const dasharray = `${len} ${c - len}`;
                const circle = (
                  <circle
                    key={slice.key}
                    cx="21" cy="21" r="15.915"
                    fill="none"
                    stroke={slice.color}
                    strokeWidth="6"
                    strokeDasharray={dasharray}
                    strokeDashoffset={offset}
                  />
                );
                offset -= len;
                return circle;
              });
            })()}
          </svg>

          {/* Legend */}
          <div className="grid grid-cols-1 gap-2 text-sm">
            {pieData.map((s) => (
              <div key={s.key} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ background: s.color }}
                />
                <span className="w-28">{s.key}</span>
                <span className="opacity-70">
                  {Math.round(s.pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
