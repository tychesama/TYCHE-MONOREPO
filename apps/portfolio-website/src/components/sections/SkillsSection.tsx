"use client";
import React, { useMemo, useState } from "react";

import {
  SiCplusplus, SiPython, SiDjango, SiMysql, SiReact, SiNextdotjs, SiFlutter, SiJavascript, SiTypescript, SiPhp,
  SiHtml5, SiCss3, SiCisco, SiOdoo,
  SiGit, SiFigma, SiCanva, SiAdobephotoshop, SiAdobepremierepro
} from "react-icons/si";
import { FaUsers, FaComments, FaPuzzlePiece, FaArrowsRotate, FaListCheck, FaBolt, FaMedal } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from "recharts";

const ICONS: Record<string, any> = {
  Java: FaPuzzlePiece, "C++": SiCplusplus, Python: SiPython, Django: SiDjango, MySQL: SiMysql, React: SiReact, "Next.js": SiNextdotjs,
  Flutter: SiFlutter, JavaScript: SiJavascript, TypeScript: SiTypescript, PHP: SiPhp, "HTML/CSS": null, CCNA: SiCisco, Odoo: SiOdoo,
  "bubble.io": FaPuzzlePiece, Git: SiGit, Figma: SiFigma, Canva: SiCanva, "MS Teams": FaPuzzlePiece, "Azure DevOps": FaPuzzlePiece,
  "Adobe Photoshop": SiAdobephotoshop, "Adobe Premiere": SiAdobepremierepro,
  Teamwork: FaUsers, Communication: FaComments, "Problem-Solving": FaPuzzlePiece, Adaptability: FaArrowsRotate, Organization: FaListCheck,
  "Fast Learning": FaBolt, "Work Ethic": FaMedal
};

const BRAND: Record<string, string> = {
  Java: "#ED8B00", "C++": "#00599C", Python: "#3776AB", Django: "#092E20", MySQL: "#4479A1", React: "#61DAFB", "Next.js": "#FFFFFF",
  Flutter: "#02569B", JavaScript: "#F7DF1E", TypeScript: "#3178C6", PHP: "#777BB4", HTML: "#E34F26", CSS: "#1572B6",
  CCNA: "#1BA0D7", Odoo: "#714B67", "bubble.io": "#000000", Git: "#F05032", Figma: "#F24E1E", Canva: "#00C4CC",
  "MS Teams": "#6264A7", "Azure DevOps": "#0078D7", "Adobe Photoshop": "#31A8FF", "Adobe Premiere": "#9999FF"
};

const HtmlCssIcon = ({ size = 28 }: { size?: number }) => (
  <span className="flex items-center gap-2">
    <SiHtml5 size={size} color={BRAND.HTML} />
    <SiCss3 size={size} color={BRAND.CSS} />
  </span>
);

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

