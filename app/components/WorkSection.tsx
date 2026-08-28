"use client";

import { useState, useCallback } from "react";
import works from "../data/work";
import WorkCard from "./WorkCard";
import { motion } from "framer-motion";

// Hoisted outside component to prevent re-filtering on every render (js-combine-iterations / rendering-hoist-jsx)
const filteredWorks = works.filter((work) => work.selectedWorks === true);

export default function WorkSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpand = useCallback((id: number) => {
    setExpandedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedId(null);
  }, []);

  return (
    <section id="work-section" className="flex flex-col gap-1.5 w-full max-w-300 mx-auto px-2.5">
      <motion.div
        className="columns-1 md:columns-3 gap-3 w-full"
        animate={{ scale: expandedId ? 0.95 : 1 }}
        transition={{
          type: "tween",
          stiffness: 100,
          damping: 10,
          duration: 0.1,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {filteredWorks.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            isExpanded={expandedId === work.id}
            onExpand={handleExpand}
            onClose={handleClose}
          />
        ))}
      </motion.div>
    </section>
  );
}
