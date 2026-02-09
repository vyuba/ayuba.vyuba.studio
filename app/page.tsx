import WorkSection from "./components/WorkSection";
// import ArticleSection from "./components/ArticleSection";
// import Footer from "./components/footer/FooterSection";
// import PlaygroundSection from "./components/PlaygroundSection";
import Navbar from "./components/Navbar";
// import PlaygroundSection from "./components/PlaygroundSection";
import Footer from "./components/footer/FooterSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white font-sans ">
      <main className="flex min-h-screen w-full flex-col items-center pt-16 md:pt-20 px-2 md:px-4 bg-white  sm:items-start">
        <Navbar />
        <div className="flex flex-col gap-2 max-w-3xl">
          <h1 className="text-2xl md:text-5xl font-medium text-zinc-950 text-pretty leading-7 md:leading-12">
            Building the digital infrastructure for modern fashion and
            e-commerce.
          </h1>
          <h2 className="text-sm md:text-base font-normal text-zinc-600 text-pretty">
            I&apos;m Ayuba, a software engineer and Shopify specialist. I blend
            technical precision with visual fluidity to help brands.
          </h2>
          <p className="text-black/70 text-xs uppercase font-medium font-mono">
            Clients:{" "}
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-black"
            >
              Mejimeji
            </a>
            ,{""}
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-black"
            >
              1% Studio
            </a>
            ,{""}
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-black"
            >
              Studio Unruly
            </a>
          </p>
        </div>
        {/* work section  */}
        <WorkSection />
        {/* Article section  */}
        {/* <ArticleSection /> */}
        {/* playground section  */}
        {/* <PlaygroundSection /> */}
        <Footer />
      </main>
    </div>
  );
}

// bg-zinc-50
// max-w-[1440px]
