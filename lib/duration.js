const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

// "Aug 2025" -> months since year 0
export function toMonths(label) {
  const [m, y] = label.split(" ");
  return Number(y) * 12 + MONTHS[m];
}

// "1 yr 3 mos". `nowMonths` is only needed for roles that are still running.
export function formatDuration(start, end, nowMonths) {
  const to = end ? toMonths(end) : nowMonths;
  const n = Math.max(1, to - toMonths(start) + 1);
  const years = Math.floor(n / 12);
  const months = n % 12;
  const y = years ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months ? `${months} mo${months > 1 ? "s" : ""}` : "";
  return [y, m].filter(Boolean).join(" ");
}
