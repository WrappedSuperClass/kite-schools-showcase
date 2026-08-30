const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "sites");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (urlPath.endsWith("/")) urlPath += "index.html";

    const filePath = path.join(ROOT, urlPath);
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isDirectory()) {
        res.writeHead(301, { Location: urlPath + "/" });
        return res.end();
      }
      fs.readFile(filePath, (err2, data) => {
        if (err2) {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end("404 — pas de vent ici.");
        }
        res.writeHead(200, {
          "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
          "Cache-Control": "public, max-age=300",
        });
        res.end(data);
      });
    });
  })
  .listen(PORT, () => console.log(`Kite schools showcase on :${PORT}`));
