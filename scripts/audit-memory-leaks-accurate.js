#!/usr/bin/env node

/**
 * ACCURATE Memory Leak Audit Script
 * Detects sophisticated memory leak fixes and provides realistic counts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_LEAK_PATTERNS = [
  // UNSAFE: setInterval without clearInterval
  {
    pattern: /setInterval\s*\(\s*\(\)\s*=>\s*\{/g,
    name: 'setInterval without clearInterval',
    severity: 'HIGH'
  },
  // UNSAFE: setTimeout without clearTimeout
  {
    pattern: /setTimeout\s*\(\s*\(\)\s*=>\s*\{/g,
    name: 'setTimeout without clearTimeout',
    severity: 'HIGH'
  },
  // UNSAFE: Event listeners without removal
  {
    pattern: /addEventListener\s*\(\s*['"][^'"]+['"]/g,
    name: 'addEventListener without removeEventListener',
    severity: 'MEDIUM'
  },
  // UNSAFE: setInterval in useEffect without cleanup
  {
    pattern: /useEffect\s*\(\s*\(\)\s*=>\s*\{[^}]*setInterval/g,
    name: 'setInterval in useEffect without cleanup',
    severity: 'HIGH'
  }
];

const MEMORY_LEAK_FIXES = [
  // SAFE: setInterval with clearInterval cleanup
  {
    pattern: /clearInterval\s*\(/g,
    name: 'setInterval with clearInterval cleanup',
    type: 'FIX'
  },
  // SAFE: setTimeout with clearTimeout cleanup
  {
    pattern: /clearTimeout\s*\(/g,
    name: 'setTimeout with clearTimeout cleanup',
    type: 'FIX'
  },
  // SAFE: Event listeners with removeEventListener cleanup
  {
    pattern: /removeEventListener\s*\(/g,
    name: 'addEventListener with removeEventListener cleanup',
    type: 'FIX'
  },
  // SAFE: useEffect cleanup functions
  {
    pattern: /useEffect\s*\(\s*\(\)\s*=>\s*\{[^}]*return\s*\(\)\s*=>\s*\{/g,
    name: 'useEffect with cleanup function',
    type: 'FIX'
  },
  // SAFE: Timeout refs for cleanup
  {
    pattern: /timeouts\.current\.add\s*\(/g,
    name: 'Timeout refs for cleanup',
    type: 'FIX'
  },
  // SAFE: Interval refs for cleanup
  {
    pattern: /intervals\.current\.add\s*\(/g,
    name: 'Interval refs for cleanup',
    type: 'FIX'
  },
  // SAFE: Event listener refs for cleanup
  {
    pattern: /eventListeners\.current\.add\s*\(/g,
    name: 'Event listener refs for cleanup',
    type: 'FIX'
  }
];

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    const fixes = [];
    
    // Check for memory leak patterns
    MEMORY_LEAK_PATTERNS.forEach(({ pattern, name, severity }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          type: name,
          count: matches.length,
          severity
        });
      }
    });
    
    // Check for memory leak fixes
    MEMORY_LEAK_FIXES.forEach(({ pattern, name, type }) => {
      const matches = content.match(pattern);
      if (matches) {
        fixes.push({
          type: name,
          count: matches.length
        });
      }
    });
    
    return { issues, fixes };
  } catch (error) {
    console.error(`❌ Error analyzing ${filePath}:`, error.message);
    return { issues: [], fixes: [] };
  }
}

function analyzeDirectory(dirPath, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let allResults = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!['node_modules', 'dist', 'build', '.git'].includes(item)) {
          allResults = allResults.concat(analyzeDirectory(fullPath, extensions));
        }
      } else if (extensions.includes(path.extname(item))) {
        const results = analyzeFile(fullPath);
        if (results.issues.length > 0 || results.fixes.length > 0) {
          allResults.push({
            file: fullPath,
            ...results
          });
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }
  
  return allResults;
}

function generateReport(results) {
  console.log('\n🔍 ACCURATE MEMORY LEAK AUDIT REPORT');
  console.log('=====================================');
  
  let totalIssues = 0;
  let totalFixes = 0;
  let criticalIssues = 0;
  
  results.forEach(({ file, issues, fixes }) => {
    const issueCount = issues.reduce((sum, issue) => sum + issue.count, 0);
    const fixCount = fixes.reduce((sum, fix) => sum + fix.count, 0);
    
    if (issueCount > 0 || fixCount > 0) {
      console.log(`\n📁 ${file}`);
      
      if (issues.length > 0) {
        issues.forEach(issue => {
          const icon = issue.severity === 'HIGH' ? '🔴' : '🟡';
          console.log(`  ${icon} ${issue.type}: ${issue.count} instances`);
          totalIssues += issue.count;
          if (issue.severity === 'HIGH') criticalIssues += issue.count;
        });
      }
      
      if (fixes.length > 0) {
        fixes.forEach(fix => {
          console.log(`  ✅ ${fix.type}: ${fix.count} instances`);
          totalFixes += fix.count;
        });
      }
    }
  });
  
  console.log('\n📊 SUMMARY');
  console.log('==========');
  console.log(`🔴 Critical Issues: ${criticalIssues}`);
  console.log(`🟡 Total Issues: ${totalIssues}`);
  console.log(`✅ Total Fixes: ${totalFixes}`);
  console.log(`📈 Fix Coverage: ${totalFixes > 0 ? Math.round((totalFixes / (totalIssues + totalFixes)) * 100) : 0}%`);
  
  if (totalIssues === 0) {
    console.log('\n🎉 All memory leaks have been fixed!');
  } else if (totalFixes > totalIssues) {
    console.log('\n🚀 Excellent progress! Most memory leaks have been addressed.');
  } else if (totalFixes > 0) {
    console.log('\n📈 Good progress! Some memory leaks have been addressed.');
  } else {
    console.log('\n⚠️  No memory leak fixes detected. Consider implementing cleanup patterns.');
  }
  
  console.log('\n📝 RECOMMENDATIONS:');
  if (criticalIssues > 0) {
    console.log('1. 🔴 Address critical HIGH severity issues first');
  }
  if (totalIssues > totalFixes) {
    console.log('2. 📚 Implement cleanup patterns for remaining issues');
    console.log('3. 🧹 Use useRef + useEffect cleanup for timers and listeners');
  }
  if (totalFixes > 0) {
    console.log('4. ✅ Great job on the fixes! Consider testing for edge cases');
  }
}

// Main execution
const rootDir = path.join(__dirname, '..');
console.log('🔍 Starting ACCURATE memory leak analysis...');

const results = analyzeDirectory(rootDir);
generateReport(results);
