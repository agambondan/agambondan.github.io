import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    host: "https://agambondan.github.io",
    sitemap: "https://agambondan.github.io/sitemap.xml"
  };
}
