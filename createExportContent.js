const JSZip = require("jszip");
const fs = require("node:fs");
const path = require("node:path");

/**
 * Recursively adds all files and folders from a directory to a zip
 * @param {JSZip} zip - JSZip instance
 * @param {string} dirPath - Directory path to add
 * @param {string} zipBasePath - Base path in the zip file
 * @param {string[]} excludeFiles - Files to exclude (e.g., exportedContent.zip)
 */
function addDirectoryToZip(zip, dirPath, zipBasePath = "", excludeFiles = []) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    // Skip excluded files
    if (excludeFiles.includes(item)) {
      continue;
    }

    const itemPath = path.join(dirPath, item);
    const zipPath = zipBasePath ? `${zipBasePath}/${item}` : item;
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursively add directory contents
      addDirectoryToZip(zip, itemPath, zipPath, excludeFiles);
    } else if (stat.isFile()) {
      // Add file to zip
      const content = fs.readFileSync(itemPath);
      zip.file(zipPath, content);
    }
  }
}

/**
 * Gets the template key from the challenge path
 * @param {string} challengePath - Path to the challenge directory
 * @returns {string} Template key
 */
function getTemplateKey(challengePath) {
  // Check if path contains /templates/ to extract template name
  const normalizedPath = challengePath.replace(/\\/g, "/");
  const templatesMatch = normalizedPath.match(/templates\/([^/]+)/);

  if (templatesMatch) {
    return templatesMatch[1];
  }

  // For samples, use the sample folder name
  return path.basename(challengePath);
}

/**
 * Auto-generates README.md from details.json if README.md is missing.
 * The backend reads README.md from the zip to set the challenge description.
 * Just in case something happens and README is not generated or is empty, this ensures the description is included in the zip.
 * @param {string} challengePath - Path to the challenge/template directory
 */
function ensureReadme(challengePath) {
  const readmePath = path.join(challengePath, "README.md");
  const exists = fs.existsSync(readmePath);
  const isEmpty = exists && fs.readFileSync(readmePath, "utf-8").trim() === "";

  if (exists && !isEmpty) {
    return;
  }

  const detailsPath = path.join(challengePath, "details.json");
  if (!fs.existsSync(detailsPath)) {
    return;
  }

  try {
    const details = JSON.parse(fs.readFileSync(detailsPath, "utf-8"));
    if (details.description) {
      fs.writeFileSync(readmePath, details.description + "\n", "utf-8");
      const reason = isEmpty ? "empty" : "missing";
      console.log(`📝 Auto-generated README.md from details.json (was ${reason})`);
    }
  } catch (err) {
    console.warn("⚠️  Could not auto-generate README.md:", err.message);
  }
}

/**
 * Lists every file under a directory as "/relative/path" strings, sorted.
 * @param {string} dir - Directory to walk
 * @returns {string[]} File paths relative to dir, each starting with "/"
 */
function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.name !== "__pycache__")
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory()
        ? listFiles(full, base)
        : ["/" + path.relative(base, full).split(path.sep).join("/")];
    })
    .sort();
}

/**
 * Write-tests challenges (challengeMode "tests") carry a mutants/ folder: one
 * sub-folder per mutant whose files overlay solutionFiles/, plus
 * mutants/mutants.json with a label + description per mutant. The platform only
 * reads the container when the root mutants.json manifest is present, so this
 * (re)builds that manifest from the folder and refuses a zip the grader could
 * not use. Returns false for normal challenges.
 * @param {string} challengePath - Path to the challenge/template directory
 * @returns {boolean} true when the template is a write-tests variation
 */
