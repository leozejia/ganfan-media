import assert from "node:assert/strict";
import path from "node:path";
import { resolveXProfilePath } from "./channel-profile.ts";

const profilePath = resolveXProfilePath();
assert.equal(
  profilePath.endsWith(path.join("channels", "profiles", "x.yaml")),
  true
);

console.log("x channel profile tests passed");
