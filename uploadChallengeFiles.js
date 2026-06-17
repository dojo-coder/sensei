const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");

/**
 * Uploads a challenge zip file via multipart/form-data to the MCP upload endpoint.
 * Zero external dependencies — uses only Node.js built-ins.
 *
 * Usage: node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> <zipFilePath>
 */
function uploadChallengeFiles(uploadUrl, challengeId, variationId, zipFilePath) {
  const resolvedPath = path.resolve(zipFilePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const boundary = `----FormBoundary${Date.now().toString(16)}`;
  const fileName = path.basename(resolvedPath);
  const fileBuffer = fs.readFileSync(resolvedPath);

  // Build multipart/form-data body
  const parts = [];

  // file field
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: application/zip\r\n\r\n`
    )
  );
  parts.push(fileBuffer);
  parts.push(Buffer.from("\r\n"));

  // challengeId field
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="challengeId"\r\n\r\n${challengeId}\r\n`
    )
  );

  // variationId field
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="variationId"\r\n\r\n${variationId}\r\n`
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

if (args.length < 4) {
  console.log("Usage:");
  console.log(
    "  node uploadChallengeFiles.js <uploadUrl> <challengeId> <variationId> <zipFilePath>"
  );
  console.log("");
  console.log("Example:");
  console.log(
    "  node uploadChallengeFiles.js http://localhost:8833/api/v1/mcp/upload/abc123 64f... 64f... challenges/my-challenge/templates/nodejs-jest/exportedContent.zip"
  );
  process.exit(1);
}

uploadChallengeFiles(args[0], args[1], args[2], args[3]);
