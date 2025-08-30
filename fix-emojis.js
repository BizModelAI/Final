import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'client/src/pages/Index.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace broken emoji characters with proper ones
content = content.replace(/icon: ""/g, 'icon: "❓"');

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed broken emojis in Index.tsx');
console.log('Changed broken emoji boxes () to question mark emojis (❓)');
