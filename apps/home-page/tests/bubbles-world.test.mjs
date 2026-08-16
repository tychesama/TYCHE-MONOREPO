import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const bubbles = await readFile(
  new URL('../../../shared/ui/components/Bubbles.tsx', import.meta.url),
  'utf8',
);

const squares = await readFile(
  new URL('../../../shared/ui/components/Squares.tsx', import.meta.url),
  'utf8',
);

test('bubbles use the full host width instead of one viewport', () => {
  assert.match(bubbles, /getBoundingClientRect\(\)\.width/);
  assert.match(bubbles, /Math\.random\(\) \* hostWidth/);
  assert.doesNotMatch(bubbles, /window\.innerWidth/);
});

test('the expanded world seeds more bubbles without increasing spawn rate', () => {
  assert.match(bubbles, /INITIAL_BUBBLE_COUNT = 40/);
  assert.match(bubbles, /setInterval\(\(\) => createBubble\(false\), 250\)/);
});

test('squares also use the full host width selected by the theme', () => {
  assert.match(squares, /getBoundingClientRect\(\)\.width/);
  assert.match(squares, /Math\.random\(\) \* hostWidth/);
  assert.match(squares, /INITIAL_SQUARE_COUNT = 40/);
  assert.doesNotMatch(squares, /window\.innerWidth/);
});
