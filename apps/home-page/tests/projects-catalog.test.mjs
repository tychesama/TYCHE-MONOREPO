import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const landingPage = await readFile(
  new URL('../src/LandingPage.tsx', import.meta.url),
  'utf8',
);

test('deployed projects are separated into authored and AI-generated releases', () => {
  assert.match(landingPage, /const MY_WORKS_PROJECT_NAMES = new Set/);
  assert.match(landingPage, /const PINNED_PROJECT_NAMES = new Set/);
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
