"use client";

import { useState } from "react";
import works from "../data/work";
import WorkCard from "./WorkCard";
import { motion } from "framer-motion";

export default function WorkSection() {
  const filteredWorks = works.filter((work) => work.selectedWorks === true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-1.5 w-full max-w-300 mx-auto">
      <motion.div
        className="columns-2 md:columns-3 gap-3 w-full"
        animate={{ scale: expandedId ? 0.95 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {filteredWorks.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            isExpanded={expandedId === work.id}
            isAnyExpanded={expandedId !== null}
            onExpand={() => setExpandedId(work.id)}
            onClose={() => setExpandedId(null)}
          />
        ))}
      </motion.div>
    </section>
  );
}
