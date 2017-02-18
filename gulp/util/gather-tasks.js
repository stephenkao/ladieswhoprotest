// Libraries
import camelCase from 'lodash/camelCase';
import requireDir from 'require-dir';


/**
 * Gather all tasks in gulp/tasks and assign them to a returned `tasks` object
 *
 * @return {Object} // Object of tasks keyed by camel-cased filename
 */
export default function(gulp) {
  const retVal = {};

  const tasks = requireDir('../tasks', {camelCase: true});
  for (let key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      const taskFn = tasks[key];
      const taskName = camelCase(key);
      if (typeof taskFn === 'function') {
        Object.assign(retVal, {[taskName]: function(cb) {
          return taskFn.call(this, gulp, cb);
        }});
      }
    }
  }

  return retVal;
}
