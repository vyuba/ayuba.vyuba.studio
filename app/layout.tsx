import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import LenisScrollInit from "./components/LenisScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/FooterSection";
import LoaderOverlay from "./components/LoaderOverlay";

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
  title: { default: "Ayuba Alexander", template: "%s | My Site" },
  description: "Engineering Meets Design",
  alternates: {
    canonical: "https://ayuba.vyuba.studio",
    languages: {
      "en-US": "https://ayuba.vyuba.studio/en-US",
    },
  },
  openGraph: {
    title: "Ayuba Alexander",
    description: "Engineering Meets Design",
    url: "https://ayuba.vyuba.studio",
    siteName: "Ayuba Alexander",
    // images: [{ url: "https://ayuba.vyuba.studio/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${geistMono.variable} ${interTight.variable} antialiased bg-[#FBFBFB] pt-3 md:pt-18`}
      >
        <LoaderOverlay />
        <Navbar />
        <LenisScrollInit>{children}</LenisScrollInit>
        {/*{children}*/}
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
