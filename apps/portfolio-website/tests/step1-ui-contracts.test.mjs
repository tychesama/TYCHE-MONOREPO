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

test("desktop projects open by double click without immediate drag activation", () => {
  assert.match(projectsSource, /PointerSensor/);
  assert.match(projectsSource, /activationConstraint/);
  assert.match(projectsSource, /delay:\s*\d+/);
  assert.match(projectsSource, /tolerance:\s*\d+/);
  assert.match(projectsSource, /onClick=\{\(\) => setSelectedProject\(project\)\}/);
  assert.match(projectsSource, /onDoubleClick=/);
  assert.match(projectsSource, /sensors=\{sensors\}/);
});

test("latest blog failure is handled quietly and can be cancelled", () => {
  assert.match(heroSource, /AbortController/);
  assert.match(heroSource, /response\.ok/);
  assert.doesNotMatch(heroSource, /console\.error/);
  assert.match(heroSource, /controller\.abort\(\)/);
});
