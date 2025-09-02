#!/usr/bin/env node

/**
 * Security audit script to identify potential security vulnerabilities
 * Checks for common security anti-patterns and issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECURITY_PATTERNS = [
  // Hardcoded secrets
  {
    pattern: /['"]changeme-in-prod['"]/g,
    name: 'Hardcoded default secret',
    severity: 'HIGH',
    description: 'Default secrets should not be in production code'
  },
  {
    pattern: /['"]your-secret-key-change-in-production['"]/g,
    name: 'Hardcoded default secret',
    severity: 'HIGH',
    description: 'Default secrets should not be in production code'
  },
  // SQL injection patterns
  {
    pattern: /`\$\{.*\}`/g,
    name: 'Potential SQL injection',
    severity: 'HIGH',
    description: 'Template literals with variables could be dangerous'
  },
  // XSS patterns
  {
    pattern: /dangerouslySetInnerHTML/g,
    name: 'Potential XSS vulnerability',
    severity: 'MEDIUM',
    description: 'dangerouslySetInnerHTML can lead to XSS attacks'
  },
  // Environment variable exposure
  {
    pattern: /console\.log.*process\.env/g,
    name: 'Environment variable logging',
    severity: 'MEDIUM',
    description: 'Environment variables should not be logged'
  },
  // CORS issues
  {
    pattern: /Access-Control-Allow-Origin.*\*/g,
    name: 'Overly permissive CORS',
    severity: 'MEDIUM',
    description: 'Wildcard CORS can be a security risk'
  },
  // Authentication bypass
  {
    pattern: /if\s*\(.*NODE_ENV.*development.*\)/g,
    name: 'Development-only authentication',
    severity: 'LOW',
    description: 'Development mode authentication bypasses'
  }
];

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    SECURITY_PATTERNS.forEach(({ pattern, name, severity, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          name,
          severity,
          description,
          count: matches.length,
          lines: []
        });
        
        // Find line numbers
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (pattern.test(line)) {
            issues[issues.length - 1].lines.push(index + 1);
          }
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

function generateSecurityReport(issues) {
  console.log('\n🔒 SECURITY AUDIT REPORT');
  console.log('========================');
  
  if (issues.length === 0) {
    console.log('✅ No security issues found!');
    return;
  }
  
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  
  // Group by severity
  const highIssues = [];
  const mediumIssues = [];
  const lowIssues = [];
  
  issues.forEach(({ file, issues: fileIssues }) => {
    fileIssues.forEach(issue => {
      const issueWithFile = { ...issue, file };
      switch (issue.severity) {
        case 'HIGH':
          highIssues.push(issueWithFile);
          highCount += issue.count;
          break;
        case 'MEDIUM':
          mediumIssues.push(issueWithFile);
          mediumCount += issue.count;
          break;
        case 'LOW':
          lowIssues.push(issueWithFile);
          lowCount += issue.count;
          break;
      }
    });
  });
  
  // Display by severity
  if (highIssues.length > 0) {
    console.log('\n🚨 HIGH SEVERITY ISSUES:');
    highIssues.forEach(issue => {
      console.log(`  🔴 ${issue.file}:${issue.lines.join(',')} - ${issue.name}`);
      console.log(`     ${issue.description}`);
    });
  }
  
  if (mediumIssues.length > 0) {
    console.log('\n⚠️  MEDIUM SEVERITY ISSUES:');
    mediumIssues.forEach(issue => {
      console.log(`  🟡 ${issue.file}:${issue.lines.join(',')} - ${issue.name}`);
      console.log(`     ${issue.description}`);
    });
  }
  
  if (lowIssues.length > 0) {
    console.log('\nℹ️  LOW SEVERITY ISSUES:');
    lowIssues.forEach(issue => {
      console.log(`  🔵 ${issue.file}:${issue.lines.join(',')} - ${issue.name}`);
      console.log(`     ${issue.description}`);
    });
  }
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`  🔴 HIGH: ${highCount} issues`);
  console.log(`  🟡 MEDIUM: ${mediumCount} issues`);
  console.log(`  🔵 LOW: ${lowCount} issues`);
  
  console.log('\n🛡️  SECURITY RECOMMENDATIONS:');
  console.log('1. Remove all hardcoded secrets and use environment variables');
  console.log('2. Implement proper input validation and sanitization');
  console.log('3. Use parameterized queries to prevent SQL injection');
  console.log('4. Implement proper CORS policies');
  console.log('5. Add rate limiting to sensitive endpoints');
  console.log('6. Use HTTPS in production');
  console.log('7. Implement proper session management');
  console.log('8. Add security headers (HSTS, CSP, etc.)');
}

async function main() {
  console.log('🔒 Starting security audit...');
  
  const rootDir = path.join(__dirname, '..');
  const issues = analyzeDirectory(rootDir);
  
  generateSecurityReport(issues);
  
  if (issues.length > 0) {
    console.log('\n🚨 IMMEDIATE ACTIONS REQUIRED:');
    console.log('1. Fix all HIGH severity issues immediately');
    console.log('2. Review and fix MEDIUM severity issues');
    console.log('3. Consider fixing LOW severity issues');
    console.log('4. Run security audit again after fixes');
  }
}

main().catch(console.error);
