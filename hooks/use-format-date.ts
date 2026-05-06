import { format, formatDistanceToNowStrict, isValid } from "date-fns";

import { DATE_FORMAT } from "@/constants/dateFormate";

const { MMMM_dd_yyyy_hh_mm_a } = DATE_FORMAT;

export const formatDate = (
  dateInput: string | Date,
  formatString: string = MMMM_dd_yyyy_hh_mm_a,
) => {
  const date = new Date(dateInput);
  if (!isValid(date)) return "Invalid Date";

  return format(date, formatString);
};

export const daysAgo = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  if (!isValid(date)) return "Invalid Date";

  return formatDistanceToNowStrict(date, { addSuffix: true });
};

export const useFormatDate = () => {
  return { formatDate, daysAgo };
};
