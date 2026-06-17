const JSZip = require("jszip");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

/**
 * Downloads a challenge zip file from the MCP download endpoint and extracts
 * all template variations into the target directory.
 *
 * Usage: node downloadChallengeFiles.js <downloadUrl> <targetTemplatesDir>
 *
 * The script will:
 *   1. Download the main zip from the MCP REST endpoint
 *   2. Extract each inner template zip (nodejs.zip, python.zip, etc.) into its own folder
 *   3. Clean up the downloaded zip automatically
 */

/**
 * Downloads a file from a URL and returns the content as a Buffer.
 */
function downloadToBuffer(downloadUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(downloadUrl);
    const transport = parsed.protocol === "https:" ? https : http;

    const options = {
      method: "GET",
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
    };

    const req = transport.request(options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      } else {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () =>
          reject(new Error(`Download failed (HTTP ${res.statusCode}): ${data}`))
        );
      }
    });

    req.on("error", reject);
    req.end();
  });
}

/**
 * Extracts all template zips from a main challenge zip buffer.
 */
async function extractTemplates(zipBuffer, targetDir) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const mainZip = await JSZip.loadAsync(zipBuffer);

  // Find all inner zip files (template zips)
  const templateZips = [];
  mainZip.forEach((relativePath, file) => {
    if (!file.dir && relativePath.endsWith(".zip")) {
      const templateName = relativePath.replace(".zip", "");
      templateZips.push({ templateName, file });
    }
  });

  if (templateZips.length === 0) {
    throw new Error("No template zip files found in main zip");
  }

  console.log(
    `📋 Found ${templateZips.length} template(s): ${templateZips
      .map((t) => t.templateName)
      .join(", ")}`
  );

  // Extract each template zip
  for (const { templateName, file } of templateZips) {
    const templateDir = path.join(targetDir, templateName);

    if (!fs.existsSync(templateDir)) {
      fs.mkdirSync(templateDir, { recursive: true });
    }

    const innerZipBuffer = await file.async("nodebuffer");
    const innerZip = await JSZip.loadAsync(innerZipBuffer);

    console.log(`\n📂 Extracting template: ${templateName}`);

    const extractPromises = [];

    innerZip.forEach((relativePath, innerFile) => {
      if (innerFile.dir) {
        const dirPath = path.join(templateDir, relativePath);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
      } else {
        extractPromises.push(
          innerFile.async("nodebuffer").then((content) => {
            const filePath = path.join(templateDir, relativePath);
            const fileDir = path.dirname(filePath);

            if (!fs.existsSync(fileDir)) {
              fs.mkdirSync(fileDir, { recursive: true });
            }

            fs.writeFileSync(filePath, content);
            console.log(`   ✅ ${relativePath}`);
          })
        );
      }
    });

    await Promise.all(extractPromises);
  }

  return templateZips.map((t) => t.templateName);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Usage:");
    console.log(
      "  node downloadChallengeFiles.js <downloadUrl> <targetTemplatesDir>"
    );
    console.log("");
    console.log("Example:");
    console.log(
      "  node downloadChallengeFiles.js http://localhost:8833/api/v1/mcp/download/abc123 challenges/fizz-buzz/templates"
    );
    process.exit(1);
  }

  const downloadUrl = args[0];
  const targetDir = path.resolve(args[1]);

  try {
    // Step 1: Download
    console.log(`⬇️  Downloading from: ${downloadUrl}`);
    const zipBuffer = await downloadToBuffer(downloadUrl);
    console.log(`📦 Downloaded ${zipBuffer.length} bytes`);

    // Step 2: Extract
    const templates = await extractTemplates(zipBuffer, targetDir);

    console.log(
      `\n✅ Successfully downloaded and extracted ${templates.length} template(s) to: ${targetDir}`
    );
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
