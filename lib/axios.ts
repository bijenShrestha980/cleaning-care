import Axios, { InternalAxiosRequestConfig } from "axios";
import { PageOptions } from "@/types";

declare module "axios" {
  interface AxiosResponse {
    pageOptions: PageOptions;
  }
}

const baseUrlLocal =
  process.env.NODE_ENV === "development"
    ? process.env.api_dev || ""
    : process.env.api_prod || "";

// Axios instance
export const axiosLocal = Axios.create({
  baseURL: `${baseUrlLocal}/api/`,
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
let cachedSession: { token: string; expiresAt: number } | null = null;

// Function to verify and cache the session
export const verifySession = async (): Promise<{ token: string } | null> => {
  // Check if cached session exists and hasn't expired
  if (cachedSession && Date.now() < cachedSession.expiresAt) {
    return { token: cachedSession.token };
  }

  const response = await axiosLocal.get("/session");
  const session = response.data.session;

  if (session?.token) {
    // Cache the session and set an expiration (e.g., 1 hour from now)
    cachedSession = {
      token: session.token,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour expiry
    };
  }

  return session;
};

// Axios instance
export const axios = Axios.create({
  baseURL: `${process.env.url}/api/`,
});

// Axios request interceptor for adding token to Authorization header
axios.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const session = await verifySession();

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
