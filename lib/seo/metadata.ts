import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./config";

export type BuildMetadataInput = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

const DEFAULT_OG_IMAGE = "/opengraph-image";

export const buildMetadata = ({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  const resolvedTitle = title ?? SITE.defaultTitle;
  const resolvedDescription = description ?? SITE.defaultDescription;
  const resolvedImage = image ? absoluteUrl(image) : absoluteUrl(DEFAULT_OG_IMAGE);
  const resolvedAlt = imageAlt ?? `${SITE.name} — ${SITE.tagline}`;

  return {
    title: title ?? undefined,
    description: resolvedDescription,
    keywords:
      keywords && keywords.length > 0
        ? [...keywords, ...SITE.defaultKeywords]
        : [...SITE.defaultKeywords],
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: SITE.defaultLocale,
      url: canonical,
      siteName: SITE.name,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        { url: resolvedImage, width: 1200, height: 630, alt: resolvedAlt },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
      creator: SITE.twitter,
      site: SITE.twitter,
    },
  };
};
