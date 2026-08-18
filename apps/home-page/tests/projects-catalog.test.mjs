import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const landingPage = await readFile(
  new URL('../src/LandingPage.tsx', import.meta.url),
  'utf8',
);
const portfolioData = JSON.parse(
  await readFile(
    new URL('../../portfolio-website/src/data.json', import.meta.url),
    'utf8',
  ),
);

test('deployed projects are separated into authored and AI-generated releases', () => {
  assert.doesNotMatch(landingPage, /const MY_WORKS_PROJECT_NAMES = new Set/);
  assert.doesNotMatch(landingPage, /const PINNED_PROJECT_NAMES = new Set/);
  assert.match(landingPage, /project\.showOnHome/);
  assert.doesNotMatch(landingPage, /project is Project & \{ deployment: string \}/);
  assert.match(landingPage, /project\.homeSection === "work"/);
  assert.match(landingPage, /project\.homeSection === "ai-work"/);
  assert.match(landingPage, /const myWorks = deployedProjects\.filter/);
  assert.match(landingPage, /const aiGeneratedWorks = deployedProjects\.filter/);
  assert.match(landingPage, />\s*Releases\s*</);
  assert.match(landingPage, />\s*My works\s*</);
  assert.match(landingPage, /These are my projects that I have been working on\./);
  assert.match(landingPage, />\s*AI Generated\s*</);
  assert.match(
    landingPage,
    /These are my AI-generated works\. They show my management, planning, and creative direction rather than my coding skills\./,
  );
});

test('home catalog avoids placeholder projects and legacy name-set grouping', () => {
  assert.doesNotMatch(landingPage, /placeholder/i);
  assert.doesNotMatch(landingPage, /Japan Attractions Appreciation/);
  assert.doesNotMatch(landingPage, /MY_WORKS_PROJECT_NAMES\.has/);
  assert.doesNotMatch(landingPage, /!MY_WORKS_PROJECT_NAMES\.has/);
  assert.match(landingPage, /project\.href &&/);
});

test('home project data uses work and ai-work visibility flags', () => {
  const homeProjects = portfolioData.projects.filter((project) => project.showOnHome === true);
  const myWorks = homeProjects.filter((project) => project.homeSection === 'work').map((project) => project.name);
  const aiWorks = homeProjects.filter((project) => project.homeSection === 'ai-work').map((project) => project.name);

  assert.deepEqual(myWorks, [
    'Tyche Monorepo',
    'CalaSense',
    'Motobai Inventory and Sales Management System',
    'Gas Sensor using ESP32',
    'Highlights App',
    'Infinite Tower Adventure Game',
  ]);

  assert.deepEqual(aiWorks, [
    'TartarusPM',
    'Resume Maker',
    'Game Center',
    'Storage Sense',
    'Snack Rush',
    'SIP Website',
    'Japan Appreciation Website v2',
    'Aureon Watches',
  ]);
});

test('home project cards do not show pinned or favorite badges', () => {
  assert.doesNotMatch(landingPage, /📌 Pinned/);
  assert.doesNotMatch(landingPage, /★ Favorite/);
  assert.doesNotMatch(landingPage, /project\.pinned/);
  assert.doesNotMatch(landingPage, /project\.favorite/);
});

test('homepage project accents use brighter colors', () => {
  const homeProjects = portfolioData.projects.filter((project) => project.showOnHome === true);

  for (const project of homeProjects) {
    assert.match(project.color, /^#[0-9A-F]{6}$/i, `${project.name} should use a hex color`);
    const red = Number.parseInt(project.color.slice(1, 3), 16);
    const green = Number.parseInt(project.color.slice(3, 5), 16);
    const blue = Number.parseInt(project.color.slice(5, 7), 16);
    const brightness = 0.299 * red + 0.587 * green + 0.114 * blue;
    assert.ok(brightness >= 95, `${project.name} accent should not be too dark`);
  }
});

test('project cards use richer portfolio data and stay above the background', () => {
  assert.match(landingPage, /function ProjectCard/);
  assert.match(landingPage, /project\.techstack/);
  assert.match(landingPage, /project\.sourceUrl/);
  assert.match(landingPage, /project\.documentationUrl/);
  assert.match(landingPage, /project\.collaboratorCount/);
  assert.match(landingPage, /project\.projectType/);
  assert.match(landingPage, /relative z-30/);
  assert.doesNotMatch(landingPage, /min-h-52/);
});

test('project cards use a solid aligned layout with a bottom footer', () => {
  assert.match(landingPage, /min-h-\[20rem\]/);
  assert.match(landingPage, /mt-auto/);
  assert.match(landingPage, /h-14 w-14/);
  assert.match(landingPage, /h-full w-full object-cover/);
  assert.doesNotMatch(landingPage, /padStart/);
  assert.doesNotMatch(landingPage, /rotate-\[/);
  assert.doesNotMatch(landingPage, /color-mix/);
});
