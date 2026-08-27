export interface Work {
  id: number;
  link: string;
  bannerImage: string;
  title: string;
  type: string;
  skills: string[];
  selectedWorks: boolean;
  commingSoon: boolean;
  liveLink?: string;
  aspectRatio?: "portrait" | "landscape" | string;
  hasCaseStudy?: boolean;
  caseStudyUrl?: string;
  description?: string;
}

const works: Work[] = [
  {
    id: 1,
    link: "https://example.com/project1",
    bannerImage: "/images/project1-banner.jpg",
    title: "1% Studio",
    type: "Creative Agency",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "TailwindCSS",
      "Shopify",
      "Figma",
    ],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: true,
    caseStudyUrl: "https://example.com/project1",
    description:
      "A premier creative agency and digital brand platform built with Next.js, Shopify, and bespoke motion design.",
  },
  {
    id: 2,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Stack",
    type: "Productivity",
    skills: [
      "Figma",
      "React",
      "TypeScript",
      "Next.Js",
      "Shopify",
      "Shopify Non - Extended App",
    ],
    selectedWorks: true,
    commingSoon: true,
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description:
      "A minimal productivity workspace tool designed to eliminate distractions and streamline daily dev workflows.",
  },
  {
    id: 3,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "verdiskin store",
    type: "E-commerce",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: true,
    caseStudyUrl: "https://example.com/project2",
    description:
      "High-conversion bespoke Shopify storefront engineered for skincare brand storytelling and fast checkout.",
  },
  {
    id: 4,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
  },
  {
    id: 5,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
  },
  {
    id: 6,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: true,
    caseStudyUrl: "https://example.com/project2",
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
  },
  {
    id: 7,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
  },
  {
    id: 8,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
  },
  {
    id: 9,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
  },
];

export default works;
