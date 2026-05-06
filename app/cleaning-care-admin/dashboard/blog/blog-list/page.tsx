import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogsDetails from "@/features/blogs/components/blogs-details";

const Blogs = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Blogs</p>
        <Link href="/cleaning-care-admin/dashboard/blog/blog-list/view-blog">
          <Button animation={"scale_in"}>
            <Plus size={20} className="mr-2" />
            Add
          </Button>
        </Link>
      </div>
      <BlogsDetails />
    </section>
  );
};

export default Blogs;
