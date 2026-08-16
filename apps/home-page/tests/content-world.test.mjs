import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const landingPage = await readFile(
  new URL('../src/LandingPage.tsx', import.meta.url),
  'utf8',
);

test('homepage uses a compact two-viewport content world', () => {
  assert.match(landingPage, /w-\[200vw\]/);
  assert.match(landingPage, /translate3d\(-100vw, 0, 0\)/);
  assert.match(landingPage, /duration-\[1600ms\]/);
  assert.ok((landingPage.match(/w-screen/g) ?? []).length >= 2);
});

test('projects sit directly beside the landing scene', () => {
  assert.doesNotMatch(landingPage, /data-travel-space/);
  assert.doesNotMatch(landingPage, /w-\[300vw\]/);
  assert.doesNotMatch(landingPage, /translate3d\(-200vw, 0, 0\)/);
});
