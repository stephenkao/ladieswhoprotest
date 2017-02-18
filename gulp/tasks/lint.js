// Libraries
import eslint from 'gulp-eslint';
// Configuration
import {
  gulpFile,
  gulpFiles,
  jsFiles,
  testFiles
} from '../../config/env';


function lintSource(gulp) {
  return gulp.src([gulpFile, gulpFiles, jsFiles])
             .pipe(eslint())
             .pipe(eslint.format());
}

function lintTests(gulp) {
  return gulp.src(testFiles)
             .pipe(eslint())
             .pipe(eslint.format());
}

export default function(gulp) {
  switch(this.name) {
    case 'lint:source':
      return lintSource(gulp);
    case 'lint:tests':
      return lintTests(gulp);
  }
}
