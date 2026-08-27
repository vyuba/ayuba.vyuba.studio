"use client";

import { useState, useRef, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Work } from "../data/work";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import PortalOverlay from "./PortalOverlay";
import { ArrowDiagonalIcon } from "@shopify/polaris-icons";

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

const overlayVariants = {
  initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
  hover: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const titleVariants = {
  initial: {
    backgroundColor: "#FBFBFB",
    color: "rgba(0, 0, 0, 0.8)",
  },
  hover: {
    backgroundColor: "#000000",
    color: "#FBFBFB",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    backgroundColor: "#FBFBFB",
    color: "rgba(0, 0, 0, 0.8)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const skillsContainerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const skillItemVariants = {
  initial: {
    opacity: 0,
    x: -14,
  },
  hover: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    x: -14,
    transition: {
      duration: 0.25,
      ease: "easeIn" as const,
    },
  },
};

const firstArrowVariants = {
  initial: { x: 0, y: 0, opacity: 1 },
  hover: {
    x: "100%",
    y: "-100%",
    opacity: 0,
    transition: {
      type: "tween" as const,
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

const secondArrowVariants = {
  initial: { x: "-100%", y: "100%", opacity: 0 },
  hover: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    x: "-100%",
    y: "100%",
    opacity: 0,
    transition: {
      type: "tween" as const,
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

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
  const [mediaAspectRatio, setMediaAspectRatio] = useState<
    number | string | null
  >(work.centerMedia?.aspectRatio || null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.naturalWidth && img.naturalHeight) {
        setMediaAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    },
    [],
  );

  const handleVideoMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const vid = e.currentTarget;
      if (vid.videoWidth && vid.videoHeight) {
        setMediaAspectRatio(vid.videoWidth / vid.videoHeight);
      }
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;
      mouseX.set(offsetX * 0.02);
      mouseY.set(offsetY * 0.02);
    },
    [mouseX, mouseY],
  );

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
              initial="initial"
              whileHover="hover"
              // onMouseMove={handleMouseMove}
              // onMouseLeave={handleMouseLeave}
              className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden active:scale-[0.99] w-full h-full"
            >
              {work.backgroundImage && (
                <Image
                  src={work.backgroundImage}
                  alt={work.title}
                  fill
                  className={`object-cover z-0 object-center ${work.centerMedia ? "scale-110 opacity-90 group-hover/work-card:scale-112 duration-700 transition-all " : "group-hover/work-card:scale-102 duration-700 transition-all "}`}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              )}
              {work.centerMedia && (
                <motion.div className="absolute inset-0 bg-black/20 z-0"></motion.div>
              )}

              {work.centerMedia && (
                <motion.div
                  style={{
                    x: magneticX,
                    y: magneticY,
                    aspectRatio:
                      mediaAspectRatio ||
                      work.centerMedia.aspectRatio ||
                      undefined,
                  }}
                  className="absolute inset-0 m-auto w-auto h-auto max-w-[85%] max-h-[70%] z-10 flex items-center justify-center pointer-events-none overflow-hidden shadow-lg group-hover/work-card:scale-102 duration-700 transition-all"
                >
                  {work.centerMedia.type === "video" ? (
                    <video
                      src={work.centerMedia.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedMetadata={handleVideoMetadata}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={work.centerMedia.url}
                      alt={work.title}
                      fill
                      onLoad={handleImageLoad}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  )}
                </motion.div>
              )}
              <motion.div
                variants={overlayVariants}
                className="w-full h-full flex justify-between flex-col relative z-10"
              >
                <div className="p-5 w-full flex justify-between items-center relative z-10">
                  <motion.h2
                    variants={titleVariants}
                    className="rounded-full px-2.5 py-1.5 text-xs text-center font-medium font-inter-tight"
                  >
                    {work.title}
                  </motion.h2>

                  <motion.div className="size-6.5 border-[0.5px] border-[#c6c6c6]/30 bg-white text-black/70 cursor-pointer rounded-full relative overflow-hidden flex items-center justify-center z-50">
                    <motion.div
                      variants={firstArrowVariants}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ArrowDiagonalIcon className="size-4" />
                    </motion.div>
                    <motion.div
                      variants={secondArrowVariants}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ArrowDiagonalIcon className="size-4" />
                    </motion.div>
                  </motion.div>
                </div>
                <motion.div
                  variants={skillsContainerVariants}
                  className="p-5 w-full max-w-[75%] flex items-center z-10 gap-1 flex-wrap"
                >
                  {work.skills &&
                    work.skills.length > 0 &&
                    work.skills.map((skill) => {
                      return (
                        <motion.p
                          key={skill}
                          variants={skillItemVariants}
                          className="bg-[#FBFBFB] rounded-full px-2.5 py-1.5 text-xs  text-center font-medium text-black/70 font-inter-tight"
                        >
                          {skill}
                        </motion.p>
                      );
                    })}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </article>

      <PortalOverlay isOpen={isExpanded} onClose={onClose || (() => {})}>
        <motion.div
          layoutId={`work-card-${work.id}`}
          className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden shadow-2xl pointer-events-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
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
              className={`object-cover object-center z-0 ${work.centerMedia ? "scale-110 opacity-90" : ""}`}
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          )}
          {work.centerMedia && (
            <motion.div className="absolute inset-0 bg-black/20 z-0"></motion.div>
          )}

          {work.centerMedia && (
            <motion.div
              style={{
                x: magneticX,
                y: magneticY,
                aspectRatio:
                  mediaAspectRatio || work.centerMedia.aspectRatio || undefined,
              }}
              className="absolute inset-0 m-auto w-auto h-auto max-w-[85%] max-h-[85%] z-10 flex items-center justify-center pointer-events-none overflow-hidden shadow-lg "
            >
              {work.centerMedia.type === "video" ? (
                <video
                  src={work.centerMedia.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedMetadata={handleVideoMetadata}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={work.centerMedia.url}
                  alt={work.title}
                  fill
                  onLoad={handleImageLoad}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              )}
            </motion.div>
          )}

          <motion.div className="w-full h-full flex justify-between flex-col relative z-10">
            <div className="p-5 w-full flex justify-between items-center relative z-10">
              <motion.h2 className="rounded-full bg-[#fbfbfb] text-black/70 px-2.5 py-1.5 text-xs text-center font-medium font-inter-tight">
                {work.title}
              </motion.h2>

              <motion.div className="size-6.5 border-[0.5px] border-[#c6c6c6]/30 bg-white text-black/70 cursor-pointer rounded-full relative overflow-hidden flex items-center justify-center z-50">
                <motion.div
                  variants={firstArrowVariants}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <ArrowDiagonalIcon className="size-4" />
                </motion.div>
                <motion.div
                  variants={secondArrowVariants}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <ArrowDiagonalIcon className="size-4" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </PortalOverlay>
    </>
  );
}

const WorkCard = memo(WorkCardComponent);
export default WorkCard;
