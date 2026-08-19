import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const mainSource = readSource("../src/MainPage.tsx");
const heroSource = readSource("../src/components/sections/HeroSection.tsx");
const skillsSource = readSource("../src/components/sections/SkillsSection.tsx");
const educationSource = readSource("../src/components/sections/EducationSection.tsx");
const highlightSource = readSource("../src/components/sections/HighlightSection.tsx");
const portfolioData = JSON.parse(readSource("../src/data.json"));

test("Step 2 presents the confirmed role, graduation, and work status", () => {
  assert.match(educationSource, /2022\s*–\s*June 2026/);
  assert.match(highlightSource, /Looking for work/);
  assert.match(heroSource, /looking for work in full-stack, backend, or frontend development/i);

  const staleCopy = [mainSource, heroSource, educationSource, highlightSource].join("\n");
  assert.doesNotMatch(staleCopy, /Projects \.\.\. \(WIP\)/);
  assert.doesNotMatch(staleCopy, /Studying as a diligent student/i);
  assert.doesNotMatch(staleCopy, /2020\s*–\s*present/i);
});

test("Step 2 keeps hero and skills styling solid and restrained", () => {
  assert.match(heroSource, /bg-\[var\(--color-mini-card\)\]/);
  assert.doesNotMatch(heroSource, /shadow-\[inset_0_6px_16px/);
  assert.doesNotMatch(heroSource, /_0_18px_40px/);
  assert.doesNotMatch(heroSource, /bg-gradient-to-b/);

  assert.doesNotMatch(skillsSource, /shadow-\[inset_0_6px_16px/);
  assert.doesNotMatch(skillsSource, /shadow-\[0_0_10px/);
  assert.doesNotMatch(skillsSource, /hover:shadow-\[0_0_16px/);
  assert.doesNotMatch(skillsSource, /group-hover:scale-110/);
  assert.doesNotMatch(skillsSource, /hover:shadow-md/);
});

test("skills use project-backed entries and star only technical good-tier skills", () => {
  assert.match(skillsSource, /isStarredTechnicalSkill = s\.group === "Technical" && pct >= 80/);
  assert.doesNotMatch(skillsSource, /pct > 75/);

  const technical = portfolioData.skills.technical.map((skill) => skill.name);
  const tools = portfolioData.skills.tools.map((skill) => skill.name);
  const softSkills = portfolioData.skills.softSkills.map((skill) => skill.name);

  for (const expected of [
    "Tailwind CSS",
    "Dart",
    "Flask",
    "SQL & Databases",
    "REST APIs",
    "Testing & Debugging",
    "System Design",
  ]) {
    assert.ok(technical.includes(expected), `${expected} should be listed as a technical skill`);
  }

  for (const expected of ["AI Coding Tools", "GitHub", "Node.js", "Vite", "Supabase"]) {
    assert.ok(tools.includes(expected), `${expected} should be listed as a tool`);
  }

  for (const expected of ["Project Planning", "System Thinking"]) {
    assert.ok(softSkills.includes(expected), `${expected} should be listed as a soft skill`);
  }

  const starredTechnical = portfolioData.skills.technical
    .filter((skill) => skill.proficiency >= 80)
    .map((skill) => skill.name);

  for (const familiar of [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Next.js",
    "Python",
    "Django",
    "Flutter",
  ]) {
    assert.ok(starredTechnical.includes(familiar), `${familiar} should be in the technical starred tier`);
  }
});

test("portfolio project data imports normalized tiers, visibility, and public metadata", () => {
  assert.equal(portfolioData.projects.length, 29);
  assert.equal(portfolioData.projects.some((project) => project.id === "pipelineos"), false);
  assert.equal(portfolioData.projects.filter((project) => project.showOnHome).length, 14);

  const allowedTiers = new Set(["featured", "supporting", "archive"]);
  const allowedHomeSections = new Set(["work", "ai-work", "none"]);
  const allowedAiValues = new Set(["none", "assisted", "directed", "generated"]);

  for (const project of portfolioData.projects) {
    assert.ok(allowedTiers.has(project.tier), `${project.name} has a normalized tier`);
    assert.ok(allowedHomeSections.has(project.homeSection), `${project.name} has a normalized home section`);
    assert.ok(allowedAiValues.has(project.aiInvolvement), `${project.name} has normalized AI involvement`);
    assert.equal(typeof project.projectContext, "string", `${project.name} has project context text`);
    assert.equal(typeof project.myContributions, "string", `${project.name} has contribution text`);
  }

  const infiniteTower = portfolioData.projects.find((project) => project.id === "infinite-tower-adventure-game");
  assert.ok(infiniteTower?.showOnHome, "Infinite Tower stays homepage-visible");

  for (const hiddenOlderProject of [
    "employee-management-system",
    "tetris-lite",
    "kanban-style-todo-list",
    "storeit-simple-sales-system",
    "rts-game",
  ]) {
    const project = portfolioData.projects.find((item) => item.id === hiddenOlderProject);
    assert.equal(project?.showOnHome, false, `${hiddenOlderProject} should stay off the homepage`);
  }
});

test("experience and certification data stays concise and current", () => {
  const jairosoft = portfolioData.experience.find((item) => item.company === "Jairosoft Inc.");
  assert.ok(jairosoft, "Jairosoft experience should be present");
  assert.match(jairosoft.role, /Bubble\.io Developer Intern/);
  assert.equal(jairosoft.duration, "243-hour OJT / Internship");
  assert.equal(jairosoft.date, "2025-05-21");
  assert.equal(jairosoft.endDate, "2025-06-30");
  assert.match(jairosoft.description, /Bubble\.io workflows/);
  assert.match(jairosoft.description, /electronic learning management system/);
  assert.match(jairosoft.description, /Azure DevOps/);
  assert.match(jairosoft.description, /MS Teams/);
  assert.ok(jairosoft.about.length < 260, "company details should stay concise");

  const certificationNames = portfolioData.certifications.map((item) => item.name);
  const durianPy = portfolioData.certifications.find((item) => item.name === "DurianPy");
  const nasaSpaceApps = portfolioData.certifications.find((item) => item.name === "NASA Space Apps 2025");
  assert.equal(durianPy?.date, "2026-01-01");
  assert.equal(nasaSpaceApps?.date, "2025-10-01");
  assert.ok(certificationNames.includes("FreeCodeCamp A2 English"));
  assert.ok(!certificationNames.includes("FreeCodeCamp B1 English"));
  assert.ok(!certificationNames.includes("FreeCodeCamp Python Certification"));
  assert.ok(!certificationNames.includes("FreeCodeCamp Responsive Web Design"));
  assert.match(mainSource, /Certifications & Involvement/);
});
