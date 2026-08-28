"use client";

import { motion } from "framer-motion";

function Header() {
  return (
    <div className="relative w-full flex flex-col pb-20">
      <section className="w-full flex  gap-9 font-inter-tight transition-all duration-300 ease-in-out max-w-300 mx-auto p-2.5 my-10 min-h-[70dvh]">
        {/*<div className="flex-1 flex items-center justify-center w-full h-[70dvh]">
          <div>
            <h1 className="flex flex-col gap-1 ">
              <span className="text-2xl">[vyuba] Ayuba Alexander</span>
              <span className="text-3xl">Software and Design Engineer</span>
            </h1>
            <p className="text-lg  text-black/70">
              Blurring the line between design and engineering. I like to build
              things people enjoy using, think deeply about the interface, how
              it looks, feels and works.
            </p>
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          <div className=" bg-[#F5F5F5] rounded-[19px] border-[0.5] border-[#000000]/15 w-full h-[70dvh]"></div>
        </div>*/}
      </section>
      <motion.button
        onClick={() =>
          document
            .getElementById("work-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="self-center cursor-pointer capitalize py-1 px-3 font-inter-tight bg-white rounded-full text-sm border-2 border-[#c6c6c6]/30"
      >
        scroll to view works
      </motion.button>
    </div>
  );
}

export default Header;
