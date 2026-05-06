import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Blog } from "@/components/admin/data/schema";

const getBlogs = async () => {
  const response = await axios.get(`/get-blogs`);
  return (response.data ?? response) as Blog[];
};

const getBlogBySlug = async (slug: string) => {
  const response = await axios.get(`/blogs/${slug}`);
  return (response.data ?? response) as Blog;
};

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
  });

export const useBlog = (slug: string) =>
  useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });

export const fetchAllBlogs = async () => {
  const response = await fetch(`${process.env.url}/api/get-blogs`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  // console.log(data, "datadata");
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data as Blog[];
};

export const fetchBlogBySlug = async (slug: string) => {
  const response = await fetch(`${process.env.url}/api/blogs/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return (data?.data ?? data) as Blog;
};
