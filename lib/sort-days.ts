const daysOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const sortDays = (days: string) => {
  return days
    .split(",")
    .filter((day) => day) // Remove empty strings
    .sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b))
    .join(",");
};
