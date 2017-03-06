// Libraries
import path from 'path';
import webpack from 'webpack';
// Configuration
import {
  baseDir,
  distDir,
  srcDir
} from './env';
// Plugins
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
// Utilities
import autoprefixer from 'autoprefixer';
import extend from 'extend';


const isDebug = process.argv.indexOf('--debug') !== -1;
const isVerbose = process.argv.indexOf('--verbose') !== -1;

const config = {
  context: srcDir,
  output: {
    path: distDir,
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: [srcDir],
      query: {
        cacheDirectory: isDebug,
        babelrc: true,
        presets: ['react']
      },
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?sourceMap!autoprefixer-loader!sass-loader?sourceMap'
      })
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.txt$/,
      loader: 'raw-loader',
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader',
      query: {
        name: isDebug ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        limit: 10000,
      },
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader',
      query: {
        name: isDebug ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
      },
    }, {
      test: /\.html$/,
      loader: 'nunjucks-loader'
    }]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  cache: isDebug,
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss(bundler) {
          return [autoprefixer];
        }
      }
    })
  ]
};

export const buildConfig = extend(true, {}, config, {
  entry: path.resolve(srcDir, 'js', 'index.jsx'),
  output: {
    path: distDir,
    filename: '[name].js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: isVerbose }
    }),
    new ExtractTextPlugin('[name].css'),
    new AssetsPlugin({
      filename: 'webpack-assets.json',
      path: distDir
    })
  ],
  target: 'web'
});

export const hotConfig = extend(true, {}, config, {
  devtool: 'source-map',
  entry: [
    'webpack/hot/only-dev-server?path=http://localhost:8080',
    'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&timeout=20000',
    path.resolve(srcDir, 'js', 'index.jsx')
  ],
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: 'http://localhost:8080/dist/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
    new AssetsPlugin({
      filename: 'webpack-assets.json',
      path: distDir
    })
  ],
  target: 'web'
});
