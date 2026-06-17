const JSZip = require("jszip");
const fs = require("node:fs");
const path = require("node:path");

/**
 * Project packager — the project analog of createExportContent.js.
 *
 * A project sample is a folder of raw, runnable files (index.html, App.jsx, …)
 * plus a `project.json` metadata descriptor (title/description/tags/template).
 * This script zips the *runnable files only* into exportedContent.zip so they
 * can be uploaded to a created project via uploadProjectFiles.js — `project.json`,
 * node_modules, and the zip itself are NOT part of the project's file tree and
 * are excluded.
 *
 * Usage: node createProjectContent.js <project-folder>
 */

// Names excluded from the project file tree (metadata / build output / vcs).
const EXCLUDED = new Set([
  "project.json",
  "projectCreate.json",
  "exportedContent.zip",
  "node_modules",
  ".git",
  ".npmrc",
  ".DS_Store",
]);

function addDirectoryToZip(zip, dirPath, zipBasePath = "") {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    if (EXCLUDED.has(item)) {
      continue;
    }

    const itemPath = path.join(dirPath, item);
    const zipPath = zipBasePath ? `${zipBasePath}/${item}` : item;
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      addDirectoryToZip(zip, itemPath, zipPath);
    } else if (stat.isFile()) {
      zip.file(zipPath, fs.readFileSync(itemPath));
    }
  }
}

async function createProjectContent(projectPath) {
  try {
    if (!fs.existsSync(projectPath)) {
      throw new Error(`Project path does not exist: ${projectPath}`);
    }

    console.log(`📦 Packaging project: ${path.basename(projectPath)}`);

    const zip = new JSZip();
    addDirectoryToZip(zip, projectPath, "");

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    const zipPath = path.join(projectPath, "exportedContent.zip");
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
      console.log("🗑️  Removed existing exportedContent.zip");
    }

    fs.writeFileSync(zipPath, zipBuffer);

    console.log(`✅ exportedContent.zip created at: ${zipPath}`);
    console.log("   Contains the project's runnable files (project.json excluded).");
  } catch (error) {
    console.error("❌ Error packaging project:", error.message);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("📦 DojoCode Project Content Packager");
    console.log("");
    console.log("Usage: node createProjectContent.js <project-folder>");
    console.log("");
    console.log("Examples:");
    console.log("  node createProjectContent.js projects/project-samples/reactjs-example-project");
    console.log("  node createProjectContent.js projects/my-sandbox");
    process.exit(1);
  }

  await createProjectContent(path.resolve(args[0]));
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createProjectContent };
