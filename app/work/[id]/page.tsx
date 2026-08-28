import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/works";
import WorkDetailView from "./WorkDetailView";

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ id: slug }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudyBySlug(id);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const title = caseStudy.seo?.title || `${caseStudy.title} — Case Study`;
  const description = caseStudy.seo?.description || caseStudy.summary;
  const image =
    caseStudy.seo?.image ||
    caseStudy.headerMedia?.[0]?.backgroundImage ||
    "/works/mejimeji.co/mejimeji-background.jpg";
  const url = `https://ayuba.vyuba.studio/work/${caseStudy.slug}`;

  return {
    title,
    description,
    keywords:
      caseStudy.seo?.keywords || [
        caseStudy.title,
        caseStudy.type,
        ...(caseStudy.specifics || []),
        ...(caseStudy.technologies || []),
      ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Ayuba Alexander`,
      description,
      url,
      type: "article",
      siteName: "Ayuba Alexander",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${caseStudy.title} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ayuba Alexander`,
      description,
      images: [image],
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { id } = await params;
  const caseStudy = getCaseStudyBySlug(id);

  if (!caseStudy) {
    notFound();
  }

  const title = caseStudy.seo?.title || `${caseStudy.title} — Case Study`;
  const description = caseStudy.seo?.description || caseStudy.summary;
  const image =
    caseStudy.seo?.image ||
    caseStudy.headerMedia?.[0]?.backgroundImage ||
    "/works/mejimeji.co/mejimeji-background.jpg";
  const url = `https://ayuba.vyuba.studio/work/${caseStudy.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    headline: title,
    description,
    url,
    image: image.startsWith("http")
      ? image
      : `https://ayuba.vyuba.studio${image}`,
    author: {
      "@type": "Person",
      name: "Ayuba Alexander",
      url: "https://ayuba.vyuba.studio",
    },
    creator: {
      "@type": "Person",
      name: "Ayuba Alexander",
    },
    keywords: caseStudy.seo?.keywords?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkDetailView caseStudy={caseStudy} />
    </>
  );
}
