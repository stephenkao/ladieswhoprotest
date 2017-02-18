// Libraries
import webpack from 'webpack';
import gutil from 'gulp-util';
import isFunction from 'lodash/isFunction';
import Express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Rx, {Observable} from 'rx';
// Configuration
import {buildConfig, hotConfig} from '../../config/webpack';
import {distDir, distFiles} from '../../config/env';


function webpackBuild(gulp, cb) {
  const wpConfig = Object.create(buildConfig);

  return Observable.create((observer) => {
    webpack(wpConfig, (err, stats) => {
      if (err) throw new gutil.PluginError('webpack', err);

      gutil.log('[webpack]', stats.toString({
        colors: true,
        progress: true
      }));

      observer.onCompleted();
      if (cb) cb();
    });
  });
}

function webpackHot(gulp, cb) {
  const wpConfig = Object.create(hotConfig);
  const compiler = webpack(wpConfig);

  function logger(err) {
    if (err) {
      throw new gutil.PluginError({
        plugin: '[webpack]',
        message: err.message
      });
    }
  }

  return Observable.create((observer) => {
    const hmrServer = new Express();
    const hotPort = 8080;
    let hasRun = false;
    hmrServer.use(webpackDevMiddleware(compiler, {
      publicPath: hotConfig.output.publicPath
    }));
    hmrServer.use(webpackHotMiddleware(compiler));

    compiler.plugin('done', (stats) => {
      if (!hasRun) {
        hmrServer.listen(hotPort, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.info('Webpack development server listening on port %s', hotPort);
          }

          hasRun = true;

          observer.onCompleted();
          if (cb) cb();
        });
      }
    });
  });
}

export default function(gulp, cb) {
  switch (this.name) {
    case 'webpack:build':
      return webpackBuild(gulp, cb);
    case 'webpack:hot':
      return webpackHot(gulp, cb);
  }
}
