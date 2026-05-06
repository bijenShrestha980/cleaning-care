import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/ui/custom-image";
import { fetchAllBlogs } from "@/features/blogs/api/use-blog";
import { buildMetadata } from "@/lib/seo/metadata";
import BlogList from "@/features/blogs/components/blog-list";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog | Cleaning Care",
    description:
      "Cleaning tips, guides, and updates from the Cleaning Care team.",
    path: "/blog",
  });
}

const BlogIndex = async () => {
  let blogs: Awaited<ReturnType<typeof fetchAllBlogs>> = [];
  try {
    const all = await fetchAllBlogs();
    blogs = (all || []).filter((b) => b.status === "approved");
  } catch {
    blogs = [];
  }

  return (
    <main className="-translate-y-[104px]">
      <div className="min-h-[380px] md:min-h-[530px] w-full relative">
        <CustomImage
          src={"/images/banner/banner-1.png"}
          alt="Cleaning Care blog"
          fill
          priority
          sizes="calc(100vw + 16px)"
          containerClassName="h-[530px]"
          className="h-full w-full absolute top-0 object-cover object-center -z-20"
        />
        <div className="w-full h-full absolute top-0 -z-10 bg-transbg" />
        <div className="w-full h-full absolute top-5 left-0 flex flex-col justify-center items-center text-center px-4">
          <span className="px-3 py-1 mb-4 text-xs md:text-sm font-medium rounded-full bg-white/15 text-primary-foreground backdrop-blur-sm uppercase tracking-wider">
            Insights & Tips
          </span>
          <h1 className="font-extrabold text-primary-foreground text-3xl md:text-[64px] leading-10 md:leading-[72px] font-bricolageGrotesqueSans mb-3">
            The Cleaning Care Blog
          </h1>
          <p className="text-primary-foreground/90 text-md md:text-2xl mb-9 max-w-[720px]">
            Tips, guides, and stories from our cleaning experts — fresh
            insights to keep your space spotless.
          </p>
          <Link
            href="/contact-us"
            aria-label="Contact Cleaning Care for inquiries"
          >
            <Button
              variant="success"
              size="lg"
              className="h-10 rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:-translate-y-1"
            >
              Call for Inquiries
            </Button>
          </Link>
        </div>
      </div>

      <section className="w-full px-5 md:px-10 py-10 md:py-16 max-w-[1280px] mx-auto">
        <BlogList blogs={blogs} />
      </section>
    </main>
  );
};

export default BlogIndex;
