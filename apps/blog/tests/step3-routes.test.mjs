import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const latestRouteSource = readSource("../src/app/api/latest/route.ts");
const articlePageSource = readSource("../src/app/[slug]/page.tsx");
const articleLoaderSource = readSource("../lib/articles.ts");
const homePageSource = readSource("../src/app/page.tsx");

test("latest article API supports CORS preflight and a stable empty response", () => {
  assert.match(latestRouteSource, /export async function OPTIONS/);
  assert.match(latestRouteSource, /corsHeaders/);
  assert.match(latestRouteSource, /status:\s*200/);
  assert.doesNotMatch(latestRouteSource, /status:\s*latest\s*\?\s*200\s*:\s*204/);
});

test("missing or invalid article slugs render the Next.js not-found page", () => {
  assert.match(articleLoaderSource, /ARTICLE_ID_PATTERN/);
  assert.match(articleLoaderSource, /fs\.existsSync/);
  assert.match(articlePageSource, /notFound\(\)/);
});

test("blog homepage tolerates a missing gallery directory", () => {
  assert.match(homePageSource, /fs\.existsSync\(galleryPath\)/);
});
