"use client";

import { useState, useRef, memo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Work } from "../data/work";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import PortalOverlay from "./PortalOverlay";
import { ArrowDiagonalIcon } from "@shopify/polaris-icons";
import ArrowIcon from "./icons/ArrowIcon";

interface WorkCardProps {
  work: Work;
  aspectRatio?: "portrait" | "landscape" | string;
  className?: string;
  isExpanded?: boolean;
  onExpand?: (id: number) => void;
  onClose?: () => void;
  onNext?: (e: React.MouseEvent) => void;
  onPrev?: (e: React.MouseEvent) => void;
  currentIndex?: number;
  totalCount?: number;
  isNavigatingCarousel?: boolean;
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

const WorkCardComponent = ({
  work,
  aspectRatio,
  className = "",
  isExpanded = false,
  onExpand,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
  isNavigatingCarousel,
}: WorkCardProps) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mediaAspectRatio, setMediaAspectRatio] = useState<
    number | string | null
  >(work.centerMedia?.aspectRatio || null);

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScaleRaw = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);
  const cursorScale = useSpring(cursorScaleRaw, {
    damping: 28,
    stiffness: 500,
  });

  const cursorSpringConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, cursorSpringConfig);
  const cursorYSpring = useSpring(cursorY, cursorSpringConfig);

  const hasHovered = useRef(false);

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

      // Button width ~120px, height ~40px -> offsets: 60 and 20
      const localX = e.clientX - rect.left - 60;
      const localY = e.clientY - rect.top - 20;

      if (!hasHovered.current) {
        cursorXSpring.jump(localX);
        cursorYSpring.jump(localY);
        hasHovered.current = true;
      }
      cursorX.set(localX);
      cursorY.set(localY);
    },
    [mouseX, mouseY, cursorX, cursorY, cursorXSpring, cursorYSpring],
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const localX = e.clientX - rect.left - 60;
      const localY = e.clientY - rect.top - 20;

      cursorXSpring.jump(localX);
      cursorYSpring.jump(localY);
      cursorX.set(localX);
      cursorY.set(localY);
      hasHovered.current = true;
      cursorOpacity.set(1);
      cursorScaleRaw.set(1);
    },
    [
      cursorX,
      cursorY,
      cursorXSpring,
      cursorYSpring,
      cursorOpacity,
      cursorScaleRaw,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
    }

    hasHovered.current = false;
    cursorOpacity.set(0);
    cursorScaleRaw.set(0.8);
  }, [mouseX, mouseY, cursorOpacity, cursorScaleRaw]);

  const ratio = aspectRatio || work.aspectRatio || "portrait";
  const heightClass = getHeightClass(ratio);

  const openCard = useCallback(() => {
    if (onExpand) onExpand(work.id);
  }, [onExpand, work.id]);

  const handleClick = (e: React.MouseEvent) => {
    if (isExpanded) return;
    e.preventDefault();
    if (work.hasCaseStudy && work.caseStudyUrl) {
      if (work.caseStudyUrl.startsWith("http")) {
        window.open(work.caseStudyUrl, "_blank", "noopener,noreferrer");
      } else {
        router.push(work.caseStudyUrl);
      }
    } else if (work.link) {
      if (work.link.startsWith("http")) {
        window.open(work.link, "_blank", "noopener,noreferrer");
      } else {
        router.push(work.link);
      }
    } else {
      openCard();
    }
  };

  const handleClickExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    if (work.hasCaseStudy && work.caseStudyUrl) {
      if (work.caseStudyUrl.startsWith("http")) {
        window.open(work.caseStudyUrl, "_blank", "noopener,noreferrer");
      } else {
        router.push(work.caseStudyUrl);
      }
    } else if (work.link) {
      if (work.link.startsWith("http")) {
        window.open(work.link, "_blank", "noopener,noreferrer");
      } else {
        router.push(work.link);
      }
    }
  };

  return (
    <>
      <motion.article
        className={`group/work-card cursor-pointer w-full pb-3 ${className}`}
        key={work.id}
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
        {/* Placeholder slot in grid */}
        <div
          ref={cardRef}
          className={`w-full ${heightClass}`}
          onClick={handleClick}
        >
          {!isExpanded ? (
            <motion.div
              layoutId={`work-card-${work.id}`}
              initial="initial"
              whileHover="hover"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
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
                      ref={videoRef}
                      src={work.centerMedia.url}
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
                  <motion.h3
                    variants={titleVariants}
                    className="rounded-full px-2.5 py-1.5 text-xs text-center font-medium font-inter-tight"
                  >
                    {work.title}
                  </motion.h3>
                  {(work.hasCaseStudy && work.caseStudyUrl) ||
                    (work.link && (
                      <motion.div className="size-6.5 border-[0.5px] border-[#c6c6c6]/30 bg-white text-black/70 cursor-pointer rounded-full relative overflow-hidden flex items-center justify-center z-50">
                        <motion.button
                          aria-label={
                            work.caseStudyUrl ? "Case study" : "LiveLink"
                          }
                          variants={firstArrowVariants}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <ArrowDiagonalIcon className="size-4" />
                        </motion.button>
                        <motion.button
                          aria-label={
                            work.caseStudyUrl ? "Live Link" : "Case study"
                          }
                          variants={secondArrowVariants}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <ArrowDiagonalIcon className="size-4" />
                        </motion.button>
                      </motion.div>
                    ))}
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

              {/* Custom Hover Cursor */}
              <motion.div
                className="hidden md:block pointer-events-none absolute top-0 left-0 px-4 py-2 bg-white/80 backdrop-blur-md border-[0.5px] border-black/10 text-black text-sm rounded-full z-50 font-inter-tight whitespace-nowrap shadow-sm"
                style={{
                  x: cursorXSpring,
                  y: cursorYSpring,
                  scale: cursorScale,
                  opacity: cursorOpacity,
                }}
              >
                {work.hasCaseStudy && work.caseStudyUrl
                  ? "View Case Study"
                  : work.link
                    ? "View Live Link"
                    : "Open Modal"}
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </motion.article>

      <PortalOverlay isOpen={isExpanded} onClose={onClose || (() => {})}>
        <div className="w-fit h-fit relative flex flex-col">
          <motion.div
            layoutId={
              !isNavigatingCarousel ? `work-card-${work.id}` : undefined
            }
            className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden shadow-2xl pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickExpanded}
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
                    mediaAspectRatio ||
                    work.centerMedia.aspectRatio ||
                    undefined,
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
                <motion.h3 className="rounded-full bg-[#fbfbfb] text-black/70 px-2.5 py-1.5 text-xs text-center font-medium font-inter-tight">
                  {work.title}
                </motion.h3>
                {((work.hasCaseStudy && work.caseStudyUrl) || work.link) && (
                  <motion.div className="size-6.5 border-[0.5px] border-[#c6c6c6]/30 bg-white text-black/70 cursor-pointer rounded-full relative overflow-hidden flex items-center justify-center z-50">
                    <motion.button
                      aria-label={work.caseStudyUrl ? "Case study" : "LiveLink"}
                      variants={firstArrowVariants}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ArrowDiagonalIcon className="size-4" />
                    </motion.button>
                    <motion.button
                      aria-label={
                        work.caseStudyUrl ? "Live Link" : "Case study"
                      }
                      variants={secondArrowVariants}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ArrowDiagonalIcon className="size-4" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Custom Hover Cursor */}
            {((work.hasCaseStudy && work.caseStudyUrl) || work.link) && (
              <motion.div
                className="hidden md:block pointer-events-none absolute top-0 left-0 px-4 py-2 bg-white/80 backdrop-blur-md border-[0.5px] border-black/10 text-black text-sm rounded-full z-50 font-inter-tight whitespace-nowrap shadow-sm"
                style={{
                  x: cursorXSpring,
                  y: cursorYSpring,
                  scale: cursorScale,
                  opacity: cursorOpacity,
                }}
              >
                {work.hasCaseStudy && work.caseStudyUrl
                  ? "View Case Study"
                  : work.link
                    ? "View Live Link"
                    : "Open Modal"}
              </motion.div>
            )}
          </motion.div>
          {/* Carousel Controls */}
          {(onNext || onPrev) && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed bottom-[8vh] left-0 right-0 flex justify-center items-center gap-4 z-50 pointer-events-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPrev) onPrev(e);
                }}
                className="cursor-pointer bg-blend-difference w-10 h-10 flex items-center justify-center  text-white transition-colors rotate-180"
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
                className="cursor-pointer bg-blend-difference w-10 h-10 flex items-center justify-center  text-white transition-colors"
              >
                <ArrowIcon />
              </motion.button>
            </motion.div>
          )}
        </div>
      </PortalOverlay>
    </>
  );
};

const WorkCard = memo(WorkCardComponent);
export default WorkCard;
