// Libraries
import eslint from 'gulp-eslint';
// Configuration
import {
  baseDir,
  gulpFile,
  gulpFiles,
  jsFiles,
  testFiles
} from '../../config/env';

const shouldFix = process.argv.indexOf('--fix') !== -1;

const lintableFiles = [
  gulpFile,
  gulpFiles,
  jsFiles,
  testFiles
];

const eslintConfig = {
  config: `${baseDir}/.eslintrc.js`,
  color: true,
  debug: true,
  fix: shouldFix,
  useEslintrc: true
};

function lint(gulp) {
  return gulp.src(lintableFiles)
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format());
}

export default function(gulp) {
  return lint(gulp);
}
