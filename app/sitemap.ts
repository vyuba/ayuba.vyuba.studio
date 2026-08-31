import { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ayuba.vyuba.studio";
  const caseStudySlugs = getAllCaseStudySlugs();

  const caseStudyUrls: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...caseStudyUrls,
  ];
}
