"use client";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { blogColumns } from "@/components/admin/module/blog-columns";
import { useBlogs } from "@/features/blogs/api/use-blog";

const BlogsDetails = () => {
  const { data: blogsData, isPending } = useBlogs();

  if (isPending) {
    return <Loading />;
  }
  return (
    <DataTable data={blogsData ? blogsData : []} columns={blogColumns} />
  );
};

export default BlogsDetails;
