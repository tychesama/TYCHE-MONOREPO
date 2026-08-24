import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const readSource = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const mainSource = readSource("../src/MainPage.tsx");
const heroSource = readSource("../src/components/sections/HeroSection.tsx");
const skillsSource = readSource("../src/components/sections/SkillsSection.tsx");
const educationSource = readSource("../src/components/sections/EducationSection.tsx");
const contactSource = readSource("../src/components/sections/ContactSection.tsx");
const highlightSource = readSource("../src/components/sections/HighlightSection.tsx");
const experienceSource = readSource("../src/components/sections/ExperienceSection.tsx");
const portfolioData = JSON.parse(readSource("../src/data.json"));

test("Step 2 presents the confirmed role, graduation, and work status", () => {
  assert.match(educationSource, /Graduated 2026/);
  assert.doesNotMatch(educationSource, /June 2026/);
  assert.match(educationSource, /Bachelor of Science in Computer Science/);
  assert.match(educationSource, /Notable Academic Work/);
  assert.match(educationSource, /Undergraduate Thesis/);
  assert.match(educationSource, /CalaSense/);
  assert.match(educationSource, /Systems Analysis and Design/);
  assert.match(educationSource, /Motobai Inventory and Sales Management System/);
  assert.match(educationSource, /min-h-\[503px\]/);
  assert.match(educationSource, /grid-rows-\[auto_1fr_auto\]/);
  assert.match(educationSource, /Relevant Coursework/);
  assert.match(educationSource, /Software Engineering/);
  assert.doesNotMatch(educationSource, /Languages/);
  assert.doesNotMatch(educationSource, /Academic Focus/);
  assert.doesNotMatch(educationSource, /min-h-\[387px\]/);
  assert.doesNotMatch(educationSource, /rounded-full|rounded-2xl|uppercase tracking/);
  assert.match(educationSource, /CalaSense<\/h4>[\s\S]{0,300}Undergraduate Thesis/);
  assert.match(educationSource, /Motobai Inventory and Sales Management System[\s\S]{0,300}Systems Analysis and Design/);
  assert.doesNotMatch(educationSource, /Elementary|Junior High|Senior High School/);
  assert.match(highlightSource, /Looking for work/);
  assert.match(heroSource, /looking for work in full-stack, backend, or frontend development/i);
  assert.match(mainSource, /isFlushSection/);
  assert.match(contactSource, /h-full/);
  assert.match(educationSource, /h-\[503px\]/);
  assert.match(educationSource, /max-h-\[503px\]/);

  const staleCopy = [mainSource, heroSource, educationSource, highlightSource].join("\n");
  assert.doesNotMatch(staleCopy, /Projects \.\.\. \(WIP\)/);
  assert.doesNotMatch(staleCopy, /Studying as a diligent student/i);
  assert.doesNotMatch(staleCopy, /2020\s*–\s*present/i);
});

