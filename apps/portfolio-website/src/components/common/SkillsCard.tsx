"use client";
import React from "react";

interface Skill {
  name: string;
  stars: number; 
}

interface Skills {
  technical: Skill[];
  tools: Skill[];
  softSkills: Skill[];
}

interface SkillsCardProps {
  skills: Skills;
}

const renderStars = (count: number) => {
  return (
    <div className="flex mt-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-yellow-400 text-xs ${
            i <= count ? "opacity-100" : "opacity-30"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
  return (
    <div className="bg-[var(--color-mini-card)] rounded-lg shadow-md p-6 w-full flex flex-col gap-6">
      <h2 className="text-lg font-bold text-[var(--color-primary)]">
        Skills
      </h2>

      <div>
        <p className="text-sm font-semibold text-blue-400 mb-2">Technical</p>
        <div className="flex flex-wrap gap-3">
          {skills.technical.map((skill, idx) => (
            <div
              key={idx}
              className="px-3 py-2 text-xs rounded-md bg-blue-500/10 text-blue-400 border border-blue-400/30 flex flex-col items-center"
            >
              <span>{skill.name}</span>
              {renderStars(skill.stars)}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-green-400 mb-2">Tools</p>
        <div className="flex flex-wrap gap-3">
          {skills.tools.map((tool, idx) => (
            <div
              key={idx}
              className="px-3 py-2 text-xs rounded-md bg-green-500/10 text-green-400 border border-green-400/30 flex flex-col items-center"
            >
              <span>{tool.name}</span>
              {renderStars(tool.stars)}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-white mb-2">Soft Skills</p>
        <div className="flex flex-wrap gap-3">
          {skills.softSkills.map((soft, idx) => (
            <div
              key={idx}
              className="px-3 py-2 text-xs rounded-md bg-white/10 text-white border border-white/30 flex flex-col items-center"
            >
              <span>{soft.name}</span>
              {renderStars(soft.stars)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
