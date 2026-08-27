"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Work } from "../data/work";
import { motion } from "framer-motion";
import PortalOverlay from "./PortalOverlay";

interface WorkCardProps {
  work: Work;
  aspectRatio?: "portrait" | "landscape" | string;
  className?: string;
  isExpanded?: boolean;
  isAnyExpanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
}

export default function WorkCard({
  work,
  aspectRatio,
  className = "",
  isExpanded = false,
  isAnyExpanded = false,
  onExpand,
  onClose,
}: WorkCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scaleFactor, setScaleFactor] = useState(1);

  const ratio = aspectRatio || work.aspectRatio || "portrait";
  const isLandscape =
    ratio === "landscape" ||
    ratio === "16/10" ||
    ratio === "16/9" ||
    ratio === "4/3" ||
    ratio === "wide";

  const heightClass = isLandscape
    ? "aspect-[4/3] md:aspect-auto md:h-[363px]"
    : "aspect-[3/4] md:aspect-auto md:h-[445px]";

  const openCard = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });

      const targetWidth = window.innerWidth * 0.7;
      const targetHeight = window.innerHeight * 0.65;
      const scaleX = targetWidth / rect.width;
      const scaleY = targetHeight / rect.height;
      setScaleFactor(Math.min(scaleX, scaleY));
    }
    if (onExpand) onExpand();
  };

  const closeCard = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const handleClick = (e: React.MouseEvent) => {
    if (isExpanded) return;
    e.preventDefault();
    if (work.hasCaseStudy) {
      const destination = work.caseStudyUrl || work.link;
      if (destination.startsWith("http")) {
        window.open(destination, "_blank", "noopener,noreferrer");
      } else {
        router.push(destination);
      }
    } else {
      openCard();
    }
  };

  // Escape key and overflow handling moved to PortalOverlay

  return (
    <>
      <article
        className={`group/work-card cursor-pointer w-full pb-3 ${className}`}
        key={work.id}
      >
        {/* Placeholder slot in grid */}
        <div className={`w-full ${heightClass}`} onClick={handleClick}>
          {!isExpanded && (
            <motion.div
              layoutId={`work-card-${work.id}`}
              ref={cardRef}
              className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 overflow-hidden active:scale-[0.99] w-full h-full"
            >
              {/* Collapsed Card view */}
            </motion.div>
          )}
        </div>
      </article>

      <PortalOverlay isOpen={isExpanded} onClose={closeCard}>
        <motion.div
          layoutId={`work-card-${work.id}`}
          className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 overflow-hidden shadow-2xl pointer-events-auto"
          style={{
            width: dimensions.width || 0,
            height: dimensions.height || 0,
          }}
          animate={{
            scale: scaleFactor,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Expanded Card view */}
        </motion.div>
      </PortalOverlay>
    </>
  );
}
