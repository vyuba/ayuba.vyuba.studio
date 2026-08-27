import WorkSection from "./components/WorkSection";
// import ArticleSection from "./components/ArticleSection";
// import Footer from "./components/footer/FooterSection";
// import PlaygroundSection from "./components/PlaygroundSection";
import Navbar from "./components/Navbar";
// import PlaygroundSection from "./components/PlaygroundSection";
// import Footer from "./components/footer/FooterSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBFBFB] font-sans pt-3 md:pt-18">
      <main className="flex min-h-screen w-full flex-col items-center  bg-[#FBFBFB]  sm:items-start">
        <Navbar />
        <WorkSection />
      </main>
    </div>
  );
}

// bg-zinc-50
// max-w-[1440px]
