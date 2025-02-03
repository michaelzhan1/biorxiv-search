const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/index.js'],
    results: ['./src/results.js'],
    preferences: ['./src/preferences.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/results.html',
      filename: 'results.html',
      chunks: ['results'],
    }),
    new HtmlWebpackPlugin({
      template: './src/preferences.html',
      filename: 'preferences.html',
      chunks: ['preferences'],
    }),
  ],
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    watchFiles: ['src/**/*.js'],
  }
}