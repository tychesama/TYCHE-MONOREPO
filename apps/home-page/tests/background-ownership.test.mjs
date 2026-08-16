import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = async (relativePath) =>
  readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

test('background ownership is route-safe', async () => {
  const [main, landingPage, coinPage] = await Promise.all([
    source('src/main.tsx'),
    source('src/LandingPage.tsx'),
    source('src/CoinPage.tsx'),
  ]);

  assert.doesNotMatch(main, /BackgroundHost/);

  assert.match(landingPage, /import BackgroundHost from '@shared\/ui\/BackgroundHost'/);
  assert.match(landingPage, /<BackgroundHost\s*\/>/);

  assert.match(coinPage, /import BackgroundHost from '@shared\/ui\/BackgroundHost'/);
  assert.match(coinPage, /<BackgroundHost\s*\/>/);
});
