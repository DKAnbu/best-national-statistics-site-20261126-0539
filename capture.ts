// Capture clean screenshots using local Playwright Chromium binary
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const PORT = 8089;
const APP_DIR = path.resolve('app');
const SCREENSHOTS_DIR = path.resolve('screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Simple static server
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url?.split('?')[0] || '/';
  const filePath = path.join(APP_DIR, urlPath === '/' ? 'index.html' : urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);

  const shots = [
    { file: '1-overview-desktop.png', path: '#/', width: 1280, height: 800 },
    { file: '2-economy-provinces.png', path: '#/economy', width: 1280, height: 800 },
    { file: '3-demographics-phone.png', path: '#/demographics', width: 390, height: 844 },
    { file: '4-trade-comparison.png', path: '#/trade', width: 1280, height: 800 }
  ];

  const chromiumPath = '/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome';

  for (const shot of shots) {
    const targetUrl = `http://localhost:${PORT}/${shot.path}`;
    const outPath = path.join(SCREENSHOTS_DIR, shot.file);
    console.log(`Capturing ${shot.file} from ${targetUrl} [${shot.width}x${shot.height}]...`);

    const args = [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      `--window-size=${shot.width},${shot.height}`,
      `--screenshot=${outPath}`,
      targetUrl
    ];

    await new Promise<void>((resolve, reject) => {
      const proc = spawn(chromiumPath, args);
      proc.on('close', (code) => {
        if (code === 0) {
          console.log(`Saved: ${outPath} (${fs.statSync(outPath).size} bytes)`);
          resolve();
        } else {
          reject(new Error(`Chromium exited with code ${code}`));
        }
      });
    });
  }

  server.close(() => {
    console.log('Capture completed and server closed.');
    process.exit(0);
  });
});
