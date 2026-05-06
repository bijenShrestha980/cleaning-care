import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CustomImage } from "@/components/ui/custom-image";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema, articleSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBusinessInfo } from "@/lib/seo/business";
import { fetchAllBlogs, fetchBlogBySlug } from "@/features/blogs/api/use-blog";

type Props = { params: { slug: string } };

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const blogs = await fetchAllBlogs();
    return blogs
      .filter((b) => b.status === "approved" && b.slug)
      .map((b) => ({ slug: b.slug as string }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const blog = await fetchBlogBySlug(params.slug);
    if (!blog) return buildMetadata({ path: `/blog/${params.slug}` });
    return buildMetadata({
      title: blog.meta_title || `${blog.title} | Cleaning Care Blog`,
      description: blog.meta_description || blog.short_description,
      path: `/blog/${params.slug}`,
      image: blog.image_url,
      imageAlt: blog.title,
      keywords: blog.meta_keywords
        ? blog.meta_keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean)
        : undefined,
      type: "article",
      publishedTime: blog.published_at,
      modifiedTime: blog.updated_at,
    });
  } catch {
    return buildMetadata({ path: `/blog/${params.slug}` });
  }
}

const BlogDetail = async ({ params }: Props) => {
  const [blog, business] = await Promise.all([
    fetchBlogBySlug(params.slug).catch(() => null),
    getBusinessInfo(),
  ]);

  if (!blog || blog.status !== "approved") notFound();

  return (
    <main className="-translate-y-[104px]">
      {blog.image_url && (
        <div className="w-full h-[280px] md:h-[420px] relative">
          <CustomImage
            src={blog.image_url}
            alt={blog.title}
            priority
            fill
            sizes="100vw"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      <article className="max-w-[820px] mx-auto px-5 md:px-8 py-10 md:py-14">
        <nav className="text-sm text-[#646464] mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[#191919] leading-tight mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 text-sm text-[#646464]">
          {blog.author_image_url && (
            <CustomImage
              src={blog.author_image_url}
              alt={blog.author_name}
              fill
              sizes="40px"
              containerClassName="w-[40px] h-[40px]"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          )}
          <span>By {blog.author_name}</span>
          {blog.published_at && (
            <span>· {new Date(blog.published_at).toLocaleDateString()}</span>
          )}
          {blog.category && (
            <span className="px-2 py-[2px] rounded-md bg-[#F2FAFF] text-primary text-xs">
              {blog.category}
            </span>
          )}
        </div>

        {blog.short_description && (
          <p className="text-lg text-[#374253] mb-8 italic">
            {blog.short_description}
          </p>
        )}

        <div className="ql-snow">
          <div
            className="ql-editor !p-0 text-base text-[#374253] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {blog.tags && (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-[#F2FAFF] text-primary"
                >
                  #{tag}
                </span>
              ))}
          </div>
        )}
      </article>

      <JsonLd
        data={[
          articleSchema(blog, business),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: blog.title, url: `/blog/${params.slug}` },
          ]),
        ]}
      />
    </main>
  );
};

export default BlogDetail;
