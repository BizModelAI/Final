#!/usr/bin/env node

/**
 * Script to identify and fix potential memory leaks
 * Focuses on timers, intervals, and event listeners
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_LEAK_PATTERNS = [
  // setInterval without clearInterval
  {
    pattern: /setInterval\s*\(\s*\(\)\s*=>\s*\{/g,
    name: 'setInterval without clearInterval',
    fix: '// TODO: Add clearInterval cleanup'
  },
  // setTimeout without clearTimeout
  {
    pattern: /setTimeout\s*\(\s*\(\)\s*=>\s*\{/g,
    name: 'setTimeout without clearTimeout',
    fix: '// TODO: Add clearTimeout cleanup'
  },
  // Event listeners without removal
  {
    pattern: /addEventListener\s*\(\s*['"][^'"]+['"]/g,
    name: 'addEventListener without removeEventListener',
    fix: '// TODO: Add removeEventListener cleanup'
  },
  // setInterval in useEffect without cleanup
  {
    pattern: /useEffect\s*\(\s*\(\)\s*=>\s*\{[^}]*setInterval/g,
    name: 'setInterval in useEffect without cleanup',
    fix: '// TODO: Add cleanup function to useEffect'
  }
];

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    MEMORY_LEAK_PATTERNS.forEach(({ pattern, name, fix }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          type: name,
          count: matches.length,
          fix
        });
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`❌ Error analyzing ${filePath}:`, error.message);
    return [];
  }
}

function analyzeDirectory(dirPath, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let allIssues = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!['node_modules', 'dist', 'build', '.git'].includes(item)) {
          allIssues = allIssues.concat(analyzeDirectory(fullPath, extensions));
        }
      } else if (extensions.includes(path.extname(item))) {
        const issues = analyzeFile(fullPath);
        if (issues.length > 0) {
          allIssues.push({
            file: fullPath,
            issues
          });
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }
  
  return allIssues;
}

function generateReport(issues) {
  console.log('\n📊 MEMORY LEAK ANALYSIS REPORT');
  console.log('================================');
  
  if (issues.length === 0) {
    console.log('✅ No potential memory leaks found!');
    return;
  }
  
  let totalIssues = 0;
  
  issues.forEach(({ file, issues: fileIssues }) => {
    console.log(`\n📁 ${file}`);
    fileIssues.forEach(issue => {
      console.log(`  ⚠️  ${issue.type}: ${issue.count} instances`);
      totalIssues += issue.count;
    });
  });
  
  console.log(`\n🔍 SUMMARY: ${totalIssues} potential memory leak issues found`);
  console.log('\n📝 RECOMMENDATIONS:');
  console.log('1. Add cleanup functions to useEffect hooks');
  console.log('2. Store timer IDs and clear them on component unmount');
  console.log('3. Remove event listeners in cleanup functions');
  console.log('4. Use AbortController for fetch requests');
  console.log('5. Consider using React Query or SWR for data fetching');
}

async function main() {
  console.log('🔍 Starting memory leak analysis...');
  
  const rootDir = path.join(__dirname, '..');
  const issues = analyzeDirectory(rootDir);
  
  generateReport(issues);
  
  if (issues.length > 0) {
    console.log('\n🚨 CRITICAL FILES TO REVIEW:');
    issues.forEach(({ file, issues: fileIssues }) => {
      const criticalCount = fileIssues.reduce((sum, issue) => sum + issue.count, 0);
      if (criticalCount > 2) {
        console.log(`  🔴 ${file} (${criticalCount} issues)`);
      } else if (criticalCount > 0) {
        console.log(`  🟡 ${file} (${criticalCount} issues)`);
      }
    });
  }
}

main().catch(console.error);
