import assert from "node:assert/strict";
import path from "node:path";
import { resolveWechatEnvPath, resolveWechatProfilePath } from "./channel-profile.ts";

const profilePath = resolveWechatProfilePath();
assert.equal(
  profilePath.endsWith(path.join("channels", "profiles", "wechat.yaml")),
  true
);

const envPath = resolveWechatEnvPath();
assert.equal(
  envPath.endsWith(path.join("channels", "profiles", "wechat.local.env")),
  true
);

console.log("wechat channel profile tests passed");
