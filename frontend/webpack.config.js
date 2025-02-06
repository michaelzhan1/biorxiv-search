const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// get javascript filenames and paths
const jsFiles = fs.readdirSync(path.resolve(__dirname, 'src/js'));
const entry = jsFiles.reduce((acc, filename) => {
  const name = filename.split('.')[0];
  acc[name] = path.resolve(__dirname, `src/js/${filename}`);
  return acc;
}, {});

// get HTML filenames and paths
const htmlFiles = fs.readdirSync(path.resolve(__dirname, 'src/html'));
const htmlPlugins = htmlFiles.map((filename) => {
  const name = filename.split('.')[0];
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `src/html/${filename}`),
    filename: filename,
    chunks: [name],
  });
});


module.exports = {
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    ...htmlPlugins,
  ],
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    watchFiles: ['src/js/*.js', 'src/html/*.html', 'src/css/*.css'],
  }
}