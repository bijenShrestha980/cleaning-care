import type { MetadataRoute } from "next";
import { fetchAllServices } from "@/features/services/api/use-service";
import { SITE, absoluteUrl } from "@/lib/seo/config";
import { LOCATIONS, locationPath } from "@/lib/seo/locations";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about-us"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact-us"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const locationEntries: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: absoluteUrl(locationPath(l.slug)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  let serviceEntries: MetadataRoute.Sitemap = [];
  try {
    const services = await fetchAllServices();
    serviceEntries = services
      .filter((s) => s.service_slug)
      .map((s) => ({
        url: absoluteUrl(`/${s.service_slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));
  } catch {
    serviceEntries = [];
  }

  return [...staticEntries, ...serviceEntries, ...locationEntries];
}

export const _siteUrl = SITE.url;
