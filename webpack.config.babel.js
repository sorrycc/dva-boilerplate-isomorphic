import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { join } from 'path';

export default {

  devtool: '#source-map',

  entry: {
    index: './client/index.js',
  },

  output: {
    filename: '[name].js',
    path: join(__dirname, './dist'),
    publicPath: '/static/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]'
        ),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap'
        ),
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
  ],
};
