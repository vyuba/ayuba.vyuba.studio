"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 12,
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

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex max-w-lg flex-col items-center gap-6"
      >
        <motion.span
          variants={itemVariants}
          className="rounded-full border border-[#c6c6c6]/40 bg-white/80 px-3 py-1 font-inter-tight text-xs font-semibold uppercase tracking-wider text-black/60 backdrop-blur-md"
        >
          404 Error
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-apfel text-5xl md:text-7xl font-normal tracking-tighter text-black"
        >
          Lost in the whitespace.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-inter-tight text-base md:text-lg text-black/70 leading-relaxed max-w-md"
        >
          Looks like this coordinate hasn&apos;t been designed or engineered yet.
          Let&apos;s get you back on the grid.
        </motion.p>

        <motion.div variants={itemVariants} className="pt-2">
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#c6c6c6]/30 bg-white px-5 py-2 font-inter-tight text-sm font-medium text-black capitalize shadow-xs hover:border-black/30 transition-colors"
            >
              Back to Home
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
