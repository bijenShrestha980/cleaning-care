"use client";

import BlogForm from "@/features/blogs/components/blog-form";
import Loading from "@/components/ui/loading";
import Error from "@/components/ui/error";
import { useBlog } from "@/features/blogs/api/use-blog";

const ViewBlog = ({ params }: { params: { slug: string } }) => {
  const { data: blogData, isPending, isError } = useBlog(params.slug);

  if (isPending) return <Loading />;
  if (isError || !blogData) return <Error />;

  return (
    <div className="pb-5">
      <p className="font-medium mb-4">Edit blog</p>
      <BlogForm blog={blogData} id={blogData.id} />
    </div>
  );
};

export default ViewBlog;
