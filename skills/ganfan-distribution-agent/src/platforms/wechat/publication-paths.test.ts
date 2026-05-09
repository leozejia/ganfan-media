import assert from "node:assert/strict";
import path from "node:path";
import { isPublicationOutputPath, resolvePublicationOutputPath } from "./publication-paths.ts";

const publicationInput = path.join("/tmp", "pub", "drafts", "sorrycode.md");
assert.equal(
  resolvePublicationOutputPath(publicationInput),
  path.join("/tmp", "pub", "outputs", "wechat", "article.html")
);

const otherDraftInput = path.join("/tmp", "pub", "drafts", "wechat.md");
assert.equal(
  resolvePublicationOutputPath(otherDraftInput),
  path.join("/tmp", "pub", "outputs", "wechat", "wechat.html")
);

const plainInput = path.join("/tmp", "note.md");
assert.equal(resolvePublicationOutputPath(plainInput), path.join("/tmp", "note.html"));

assert.equal(isPublicationOutputPath(path.join("/tmp", "pub", "outputs", "wechat", "article.html")), true);
assert.equal(isPublicationOutputPath(path.join("/tmp", "pub", "drafts", "sorrycode.html")), false);

console.log("publication path tests passed");
