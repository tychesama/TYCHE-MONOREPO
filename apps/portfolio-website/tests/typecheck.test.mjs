import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const workspaceDirectory = fileURLToPath(new URL("..", import.meta.url));

test("portfolio source passes strict TypeScript checking", () => {
  const result = spawnSync(
    "npm",
    [
      "exec",
      "tsc",
      "--",
      "--project",
      "tsconfig.typecheck.json",
      "--pretty",
      "false",
    ],
    {
      cwd: workspaceDirectory,
      encoding: "utf8",
    },
  );

  assert.equal(
    result.status,
    0,
    [result.stdout, result.stderr].filter(Boolean).join("\n"),
  );
});
