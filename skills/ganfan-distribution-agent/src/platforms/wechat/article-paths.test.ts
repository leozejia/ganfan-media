import assert from "node:assert/strict";
import path from "node:path";
import { isArticleOutputPath, resolveArticleOutputPath } from "./article-paths.ts";

const articleInput = path.join("/tmp", "article", "sorrycode.md");
assert.equal(
  resolveArticleOutputPath(articleInput),
  path.join("/tmp", "article", "outputs", "wechat", "article.html")
);

const legacyDraftInput = path.join("/tmp", "article", "drafts", "sorrycode.md");
assert.equal(
  resolveArticleOutputPath(legacyDraftInput),
  path.join("/tmp", "article", "outputs", "wechat", "article.html")
);

const otherDraftInput = path.join("/tmp", "article", "drafts", "wechat.md");
assert.equal(
  resolveArticleOutputPath(otherDraftInput),
  path.join("/tmp", "article", "outputs", "wechat", "wechat.html")
);

const plainInput = path.join("/tmp", "note.md");
assert.equal(resolveArticleOutputPath(plainInput), path.join("/tmp", "note.html"));

assert.equal(isArticleOutputPath(path.join("/tmp", "article", "outputs", "wechat", "article.html")), true);
assert.equal(isArticleOutputPath(path.join("/tmp", "article", "drafts", "sorrycode.html")), false);

console.log("article path tests passed");
