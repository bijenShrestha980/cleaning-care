export const convertDaysRange = (days: string) => {
  const daysArray = days.split(",");
  if (daysArray.length > 1) {
    return `${daysArray[0]}-${daysArray[daysArray.length - 1]}`;
  }
  return days;
};
