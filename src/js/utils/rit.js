// Libraries
import isString from 'lodash/isString';


function isTruthy(val) {
  let ret = !!val;
  if (isString(val)) {
    ret = true;
  }

  return ret;
}

export default function rit(...args) {
  const cb = args.pop();
  const results = args.map((val) => {
    if (isTruthy(val)) {
      return val;
    }
    return null;
  });
  return results.filter(isTruthy).length ? cb(...results) : null;
}
