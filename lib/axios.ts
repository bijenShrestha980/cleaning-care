import Axios, { InternalAxiosRequestConfig } from "axios";
import { PageOptions } from "@/types";
import { toast } from "@/hooks/use-toast";

declare module "axios" {
  interface AxiosResponse {
    pageOptions: PageOptions;
  }
}

// In-memory session cache
let cachedSession: { token: string; expiresAt: number } | null = null;

// Function to verify and cache the session
export const verifySession = async (): Promise<{ token: string } | null> => {
  // Check if cached session exists and hasn't expired
  if (cachedSession && Date.now() < cachedSession.expiresAt) {
    return { token: cachedSession.token };
  }

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.api_dev || ""
      : process.env.api_prod || "";

  try {
    const response = await Axios.get(baseUrl);
    const session = response.data.session;

    if (session?.token) {
      // Cache the session and set an expiration (e.g., 1 hour from now)
      cachedSession = {
        token: session.token,
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour expiry
      };
    }

    return session;
  } catch (error) {
    console.error("Session verification failed:", error);

    toast({
      title: "Sign in failed",
      variant: "destructive",
    });

    return null; // Return null when session verification fails
  }
};

// Axios instance
export const axios = Axios.create({
  baseURL: process.env.url,
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
    toast({
      title: "Error",
      description: error?.response?.data?.title || error?.message,
      variant: "destructive",
    });

    return Promise.reject(error);
  }
);

// Function to manually clear the cached session (e.g., on logout)
export const clearSessionCache = () => {
  cachedSession = null;
};
