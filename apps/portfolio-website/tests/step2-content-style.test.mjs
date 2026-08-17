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

test("Step 2 presents the confirmed role, graduation, and work status", () => {
  assert.match(educationSource, /2020\s*–\s*June 2026/);
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
