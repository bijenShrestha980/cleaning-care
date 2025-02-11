import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { createQueryParams } from "@/lib/create-query-params";
import { QueryParams } from "@/types";
import { Service } from "@/components/admin/data/schema";

const getAllServices = async (query?: QueryParams) => {
  const response = await axios.get(
    `/get-all-services?${createQueryParams(query || {})}`
  );
  return response.data as Service[];
};

const getServices = async (query?: QueryParams) => {
  const response = await axios.get(
    `/service?${createQueryParams(query || {})}`
  );
  return response.data as Service[];
};

const getService = async (id: number) => {
  const response = await axios.get(`/service/${id}`);
  return response.data as Service;
};

const getServiceByCategoryId = async (id: number) => {
  const response = await axios.get(`/get-service-by-category/${id}`);
  return response.data as Service;
};

export const useAllServices = (query?: QueryParams) =>
  useQuery({
    queryKey: ["services", query],
    queryFn: () => getAllServices(query || {}),
  });

export const useServices = (query?: QueryParams) =>
  useQuery({
    queryKey: ["service", query],
    queryFn: () => getServices(query || {}),
  });

export const useService = (id: number) =>
  useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id),
  });

export const useServiceByCategoryId = (id: number) =>
  useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceByCategoryId(id),
  });

export const fetchAllServices = async () => {
  const response = await fetch(`${process.env.url}/api/get-all-services`, {
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data.data as Service[];
};

export const fetchServiceByCategoryId = async (id: number) => {
  const response = await fetch(
    `${process.env.url}/api/get-service-by-category/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data.data as Service;
};

export const fetchServiceByCategorySlug = async (slug: string) => {
  const response = await fetch(
    `${process.env.url}/api/get-service-by-category/${slug}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data.data as Service;
};