test("Step 2 keeps hero and skills styling solid and restrained", () => {
  assert.match(heroSource, /bg-\[var\(--color-mini-card\)\]/);
  assert.doesNotMatch(heroSource, /shadow-\[inset_0_6px_16px/);
  assert.doesNotMatch(heroSource, /_0_18px_40px/);
  assert.doesNotMatch(heroSource, /bg-gradient-to-b/);
  assert.doesNotMatch(heroSource, /FaInstagram|FaFigma/);
  assert.doesNotMatch(heroSource, /label:\s*["']instagram["']|label:\s*["']figma["']/);
  assert.match(heroSource, /grid grid-cols-3/);
  assert.match(heroSource, /w-fit mx-auto/);

  assert.doesNotMatch(skillsSource, /shadow-\[inset_0_6px_16px/);
  assert.doesNotMatch(skillsSource, /shadow-\[0_0_10px/);
  assert.doesNotMatch(skillsSource, /hover:shadow-\[0_0_16px/);
  assert.doesNotMatch(skillsSource, /group-hover:scale-110/);
  assert.doesNotMatch(skillsSource, /hover:shadow-md/);
});

test("contact form stays compact, semantic, and consistent with the portfolio", () => {
  assert.match(contactSource, /<form[\s\S]{0,200}onSubmit=\{handleSubmit\}/);
  assert.match(contactSource, /<label[^>]+htmlFor="contact-name"/);
  assert.match(contactSource, /<label[^>]+htmlFor="contact-email"/);
  assert.match(contactSource, /<label[^>]+htmlFor="contact-message"/);
  assert.match(contactSource, /autoComplete="name"/);
  assert.match(contactSource, /autoComplete="email"/);
  assert.match(contactSource, /type="submit"/);
  assert.match(contactSource, /isSending/);
  assert.match(contactSource, /disabled=\{isSending\}/);
  assert.match(contactSource, /Have a role, project, or collaboration in mind\?/);
  assert.match(contactSource, /h-full[^"\n]*min-h-0[^"\n]*overflow-hidden/);
  assert.match(contactSource, /bg-\[var\(--color-mini-card\)\]/);
  assert.doesNotMatch(contactSource, /border-gray-300|bg-blue-500|Name:|Email:|Message:/);
});

test("highlight status supports a title and MOTD-style subdescription", () => {
  assert.match(highlightSource, /statusSubdescription/);
  assert.match(highlightSource, /Working hard to find something to do!/);
  assert.match(highlightSource, /h-\[70px\][^"\n]*overflow-y-auto[^"\n]*scrollbar-hide/);
  assert.match(highlightSource, /text-sm font-semibold/);
  assert.match(highlightSource, /text-xs text-\[var\(--color-text-subtle\)\]/);
  assert.doesNotMatch(highlightSource, /statusTitle[\s\S]{0,300}marquee-hover/);
});

test("skills use qualitative levels, grouped icon sections, and placeholder details", () => {
  assert.doesNotMatch(skillsSource, /SkillsStyle|RadarChart|BarChart|<select/);
  assert.doesNotMatch(skillsSource, /proficiency}%|pct >= 80/);
  assert.match(skillsSource, /Click a technical skill to view corresponding projects/i);
  assert.match(skillsSource, /onClick=\{group\.key === "technical" \? \(\) => openSkill\(skill\) : undefined\}/);
  assert.match(skillsSource, /ReusableModal/);
  assert.match(skillsSource, /SkillVisual skill=\{selectedSkill\}/);
  assert.match(skillsSource, /grid-cols-\[150px_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(skillsSource, /grid-cols-\[150px_minmax\(0,1fr\)\] border-y/);
  assert.match(skillsSource, /ProjectGridCard/);
  assert.match(skillsSource, /grid-cols-3/);
  assert.match(skillsSource, /transition-transform duration-300 ease-out/);
  assert.match(skillsSource, /isOpen=\{selectedSkill !== null && selectedProject === null\}/);
  assert.match(skillsSource, /onClose=\{\(\) => setSelectedProject\(null\)\}/);
  assert.match(skillsSource, /border-t border-\[rgba\(255,255,255,0\.10\)\]/);
  assert.match(skillsSource, /aspect-square/);
  assert.match(skillsSource, /h-\[30px\][^"\n]*min-h-\[30px\][^"\n]*overflow-hidden/);
  assert.match(skillsSource, /<span className="line-clamp-2">/);
  assert.match(skillsSource, /min-h-0[^"\n]*flex-1[^"\n]*overflow-y-auto/);
  assert.match(mainSource, /min-h-0 flex-1 text-sm/);

  const technical = portfolioData.skills.technical.map((skill) => skill.name);
  const tools = portfolioData.skills.tools.map((skill) => skill.name);
  const softSkills = portfolioData.skills.softSkills.map((skill) => skill.name);

  for (const expected of [
    "JavaScript / TypeScript",
    "HTML/CSS / Tailwind CSS",
    "Flutter / Dart",
    "Flask",
    "Databases / Supabase",
    "REST APIs",
    "Testing & Debugging",
    "System Design",
  ]) {
    assert.ok(technical.includes(expected), `${expected} should be listed as a technical skill`);
  }

  for (const expected of ["AI Coding Tools", "Git / GitHub", "Node.js", "Vite", "Adobe Photoshop", "Adobe Premiere"]) {
    assert.ok(tools.includes(expected), `${expected} should be listed as a tool`);
  }

  for (const expected of ["Project Planning", "System Thinking"]) {
    assert.ok(softSkills.includes(expected), `${expected} should be listed as a soft skill`);
  }

  const allSkills = [
    ...portfolioData.skills.technical,
    ...portfolioData.skills.tools,
    ...portfolioData.skills.softSkills,
  ];
  const allowedLevels = new Set(["familiar", "comfortable", "strong"]);
  for (const skill of allSkills) {
    assert.equal(typeof skill.proficiency, "string");
    assert.ok(allowedLevels.has(skill.proficiency), `${skill.name} has a qualitative level`);
  }

  assert.ok(technical.includes("JavaScript / TypeScript"));
  assert.ok(technical.includes("Flutter / Dart"));
  assert.ok(tools.includes("Git / GitHub"));
  assert.ok(tools.includes("Adobe Photoshop"));
  assert.ok(tools.includes("Adobe Premiere"));
  assert.ok(technical.includes("C++"));
  assert.ok(technical.includes("CCNA"));
  for (const removed of ["XAMPP", "Jupyter Notebook", "Azure DevOps", "Canva"]) {
    assert.equal(allSkills.some((skill) => skill.name === removed), false);
  }
});

test("portfolio project data imports normalized tiers, visibility, and public metadata", () => {
  assert.equal(portfolioData.projects.length, 29);
  assert.equal(portfolioData.projects.some((project) => project.id === "pipelineos"), false);
  assert.equal(portfolioData.projects.filter((project) => project.showOnHome).length, 14);

  const allowedTiers = new Set(["featured", "supporting", "archive"]);
  const allowedHomeSections = new Set(["work", "ai-work", "none"]);
  const allowedAiValues = new Set(["none", "assisted", "directed", "generated"]);

  for (const project of portfolioData.projects) {
    assert.ok(allowedTiers.has(project.tier), `${project.name} has a normalized tier`);
    assert.ok(allowedHomeSections.has(project.homeSection), `${project.name} has a normalized home section`);
    assert.ok(allowedAiValues.has(project.aiInvolvement), `${project.name} has normalized AI involvement`);
    assert.equal(typeof project.projectContext, "string", `${project.name} has project context text`);
    assert.equal(typeof project.myContributions, "string", `${project.name} has contribution text`);
  }

  const infiniteTower = portfolioData.projects.find((project) => project.id === "infinite-tower-adventure-game");
  assert.ok(infiniteTower?.showOnHome, "Infinite Tower stays homepage-visible");

  for (const hiddenOlderProject of [
    "employee-management-system",
    "tetris-lite",
    "kanban-style-todo-list",
    "storeit-simple-sales-system",
    "rts-game",
  ]) {
    const project = portfolioData.projects.find((item) => item.id === hiddenOlderProject);
    assert.equal(project?.showOnHome, false, `${hiddenOlderProject} should stay off the homepage`);
  }
});

test("experience and certification data stays concise and current", () => {
  const viewingsGoodstar = portfolioData.experience.find(
    (item) => item.company === "Viewings.co.nz & GoodStar Property Management",
  );
  assert.ok(viewingsGoodstar, "Viewings/GoodStar experience should be present");
  assert.match(viewingsGoodstar.role, /Business Operations Trainee/);
  assert.equal(viewingsGoodstar.date, "2026-05-01");
  assert.equal(viewingsGoodstar.endDate, "2026-06-30");
  assert.equal(viewingsGoodstar.logo, "/assets/job/viewings-logo-clean.png");
  assert.deepEqual(viewingsGoodstar.logos, [
    "/assets/job/viewings-logo-clean.png",
    "/assets/job/goodstar-logo-clean.png",
  ]);
  assert.equal(viewingsGoodstar.link, "");
  assert.deepEqual(viewingsGoodstar.images, [
    "/assets/job/viewings-logo-clean.png",
    "/assets/job/goodstar-logo-clean.png",
  ]);
  assert.match(viewingsGoodstar.description, /AI automation and CRM workflows/);
  assert.match(viewingsGoodstar.description, /n8n/);
  assert.match(viewingsGoodstar.description, /OpenClaw/);
  assert.match(viewingsGoodstar.description, /Bitrix24/);
  assert.ok(viewingsGoodstar.about.length < 260, "trainee company details should stay concise");
  assert.equal(
    portfolioData.experience.at(-1)?.company,
    "Viewings.co.nz & GoodStar Property Management",
    "Viewings/GoodStar should appear last in the work experience list",
  );

  const jairosoft = portfolioData.experience.find((item) => item.company === "Jairosoft Inc.");
  assert.ok(jairosoft, "Jairosoft experience should be present");
  assert.match(jairosoft.role, /Bubble\.io Developer Intern/);
  assert.equal(jairosoft.duration, "243-hour OJT / Internship");
  assert.equal(jairosoft.date, "2025-05-21");
  assert.equal(jairosoft.endDate, "2025-06-30");
  assert.match(jairosoft.description, /Bubble\.io workflows/);
  assert.match(jairosoft.description, /electronic learning management system/);
  assert.match(jairosoft.description, /Azure DevOps/);
  assert.match(jairosoft.description, /MS Teams/);
  assert.ok(jairosoft.about.length < 260, "company details should stay concise");

  const certificationNames = portfolioData.certifications.map((item) => item.name);
  const durianPy = portfolioData.certifications.find((item) => item.name === "DurianPy");
  const nasaSpaceApps = portfolioData.certifications.find((item) => item.name === "NASA Space Apps 2025");
  assert.equal(durianPy?.date, "2026-01-01");
  assert.equal(nasaSpaceApps?.date, "2025-10-01");
  assert.ok(certificationNames.includes("FreeCodeCamp A2 English"));
  assert.ok(!certificationNames.includes("FreeCodeCamp B1 English"));
  assert.ok(!certificationNames.includes("FreeCodeCamp Python Certification"));
  assert.ok(!certificationNames.includes("FreeCodeCamp Responsive Web Design"));
  assert.match(mainSource, /Certifications & Involvement/);
});

test("experience cards stay readable in the narrow work column", () => {
  assert.match(experienceSource, /flex h-full max-h-\[520px\][^"\n]*flex-col justify-start/);
  assert.doesNotMatch(experienceSource, /sm:grid-cols-2/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /h-\[232px\]/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /logos\.map/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /experience-logo-slide/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /animationDelay: `\$\{index \* -2\.5\}s`/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /line-clamp-2/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /break-words/);
  assert.match(readSource("../src/components/common/ExperienceCard.tsx"), /line-clamp-3/);
  assert.match(readSource("../src/styles.css"), /@keyframes experience-logo-slide/);
  assert.doesNotMatch(readSource("../src/components/common/ExperienceCard.tsx"), /sm:w-\[246px\]/);
  const experienceModalSource = readSource("../src/components/modal/ExperienceModal.tsx");
  assert.match(experienceModalSource, /endDate\?: string/);
  assert.match(experienceModalSource, /dateRange/);
  assert.match(experienceModalSource, /Date range/);
  assert.match(experienceModalSource, /logoOnlyMedia/);
  assert.match(experienceModalSource, /logos\.length > 1 \? "h-28 w-28 object-contain"/);
  assert.match(experienceModalSource, /experience\.duration &&/);
  assert.match(experienceModalSource, /What I worked on/);
  assert.match(experienceModalSource, /Work environment/);
});
