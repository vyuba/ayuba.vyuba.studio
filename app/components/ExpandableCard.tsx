"use client";

import { useState, useRef, memo, useEffect } from "react";
import { motion } from "framer-motion";
import PortalOverlay from "./PortalOverlay";
import ArrowIcon from "./icons/ArrowIcon";

export interface ExpandableCardProps {
  id?: number | string;
  aspectRatio?: string;
  className?: string;
  cardClassName?: string;
  isExpanded?: boolean;
  onClose?: () => void;
  onNext?: (e: React.MouseEvent) => void;
  onPrev?: (e: React.MouseEvent) => void;
  currentIndex?: number;
  totalCount?: number;
  isNavigatingCarousel?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onModalClick?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
}

export function getHeightClass(ratio: string): string {
  const isLandscape =
    ratio === "landscape" ||
    ratio === "16/10" ||
    ratio === "16/9" ||
    ratio === "4/3" ||
    ratio === "wide";

  return isLandscape
    ? "aspect-[4/3] md:aspect-auto md:h-[363px]"
    : "aspect-[3/4] md:aspect-auto md:h-[445px]";
}

function ExpandableCardComponent({
  id,
  aspectRatio = "portrait",
  className = "",
  cardClassName = "",
  isExpanded = false,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
  isNavigatingCarousel = false,
  onClick,
  onModalClick,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  children,
  expandedContent,
}: ExpandableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    if (!isExpanded || !cardRef.current) return;

    const updateDimensionsAndScale = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      setDimensions({ width: rect.width, height: rect.height });

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let targetWidth: number;
      let targetHeight: number;

      if (vw < 768) {
        // Mobile: comfortable margins leaving clearance for top safe area & bottom carousel controls
        targetWidth = Math.min(vw * 0.92, 420);
        targetHeight = Math.min(vh * 0.72, 580);
      } else if (vw < 1200) {
        // Tablet / Small Laptop
        targetWidth = Math.min(vw * 0.72, 760);
        targetHeight = Math.min(vh * 0.7, 640);
      } else {
        // Desktop & Ultrawide
        targetWidth = Math.min(vw * 0.65, 900);
        targetHeight = Math.min(vh * 0.72, 720);
      }

      const scaleX = targetWidth / rect.width;
      const scaleY = targetHeight / rect.height;
      setScaleFactor(Math.min(scaleX, scaleY));
    };

    updateDimensionsAndScale();

    window.addEventListener("resize", updateDimensionsAndScale);
    window.addEventListener("orientationchange", updateDimensionsAndScale);

    return () => {
      window.removeEventListener("resize", updateDimensionsAndScale);
      window.removeEventListener("orientationchange", updateDimensionsAndScale);
    };
  }, [isExpanded]);

  const heightClass = getHeightClass(aspectRatio);

  return (
    <>
      <motion.article
        className={`group/work-card cursor-pointer w-full pb-3 ${className}`}
        key={id}
        variants={{
          hidden: { opacity: 0, scale: 1.15, y: 40 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 260, damping: 20 },
          },
        }}
      >
        <div
          ref={cardRef}
          className={`w-full ${heightClass}`}
          onClick={onClick}
        >
          {!isExpanded ? (
            <motion.div
              layoutId={id ? `work-card-${id}` : undefined}
              initial="initial"
              whileHover="hover"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove}
              className={`bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden active:scale-[0.99] w-full h-full ${cardClassName}`}
            >
              {children}
            </motion.div>
          ) : null}
        </div>
      </motion.article>

      <PortalOverlay isOpen={isExpanded} onClose={onClose || (() => {})}>
        <div className="w-fit h-fit relative flex flex-col">
          <motion.div
            layoutId={
              id && !isNavigatingCarousel ? `work-card-${id}` : undefined
            }
            className={`bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden shadow-2xl pointer-events-auto ${cardClassName}`}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={onModalClick}
            style={{
              width: dimensions.width || 0,
              height: dimensions.height || 0,
            }}
            initial={
              isNavigatingCarousel
                ? { opacity: 0, filter: "blur(10px)", scale: 0.95 }
                : undefined
            }
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              scale: scaleFactor,
            }}
            exit={
              isNavigatingCarousel
                ? { opacity: 0, filter: "blur(10px)", scale: 0.95 }
                : undefined
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {expandedContent ?? children}
          </motion.div>

          {/* Carousel Controls */}
          {(onNext || onPrev) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed bottom-[8vh]  left-0 right-0 flex justify-center items-center gap-4 z-50 pointer-events-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPrev) onPrev(e);
                }}
                className="cursor-pointer bg-blend-difference w-10 h-10 flex items-center justify-center text-primary transition-colors rotate-180"
              >
                <ArrowIcon />
              </motion.button>
              {currentIndex !== undefined && totalCount !== undefined && (
                <span className="text-white text-sm font-medium px-4 py-1 bg-black/15 backdrop-blur-md rounded-full">
                  {currentIndex + 1} / {totalCount}
                </span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNext) onNext(e);
                }}
                className="cursor-pointer bg-blend-difference w-10 h-10 flex items-center justify-center text-primary transition-colors"
              >
                <ArrowIcon />
              </motion.button>
            </motion.div>
          )}
        </div>
      </PortalOverlay>
    </>
  );
}

const ExpandableCard = memo(ExpandableCardComponent);
export default ExpandableCard;
