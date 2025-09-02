#!/usr/bin/env node

/**
 * Script to clean up debug logging statements from production code
 * Removes console.log statements with DEBUG patterns
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEBUG_PATTERNS = [
  /console\.log\s*\(\s*["']\[.*DEBUG.*\]/g,
  /console\.log\s*\(\s*["']DEBUG:/g,
  /console\.log\s*\(\s*["']Debug:/g,
  /console\.log\s*\(\s*["']\[SESSION DEBUG\]/g,
  /console\.log\s*\(\s*["']\[PRICING DEBUG\]/g,
  /console\.log\s*\(\s*["']\[PAYPAL DEBUG\]/g,
  /console\.log\s*\(\s*["']\[WEBHOOK DEBUG\]/g,
  /console\.log\s*\(\s*["']\[PDF DEBUG\]/g,
  /console\.log\s*\(\s*["']\[EMAIL DEBUG\]/g,
];

const DEBUG_COMMENTS = [
  /\/\/ NOTE:.*not implemented.*TODO:/g,
  /\/\/ TODO:.*not implemented/g,
  /\/\/ TODO:.*Implement.*endpoint/g,
];

function cleanupFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changes = 0;

    // Remove debug console.log statements
    DEBUG_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, '// DEBUG: Removed for production');
        changes += matches.length;
      }
    });

    // Remove debug comments
    DEBUG_COMMENTS.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, '// TODO: Implement missing functionality');
        changes += matches.length;
      }
    });

    if (changes > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned ${filePath}: ${changes} debug statements removed`);
      return changes;
    }
    return 0;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

function cleanupDirectory(dirPath, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let totalChanges = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other build directories
        if (!['node_modules', 'dist', 'build', '.git'].includes(item)) {
          totalChanges += cleanupDirectory(fullPath, extensions);
        }
      } else if (extensions.includes(path.extname(item))) {
        totalChanges += cleanupFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }
  
  return totalChanges;
}

async function main() {
  console.log('🧹 Starting debug logging cleanup...');
  
  const rootDir = path.join(__dirname, '..');
  const totalChanges = cleanupDirectory(rootDir);
  
  console.log(`\n🎉 Cleanup completed! Total changes: ${totalChanges}`);
  console.log('\n📝 Next steps:');
  console.log('1. Review the changes to ensure no important logging was removed');
  console.log('2. Test the application to ensure functionality is preserved');
  console.log('3. Consider implementing proper logging levels for production');
}

main().catch(console.error);
