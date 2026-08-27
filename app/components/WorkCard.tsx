"use client";

import { useState, useRef, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Work } from "../data/work";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import PortalOverlay from "./PortalOverlay";

interface WorkCardProps {
  work: Work;
  aspectRatio?: "portrait" | "landscape" | string;
  className?: string;
  isExpanded?: boolean;
  onExpand?: (id: number) => void;
  onClose?: () => void;
}

function getHeightClass(ratio: string): string {
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

function WorkCardComponent({
  work,
  aspectRatio,
  className = "",
  isExpanded = false,
  onExpand,
  onClose,
}: WorkCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scaleFactor, setScaleFactor] = useState(1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    mouseX.set(offsetX * 0.15);
    mouseY.set(offsetY * 0.15);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const ratio = aspectRatio || work.aspectRatio || "portrait";
  const heightClass = getHeightClass(ratio);

  const openCard = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });

      const targetWidth = window.innerWidth * 0.7;
      const targetHeight = window.innerHeight * 0.65;
      const scaleX = targetWidth / rect.width;
      const scaleY = targetHeight / rect.height;
      setScaleFactor(Math.min(scaleX, scaleY));
    }
    if (onExpand) onExpand(work.id);
  }, [onExpand, work.id]);

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

  return (
    <>
      <article
        className={`group/work-card cursor-pointer w-full pb-3 ${className}`}
        key={work.id}
      >
        {/* Placeholder slot in grid */}
        <div className={`w-full ${heightClass}`} onClick={handleClick}>
          {!isExpanded ? (
            <motion.div
              layoutId={`work-card-${work.id}`}
              ref={cardRef}
              className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden active:scale-[0.99] w-full h-full"
            >
              {work.backgroundImage && (
                <Image
                  src={work.backgroundImage}
                  alt={work.title}
                  fill
                  className="object-cover z-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              {work.backgroundImage && (
                <div className="absolute inset-0 bg-black/20 z-0"></motion.div>
              )}

              {work.centerMedia && (
                <motion.div
                  style={{ x: magneticX, y: magneticY }}
                  className="absolute inset-0 m-auto w-[60%] h-[50%] md:w-[250px] md:h-[350px] z-10 flex items-center justify-center pointer-events-none rounded-xl overflow-hidden shadow-lg"
                >
                  {work.centerMedia.type === "video" ? (
                    <video
                      src={work.centerMedia.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={work.centerMedia.url}
                      alt={work.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </div>
      </article>

      <PortalOverlay isOpen={isExpanded} onClose={onClose || (() => {})}>
        <motion.div
          layoutId={`work-card-${work.id}`}
          className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden shadow-2xl pointer-events-auto"
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
          {work.backgroundImage && (
            <Image
              src={work.backgroundImage}
              alt={work.title}
              fill
              className="object-cover z-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {work.backgroundImage && (
            <div className="absolute inset-0 bg-black/20 z-0"></div>
          )}

          {work.centerMedia && (
            <div className="absolute inset-0 m-auto w-[60%] h-[50%] md:w-[250px] md:h-[350px] z-10 flex items-center justify-center pointer-events-none rounded-xl overflow-hidden shadow-lg">
              {work.centerMedia.type === "video" ? (
                <video
                  src={work.centerMedia.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={work.centerMedia.url}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              )}
            </div>
          )}
        </motion.div>
      </PortalOverlay>
    </>
  );
}

const WorkCard = memo(WorkCardComponent);
export default WorkCard;
