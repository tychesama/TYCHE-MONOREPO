import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const heroSource = readSource("../src/components/sections/HeroSection.tsx");
const highlightSource = readSource("../src/components/sections/HighlightSection.tsx");
const activityRouteSource = readSource("../src/app/api/github/route.ts");
const projectRouteSource = readSource("../src/app/api/github/[user]/[repo]/route.ts");
const projectCardSource = readSource("../src/components/common/ProjectCard.tsx");
const projectModalSource = readSource("../src/components/modal/ProjectModal.tsx");
const contactRouteSource = readSource("../src/app/api/contact/route.ts");
const contactSectionSource = readSource("../src/components/sections/ContactSection.tsx");

test("latest article panel inherits the hero surface", () => {
  assert.match(heroSource, /w-full mt-4 bg-transparent/);
  assert.doesNotMatch(heroSource, /w-full mt-4 bg-\[var\(--color-card\)\]/);
});

test("highlight loads each quote and GIF endpoint only once", () => {
  assert.equal((highlightSource.match(/fetch\("\/api\/zenquotes"\)/g) ?? []).length, 1);
  assert.equal((highlightSource.match(/fetch\("\/api\/giphy"\)/g) ?? []).length, 1);
});

test("GitHub activity is limited to public tychesama repositories", () => {
  assert.match(activityRouteSource, /GITHUB_USERNAME\s*=\s*"tychesama"/);
  assert.match(activityRouteSource, /\/users\/\$\{GITHUB_USERNAME\}\/repos\?type=owner/);
  assert.match(activityRouteSource, /!repo\.private/);
  assert.doesNotMatch(activityRouteSource, /api\.github\.com\/user\/repos/);
});

test("project GitHub enrichment rejects other owners and private repositories", () => {
  assert.match(projectRouteSource, /user\.toLowerCase\(\)\s*!==\s*GITHUB_USERNAME/);
  assert.match(projectRouteSource, /repoData\.private/);
  assert.match(projectRouteSource, /Math\.min\(10,\s*Math\.max\(1/);
  assert.doesNotMatch(projectRouteSource, /\/collaborators/);
  assert.doesNotMatch(projectCardSource, /\/api\/github/);
  assert.match(projectModalSource, /project\.user\s*!==\s*"tychesama"/);
});

test("contact route validates and escapes untrusted form content", () => {
  assert.match(contactRouteSource, /escapeHtml/);
  assert.match(contactRouteSource, /EMAIL_PATTERN/);
  assert.match(contactRouteSource, /MAX_MESSAGE_LENGTH/);
  assert.match(contactRouteSource, /new URLSearchParams/);
  assert.match(contactRouteSource, /result\.error/);
  assert.match(contactRouteSource, /let parsedBody:\s*unknown/);
  assert.match(contactRouteSource, /Array\.isArray\(parsedBody\)/);
  assert.match(contactRouteSource, /Invalid JSON body/);
  assert.doesNotMatch(contactRouteSource, /<strong>Name:<\/strong> \$\{name\}/);
});

test("contact form distinguishes browser CAPTCHA and email configuration failures", () => {
  assert.match(contactSectionSource, /NEXT_PUBLIC_RECAPTCHA_SITE_KEY/);
  assert.match(contactSectionSource, /responseBody\?\.error/);
  assert.match(contactSectionSource, /Contact form configuration is incomplete/);
  assert.match(contactRouteSource, /reCAPTCHA server configuration is unavailable/);
  assert.match(contactRouteSource, /Email service is unavailable/);
  assert.doesNotMatch(contactRouteSource, /if \(!apiKey \|\| !secret \|\| !from \|\| !to\)/);
});
