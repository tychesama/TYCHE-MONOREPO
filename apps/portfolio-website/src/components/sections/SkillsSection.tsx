"use client";
import React, { useMemo, useState } from "react";
// imports (snippet)
import {
  SiCplusplus, SiPython, SiDjango, SiMysql, SiReact, SiNextdotjs, SiFlutter, SiJavascript, SiTypescript, SiPhp,
  SiHtml5, SiCss3, SiCisco, SiOdoo,
  SiGit, SiFigma, SiCanva, SiAdobephotoshop, SiAdobepremierepro
} from "react-icons/si";
import { FaUsers, FaComments, FaPuzzlePiece, FaArrowsRotate, FaListCheck, FaBolt, FaMedal } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";

// icon + color maps (snippet)
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

// helper for HTML/CSS split (snippet)
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
  const [showHelp, setShowHelp] = useState(false);

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
      <div className="relative flex items-center justify-between gap-2">
        <button
          name="tooltip"
          type="button"
          onMouseEnter={() => setShowHelp(true)}
          onMouseLeave={() => setShowHelp(false)}
          onFocus={() => setShowHelp(true)}
          onBlur={() => setShowHelp(false)}
          className="ml-[45px] relative grid place-items-center w-7 h-7 rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.35)] transition"
          aria-label="Skills info"
        >
          <FaCircleQuestion className="text-[16px] text-[var(--color-text-subtle)]" />

          {showHelp && (
            <div className="absolute top-full left-0 mt-2 w-[350px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 shadow-lg z-50 text-justify">
              Skill levels are self-assessed and reflect my current standing as a beginner to intermediate programmer.
            </div>
          )}
        </button>

        <select
          value={styleMode}
          onChange={(e) => setStyleMode(e.target.value as SkillsStyle)}
          className="w-[75px] bg-[var(--color-mini-card)] text-[var(--color-text-main)] border border-[rgba(255,255,255,0.06)] text-xs rounded px-2 py-1">
          <option value="Default">Icons</option>
          <option value="List">List</option>
          <option value="Uma">Uma</option>
        </select>

      </div>


      <div className="w-full h-[500] rounded-xl bg-[var(--color-mini-card)] border border-[rgba(255,255,255,0.06)] shadow-[inset_0_6px_16px_rgba(0,0,0,0.35)] flex flex-col p-4">
        {/* Normal List */}
        {styleMode === "Default" && (
          <div className="cursor-default w-full h-full overflow-y-auto scrollbar-hide pr-1">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4">
              {flatSkills.map((s) => {
                const Icon = ICONS[s.name];
                const color = BRAND[s.name] ?? "var(--color-text-main)";
                const pct = Math.max(0, Math.min(100, s.proficiency));

                return (
                  <div key={`${s.group}-${s.name}`} className="group relative flex flex-col items-center justify-center gap-2 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.10)] hover:shadow-md transition-all duration-150">
                    <div className="transition-all duration-150 group-hover:scale-110 group-hover:brightness-125">
                      {s.name === "HTML/CSS" ? (
                        <HtmlCssIcon />
                      ) : Icon ? (
                        <Icon size={40} color={color} />
                      ) : (
                        <span className="text-lg text-[var(--color-text-main)]">●</span>
                      )}
                    </div>

                    <p className="text-[12px] text-[var(--color-text-subtle)] text-center leading-tight px-1">
                      {s.name}
                    </p>

                    <div className="w-[67px] h-[3px] rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-200" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>

                    {/* {s.description && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 opacity-0 pointer-events-none shadow-lg transition group-hover:opacity-100 z-50">
                        {s.description}
                      </div>
                    )} */}

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LIST */}
        {styleMode === "List" && (
          <div className="w-full h-full overflow-y-auto pr-1 scrollbar-hide">
            <div className="grid grid-cols-3 gap-4">

              {/* Technical */}
              <div>
                <p className="text-sm font-semibold text-blue-400 mb-3">Technical</p>
                <div className="flex flex-col gap-2">
                  {skills.technical.map((skill, idx) => (
                    <div
                      key={idx}
                      className="cursor-default group rounded-lg px-3 py-2 bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 hover:shadow-md transition-all duration-150"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-main)] font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-subtle)]">
                          {skill.proficiency}%
                        </span>
                      </div>

                      <div className="mt-1 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 transition-all duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <p className="text-sm font-semibold text-green-400 mb-3">Tools</p>
                <div className="flex flex-col gap-2">
                  {skills.tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="cursor-default group rounded-lg px-3 py-2 bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 hover:shadow-md transition-all duration-150"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-main)] font-medium">
                          {tool.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-subtle)]">
                          {tool.proficiency}%
                        </span>
                      </div>

                      <div className="mt-1 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-400 transition-all duration-300"
                          style={{ width: `${tool.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3">Soft Skills</p>
                <div className="flex flex-col gap-2">
                  {skills.softSkills.map((soft, idx) => (
                    <div
                      key={idx}
                      className="cursor-default group rounded-lg px-3 py-2 bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20 hover:shadow-md transition-all duration-150"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--color-text-main)] font-medium">
                          {soft.name}
                        </span>
                        <span className="text-xs text-[var(--color-text-subtle)]">
                          {soft.proficiency}%
                        </span>
                      </div>

                      <div className="mt-1 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-300 transition-all duration-300"
                          style={{ width: `${soft.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
