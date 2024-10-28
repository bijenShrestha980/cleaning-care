import Axios, { InternalAxiosRequestConfig } from "axios";
import { PageOptions } from "@/types";

declare module "axios" {
  interface AxiosResponse {
    pageOptions: PageOptions;
  }
}

// Axios instance
export const axiosLocal = Axios.create({
  baseURL: `/api`,
});

axiosLocal.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers.Accept = "application/json";
    return config;
  }
);

// Axios response interceptor for handling errors and responses
axiosLocal.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// In-memory session cache
let cachedSession: { token: string } | null = null;

// Function to verify and cache the session
export const verifySession = async (): Promise<{ token: string } | null> => {
  if (cachedSession) {
    return {
      token: cachedSession.token,
    };
  } else {
    const response = await axiosLocal.get("/session");
    const session = response.data.session;
    cachedSession = session;
    return session;
  }
};

// Axios instance
export const axios = Axios.create({
  baseURL: `${process.env.url}/api`,
});

// Axios request interceptor for adding token to Authorization header
axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const session = await verifySession();
  // const session = Cookies.get("session");
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  config.headers.Accept = "application/json";
  return config;
});

// Axios response interceptor for handling errors and responses
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to manually clear the cached session (e.g., on logout)
export const clearSessionCache = () => {
  cachedSession = null;
};
