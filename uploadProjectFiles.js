const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

/**
 * Uploads a project zip (built by createProjectContent.js) via multipart/form-data
 * to the MCP project upload endpoint. The server unzips it into the project's
 * file tree. Zero external dependencies — Node.js built-ins only. The file
 * contents never pass through the AI context.
 *
 * Usage: node uploadProjectFiles.js <uploadUrl> <projectId> <zipFilePath>
 */
function uploadProjectFiles(uploadUrl, projectId, zipFilePath) {
  const resolvedPath = path.resolve(zipFilePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const boundary = `----FormBoundary${Date.now().toString(16)}`;
  const fileName = path.basename(resolvedPath);
  const fileBuffer = fs.readFileSync(resolvedPath);

  const parts = [];

  // file field
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: application/zip\r\n\r\n`
    )
  );
  parts.push(fileBuffer);
  parts.push(Buffer.from("\r\n"));

  // projectId field
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="projectId"\r\n\r\n${projectId}\r\n`
    )
  );

  // closing boundary
  parts.push(Buffer.from(`--${boundary}--\r\n`));

  const body = Buffer.concat(parts);

  const parsed = new URL(uploadUrl);
  const transport = parsed.protocol === "https:" ? https : http;

  const options = {
    method: "POST",
    hostname: parsed.hostname,
    port: parsed.port,
    path: parsed.pathname + parsed.search,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
      "Content-Length": body.length,
    },
  };

  const req = transport.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(data);
      } else {
        console.error(`Upload failed (HTTP ${res.statusCode}): ${data}`);
        process.exit(1);
      }
    });
  });

  req.on("error", (err) => {
    console.error(`Upload error: ${err.message}`);
    process.exit(1);
  });

  req.write(body);
  req.end();
}

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage:");
  console.log("  node uploadProjectFiles.js <uploadUrl> <projectId> <zipFilePath>");
  console.log("");
  console.log("Example:");
  console.log(
    "  node uploadProjectFiles.js http://localhost:8833/api/v1/mcp/upload/abc123 64f... projects/my-sandbox/exportedContent.zip"
  );
  process.exit(1);
}

uploadProjectFiles(args[0], args[1], args[2]);
