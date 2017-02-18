/**
 * Configuration file containing file directories and paths
 */

// Libraries
import {resolve} from 'path';


export const baseDir = resolve(__dirname, '..');

export const distDir = resolve(baseDir, 'dist');
export const distFiles = resolve(distDir, '**', '*');

export const gulpDir = resolve(baseDir, 'gulp');
export const gulpFile = resolve(baseDir, 'gulpfile.babel.js');
export const gulpFiles = resolve(gulpDir, '**', '*.js');

export const srcDir = resolve(baseDir, 'src');
export const jsFiles = resolve(srcDir, '**', '*.js');
export const scssFiles = resolve(srcDir, '**', '*.scss');
export const templateDir = resolve(srcDir, 'templates');
export const pageFiles = resolve(templateDir, 'pages', '**', '*.html');

export const testDir = resolve(baseDir, 'test');
export const testFiles = resolve(testDir, '**', '*-spec.js');
