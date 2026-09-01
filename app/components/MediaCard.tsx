"use client";

import { useState, useRef, memo, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import PortalOverlay from "./PortalOverlay";
import ArrowIcon from "./icons/ArrowIcon";

interface WorkMediaCardProps {
  id?: number | string;
  backgroundImage?: string;
  centerMedia?: {
    type: "image" | "video";
    url: string;
    aspectRatio?: number | string;
  };
  aspectRatio?: string;
  className?: string;
  onClick?: () => void;
  isExpanded?: boolean;
  onExpand?: (id?: string | number) => void;
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

function WorkMediaCardComponent({
  id,
  backgroundImage,
  centerMedia,
  aspectRatio = "portrait",
  className = "",
  onClick,
  isExpanded: controlledIsExpanded,
  onExpand,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
  isNavigatingCarousel,
}: WorkMediaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mediaAspectRatio, setMediaAspectRatio] = useState<
    number | string | null
  >(centerMedia?.aspectRatio || null);

  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const isExpanded =
    controlledIsExpanded !== undefined
      ? controlledIsExpanded
      : internalIsExpanded;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scaleFactor, setScaleFactor] = useState(1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

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

  const handleCardClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (isExpanded) return;
    if (onExpand) {
      onExpand(id);
    } else {
      setInternalIsExpanded(true);
    }
  };

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsExpanded(false);
    }
  }, [onClose]);

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

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [mouseX, mouseY]);

  const heightClass = getHeightClass(aspectRatio);

  return (
    <>
      <motion.article
        className={`group/work-card cursor-pointer w-full pb-3 ${className}`}
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
        <div ref={cardRef} className={`w-full ${heightClass}`}>
          {!isExpanded ? (
            <motion.div
              layoutId={id ? `work-card-${id}` : undefined}
              initial="initial"
              whileHover="hover"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onClick={handleCardClick}
              className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden active:scale-[0.99] w-full h-full"
            >
              {backgroundImage && (
                <Image
                  src={backgroundImage}
                  alt="Work Background"
                  fill
                  className={`object-cover z-0 object-center ${centerMedia ? "scale-110 opacity-90 group-hover/work-card:scale-112 duration-700 transition-all " : "group-hover/work-card:scale-102 duration-700 transition-all "}`}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              )}
              {centerMedia && (
                <motion.div className="absolute inset-0 bg-black/20 z-0"></motion.div>
              )}

              {centerMedia && (
                <motion.div
                  style={{
                    x: magneticX,
                    y: magneticY,
                    aspectRatio:
                      mediaAspectRatio || centerMedia.aspectRatio || undefined,
                  }}
                  className="absolute inset-0 m-auto w-auto h-auto max-w-[85%] max-h-[70%] z-10 flex items-center justify-center pointer-events-none overflow-hidden shadow-lg group-hover/work-card:scale-102 duration-700 transition-all"
                >
                  {centerMedia.type === "video" ? (
                    <video
                      ref={videoRef}
                      src={centerMedia.url}
                      loop
                      muted
                      playsInline
                      onLoadedMetadata={handleVideoMetadata}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={centerMedia.url}
                      alt="Work Center Media"
                      fill
                      onLoad={handleImageLoad}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </div>
      </motion.article>

      <PortalOverlay isOpen={isExpanded} onClose={handleClose}>
        <div className="w-fit h-fit relative flex flex-col">
          <motion.div
            layoutId={
              id && !isNavigatingCarousel ? `work-card-${id}` : undefined
            }
            className="bg-[#F5F5F5] rounded-[19px] cursor-pointer border-[0.5px] border-[#000000]/15 relative overflow-hidden shadow-2xl pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
            {backgroundImage && (
              <Image
                src={backgroundImage}
                alt="Work Background"
                fill
                className={`object-cover object-center z-0 ${centerMedia ? "scale-110 opacity-90" : ""}`}
                sizes="(max-width: 768px) 100vw, 100vw"
              />
            )}
            {centerMedia && (
              <motion.div className="absolute inset-0 bg-black/20 z-0"></motion.div>
            )}

            {centerMedia && (
              <motion.div
                style={{
                  x: magneticX,
                  y: magneticY,
                  aspectRatio:
                    mediaAspectRatio || centerMedia.aspectRatio || undefined,
                }}
                className="absolute inset-0 m-auto w-auto h-auto max-w-[85%] max-h-[85%] z-10 flex items-center justify-center pointer-events-none overflow-hidden shadow-lg "
              >
                {centerMedia.type === "video" ? (
                  <video
                    src={centerMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedMetadata={handleVideoMetadata}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={centerMedia.url}
                    alt="Work Center Media"
                    fill
                    onLoad={handleImageLoad}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                  />
                )}
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
}

const MediaCard = memo(WorkMediaCardComponent);
export default MediaCard;
