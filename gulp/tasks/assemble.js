// Libraries
import { resolve } from 'path';
import assemble from 'assemble';
import engine from 'engine-nunjucks';
import htmlmin from 'gulp-htmlmin';
import extname from 'gulp-extname';
// Configuration
import { distDir, pageFiles } from '../../config/env';


// NOTE: In a real-life scenario, only using one Assemble instance
// would probably result in data leakage!
const app = assemble();
app.engine('html', engine);
app.pages(pageFiles);

export default function() {
  /* eslint-disable global-require,import/no-dynamic-require */
  const assets = require(resolve(distDir, 'webpack-assets.json'));
  /* eslint-enable global-require,import/no-dynamic-require */
  return app.toStream('pages')
            .pipe(app.renderFile({ assets }))
            .on('error', global.console.log)
            .pipe(htmlmin())
            .pipe(extname())
            .pipe(app.dest('dist'))
            .on('error', global.console.log);
}
