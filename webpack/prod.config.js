var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var polyfill = require('babel-polyfill');

module.exports = {
  entry: [
    './src/index',
  ],
  cache: false,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
  ],

  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', 'src'],
  },

  module: {
    loaders: [{
      test: /bootstrap\/js\//,
      loader: 'imports?jQuery=jquery',
    }, {
      test:[/\.jsx$/,  /\.js$/],
      loader: 'babel',
      query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy' ],
          presets: ['es2015', 'stage-0', 'react'],
      },
      include: [
        path.resolve(__dirname, "../src"),
        path.resolve(__dirname, "../node_modules/flash-notification-react-redux"),
        path.resolve(__dirname, "../node_modules/redux-form-validator"),
      ],
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff2',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-otf',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: [/\.scss$/, /\.css$/],
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
    }, {
      test: /\.png$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jpg$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] }), csswring];
  },
};
