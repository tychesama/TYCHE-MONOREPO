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

test('landing hero introduces the developer and prioritizes the work', () => {
  assert.match(landingPage, /Joem Idpan · Fullstack Developer/i);
  assert.match(landingPage, /I build useful systems/);
  assert.match(landingPage, /and software people can actually use\./);
  assert.match(landingPage, /Fullstack Developer building web apps/);
  assert.match(landingPage, /Explore My Work/);
  assert.match(landingPage, /\{deployedProjects\.length\} live releases/);
  assert.match(landingPage, />Fullstack Developer</);
});

test('landing hero removes repetitive and apologetic copy', () => {
  assert.doesNotMatch(landingPage, /Welcome to joemidpan\.com/);
  assert.doesNotMatch(landingPage, /DISCLAIMER:/);
  assert.doesNotMatch(landingPage, /aspiring backend developer/i);
});

test('landing hero uses an asymmetric editorial composition', () => {
  assert.match(landingPage, /data-landing-hero/);
  assert.match(landingPage, /lg:grid-cols-/);
  assert.match(landingPage, /text-left/);
  assert.match(landingPage, /lg:border-l/);
  assert.match(landingPage, /Start here/);
  assert.doesNotMatch(landingPage, /max-w-3xl rounded-2xl border/);
});

test('landing hero includes a technology and project logo carousel', () => {
  assert.match(landingPage, /tech-carousel-track/);
  assert.match(landingPage, /carouselFavicons/);
  assert.match(landingPage, /SiReact/);
  assert.match(landingPage, /project\.faviconUrl/);
  assert.doesNotMatch(landingPage, /Technology and project reel/);
  assert.doesNotMatch(landingPage, /\{name\}<\/span>/);
  assert.doesNotMatch(landingPage, /max-w-40 truncate/);
});

test('logo carousel shuffles one mixed sequence and keeps moving on hover', () => {
  assert.match(landingPage, /shuffleCarouselItems/);
  assert.match(landingPage, /useState\(\(\) =>\s*shuffleCarouselItems/);
  assert.match(landingPage, /kind:\s*["']technology["']/);
  assert.match(landingPage, /kind:\s*["']project["']/);
  assert.doesNotMatch(landingStyles, /tech-carousel:hover/);
  assert.doesNotMatch(landingStyles, /animation-play-state:\s*paused/);
});
