# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of web-based tools for sales coordinator tasks in the OOH (Out-of-Home) advertising industry. The project consists of four main calculators:

1. **Date Calculator** - Calculate days, weeks, and periods between dates with Monday start date helpers
2. **CPM Calculator** - Calculate budget, CPM, or impressions (requires exactly 2 inputs)
3. **Tax Calculator** - Add or remove tax based on selected market
4. **Creative Deadline** - Calculate creative due dates from start dates (1 week, 2 weeks, 4 weeks, 45 days)

## Architecture

- **Frontend**: Vanilla JavaScript with Webpack bundling
- **Styling**: Individual CSS files per component
- **Date Library**: date-fns for date calculations
- **Build System**: Webpack with separate dev/prod configs
- **Deployment**: GitHub Pages via dist folder subtree push

### Key Files Structure

- `src/index.js` - Main entry point that initializes all calculators and exposes them to window
- `src/index.html` - Single-page application with all tool interfaces
- `src/date-calculator.js` - DateCalculator class with date manipulation logic
- `src/cpm-calculator.js` - CPM calculations and number formatting utilities
- `src/production-tax-calculator.js` - Tax calculation logic and market data
- `src/creative-deadline.js` - Creative deadline calculations
- `webpack.common.js` - Shared webpack configuration
- `webpack.dev.js` - Development server configuration
- `webpack.prod.js` - Production build with `/coordinator-tools/` public path

### Architecture Notes

- All calculators are exposed to the global window object for easy browser console debugging
- Uses ES6 modules with Webpack bundling
- Date calculations handle edge cases (invalid ranges, max limits)
- Number formatting includes comma separation and decimal handling
- Each tool maintains its own state and DOM manipulation logic

## Development Commands

```bash
# Development server (opens browser automatically)
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Deploy to GitHub Pages
npm run deploy
# or manually:
git add dist && git commit -m "Build: Update dist for deployment" && git subtree push --prefix dist origin gh-pages
```

## Code Patterns

- Date inputs are standardized using `startOfDay(parseISO(date))`
- Number formatting uses `roundToDecimals()` utility from cpm-calculator.js
- All calculators follow a similar pattern: class instantiation → DOM binding → state management
- Error handling shows/hides error messages based on validation states
- Copy functionality is implemented for calculated values throughout the interface