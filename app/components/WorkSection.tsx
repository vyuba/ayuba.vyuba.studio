"use client";

import { useState, useCallback, useEffect } from "react";
import works from "../data/work";
import WorkCard from "./WorkCard";
import { motion } from "framer-motion";

// Hoisted outside component to prevent re-filtering on every render (js-combine-iterations / rendering-hoist-jsx)
const filteredWorks = works.filter((work) => work.selectedWorks === true);

export default function WorkSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isNavigatingCarousel, setIsNavigatingCarousel] = useState(false);

  const handleExpand = useCallback((id: number) => {
    setIsNavigatingCarousel(false);
    setExpandedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setIsNavigatingCarousel(false);
    setExpandedId(null);
  }, []);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (expandedId === null) return;
      setIsNavigatingCarousel(true);
      const currentIndex = filteredWorks.findIndex((w) => w.id === expandedId);
      if (currentIndex !== -1 && currentIndex < filteredWorks.length - 1) {
        setExpandedId(filteredWorks[currentIndex + 1].id);
      } else {
        setExpandedId(filteredWorks[0].id);
      }
    },
    [expandedId],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (expandedId === null) return;
      setIsNavigatingCarousel(true);
      const currentIndex = filteredWorks.findIndex((w) => w.id === expandedId);
      if (currentIndex > 0) {
        setExpandedId(filteredWorks[currentIndex - 1].id);
      } else {
        setExpandedId(filteredWorks[filteredWorks.length - 1].id);
      }
    },
    [expandedId],
  );

  // Keyboard navigation for open modal/popover (Esc to close, ArrowLeft/ArrowRight for prev/next)
  useEffect(() => {
    if (expandedId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedId, handleClose, handleNext, handlePrev]);

  return (
    <section
      id="work-section"
      aria-labelledby="work-section-heading"
      className="flex flex-col gap-1.5 w-full max-w-300 mx-auto px-2.5 pt-10 md:pt-20"
    >
      <h2 id="work-section-heading" className="sr-only">
        Selected Works & Projects — Shopify Development, Design Engineering &
        Frontend Case Studies
      </h2>
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
        {filteredWorks.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            isExpanded={expandedId === work.id}
            onExpand={handleExpand}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
            currentIndex={index}
            totalCount={filteredWorks.length}
            isNavigatingCarousel={isNavigatingCarousel}
          />
        ))}
      </motion.div>
    </section>
  );
}
