function isTruthy(val) {
  return !!val; // eslint-disable-line no-extra-boolean-cast
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
