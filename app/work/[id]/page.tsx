"use client";
import MediaCard from "@/app/components/MediaCard";
import works from "@/app/data/work";
import { motion } from "framer-motion";
const projectDetails = {
  specifics: [
    "Creative Direction",
    "Paid Ads & Organic Content",
    "Web Development",
    "Brand & UI/UX Design",
    "Project Management",
  ],
  technologies: [
    "WebGL & Canvas",
    "Framer Motion",
    "Next.js & React",
    "Tailwind CSS",
    "Sanity CMS",
  ],
  credits: [
    { role: "PROJECT LEAD", name: "Austen Goodman" },
    { role: "DESIGN", name: "Happy Miliarta, Roko Gabrilo" },
    { role: "DEVELOPMENT", name: "Nick Cheung, Roko Gabrilo" },
  ],
};

const filteredWorks = works.filter((work) => work.selectedWorks === true);
const WorkPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center  bg-[#FBFBFB] max-w-300 mx-auto">
      <WorkHeader />
      <WorkContent />
    </div>
  );
};

export default WorkPage;

const WorkHeader = () => {
  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center min-h-[85dvh] h-fit relative">
      <div className="flex gap-3 w-full">
        {filteredWorks.slice(0, 3).map((work) => {
          return (
            <motion.div
              key={work.id}
              initial={{ backdropFilter: "blur(30px)", opacity: 0.5 }}
              animate={{ backdropFilter: "blur(0px)", opacity: 1 }}
              transition={{ type: "tween", duration: 0.6, damping: 0 }}
              className="w-full md:w-1/3"
            >
              <MediaCard
                id={work.id}
                backgroundImage={work.backgroundImage}
                centerMedia={work.centerMedia}
                aspectRatio="portrait"
                className="w-full"
              />
            </motion.div>
          );
        })}
      </div>
      <div className=" w-full max-w-4xl text-center flex flex-col gap-3">
        <h1 className="self-center text-black cursor-pointer py-0.5 px-3 font-inter-tight bg-white rounded-full text-base border-2 border-[#c6c6c6]/30">
          Meji Meji
        </h1>
        <ul className="text-sm  flex flex-wrap gap-1 self-center justify-center">
          {projectDetails.specifics.map((item, index) => (
            <li
              className="bg-white w-fit border border-[#c6c6c6]/30 whitespace-nowrap rounded-full px-2.5 py-1 text-sm self-center text-center text-black font-inter-tight"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-black/80  text-sm self-center font-inter-tight text-pretty ">
          Brands today often struggle with fragmented digital identities across
          various touchpoints, resulting in a disjointed user experience and
          diluted brand equity. Our client needed a cohesive, modern web
          presence that could break through the noise, capture audience
          attention, and drive meaningful engagement without sacrificing
          performance.
        </p>
      </div>
    </div>
  );
};

const WorkContent = () => {
  const getWork = (index: number) => works[index % works.length];

  return (
    <div className="w-full flex flex-col gap-5 font-inter-tight">
      {/* Case Study Media Grid */}
      <div className="flex flex-col gap-4 mt-8">
        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MediaCard
            id={getWork(1).id}
            backgroundImage={getWork(1).backgroundImage}
            centerMedia={getWork(1).centerMedia}
            aspectRatio="square"
            className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
          />
          <MediaCard
            id={getWork(2).id}
            backgroundImage={getWork(2).backgroundImage}
            centerMedia={getWork(2).centerMedia}
            aspectRatio="square"
            className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-3">
          <h2 className="text-2xl font-medium text-black opacity-80  max-w-[70%]">
            Our Breakthrough Awaits Us. Lululemon Train.
          </h2>
          <p className="leading-relaxed text-sm text-black">
            Brands today often struggle with fragmented digital identities
            across various touchpoints, resulting in a disjointed user
            experience and diluted brand equity. Our client needed a cohesive,
            modern web presence that could break through the noise, capture
            audience attention, and drive meaningful engagement without
            sacrificing performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MediaCard
            id={getWork(1).id}
            backgroundImage={getWork(1).backgroundImage}
            centerMedia={getWork(1).centerMedia}
            aspectRatio="square"
            className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
          />
          <MediaCard
            id={getWork(2).id}
            backgroundImage={getWork(2).backgroundImage}
            centerMedia={getWork(2).centerMedia}
            aspectRatio="square"
            className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
          />
          <MediaCard
            id={getWork(2).id}
            backgroundImage={getWork(2).backgroundImage}
            centerMedia={getWork(2).centerMedia}
            aspectRatio="square"
            className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
          />
        </div>

        {/* Asymmetrical Grid: 1 large, 2 small stacked */}
        <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-3">
          <h2 className="text-2xl font-medium text-black opacity-80  max-w-[70%]">
            Our Breakthrough Awaits Us. Lululemon Train.
          </h2>
          <p className="leading-relaxed text-sm text-black">
            We developed a unified design system and a high-performance web
            application utilizing modern web technologies. By integrating
            seamless interactions, compelling motion design, and a responsive
            architectural grid, we delivered an immersive digital experience
            that unifies the brand's narrative seamlessly across all digital
            platforms.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <MediaCard
              id={getWork(4).id}
              backgroundImage={getWork(4).backgroundImage}
              centerMedia={getWork(4).centerMedia}
              aspectRatio="landscape"
              className="w-full h-full rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </div>

      {/* Specifics / Tech / Credits Grid */}
      <div className="grid grid-cols-1 gap-10 p-8  font-inter-tight">
        <div className="flex flex-col items-center gap-1 self-center ">
          <h3 className="font-medium opacity-70 uppercase text-xs text-black/70 ml-2">
            Technologies
          </h3>
          <ul className="text-sm flex flex-wrap gap-1">
            {projectDetails.technologies.map((item, index) => (
              <li
                className="bg-white w-fit border border-[#c6c6c6]/30 whitespace-nowrap rounded-full px-2.5 py-1 text-sm  text-center text-black font-inter-tight"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
