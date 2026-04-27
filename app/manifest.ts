import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.defaultTitle,
    short_name: SITE.name,
    description: SITE.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: SITE.themeColor,
    orientation: "portrait",
    categories: ["business", "productivity", "lifestyle"],
    lang: "en-AU",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/images/logo-color.png", sizes: "any", type: "image/png" },
    ],
  };
}
