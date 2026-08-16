import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const landingPage = await readFile(
  new URL('../src/LandingPage.tsx', import.meta.url),
  'utf8',
);

test('homepage uses a three-viewport content world', () => {
  assert.match(landingPage, /w-\[300vw\]/);
  assert.match(landingPage, /translate3d\(-200vw, 0, 0\)/);
  assert.match(landingPage, /duration-\[2600ms\]/);
  assert.ok((landingPage.match(/w-screen/g) ?? []).length >= 3);
});

test('travel gap replaces the old decorative slide elements', () => {
  assert.match(landingPage, /data-travel-space/);
  assert.doesNotMatch(landingPage, /w-\[200%\]/);
  assert.doesNotMatch(landingPage, /translateX\(-50%\)/);
  assert.doesNotMatch(landingPage, /w-\[160%\]/);
  assert.doesNotMatch(landingPage, /w-\[120%\]/);
});
