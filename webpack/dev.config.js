var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  cache:false,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist/'),
    publicPath: '/dist/',
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
      test:/\.jsx$/,
      loader: ['babel'],
      query: {
        // https://github.com/babel/babel-loader#options
        cacheDirectory: false,
        plugins: ['transform-decorators-legacy' ],
        presets: ['es2015', 'react', 'stage-0'],
      },
      include: [
        path.resolve(__dirname, "../src"),
        path.resolve(__dirname, "../node_modules/flash-notification-react-redux"),
        path.resolve(__dirname, "../node_modules/redux-form-validator"),
      ],
    }, {
      test:/\.js$/,
      loader: ['babel'],
      query: {
        // https://github.com/babel/babel-loader#options
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy' ],
        presets: ['es2015', 'react', 'stage-0'],
      },
      include: [
        path.resolve(__dirname, "../src"),
        path.resolve(__dirname, "../node_modules/flash-notification-react-redux"),
        path.resolve(__dirname, "../node_modules/redux-form-validator"),
      ],
    }, {
      test: /\.json$/,
      loader: 'json',
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
      loader: 'css?localIdentName=[path]!postcss-loader!sass',
    }, {
      test: /\.png$/,
      loader: 'file?name=[name].[ext]',
    }, {
      test: /\.jpg$/,
      loader: 'file?name=[name].[ext]',
    }],
  },
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] }), csswring];
  },
};
