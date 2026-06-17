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

    // Create zip with ALL files from the template folder directly
    const zip = new JSZip();

    // Add all files and folders, excluding exportedContent.zip
    addDirectoryToZip(zip, challengePath, "", ["exportedContent.zip"]);

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

module.exports = { createExportContent };
