// Libraries
import del from 'del';
// Configuration
import {distDir} from '../../config/env';


export default function(gulp) {
  return del([distDir]);
}
