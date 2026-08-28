import fs from "fs";
import path from "path";
import matter from "gray-matter";
import works, { Work } from "@/app/data/work";

export interface CaseStudyMediaItem {
  id?: string;
  backgroundImage?: string;
  centerMedia?: {
    type: "image" | "video";
    url: string;
    aspectRatio?: string;
  };
  aspectRatio?: string;
}

export interface CaseStudySection {
  type: "grid-2" | "grid-3" | "full" | "split" | "text";
  title?: string;
  description?: string;
  items?: CaseStudyMediaItem[];
}

export interface CaseStudySEO {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  type: string;
  summary: string;
  liveUrl?: string;
  specifics: string[];
  technologies: string[];
  credits: { role: string; name: string }[];
  headerMedia: CaseStudyMediaItem[];
  sections: CaseStudySection[];
  content?: string;
  seo?: CaseStudySEO;
}

const worksDirectory = path.join(process.cwd(), "content/works");

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(worksDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(worksDirectory);
  return fileNames
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getCaseStudyBySlug(slugOrId: string): CaseStudyData | null {
  let targetSlug = slugOrId.toLowerCase();

  // If passed a numeric ID, find matching work and check its slug
  const numericId = parseInt(slugOrId, 10);
  if (!isNaN(numericId)) {
    const foundWork = works.find((w) => w.id === numericId);
    if (foundWork?.slug) {
      targetSlug = foundWork.slug.toLowerCase();
    }
  }

  const fullPath = path.join(worksDirectory, `${targetSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || targetSlug,
    title: data.title || "",
    type: data.type || "",
    summary: data.summary || "",
    liveUrl: data.liveUrl || undefined,
    specifics: data.specifics || [],
    technologies: data.technologies || [],
    credits: data.credits || [],
    headerMedia: data.headerMedia || [],
    sections: data.sections || [],
    content: content.trim(),
    seo: data.seo || undefined,
  };
}

export function getWorkBySlugOrId(slugOrId: string): Work | undefined {
  const numericId = parseInt(slugOrId, 10);
  if (!isNaN(numericId)) {
    return works.find((w) => w.id === numericId);
  }
  return works.find(
    (w) =>
      w.slug?.toLowerCase() === slugOrId.toLowerCase() ||
      w.title.toLowerCase().replace(/\s+/g, "") === slugOrId.toLowerCase(),
  );
}
