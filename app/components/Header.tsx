"use client";

import { motion } from "framer-motion";
import CompanyHighlight from "./CompanyHighlight";

function Header() {
  return (
    <div className="relative w-full flex flex-col pb-20">
      <section className="w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-9 items-end transition-all duration-300 ease-in-out max-w-300 mx-auto p-2.5 my-10 min-h-[70dvh]">
        <div className="flex flex-col gap-4">
          <h1 className="flex flex-col gap-1">
            <span className="text-6xl font-apfel tracking-tighter">
              I'm Ayuba Alexander, an Engineer who Designs.
            </span>
          </h1>
          <p className="text-lg text-black/90 font-normal font-inter-tight leading-relaxed">
            Bridging the gap between engineering and visual design to craft
            intuitive digital products. Scaled the commerce experience and
            design systems at{" "}
            <CompanyHighlight
              name="Meji Meji"
              href="https://mejimeji.co"
            />
            . Designed and built the digital platform for{" "}
            <CompanyHighlight
              name="Alami Capital"
              href="https://alami-capital.com"
            />
            . Engineered intuitive product interfaces and workflows at{" "}
            <CompanyHighlight
              name="usecosmos"
              href="https://usecosmos.com"
            />
            .
          </p>
        </div>
        <div className="w-full h-full"></div>
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
