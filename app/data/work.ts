export interface Work {
  id: number;
  slug?: string;
  link?: string;
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
    slug: "mejimeji",
    bannerImage: "/images/project1-banner.jpg",
    title: "Meji Meji",
    type: "Fashion Ecommerce",
    skills: ["JavaScript", "CSS", "Shopify", "Liquid", "Figma"],
    selectedWorks: true,
    commingSoon: false,
    aspectRatio: "portrait",
    hasCaseStudy: true,
    caseStudyUrl: "/work/mejimeji",

    description:
      "I was brought in by Amzora Automation to help make their operational scale visible and legible. The initial focus was on warehouse and operations design, shaping how the physical infrastructure, workflows, and systems were presented to reflect efficiency, credibility, and readiness to scale.As the work progressed, my involvement naturally expanded beyond spatial and visual execution into brand and growth leadership.",
    backgroundImage: "/works/mejimeji.co/mejimeji-background.jpg",
    centerMedia: {
      type: "image",
      url: "/works/mejimeji.co/mejimeji-center-media.png",
      aspectRatio: "9/16",
    },
  },
  {
    id: 2,
    link: "https://alami.netlify.app/",
    bannerImage: "/images/project2-banner.jpg",
    title: "Alami Capital",
    type: "Law Firm",
    skills: ["React", "TypeScript", "NextJS"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://alami.netlify.app/",
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
    link: "https://www.shopatunruly.com/",
    bannerImage: "/images/project2-banner.jpg",
    title: "Shopatunruly",
    type: "Fashion Ecommerce",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://www.shopatunruly.com/",
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
    link: "https://verdiskin.store/",
    bannerImage: "/images/project2-banner.jpg",
    title: "Verdiskin",
    type: "Skincare Ecommerce",
    skills: ["Figma", "Javascript", "Liquid", "Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://verdiskin.store/",
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
    bannerImage: "/images/project2-banner.jpg",
    title: "usecomos",
    type: "SaaS",
    skills: ["Figma", "React", "Tanstack Router", "Typescript"],
    selectedWorks: true,
    commingSoon: false,
    aspectRatio: "portrait",
    hasCaseStudy: false,
    description:
      "Modern corporate identity and digital presence for a boutique investment and legal advisory group.",
    backgroundImage: "/works/usecomos.com/usecomos-background.png",
  },
  {
    id: 8,
    link: "https://1percnt.com",
    bannerImage: "/images/project2-banner.jpg",
    title: "1Percnt Studio",
    type: "Creative Studio",
    skills: ["NextJS", "Typescript", "GraphQL", "Headless Shopify"],
    selectedWorks: true,
    commingSoon: false,
    liveLink: "https://1percnt.com",
    aspectRatio: "landscape",
    hasCaseStudy: false,
    description: "An independently owned production & post-production agency.",
    backgroundImage: "/works/1percnt.com/1percnt-background.webp",
    centerMedia: {
      type: "video",
      url: "/works/1percnt.com/1percnt-center-media.mov",
    },
  },
];

export default works;
