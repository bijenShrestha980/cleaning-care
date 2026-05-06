import BlogForm from "@/features/blogs/components/blog-form";

const ViewBlog = () => {
  return (
    <div className="pb-5">
      <p className="font-medium mb-4">New blog</p>
      <BlogForm />
    </div>
  );
};

export default ViewBlog;
