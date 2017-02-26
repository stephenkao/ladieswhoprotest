// Libraries
import 'babel-polyfill';
import gulp from 'gulp';
import TaskMetadata from 'undertaker-task-metadata';
// Configuration
import {
  jsFiles,
  pageFiles,
  scssFiles,
  testFiles
} from './config/env';
// Utilities
import gatherTasks from './gulp/util/gather-tasks';

// Add `name` to Gulp task closures
// Why we need an external module for just this is beyond me.
// Thanks for nothing, Gulp v4!
gulp.registry(new TaskMetadata());
const tasks = gatherTasks(gulp);

gulp.task('clean', tasks.clean);

gulp.task('lint', tasks.lint);

gulp.task('browser-sync', tasks.browserSync);


gulp.task('webpack:build', tasks.webpack);
gulp.task('webpack:hot', tasks.webpack);

// TODO: Make WP request and generate partials for each entry
gulp.task('assemble', tasks.assemble);


gulp.task('build', gulp.series(
  'clean',
  'lint',
  'webpack:build',
  'assemble'
));

gulp.task('watch:subscribe', () => {
  gulp.watch([jsFiles, scssFiles, pageFiles]).on('change', gulp.series('assemble'));
  gulp.watch([jsFiles, testFiles]).on('change', gulp.series('lint'));
});

gulp.task('watch', gulp.series(
  'clean',
  'lint',
  'webpack:hot',
  'assemble',
  'browser-sync',
  'watch:subscribe'
));
