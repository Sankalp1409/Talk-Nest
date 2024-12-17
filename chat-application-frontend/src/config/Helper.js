export function timeAgo(date) {
  const now = new Date();
  const secondsElapsed = Math.floor((now - new Date(date)) / 1000);

  const intervals = {
    year: 31536000, // seconds in a year
    month: 2592000, // seconds in a month
    week: 604800, // seconds in a week
    day: 86400, // seconds in a day
    hour: 3600, // seconds in an hour
    minute: 60, // seconds in a minute
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(secondsElapsed / secondsInUnit);
    if (count > 0) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now"; // For cases where the date is very recent
}