type SkillsStyle = "Default" | "List" | "Chart";

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [styleMode, setStyleMode] = useState<SkillsStyle>("Default");
  const [showHelp, setShowHelp] = useState(false);
  const [activeGroup, setActiveGroup] = useState<"technical" | "tools" | "softSkills">("technical");

  const flatSkills = useMemo(
    () => [
      ...skills.technical.map((s) => ({ ...s, group: "Technical" as const })),
      ...skills.tools.map((s) => ({ ...s, group: "Tools" as const })),
      ...skills.softSkills.map((s) => ({ ...s, group: "Soft Skills" as const })),
    ],
    [skills]
  );

  // Radar data — one point per category, averaged proficiency
  const radarData = useMemo(() => {
    const avg = (arr: Skill[]) => Math.round(arr.reduce((s, x) => s + x.proficiency, 0) / arr.length);
    return [
      { subject: "Technical", value: avg(skills.technical) },
      { subject: "Tools", value: avg(skills.tools) },
      { subject: "Soft Skills", value: avg(skills.softSkills) },
    ];
  }, [skills]);

  // Bar data for the active group
  const barData = useMemo(() => {
    const map = { technical: skills.technical, tools: skills.tools, softSkills: skills.softSkills };
    return map[activeGroup].map((s) => ({ name: s.name, value: s.proficiency }));
  }, [skills, activeGroup]);

  const groupColor = { technical: "#60a5fa", tools: "#34d399", softSkills: "#a3a3a3" };
  const groupLabel = { technical: "Technical", tools: "Tools", softSkills: "Soft Skills" };

  return (
    <div className="flex flex-col gap-4 w-full h-full -mt-7">
      {/* Style Switcher */}
      <div className="relative flex items-center justify-between gap-2">
        <button
          name="tooltip"
          type="button"
          onMouseEnter={() => setShowHelp(true)}
          onMouseLeave={() => setShowHelp(false)}
          onFocus={() => setShowHelp(true)}
          onBlur={() => setShowHelp(false)}
          className="ml-[52px] relative grid place-items-center w-5 h-5 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.35)] transition"
          aria-label="Skills info"
        >
          <FaCircleQuestion className="text-[12px] text-[var(--color-text-subtle)]" />
          {showHelp && (
            <div className="absolute top-full left-0 mt-2 w-[350px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 shadow-lg z-50 text-justify">
              Skill levels are self-assessed and reflect my current standing as a beginner to intermediate programmer.
            </div>
          )}
        </button>

        <select
          value={styleMode}
          onChange={(e) => setStyleMode(e.target.value as SkillsStyle)}
          className="w-[75px] bg-[var(--color-mini-card)] text-[var(--color-text-main)] border border-[rgba(255,255,255,0.06)] text-xs rounded px-2 py-1"
        >
          <option value="Default">Icons</option>
          <option value="List">List</option>
          <option value="Chart">Chart</option>
        </select>
      </div>

      <div className="w-full h-[500] rounded-xl bg-[var(--color-mini-card)] border border-[rgba(255,255,255,0.06)] shadow-[inset_0_6px_16px_rgba(0,0,0,0.35)] flex flex-col p-4">

        {/* Default — Icons */}
        {styleMode === "Default" && (
          <div className="cursor-default w-full h-full overflow-y-auto scrollbar-hide pr-1">
            <div className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4">
              {flatSkills.map((s) => {
                const Icon = ICONS[s.name];
                const color = BRAND[s.name] ?? "var(--color-text-main)";
                const pct = Math.max(0, Math.min(100, s.proficiency));
                return (
                  <div
                    key={`${s.group}-${s.name}`}
                    className={`group relative flex flex-col items-center justify-center gap-2 pt-4 pb-[18px] rounded-lg transition-all duration-150 ${pct > 75
                      ? "bg-gradient-to-br from-yellow-500/20 to-yellow-300/10 border border-yellow-400/40 shadow-[0_0_10px_rgba(250,204,21,0.15)] hover:shadow-[0_0_16px_rgba(250,204,21,0.35)]"
                      : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.10)] hover:shadow-md"
                      }`}
                  >
                    <div className="transition-all duration-150 group-hover:scale-110 group-hover:brightness-125 pb-[5px]">
                      {s.name === "HTML/CSS" ? <HtmlCssIcon /> : Icon ? <Icon size={40} color={color} /> : <span className="text-lg text-[var(--color-text-main)]">●</span>}
                    </div>
                    <p className="text-[12px] text-[var(--color-text-subtle)] text-center leading-tight px-1">{s.name}</p>
                    {pct > 75 && <span className="absolute top-1 right-1 text-yellow-400 text-xs">★</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List */}
        {styleMode === "List" && (
          <div className="w-full h-full overflow-y-auto pr-1 scrollbar-hide">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-400 mb-3">Technical</p>
                <div className="flex flex-col gap-2">
                  {skills.technical.map((skill, idx) => (
                    <div key={idx} className="cursor-default group rounded-lg px-3 py-2 bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 hover:shadow-md transition-all duration-150">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-main)] font-medium">{skill.name}</span>
                        <span className="text-xs text-[var(--color-text-subtle)]">{skill.proficiency}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400 mb-3">Tools</p>
                <div className="flex flex-col gap-2">
                  {skills.tools.map((tool, idx) => (
                    <div key={idx} className="cursor-default group rounded-lg px-3 py-2 bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 hover:shadow-md transition-all duration-150">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-main)] font-medium">{tool.name}</span>
                        <span className="text-xs text-[var(--color-text-subtle)]">{tool.proficiency}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 transition-all duration-300" style={{ width: `${tool.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3">Soft Skills</p>
                <div className="flex flex-col gap-2">
                  {skills.softSkills.map((soft, idx) => (
                    <div key={idx} className="cursor-default group rounded-lg px-3 py-2 bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20 hover:shadow-md transition-all duration-150">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-main)] font-medium">{soft.name}</span>
                        <span className="text-xs text-[var(--color-text-subtle)]">{soft.proficiency}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-300 transition-all duration-300" style={{ width: `${soft.proficiency}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {styleMode === "Chart" && (
          <div className="w-full h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide">

            {/* Radar — overview */}
            <div className="w-full flex flex-col items-center">
              <p className="text-lg font-semibold uppercase tracking-widest text-[var(--color-text-subtle)] mb-1">Overview</p>
              <ResponsiveContainer width="100%" height={170}>
                <RadarChart data={radarData} outerRadius="110%" cx="50%" cy="63%">
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--color-text-subtle)", fontSize: 12 }} />
                  <Radar dataKey="value" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.25} dot={{ fill: "#60a5fa", r: 3 }} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "var(--color-text-main)" }}
                    itemStyle={{ color: "#60a5fa" }}
                    formatter={(val: any) => [`${val}%`, "Avg. Proficiency"]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Group tabs */}
            <div className="flex gap-2 justify-center">
              {(["technical", "tools", "softSkills"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGroup(g)}
                  className="px-3 py-1 text-xs rounded-full border transition-all duration-150"
                  style={{
                    borderColor: activeGroup === g ? groupColor[g] : "rgba(255,255,255,0.08)",
                    background: activeGroup === g ? `${groupColor[g]}22` : "transparent",
                    color: activeGroup === g ? groupColor[g] : "var(--color-text-subtle)",
                  }}
                >
                  {groupLabel[g]}
                </button>
              ))}
            </div>

            {/* Bar chart — per group */}
            <div className="w-full">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--color-text-subtle)", fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "var(--color-text-subtle)", fontSize: 12 }} width={110} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "var(--color-text-main)" }}
                    itemStyle={{ color: groupColor[activeGroup] }}
                    formatter={(val: any) => [`${val}%`, "Proficiency"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {barData.map((_, idx) => (
                      <Cell key={idx} fill={groupColor[activeGroup]} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;