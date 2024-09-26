import { QueryParams } from "@/types";

export const createQueryParams = (query: QueryParams) =>
  Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
