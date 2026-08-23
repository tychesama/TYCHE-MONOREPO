import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const layoutSource = readSource("../src/app/layout.tsx");
const projectSection = readSource("../src/components/sections/ProjectSection.tsx");
const experienceSection = readSource("../src/components/sections/ExperienceSection.tsx");
const certificationsSection = readSource("../src/components/sections/CertificationsSection.tsx");

test("portfolio metadata uses the working favicon path and descriptive title", () => {
  assert.match(layoutSource, /title:\s*["']Joem Idpan \| Portfolio["']/);
  assert.match(layoutSource, /icon:\s*["']\/static\/Dice-Logo\.svg["']/);
  assert.doesNotMatch(layoutSource, /Dice-logo\.svg/);
});

test("detail modals use the selected item name as their title", () => {
  assert.match(projectSection, /title=\{selectedProject\?\.name/);
  assert.match(experienceSection, /title=\{selectedExperience\?\.company/);
  assert.match(certificationsSection, /title=\{selectedCertification\?\.name/);
});
