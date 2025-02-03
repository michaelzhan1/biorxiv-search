const path = require('path');
const Dotenv = require('dotenv-webpack');

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
    new Dotenv()
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