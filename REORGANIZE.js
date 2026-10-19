const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname);
const frontendDir = path.join(root, 'frontend');

// List of files to move
const filesToMove = [
  'index.html', 'about.html', 'blog.html', 'cart.html', 'contact.html',
  'shop.html', 'sproduct.html', 'style.css', 'script.js', 'merge_frontend.js'
];

console.log('🔄 Starting folder reorganization...\n');

// Move individual files
filesToMove.forEach(file => {
  const src = path.join(root, file);
  const dest = path.join(frontendDir, file);
  
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    try {
      fs.renameSync(src, dest);
      console.log(`✓ Moved ${file}`);
    } catch (err) {
      console.error(`✗ Error moving ${file}:`, err.message);
    }
  }
});

// Move Images&Logo folder
const imagesSource = path.join(root, 'Images&Logo');
const imagesDest = path.join(frontendDir, 'Images&Logo');

if (fs.existsSync(imagesSource) && !fs.existsSync(imagesDest)) {
  try {
    fs.renameSync(imagesSource, imagesDest);
    console.log(`✓ Moved Images&Logo folder`);
  } catch (err) {
    console.error(`✗ Error moving Images&Logo:`, err.message);
  }
}

console.log('\n✅ Reorganization complete!');
console.log('\nNew structure:');
console.log('├── frontend/');
console.log('│   ├── *.html files');
console.log('│   ├── style.css');
console.log('│   ├── script.js');
console.log('│   └── Images&Logo/');
console.log('└── backend/');
console.log('    ├── server.js');
console.log('    └── ...');
