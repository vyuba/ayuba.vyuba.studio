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
  backgroundImage?: string;
  centerMedia?: {
    type: "image" | "video";
    url: string;
    aspectRatio?: string;
  };
}

const works: Work[] = [
  {
    id: 1,
    link: "https://example.com/project1",
    bannerImage: "/images/project1-banner.jpg",
    title: "Mejimeji",
    type: "Fashion Ecommerce",
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
    backgroundImage: "/works/mejimeji.co/mejimeji-background.jpg",
    centerMedia: {
      type: "image",
      url: "/works/mejimeji.co/mejimeji-center-media.png",
      aspectRatio: "9/16",
    },
  },
  {
    id: 2,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
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
    backgroundImage: "/works/alami-capital.com/alami-capital-background.jpg",
    centerMedia: {
      type: "video",
      url: "/works/alami-capital.com/alami-capital-center-media.mov",
      aspectRatio: "16/9",
    },
  },
  {
    id: 4,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Shopatunruly",
    type: "Fashion Ecommerce",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
    backgroundImage: "/works/shopatunruly.com/shopatunruly-background.png",
    centerMedia: {
      type: "video",
      url: "/works/shopatunruly.com/shopatunruly-center-media.mov",
      aspectRatio: "16/9",
    },
  },
  {
    id: 5,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Verdiskin",
    type: "Skincare Ecommerce",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
    backgroundImage: "/works/verdiskin.com/verdiskin-background.png",
    centerMedia: {
      type: "image",
      url: "/works/verdiskin.com/verdiskin-center-media.png",
      aspectRatio: "16/9",
    },
  },
  {
    id: 7,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "usecomos",
    type: "SaaS",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "portrait",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
    backgroundImage: "/works/usecomos.com/usecomos-background.png",
  },
  {
    id: 8,
    link: "https://example.com/project2",
    bannerImage: "/images/project2-banner.jpg",
    title: "Demo",
    type: "SaaS",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://example.com",
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
    backgroundImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    centerMedia: {
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  },
];

export default works;
