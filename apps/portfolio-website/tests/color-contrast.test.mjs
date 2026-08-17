import assert from "node:assert/strict";
import test from "node:test";

test("project accent colors receive a readable black or white foreground", async () => {
  let colorModule;

  try {
    colorModule = await import("../../../shared/ui/colorContrast.mjs");
  } catch {
    assert.fail("shared color contrast helper is missing");
  }

  const { getReadableTextColor } = colorModule;

  assert.equal(getReadableTextColor("#0088FF"), "#000000");
  assert.equal(getReadableTextColor("#111827"), "#FFFFFF");
  assert.equal(getReadableTextColor("#FFFFFF"), "#000000");
});
