"use client";

import { useState, useRef, memo, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

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
}: WorkMediaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mediaAspectRatio, setMediaAspectRatio] = useState<
    number | string | null
  >(centerMedia?.aspectRatio || null);

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
      <div className={`w-full ${heightClass}`}>
        <motion.div
          layoutId={id ? `work-card-${id}` : undefined}
          ref={cardRef}
          initial="initial"
          whileHover="hover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
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
      </div>
    </motion.article>
  );
}

const MediaCard = memo(WorkMediaCardComponent);
export default MediaCard;
