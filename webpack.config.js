const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  module: {
    rules: [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets',
        publicPath: 'assets',
      },
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    ],
  },
  devServer: {
    static: ['dist'],
    hot: true,
    historyApiFallback: true,
  },
};