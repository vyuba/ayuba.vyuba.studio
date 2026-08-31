import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import LenisScrollInit from "./components/LenisScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/FooterSection";
// import LoaderOverlay from "./components/LoaderOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayuba.vyuba.studio"),
  title: {
    default: "Ayuba Alexander — Design Engineer & Shopify Developer",
    template: "%s | Ayuba Alexander — Design Engineer & Shopify Developer",
  },
  description:
    "Ayuba Alexander (vyuba) is a Design Engineer, specialized Shopify Developer, Frontend Engineer, and Product Designer building high-performance digital commerce, scalable design systems, and intuitive web applications.",
  keywords: [
    "Shopify Developer",
    "Shopify Plus Expert",
    "Shopify Theme Developer",
    "Shopify Liquid Engineer",
    "Shopify POS Developer",
    "Shopify App Developer",
    "Design Engineer",
    "Design Technologist",
    "Design Systems Engineer",
    "Frontend Developer",
    "Senior Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "Product Designer",
    "UI/UX Designer",
    "Interaction Designer",
    "Web Developer",
    "Software Engineer",
    "Full-Stack Developer",
    "Creative Developer",
    "Ayuba Alexander",
    "vyuba",
  ],
  authors: [{ name: "Ayuba Alexander", url: "https://ayuba.vyuba.studio" }],
  creator: "Ayuba Alexander",
  publisher: "Ayuba Alexander",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://ayuba.vyuba.studio",
    languages: {
      "en-US": "https://ayuba.vyuba.studio/en-US",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayuba.vyuba.studio",
    siteName: "Ayuba Alexander — Design Engineer & Shopify Developer",
    title: "Ayuba Alexander — Design Engineer & Shopify Developer",
    description:
      "Bridging the gap between engineering, visual design, and specialized Shopify development to craft intuitive digital products and commerce experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayuba Alexander — Design Engineer & Shopify Developer",
    description:
      "Bridging the gap between engineering, visual design, and specialized Shopify development to craft intuitive digital products and commerce experiences.",
    creator: "@vyuba_",
    site: "@vyuba_",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayuba Alexander",
  alternateName: ["vyuba", "Alexander Preye Ayuba"],
  url: "https://ayuba.vyuba.studio",
  jobTitle: [
    "Design Engineer",
    "Shopify Developer",
    "Frontend Developer",
    "Product Designer",
    "Web Developer",
    "Software Engineer",
  ],
  description:
    "Ayuba Alexander is a Design Engineer and specialized Shopify Developer building bespoke digital commerce, high-performance web applications, design systems, and intuitive product interfaces.",
  sameAs: [
    "https://github.com/vyuba",
    "https://www.linkedin.com/in/alexander-preye-i-271aa7257/",
    "https://x.com/vyuba_",
    "https://contra.com/alexander_ayuba_preye_3fnoen2o",
    "https://www.instagram.com/vyuba_/",
  ],
  knowsAbout: [
    "Shopify Development",
    "Shopify Liquid",
    "Shopify POS",
    "Shopify Apps",
    "Design Engineering",
    "Frontend Engineering",
    "Product Design",
    "React",
    "Next.js",
    "TypeScript",
    "Design Systems",
    "UI/UX Design",
    "Framer Motion",
    "Tailwind CSS",
    "Web Performance",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ayuba Alexander — Design Engineer & Shopify Developer",
  url: "https://ayuba.vyuba.studio",
  description:
    "Portfolio of Ayuba Alexander: Design Engineer, Shopify Developer, Frontend Engineer, and Product Designer.",
  author: {
    "@type": "Person",
    name: "Ayuba Alexander",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable}  ${geistMono.variable} ${interTight.variable} antialiased bg-[#FBFBFB] pt-3 md:pt-18`}
      >
        {/*<LoaderOverlay />*/}
        <Navbar />
        <LenisScrollInit>
          <div className="z-10">{children}</div>
        </LenisScrollInit>
        <Footer />
        <div className="bottom-page-blur pointer-events-none fixed inset-x-0 bottom-0 z-60 hidden h-20 sm:block">
          <div className="relative h-full">
            <div
              className="gradient-blur pointer-events-none absolute inset-x-0 z-10 inset-0! bottom-0"
              style={{ height: "100%" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 1,
                  backdropFilter: "blur(0.5px)",
                  WebkitBackdropFilter: "blur(0.5px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 2,
                  backdropFilter: "blur(1px)",
                  WebkitBackdropFilter: "blur(1px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,0) 50%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 3,
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 62.5%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 4,
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(3px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 37.5%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,0) 75%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 5,
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 87.5%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 6,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 62.5%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 7,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 112.5%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 112.5%)",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  zIndex: 8,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
