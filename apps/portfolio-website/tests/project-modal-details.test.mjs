import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const modalSource = readSource("../src/components/modal/ProjectModal.tsx");
const projectSectionSource = readSource("../src/components/sections/ProjectSection.tsx");
const mainPageSource = readSource("../src/MainPage.tsx");
const filterModalSource = readSource("../src/components/modal/ProjectFilterModal.tsx");
const cardSource = readSource("../src/components/common/ProjectCard.tsx");
const gridCardSource = readSource("../src/components/common/ProjectGridCard.tsx");
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
  ]) {
    assert.match(modalSource, new RegExp(field.replace(".", "\\.")), `${field} should be rendered by the modal`);
  }

  assert.doesNotMatch(modalSource, /Details coming soon\./);
  assert.doesNotMatch(modalSource, /project\.privateNotes/);
});

test("project modal uses a wide three-panel layout without internal scrolling", () => {
  assert.match(modalSource, /2xl:w-\[1420px\]/);
  assert.match(modalSource, /2xl:grid-cols-\[420px_minmax\(0,680px\)_minmax\(260px,1fr\)\]/);
  assert.match(modalSource, /md:grid-cols-\[minmax\(280px,420px\)_minmax\(0,680px\)\]/);
  assert.match(modalSource, /md:col-span-2 md:row-start-3/);
  assert.match(modalSource, /2xl:col-span-1 2xl:col-start-3 2xl:row-span-2 2xl:row-start-1/);
  assert.match(modalSource, /project\.favicon/);
  assert.match(modalSource, /\/api\/project-favicon\//);
  assert.match(modalSource, /md:col-start-1 md:row-span-2 md:row-start-1/);
  assert.match(modalSource, /md:col-start-2 md:row-start-2/);
  assert.match(modalSource, /max-h-\[180px\]/);
  assert.doesNotMatch(modalSource, />Repository</);
  assert.doesNotMatch(modalSource, /overflow-y-auto|overflow-auto/);
  assert.match(modalSource, /Recent commits/);
  assert.match(modalSource, /commits\.slice\(0, 5\)/);
  assert.match(modalSource, /className="mt-auto border-t[^\"]*"[\s\S]{0,250}>Recent commits</);
  assert.match(modalSource, /Object\.entries\(project\.collaborators\)/);
  assert.match(modalSource, /link \? \(/);
  assert.match(modalSource, /FaGithub/);
  assert.match(modalSource, /FaYoutube/);
  assert.match(modalSource, /FaGlobe/);
  assert.match(modalSource, /AI use: <span className="capitalize">/);
  assert.match(modalSource, /text-justify text-xs[^>]*>\{project\.aiDisclosure\}/);
  assert.match(modalSource, /px-3 py-2\.5 text-sm/);
  assert.match(modalSource, /mt-auto pt-4/);
  assert.doesNotMatch(modalSource, /<a href=\{project\.link\}[^>]*>[\s\S]{0,250}\{project\.name\}/);
  assert.match(modalSource, /text-\[var\(--color-text-main\)\]/);
  assert.match(modalSource, /prevImg/);
  assert.match(modalSource, /nextImg/);
  assert.match(projectSectionSource, /scrollable=\{true\}/);
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

test("desktop projects can switch between preview and compact grid views", () => {
  assert.match(projectSectionSource, /projectView/);
  assert.match(projectSectionSource, /switchProjectView/);
  assert.match(projectSectionSource, /isViewTransitioning/);
  assert.match(projectSectionSource, /transition-\[height,opacity\]/);
  assert.match(projectSectionSource, /transition-\[left,border-color\] duration-500 ease-in-out/);
  assert.match(projectSectionSource, /lg:grid-cols-4/);
  assert.match(projectSectionSource, /h-\[690px\]/);
  assert.match(projectSectionSource, /ProjectGridCard/);
  assert.match(gridCardSource, /aspect-\[[^\]]+\]/);
  assert.match(gridCardSource, /project\.favicon/);
  assert.match(gridCardSource, /\/api\/project-favicon\//);
  assert.match(gridCardSource, /text-base font-semibold/);
  assert.match(gridCardSource, /line-clamp-3 text-xs/);
  assert.match(gridCardSource, /project\.techstack\?\.slice\(0, 3\)/);
  assert.match(projectSectionSource, /FaArrowPointer/);
  assert.match(projectSectionSource, /Drag and Drop/);
  assert.match(gridCardSource, /truncate text-base font-semibold/);
  assert.match(projectSectionSource, /onClick=\{\(\) => openProject\(project\)\}/);
  assert.match(projectSectionSource, /onViewChange\?\.\(nextView\)/);
  assert.doesNotMatch(projectSectionSource, /setProjectView\(\(current\)[\s\S]*onViewChange/);
  assert.match(mainPageSource, /projectView === 'grid' \? 'lg:row-span-4' : 'lg:row-span-3'/);
  assert.match(mainPageSource, /onViewChange=\{updateProjectView\}/);
  assert.match(mainPageSource, /startViewTransition/);
  assert.match(mainPageSource, /viewTransitionName/);
});

test("all shared modals scroll without showing a scrollbar", () => {
  assert.match(reusableModalSource, /scrollbar-hide/);
  assert.match(reusableModalSource, /overflow-auto/);
});