function prepareWriteTests(challengePath) {
  const mutantsDir = path.join(challengePath, "mutants");
  if (!fs.existsSync(mutantsDir)) return false;

  const entry = { visible: true, readonly: false, redacted: false };
  const mutants = fs
    .readdirSync(mutantsDir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
  const problems = [];

  if (mutants.length === 0) problems.push("mutants/ has no mutant folders");

  const labelsPath = path.join(mutantsDir, "mutants.json");
  let labels = {};
  if (!fs.existsSync(labelsPath)) {
    problems.push("mutants/mutants.json is missing (label + description per mutant)");
  } else {
    labels = JSON.parse(fs.readFileSync(labelsPath, "utf-8"));
    for (const key of mutants) {
      if (!labels[key]) problems.push(`mutants/mutants.json has no entry for "${key}"`);
    }
    for (const key of Object.keys(labels)) {
      if (!mutants.includes(key)) problems.push(`mutants/mutants.json names "${key}" but there is no mutants/${key}/ folder`);
    }
  }

  const solution = new Set(listFiles(path.join(challengePath, "solutionFiles")));
  const folders = {};
  const files = { "/mutants.json": entry };
  for (const key of mutants) {
    folders["/" + key] = entry;
    const mutantFiles = listFiles(path.join(mutantsDir, key));
    if (mutantFiles.length === 0) problems.push(`mutants/${key}/ is empty`);
    for (const file of mutantFiles) {
      if (!solution.has(file)) problems.push(`mutants/${key}${file} does not overlay a file in solutionFiles/`);
      // nested folders of a mutant (e.g. /no-rounding/src) are declared too
      const parts = file.split("/").slice(1, -1);
      for (let depth = 1; depth <= parts.length; depth += 1) {
        folders["/" + key + "/" + parts.slice(0, depth).join("/")] = entry;
      }
      files["/" + key + file] = entry;
    }
  }

  if (listFiles(path.join(challengePath, "allTests")).length === 0) {
    problems.push("allTests/ needs the reference suite that catches every mutant");
  }

  if (problems.length) {
    throw new Error("write-tests challenge is not valid:\n   - " + problems.join("\n   - "));
  }

  fs.writeFileSync(path.join(challengePath, "mutants.json"), JSON.stringify({ folders, files }, null, 2) + "\n");

  // write-tests challenges have no initial tests
  const initialManifest = path.join(challengePath, "initialTests.json");
  if (!fs.existsSync(initialManifest)) {
    fs.writeFileSync(initialManifest, JSON.stringify({ folders: {}, files: {} }, null, 2) + "\n");
  }

  console.log(`🧪 Write-tests challenge: ${mutants.length} mutant(s) — ${mutants.join(", ")}`);
  console.log("   Create it with create_challenge { challengeMode: \"tests\" }; the mode cannot be changed later.");
  return true;
}

/**
 * Creates exportedContent.zip for a challenge template
 * This includes ALL files and folders from the template directory directly in the zip
 * @param {string} challengePath - Path to the challenge/template directory
 */
async function createExportContent(challengePath) {
  try {
    // Validate challenge path
    if (!fs.existsSync(challengePath)) {
      throw new Error(`Challenge path does not exist: ${challengePath}`);
    }

    // Get template key
    const templateKey = getTemplateKey(challengePath);
    console.log(`📦 Processing template: ${templateKey}`);

    // Ensure README.md exists (auto-generate from details.json if missing)
    ensureReadme(challengePath);

    // Write-tests challenges: validate mutants/ and rebuild the mutants.json manifest
    prepareWriteTests(challengePath);

    // Create zip with ALL files from the template folder directly
    const zip = new JSZip();

    // Add all files and folders, excluding exportedContent.zip
    addDirectoryToZip(zip, challengePath, "", ["exportedContent.zip", "__pycache__", ".pytest_cache"]);

    // Generate zip buffer
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Delete existing exportedContent.zip if it exists
    const zipPath = path.join(challengePath, "exportedContent.zip");
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
      console.log("🗑️  Removed existing exportedContent.zip");
    }

    // Save zip file
    fs.writeFileSync(zipPath, zipBuffer);

    console.log(`✅ exportedContent.zip created successfully at: ${zipPath}`);
    console.log(`   Contains all template files directly (no nested zip)`);
  } catch (error) {
    console.error("❌ Error creating exportedContent:", error.message);
    process.exit(1);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("📦 AI Code Challenge Export Content Generator");
    console.log("");
    console.log("Usage: node createExportContent.js <challenge-path>");
    console.log("");
    console.log("Examples:");
    console.log(
      "  node createExportContent.js samples/vuejs-example-challenge",
    );
    console.log(
      "  node createExportContent.js samples/python-example-challenge",
    );
    console.log(
      "  node createExportContent.js challenges/my-challenge/templates/vuejs-jest",
    );
    console.log("");
    console.log("This script will:");
    console.log(
      "  ✅ Include ALL files and folders from the template directory",
    );
    console.log(
      "  📦 Create exportedContent.zip with all files directly inside",
    );
    console.log("  🗑️  Remove existing exportedContent.zip if present");
    process.exit(1);
  }

  const challengePath = path.resolve(args[0]);
  await createExportContent(challengePath);
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createExportContent, prepareWriteTests };
