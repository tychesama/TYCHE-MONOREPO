import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const landingPage = await readFile(
  new URL('../src/LandingPage.tsx', import.meta.url),
  'utf8',
);

const landingStyles = await readFile(
  new URL('../src/landing.css', import.meta.url),
  'utf8',
);

test('scene navigation locks repeated input and cleans up its timer', () => {
  assert.match(landingPage, /TRANSITION_DURATION_MS = 1600/);
  assert.match(landingPage, /isTransitioning/);
  assert.match(landingPage, /transitioningRef/);
  assert.match(landingPage, /transitionTimerRef/);
  assert.match(landingPage, /clearTimeout/);
  assert.match(landingPage, /disabled=\{isTransitioning\}/);
});

test('only the selected scene is interactive', () => {
  assert.match(landingPage, /inert=\{projectsOpen\}/);
  assert.match(landingPage, /aria-hidden=\{projectsOpen\}/);
  assert.match(landingPage, /inert=\{!projectsOpen\}/);
  assert.match(landingPage, /aria-hidden=\{!projectsOpen\}/);
});

test('scene travel respects reduced motion', () => {
  assert.match(landingPage, /prefersReducedMotion/);
  assert.match(landingPage, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(landingPage, /transitionDuration: prefersReducedMotion \? "0ms" : undefined/);
  assert.match(landingStyles, /@media \(prefers-reduced-motion: reduce\)/);
});

test('landing composition has explicit compact mobile behavior', () => {
  assert.match(landingPage, /data-mobile-landing/);
  assert.match(landingPage, /text-\[clamp\(/);
  assert.match(landingPage, /grid-cols-2/);
  assert.match(landingPage, /sm:grid-cols-none/);
  assert.match(landingPage, /hidden[^\"]*sm:block/);
});
