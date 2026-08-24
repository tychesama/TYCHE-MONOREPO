import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const modalSource = readSource("../src/components/modal/ProjectModal.tsx");
const projectSectionSource = readSource("../src/components/sections/ProjectSection.tsx");
const filterModalSource = readSource("../src/components/modal/ProjectFilterModal.tsx");
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

test("project modal uses a static split-detail grid without internal scrolling", () => {
  assert.match(modalSource, /sm:w-\[1180px\]/);
  assert.match(modalSource, /md:grid-cols-12/);
  assert.match(modalSource, /md:col-span-7/);
  assert.match(modalSource, /md:col-span-5/);
  assert.match(modalSource, /grid-cols-\[0\.65fr_1\.55fr_0\.9fr\]/);
  assert.match(modalSource, /flex-col[^"\n]*divide-y/);
  assert.doesNotMatch(modalSource, /overflow-y-auto|overflow-auto/);
  assert.match(modalSource, /Recent commits/);
  assert.match(modalSource, /commits\.slice\(0, 5\)/);
  assert.match(modalSource, /prevImg/);
  assert.match(modalSource, /nextImg/);
  assert.match(projectSectionSource, /scrollable=\{false\}/);
  assert.doesNotMatch(modalSource, /line-clamp-1[^>]*>— \{highlight\}/);
  assert.doesNotMatch(modalSource, /line-clamp-2[^>]*>\{project\.myContributions\}/);
  assert.doesNotMatch(modalSource, /line-clamp-1[^>]*>\{project\.aiDisclosure\}/);
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

test("project detail surfaces expose only GitHub, Demo, and Deployed actions", () => {
  for (const source of [modalSource, cardSource]) {
    assert.match(source, /project\.link/);
    assert.match(source, /project\.demo/);
    assert.match(source, /project\.deployment/);
    assert.match(source, />\s*GitHub\s*</);
    assert.match(source, />\s*Demo\s*</);
    assert.match(source, />\s*Deployed\s*</);
    assert.doesNotMatch(source, /project\.documentation|>\s*Docs\s*<|>\s*Documentation\s*</);
  }
});

test("expanded project title clearly opens details and shows the repository date", () => {
  assert.match(cardSource, /View more details[\s\S]*↗/);
  assert.match(cardSource, /portfolio-project-details-viewed:/);
  assert.match(cardSource, /setInterval[\s\S]*2500/);
  assert.match(cardSource, /setTimeout[\s\S]*900/);
  assert.match(cardSource, /rgba\(250,204,21/);
  assert.match(cardSource, /onClick=\{openDetails\}/);
  assert.match(cardSource, /aria-label="Drag project card"/);
  assert.match(cardSource, /group-hover\/drag:w-\[calc\(100%_-_1rem\)\]/);
  assert.match(cardSource, /border-y/);
  assert.match(cardSource, /techstack\?\.slice\(0, 5\)\.join/);
  assert.match(cardSource, /textShadow/);
  assert.match(cardSource, /updatedAt/);
  assert.match(cardSource, />Status</);
  assert.match(cardSource, /project\.status/);
  assert.match(cardSource, /whitespace-nowrap[^>]*>Last updated/);
  assert.doesNotMatch(cardSource, /Date unavailable/);
  assert.doesNotMatch(cardSource, /DATE HERE/);
  assert.doesNotMatch(cardSource, /truncate text-xl font-bold/);
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

test("project filters use dropdown groups and stack chips", () => {
  for (const filter of [
    "ai:none", "ai:minimal", "ai:directed",
    "platform:web", "platform:mobile", "platform:application",
    "stack:flutter-dart", "stack:javascript-react", "stack:javascript-next",
    "stack:python-django", "stack:python", "stack:cpp", "stack:java",
    "purpose:hobby", "purpose:academics",
    "deployed:yes", "deployed:no",
    "status:completed", "status:active", "status:paused",
  ]) {
    assert.match(projectSectionSource, new RegExp(filter.replace("+", "\\+")));
  }
  assert.match(projectSectionSource, /selectedByCategory/);
  assert.match(projectSectionSource, /Object\.values\(selectedByCategory\)\.every/);
  assert.match(filterModalSource, /sm:grid-cols-6/);
  assert.match(filterModalSource, /sm:col-span-4/);
  assert.match(filterModalSource, /sm:col-span-6/);
  assert.match(filterModalSource, /lg:grid-cols-5/);
  assert.match(filterModalSource, /min-h-\[40px\]/);
  assert.doesNotMatch(filterModalSource, /truncate rounded border/);
});

test("all shared modals scroll without showing a scrollbar", () => {
  assert.match(reusableModalSource, /scrollbar-hide/);
  assert.match(reusableModalSource, /overflow-auto/);
});
