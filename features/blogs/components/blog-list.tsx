"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, User2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CustomImage } from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { Blog } from "@/components/admin/data/schema";

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : "";

const BlogMeta = ({ blog }: { blog: Blog }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#646464]">
    <span className="inline-flex items-center gap-1.5">
      <User2 size={14} className="opacity-70" />
      {blog.author_name}
    </span>
    {blog.published_at && (
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={14} className="opacity-70" />
        {formatDate(blog.published_at)}
      </span>
    )}
  </div>
);

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const [active, setActive] = useState<Blog | null>(null);

  if (!blogs.length) {
    return (
      <p className="text-center text-[#646464] py-16">
        No blog posts yet — check back soon.
      </p>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(featured)}
        className="group w-full text-left grid md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16 rounded-2xl overflow-hidden bg-white border border-[#e5e7eb] hover:shadow-xl transition-shadow"
      >
        <div className="relative w-full h-[240px] md:h-[420px] overflow-hidden">
          <CustomImage
            src={featured.image_url || ""}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
          {featured.category && (
            <span className="self-start px-3 py-1 text-xs font-medium rounded-full bg-[#F2FAFF] text-primary uppercase tracking-wide">
              {featured.category}
            </span>
          )}
          <h2 className="font-bricolageGrotesqueSans font-extrabold text-2xl md:text-4xl text-[#191919] leading-tight group-hover:text-primary transition-colors line-clamp-3">
            {featured.title}
          </h2>
          <p className="text-base text-[#374253] line-clamp-3 md:line-clamp-4">
            {featured.short_description}
          </p>
          <BlogMeta blog={featured} />
          <span className="inline-flex items-center gap-2 text-primary font-semibold mt-2">
            Read article
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </button>

      {rest.length > 0 && (
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((blog) => (
            <button
              key={blog.id}
              type="button"
              onClick={() => setActive(blog)}
              className="group text-left rounded-2xl overflow-hidden border border-[#e5e7eb] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-[200px] overflow-hidden">
                <CustomImage
                  src={blog.image_url || ""}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {blog.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/95 text-primary backdrop-blur">
                    {blog.category}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-semibold text-lg text-[#191919] leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-[#646464] line-clamp-3">
                  {blog.short_description}
                </p>
                <div className="mt-auto pt-3 border-t border-[#f1f3f5]">
                  <BlogMeta blog={blog} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 max-h-[90vh] flex flex-col">
          {active && (
            <>
              <div className="relative w-full h-[220px] md:h-[300px] shrink-0">
                <CustomImage
                  src={active.image_url || ""}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6 md:p-8 overflow-y-auto">
                {active.category && (
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#F2FAFF] text-primary uppercase tracking-wide mb-3">
                    {active.category}
                  </span>
                )}
                <DialogTitle className="font-bricolageGrotesqueSans font-extrabold text-2xl md:text-3xl text-[#191919] leading-tight mb-3">
                  {active.title}
                </DialogTitle>
                <div className="mb-4">
                  <BlogMeta blog={active} />
                </div>
                <DialogDescription asChild>
                  <p className="text-base text-[#374253] leading-relaxed">
                    {active.short_description}
                  </p>
                </DialogDescription>
                <div className="mt-6 flex justify-end">
                  <Link href={`/blog/${active.slug}`}>
                    <Button
                      size="lg"
                      className="rounded-xl inline-flex items-center gap-2"
                    >
                      Read full article
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogList;
