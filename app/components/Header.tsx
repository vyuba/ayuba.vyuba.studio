"use client";

import { motion } from "framer-motion";
import CompanyHighlight from "./CompanyHighlight";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Header() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full flex flex-col pb-20"
    >
      <section className="w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-9 items-end transition-all duration-300 ease-in-out max-w-300 mx-auto p-2.5 my-10 min-h-[70dvh]">
        <div className="flex flex-col gap-4">
          <motion.h1 variants={itemVariants} className="flex flex-col gap-1">
            <span className="text-6xl font-apfel tracking-tighter">
              I'm Ayuba Alexander, an Engineer who Designs.
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base text-black/90 font-normal font-inter-tight leading-relaxed"
          >
            Bridging the gap between engineering, visual design, and specialized
            Shopify development to craft intuitive digital products and commerce
            experiences. Designed and built the storefront, design system, and
            omnichannel Shopify POS experience at{" "}
            <CompanyHighlight name="Meji Meji" href="https://mejimeji.co" />.
            Developed the digital platform and brand presence for{" "}
            <CompanyHighlight
              name="Alami Capital"
              href="https://alami-capital.com"
            />
            . Currently designing and engineering the entire product end-to-end
            at{" "}
            <CompanyHighlight name="usecosmos" href="https://usecosmos.com" />.
          </motion.p>
        </div>
        <div className="w-full h-full"></div>
      </section>
      <motion.button
        variants={itemVariants}
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
    </motion.div>
  );
}

export default Header;
