const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/coordinator-tools/',  // Add this line - must match your repo name
  }
});
