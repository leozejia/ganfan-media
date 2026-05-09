import path from "node:path";

export function resolvePublicationOutputPath(markdownPath: string): string {
  const inputDir = path.dirname(markdownPath);
  const inputFile = path.basename(markdownPath, ".md");

  if (path.basename(inputDir) === "drafts") {
    const projectDir = path.dirname(inputDir);
    const outputName = inputFile === "sorrycode" ? "article.html" : `${inputFile}.html`;
    return path.join(projectDir, "outputs", "wechat", outputName);
  }

  return markdownPath.replace(/\.md$/i, ".html");
}

export function isPublicationOutputPath(outputPath: string): boolean {
  return outputPath.split(path.sep).includes("outputs");
}
