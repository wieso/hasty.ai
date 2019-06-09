const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',

  output: {
    path: '/',
    filename: 'index.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './public/',
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API: JSON.stringify(process.env.API),
        API_KEY: JSON.stringify(process.env.API_KEY),
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$|.css$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
