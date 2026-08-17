import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const modalSource = readSource("../../../shared/ui/ReusableModal.tsx");
const mainPageSource = readSource("../src/MainPage.tsx");
const heroSource = readSource("../src/components/sections/HeroSection.tsx");
const projectsSource = readSource("../src/components/sections/ProjectSection.tsx");
const projectCardSource = readSource("../src/components/common/ProjectCard.tsx");
const projectModalSource = readSource("../src/components/modal/ProjectModal.tsx");

test("shared modal behaves as an accessible focus-managed dialog", () => {
  assert.match(modalSource, /role=["']dialog["']/);
  assert.match(modalSource, /aria-modal=["']true["']/);
  assert.match(modalSource, /aria-labelledby=/);
  assert.match(modalSource, /aria-label=["']Close dialog["']/);
  assert.match(modalSource, /event\.key === ["']Escape["']/);
  assert.match(modalSource, /previouslyFocused/);
  assert.match(modalSource, /document\.body\.style\.overflow/);
});

test("portfolio exposes one meaningful h1 and omits empty section headings", () => {
  assert.match(heroSource, /<h1[^>]*>\s*Hi, my name is Joem!/);
  assert.doesNotMatch(heroSource, /<p[^>]*>\s*Hi, my name is Joem!/);
  assert.match(mainPageSource, /\{title && \(/);
});

test("desktop projects drag immediately and expanded titles open details", () => {
  assert.doesNotMatch(projectsSource, /PointerSensor/);
  assert.doesNotMatch(projectsSource, /activationConstraint/);
  assert.doesNotMatch(projectsSource, /onDoubleClick=/);
  assert.doesNotMatch(projectsSource, /sensors=\{sensors\}/);
  assert.match(projectsSource, /onClick=\{\(\) => setSelectedProject\(project\)\}/);
  assert.match(projectsSource, /onOpenDetails=\{openProject\}/);
  assert.match(projectCardSource, /onClick=\{onOpenDetails\}/);
});

test("commits and placeholder details appear only in the opened modal", () => {
  assert.doesNotMatch(projectCardSource, /githubData\?\.commits/);
  assert.doesNotMatch(projectCardSource, /Recent Commits/);
  assert.match(projectModalSource, /Recent Commits/);
  assert.match(projectModalSource, /Additional Details/);
  assert.match(projectModalSource, /Project context/);
  assert.match(projectModalSource, /My contribution/);
  assert.match(projectModalSource, /Key takeaways/);
});

test("latest blog failure is handled quietly and can be cancelled", () => {
  assert.match(heroSource, /AbortController/);
  assert.match(heroSource, /response\.ok/);
  assert.doesNotMatch(heroSource, /console\.error/);
  assert.match(heroSource, /controller\.abort\(\)/);
});
