# coordinator-tools
A couple common tools I commonly use in the Sales Coordinator role.

Date Calculator
- Find the days, weeks, and periods between 2 dates.
- A couple buttons to easily find previous/next Monday start dates.

CPM Calculator
- Quickly calculate budgets, cpm, or impressions.

I built these tools because they were challenging enough to build and I'll use
them day to day in my role as a sales coordinator.

# Build the project
npm run build

# Add and commit dist folder
git add dist
git commit -m "Build: Update dist for deployment"

# Push to gh-pages branch
git subtree push --prefix dist origin gh-pages

// webpack.prod.js
module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/coordinator-tools/',
  }
});