// Libraries
import eslint from 'gulp-eslint';
import through from 'through2';
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

function lintAndFix(gulp) {
  function saveFixedFile(file) {
    if (file && file.eslint && file.eslint.fixed) {
      console.log(file);
    }
  }

  return through.obj((file, encoding, callback) => {
    if (shouldFix) {
      callback(null, saveFixedFile(file));
    } else {
      callback(null);
    }
  });
}

function lint(gulp) {
  return gulp.src(lintableFiles)
             .pipe(eslint(eslintConfig))
             .pipe(eslint.format())
             .pipe(lintAndFix(gulp));
}

export default function(gulp) {
  return lint(gulp);
}
