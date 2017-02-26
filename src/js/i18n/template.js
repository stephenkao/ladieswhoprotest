export default function template(strings, ...keys) {
  return (...values) => {
    const params = values[values.length - 2];
    const render = values[values.length - 1];
    const result = [strings[0]];
    keys.forEach((key, idx) => {
      result.push(params[key], strings[idx + 1]);
    });
    return render(result);
  };
}
