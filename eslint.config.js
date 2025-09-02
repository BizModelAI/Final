import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        atob: 'readonly',
        btoa: 'readonly',
        caches: 'readonly',
        navigator: 'readonly',
        AbortController: 'readonly',
        crypto: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        
        // Timer globals
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        
        // Node.js types
        NodeJS: 'readonly',
        
        // DOM types
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        HTMLHeadingElement: 'readonly',
        HTMLImageElement: 'readonly',
        HTMLElement: 'readonly',
        EventTarget: 'readonly',
        Event: 'readonly',
        EventListener: 'readonly',
        MouseEvent: 'readonly',
        Node: 'readonly',
        KeyboardEvent: 'readonly',
        BeforeUnloadEvent: 'readonly',
        RequestInit: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
        Blob: 'readonly',
        FormData: 'readonly',
        CacheStorage: 'readonly',
        Navigator: 'readonly',
        URLSearchParams: 'readonly',
        XMLHttpRequest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // Relaxed rules for development
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'unused-imports/no-unused-imports': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-duplicate-imports': 'warn',
      
      // Allow console.log in development
      'no-console': 'off',
      
      // Allow any types for now (can be tightened later)
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Allow @ts-ignore for now
      '@typescript-eslint/ban-ts-comment': 'warn',
      
      // Allow require in .js files
      '@typescript-eslint/no-require-imports': 'off',
      
      // Allow prototype builtins
      'no-prototype-builtins': 'off',
      
      // Allow case declarations
      'no-case-declarations': 'off',
      
      // Allow useless catch for now
      'no-useless-catch': 'off',
      
      // Allow unreachable code for now
      'no-unreachable': 'warn',
      
      // Allow empty interfaces for now
      '@typescript-eslint/no-empty-object-type': 'warn',
      
      // Allow empty blocks for now
      'no-empty': 'warn',
      
      // Allow unescaped entities for now
      'react/no-unescaped-entities': 'warn',
      
      // Allow unnecessary escapes for now
      'no-useless-escape': 'warn',
      
      // Allow missing display names for now
      'react/display-name': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
