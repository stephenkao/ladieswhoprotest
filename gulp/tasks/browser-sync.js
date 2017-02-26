// Libraries
import browserSync from 'browser-sync';
// Configuration
import { distDir } from '../../config/env';


const middleware = [
  // Permissions
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'authorization, accept');
    res.setHeader('Access-Control-Max-Age', '1728000');
    if (req.method === 'OPTIONS') {
      res.end();
    } else {
      next();
    }
  },
  // Expire headers
  (req, res, next) => {
    res.setHeader('cache-control', 'public, max-age=0');
    next();
  }
];

export default function(gulp, cb) {
  browserSync({
    middleware,
    server: {
      baseDir: distDir,
      index: 'index.html'
    }
  }, cb);
}
