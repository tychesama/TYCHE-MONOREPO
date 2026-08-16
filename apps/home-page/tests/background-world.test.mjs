import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const landingPage = await readFile(
  new URL('../src/LandingPage.tsx', import.meta.url),
  'utf8',
);

test('selected background moves inside a three-viewport parallax world', () => {
  assert.match(landingPage, /data-background-world/);
  assert.match(
    landingPage,
    /data-background-world[\s\S]*?w-\[300vw\][\s\S]*?translate3d\(-165vw, 0, 0\)[\s\S]*?<BackgroundHost\s*\/>/,
  );
  assert.match(landingPage, /duration-\[2600ms\]/);
  assert.equal((landingPage.match(/<BackgroundHost\s*\/>/g) ?? []).length, 1);
});
