const JSZip = require("jszip");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

/**
 * Downloads a project's file tree as a zip from the MCP project download
 * endpoint and extracts it (flat) into the target directory.
 *
 * Usage: node downloadProjectFiles.js <downloadUrl> <targetDir>
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

async function extractProject(zipBuffer, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const zip = await JSZip.loadAsync(zipBuffer);
  const writes = [];

  zip.forEach((relativePath, file) => {
    if (file.dir) {
      const dirPath = path.join(targetDir, relativePath);
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      return;
    }
    writes.push(
      file.async("nodebuffer").then((content) => {
        const filePath = path.join(targetDir, relativePath);
        const fileDir = path.dirname(filePath);
        if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });
        fs.writeFileSync(filePath, content);
        console.log(`   ✅ ${relativePath}`);
      })
    );
  });

  await Promise.all(writes);
  return writes.length;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Usage:");
    console.log("  node downloadProjectFiles.js <downloadUrl> <targetDir>");
    console.log("");
    console.log("Example:");
    console.log(
      "  node downloadProjectFiles.js https://api.dojocode.io/api/v1/mcp/download/abc123 projects/my-sandbox"
    );
    process.exit(1);
  }

  const downloadUrl = args[0];
  const targetDir = path.resolve(args[1]);

  try {
    console.log(`⬇️  Downloading from: ${downloadUrl}`);
    const zipBuffer = await downloadToBuffer(downloadUrl);
    console.log(`📦 Downloaded ${zipBuffer.length} bytes`);

    const count = await extractProject(zipBuffer, targetDir);
    console.log(`\n✅ Extracted ${count} file(s) to: ${targetDir}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
