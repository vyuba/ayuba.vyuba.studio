"use client";

import { useState, useRef, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Work } from "../data/work";
import { motion } from "framer-motion";
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
                <div className="absolute inset-0 bg-black/20 z-0"></div>
              )}
              
              {work.centerMedia && (
                <div className="absolute inset-0 m-auto w-[60%] h-[50%] md:w-[250px] md:h-[350px] z-10 flex items-center justify-center pointer-events-none rounded-xl overflow-hidden shadow-lg">
                  {work.centerMedia.type === 'video' ? (
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

              <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
                <ul className="flex flex-wrap gap-1 self-end pointer-events-auto">
                  {work.commingSoon ? (
                    <li className="text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit bg-white rounded-sm px-3 py-1.5 uppercase w-fit shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11v6m0-12a2 2 0 1 0 0 4a2 2 0 1 0 0-4Zm0 0V3m0 20a10 10 0 1 0 0-20a10 10 0 1 0 0 20Z"/></svg>
                      <p>comming soon</p>
                    </li>
                  ) : work.liveLink ? (
                    <li className="text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit bg-white rounded-sm px-3 py-1.5 uppercase w-fit shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4" ry="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" /></g></svg>
                      <p>view Live</p>
                    </li>
                  ) : null}
                </ul>
                <div className="flex flex-col gap-2 mt-auto">
                  <ul className="flex flex-wrap gap-1 md:opacity-0 opacity-100 group-hover/work-card:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    {work.skills.map((skill: string) => (
                      <li key={skill} className="text-xs font-medium font-mono text-black/60 bg-white rounded-sm px-3 py-1.5 uppercase shadow-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-0.5 mt-2 bg-white/80 backdrop-blur-md p-3 rounded-lg w-fit pointer-events-auto">
                    <p className="text-base font-medium text-black capitalize">
                      {work.title}
                    </p>
                    <p className="text-xs font-medium text-black/60 font-mono uppercase">
                      {work.type}
                    </p>
                  </div>
                </div>
              </div>

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
                  {work.centerMedia.type === 'video' ? (
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

              <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 pointer-events-none">
                <ul className="flex flex-wrap gap-1 self-end pointer-events-auto">
                  {work.commingSoon ? (
                    <li className="text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit bg-white rounded-sm px-3 py-1.5 uppercase w-fit shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11v6m0-12a2 2 0 1 0 0 4a2 2 0 1 0 0-4Zm0 0V3m0 20a10 10 0 1 0 0-20a10 10 0 1 0 0 20Z"/></svg>
                      <p>comming soon</p>
                    </li>
                  ) : work.liveLink ? (
                    <li className="text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit bg-white rounded-sm px-3 py-1.5 uppercase w-fit shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4" ry="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" /></g></svg>
                      <p>view Live</p>
                    </li>
                  ) : null}
                </ul>
                <div className="flex flex-col gap-2 mt-auto">
                  <ul className="flex flex-wrap gap-1 md:opacity-0 opacity-100 group-hover/work-card:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    {work.skills.map((skill: string) => (
                      <li key={skill} className="text-xs font-medium font-mono text-black/60 bg-white rounded-sm px-3 py-1.5 uppercase shadow-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-0.5 mt-2 bg-white/80 backdrop-blur-md p-3 rounded-lg w-fit pointer-events-auto">
                    <p className="text-base font-medium text-black capitalize">
                      {work.title}
                    </p>
                    <p className="text-xs font-medium text-black/60 font-mono uppercase">
                      {work.type}
                    </p>
                  </div>
                </div>
              </div>

        </motion.div>
      </PortalOverlay>
    </>
  );
}

const WorkCard = memo(WorkCardComponent);
export default WorkCard;
