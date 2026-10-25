import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const basePath = "/VaibhavPortfolio";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  if (pathname === basePath) {
    response.writeHead(308, { location: `${basePath}/` }).end();
    return;
  }
  if (pathname === `${basePath}/`) pathname += "index.html";
  if (!pathname.startsWith(`${basePath}/`)) {
    response.writeHead(404).end();
    return;
  }

  let filePath = resolve(root, `.${pathname.slice(basePath.length)}`);
  if (!filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(404).end();
    return;
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, "index.html");
    const contents = await readFile(filePath);
    response.writeHead(200, {
      "content-length": contents.length,
      "content-type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    });
    response.end(request.method === "HEAD" ? undefined : contents);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      response.writeHead(404).end();
      return;
    }
    console.error("Failed to serve static export:", error);
    response.writeHead(500).end();
  }
});

server.listen(Number(process.env.PORT ?? 3000), "127.0.0.1");
