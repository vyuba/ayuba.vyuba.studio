"use client";

import { useState, useRef, memo, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import ExpandableCard from "./ExpandableCard";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mediaAspectRatio, setMediaAspectRatio] = useState<
    number | string | null
  >(centerMedia?.aspectRatio || null);

  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const isExpanded =
    controlledIsExpanded !== undefined
      ? controlledIsExpanded
      : internalIsExpanded;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

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

  return (
    <ExpandableCard
      id={id}
      aspectRatio={aspectRatio}
      className={className}
      isExpanded={isExpanded}
      onClose={handleClose}
      onNext={onNext}
      onPrev={onPrev}
      currentIndex={currentIndex}
      totalCount={totalCount}
      isNavigatingCarousel={isNavigatingCarousel}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      expandedContent={
        <>
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
        </>
      }
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
    </ExpandableCard>
  );
}

const MediaCard = memo(WorkMediaCardComponent);
export default MediaCard;
