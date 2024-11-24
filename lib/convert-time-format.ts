export const convertTimeFormat = (time) => {
  const [start, end] = time.split(",");
  const formatTime = (t) => {
    const [hour, minute] = t.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "pm" : "am";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };
  return `${formatTime(start)} - ${formatTime(end)}`;
};
