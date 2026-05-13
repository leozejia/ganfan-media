import assert from "node:assert/strict";
import path from "node:path";
import { resolveSharedAutomationChromeProfileDir } from "./chrome-profile.ts";

const profileDir = resolveSharedAutomationChromeProfileDir();

assert.equal(
  profileDir.endsWith(path.join("ganfan-media", ".runtime", "opencli", "browser-profile")),
  true
);

console.log("shared chrome profile tests passed");
