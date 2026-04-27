import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: Props) => {
  if (!items || items.length === 0) return null;
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={
          className ??
          "w-full px-5 md:px-10 py-3 text-sm text-[#191919] opacity-70"
        }
      >
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className="hover:underline">
                    {item.name}
                  </Link>
                )}
                {!isLast ? (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
};
