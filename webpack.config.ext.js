// https://medium.com/@SunnyGolovine/build-a-chrome-extension-using-reactjs-and-webpack-part-1-976a414b85d0

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseManifest = require('./extension/manifest.json');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.join(__dirname, './extension/app/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './extension/build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ChromaCards',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#000000',
      },
      manifest: 'manifest.json',
      filename: 'popup.html',
      template: './extension/static/popup.html',
      hash: true,
    }),
    new CopyPlugin({
      patterns: [{ from: './extension/icons', to: 'icons' }],
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest,
      },
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
