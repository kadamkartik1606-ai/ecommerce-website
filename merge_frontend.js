const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname);
const backendDir = path.join(root, 'backend');
const publicDir = path.join(backendDir, 'public');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const entries = fs.readdirSync(root, { withFileTypes: true });
for (const entry of entries) {
  const name = entry.name;
  if (name === 'backend' || name === 'merge_frontend.js') continue;

  const src = path.join(root, name);
  const dest = path.join(publicDir, name);

  fs.renameSync(src, dest);
  console.log(`Moved ${name}`);
}
console.log('Frontend merged into backend/public');
