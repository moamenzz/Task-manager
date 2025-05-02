const formatTime = (createdAt: Date) => {
  const now = new Date();
  const created = new Date(createdAt);

  // Helper function to check if dates are the same day
  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // If created today
  if (isSameDay(created, now)) {
    return "Today";
  }

  // If created yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameDay(created, yesterday)) {
    return "Yesterday";
  }

  // If within last 6 days
  const sixDaysAgo = new Date(now);
  sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
  if (created > sixDaysAgo) {
    const diffDays = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${diffDays} days ago`;
  }

  // If within last 3 weeks
  const threeWeeksAgo = new Date(now);
  threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
  if (created > threeWeeksAgo) {
    const diffWeeks = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    return `${diffWeeks} weeks ago`;
  }

  // Otherwise return formatted date
  return created.toLocaleDateString("en-GB");
};

export default formatTime;
