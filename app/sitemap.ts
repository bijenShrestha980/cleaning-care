import { fetchAllServices } from "@/features/services/api/use-service";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceData = await fetchAllServices();

  return [
    { url: "/", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
    ...serviceData.map((service) => ({
      url: `/services/${service.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
