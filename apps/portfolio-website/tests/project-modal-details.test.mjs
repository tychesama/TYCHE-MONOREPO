import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const modalSource = readSource("../src/components/modal/ProjectModal.tsx");
const cardSource = readSource("../src/components/common/ProjectCard.tsx");
const reusableModalSource = readSource("../../../shared/ui/ReusableModal.tsx");
const portfolioData = JSON.parse(readSource("../src/data.json"));

test("project modal renders the curated project detail fields", () => {
  for (const field of [
    "project.fullDescription",
    "project.projectContext",
    "project.myContributions",
    "project.highlights",
    "project.projectType",
    "project.status",
    "project.aiInvolvement",
    "project.aiDisclosure",
    "project.sourceAvailability",
  ]) {
    assert.match(modalSource, new RegExp(field.replace(".", "\\.")), `${field} should be rendered by the modal`);
  }

  assert.doesNotMatch(modalSource, /Details coming soon\./);
  assert.doesNotMatch(modalSource, /project\.privateNotes/);
});

test("project modal uses a visual placeholder for missing, folder-only, and broken images", () => {
  assert.match(modalSource, /isUsableImagePath/);
  assert.match(modalSource, /Project preview unavailable/);
  assert.match(modalSource, /setImageFailed\(true\)/);
  assert.match(modalSource, /project\.images[\s\S]*filter\(isUsableImagePath\)/);
});

test("expanded project cards use the same missing-image fallback", () => {
  assert.match(cardSource, /isUsableImagePath/);
  assert.match(cardSource, /Project preview unavailable/);
  assert.match(cardSource, /setImageFailed\(true\)/);
});

test("project data stores explicit image files instead of folder placeholders", () => {
  for (const project of portfolioData.projects) {
    for (const image of project.images ?? []) {
      assert.doesNotMatch(image, /\/$/, `${project.name} should not use a folder as an image`);
    }
  }

  const motobai = portfolioData.projects.find((project) => project.id === "motobai-project");
  assert.ok(motobai.images.length > 1);
  assert.match(motobai.images[0], /\/assets\/projects\/motobai\/moto\.gif$/);
});

test("all shared modals scroll without showing a scrollbar", () => {
  assert.match(reusableModalSource, /overflow-auto[^"\n]*scrollbar-hide/);
});
