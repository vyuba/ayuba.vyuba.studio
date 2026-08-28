"use client";
import WorkMediaCard from "@/app/components/WorkMediaCard";
import works from "@/app/data/work";
import { motion } from "framer-motion";

const WorkPage = () => {
  const filteredWorks = works.filter((work) => work.selectedWorks === true);
  return (
    <div className="w-full flex min-h-screen flex-col items-center  bg-[#FBFBFB] pt-10">
      <div className="flex gap-4">
        {filteredWorks.slice(0, 3).map((work) => {
          return (
            <motion.div
              key={work.id}
              initial={{ backdropFilter: "blur(30px)", opacity: 0, scale: 1.4 }}
              animate={{ backdropFilter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ type: "tween", duration: 0.6, damping: 0 }}
              className="w-99"
            >
              <WorkMediaCard
                key={work.id}
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
    </div>
  );
};

export default WorkPage;
