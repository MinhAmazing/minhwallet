// config-overrides.js
const webpack = require('webpack');

module.exports = function override(config) {
  // Bảo đảm config.resolve.fallback tồn tại
  if (!config.resolve.fallback) {
    config.resolve.fallback = {};
  }

  Object.assign(config.resolve.fallback, {
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert/'),
    util: require.resolve('util/'),
    buffer: 'buffer',
    process: 'process/browser',
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url/'),
    crypto: require.resolve('crypto-browserify')
  });

  // Thêm plugin để cung cấp biến process/browser và Buffer
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  return config;
};
