const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "low":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "high":
      return "text-red-500";
    default:
      return "text-red-500";
  }
};

export default getPriorityColor;
