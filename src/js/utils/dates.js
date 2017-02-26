export function buildDateRange(start, end, format = 'YYYY-MM-DD') {
  const dates = [];
  const current = start.clone();
  while (current.isSameOrBefore(end, 'day')) {
    dates.push(current.format(format));
    current.add(1, 'day');
  }

  return dates;
}
