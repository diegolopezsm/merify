# ESLint and Prettier Configuration

This project is now configured with ESLint and Prettier for code quality and formatting.

## Configuration Files

- `eslint.config.js` - ESLint configuration using the modern flat config format
- `.prettierrc.json` - Prettier configuration
- `.prettierignore` - Files to ignore for Prettier formatting

## Available Scripts

- `npm run lint` - Run ESLint to check for code quality issues
- `npm run lint:fix` - Run ESLint with auto-fix for fixable issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted
- `npm run type-check` - Run TypeScript type checking

## Features

### ESLint Configuration

- **Vue 3 support** with proper Vue file parsing
- **TypeScript support** with recommended rules
- **Electron support** with Node.js globals for main process files
- **Browser globals** for frontend files
- **Prettier integration** to avoid conflicts
- **Custom rules** for the project's needs

### Prettier Configuration

- Single quotes for strings
- Semicolons enabled
- 2-space indentation
- 80 character line width
- Trailing commas in ES5-compatible locations
- LF line endings

## Current Status

The configuration is working correctly with:

- ✅ Vue files parsing properly
- ✅ TypeScript files being linted
- ✅ Electron main process files supported
- ✅ Prettier formatting applied
- ✅ Auto-fix functionality working

## Remaining Issues

There are currently 18 linting issues remaining (7 errors, 11 warnings):

- Unused variables in some files
- TypeScript `any` type warnings
- One unnecessary escape character
- One Vue v-html security warning

These are code quality issues that should be addressed in the codebase rather than configuration changes.
