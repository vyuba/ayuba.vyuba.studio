"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MediaCard from "@/app/components/MediaCard";
import { CaseStudyData, CaseStudyMediaItem } from "@/lib/works";
import ArrowIcon from "@/app/components/icons/ArrowIcon";
import { ArrowDiagonalIcon } from "@shopify/polaris-icons";

interface WorkDetailViewProps {
  caseStudy: CaseStudyData;
}

export default function WorkDetailView({ caseStudy }: WorkDetailViewProps) {
  // Collect all media items from header and sections for the carousel lightbox
  const allMediaItems = useMemo(() => {
    const items: Array<{ id: string; media: CaseStudyMediaItem }> = [];
    let counter = 1;

    // caseStudy.headerMedia?.forEach((media) => {
    //   items.push({ id: `header-${counter++}`, media });
    // });

    caseStudy.sections?.forEach((sec) => {
      sec.items?.forEach((media) => {
        items.push({ id: `section-media-${counter++}`, media });
      });
    });

    return items;
  }, [caseStudy]);

  const carouselIds = useMemo(
    () => allMediaItems.map((item) => item.id),
    [allMediaItems],
  );

  const [expandedId, setExpandedId] = useState<string | number | undefined>(
    undefined,
  );
  const [isNavigatingCarousel, setIsNavigatingCarousel] = useState(false);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!expandedId) return;
      setIsNavigatingCarousel(true);
      const idx = carouselIds.indexOf(expandedId.toString());
      if (idx !== -1 && idx < carouselIds.length - 1) {
        setExpandedId(carouselIds[idx + 1]);
      } else {
        setExpandedId(carouselIds[0]);
      }
    },
    [carouselIds, expandedId],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!expandedId) return;
      setIsNavigatingCarousel(true);
      const idx = carouselIds.indexOf(expandedId.toString());
      if (idx > 0) {
        setExpandedId(carouselIds[idx - 1]);
      } else {
        setExpandedId(carouselIds[carouselIds.length - 1]);
      }
    },
    [carouselIds, expandedId],
  );

  const handleClose = useCallback(() => {
    setIsNavigatingCarousel(false);
    setExpandedId(undefined);
  }, []);

  const handleExpand = useCallback((id?: string | number) => {
    setIsNavigatingCarousel(false);
    setExpandedId(id);
  }, []);

  // Keyboard navigation for open modal/popover (Esc to close, ArrowLeft/ArrowRight for prev/next)
  useEffect(() => {
    if (!expandedId) return;

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

  const getMediaCardProps = (id: string) => {
    const idx = carouselIds.indexOf(id);
    return {
      isExpanded: expandedId === id,
      onExpand: handleExpand,
      onClose: handleClose,
      onNext: handleNext,
      onPrev: handlePrev,
      currentIndex: idx,
      totalCount: carouselIds.length,
      isNavigatingCarousel,
    };
  };

  let mediaCounter = 1;

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#FBFBFB] max-w-300 mx-auto px-4 py-8">
      {/* Back to works button */}
      <div className="w-full flex items-center justify-between my-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2  py-1.5 rounded-full hover:scale-90 transition-all text-xs font-inter-tight font-medium shadow-2xs"
        >
          <span className="rotate-180 flex items-center justify-center size-10 text-primary">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="w-full flex flex-col gap-3 md:gap-10 items-center justify-center min-h-[75dvh] h-fit relative">
        {caseStudy.headerMedia && caseStudy.headerMedia.length > 0 && (
          <div className="contents md:flex md:flex-row md:gap-3 w-full">
            {caseStudy.headerMedia.map((media, index) => {
              const cardId = `header-${index + 1}`;
              const middleIndex = Math.floor(caseStudy.headerMedia.length / 2);
              const isMiddle = index === middleIndex;
              const mobileOrder = isMiddle
                ? "order-1"
                : index < middleIndex
                  ? "order-3"
                  : "order-4";

              return (
                <motion.div
                  key={cardId}
                  initial={{ backdropFilter: "blur(30px)", opacity: 0.5 }}
                  animate={{ backdropFilter: "blur(0px)", opacity: 1 }}
                  transition={{ type: "tween", duration: 0.6, damping: 0 }}
                  className={`w-full md:w-1/3 md:order-0 ${mobileOrder}`}
                >
                  <MediaCard
                    id={cardId}
                    backgroundImage={media.backgroundImage}
                    centerMedia={media.centerMedia}
                    aspectRatio={media.aspectRatio || "portrait"}
                    className="w-full"
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="w-full max-w-4xl text-center flex flex-col gap-3 order-2 md:order-0 mb-5 md:mb-0">
          <div className="self-center flex items-center justify-center gap-1">
            <h1 className="self-center text-black py-0.5 px-3 font-inter-tight bg-white rounded-full text-base border-2 border-[#c6c6c6]/30">
              {caseStudy.title}
            </h1>
            {caseStudy.liveUrl ? (
              <Link
                aria-label={`View LiveLink: ${caseStudy.title}`}
                className="flex items-center justify-center size-8 border-2 border-[#c6c6c6]/30 bg-white text-black/70 cursor-pointer rounded-full relative overflow-hidden  transition-colors"
                href={caseStudy.liveUrl}
                target={
                  caseStudy.liveUrl.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  caseStudy.liveUrl.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <ArrowDiagonalIcon className="size-4 text-current" />
              </Link>
            ) : null}
          </div>

          {caseStudy.specifics && caseStudy.specifics.length > 0 && (
            <ul className="text-sm flex flex-wrap gap-1 self-center justify-center">
              {caseStudy.specifics.map((item, index) => (
                <li
                  className="bg-white w-fit border border-[#c6c6c6]/30 whitespace-nowrap rounded-full px-2.5 py-1 text-sm self-center text-center text-black font-inter-tight"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {caseStudy.summary && (
            <p className="text-black/80 text-sm self-center font-inter-tight text-pretty">
              {caseStudy.summary}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic Content Sections */}
      <div className="w-full flex flex-col gap-5 font-inter-tight mt-3 md:mt-10">
        <div className="flex flex-col gap-4">
          {caseStudy.sections?.map((section, sIndex) => {
            if (section.type === "grid-2") {
              return (
                <div
                  key={sIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {section.items?.map((item) => {
                    const id = `section-media-${mediaCounter++}`;
                    return (
                      <MediaCard
                        key={id}
                        id={id}
                        backgroundImage={item.backgroundImage}
                        centerMedia={item.centerMedia}
                        aspectRatio={item.aspectRatio || "square"}
                        className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
                        {...getMediaCardProps(id)}
                      />
                    );
                  })}
                </div>
              );
            }

            if (section.type === "grid-3") {
              return (
                <div
                  key={sIndex}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {section.items?.map((item) => {
                    const id = `section-media-${mediaCounter++}`;
                    return (
                      <MediaCard
                        key={id}
                        id={id}
                        backgroundImage={item.backgroundImage}
                        centerMedia={item.centerMedia}
                        aspectRatio={item.aspectRatio || "square"}
                        className="w-full h-full min-h-[40vh] rounded-xl overflow-hidden"
                        {...getMediaCardProps(id)}
                      />
                    );
                  })}
                </div>
              );
            }

            if (section.type === "full") {
              return (
                <div key={sIndex} className="w-full">
                  {section.items?.map((item) => {
                    const id = `section-media-${mediaCounter++}`;
                    return (
                      <MediaCard
                        key={id}
                        id={id}
                        backgroundImage={item.backgroundImage}
                        centerMedia={item.centerMedia}
                        aspectRatio={item.aspectRatio || "landscape"}
                        className="w-full h-full min-h-[50vh] rounded-xl overflow-hidden"
                        {...getMediaCardProps(id)}
                      />
                    );
                  })}
                </div>
              );
            }

            if (section.type === "split") {
              return (
                <div
                  key={sIndex}
                  className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-3 "
                >
                  {section.title && (
                    <h2 className="text-2xl font-medium text-black opacity-80 md:max-w-[90%] md:text-left text-center text-pretty">
                      {section.title}
                    </h2>
                  )}
                  {section.description && (
                    <p className="leading-relaxed text-sm text-black text-center md:text-left text-pretty">
                      {section.description}
                    </p>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Technologies & Credits */}
        <div className="grid grid-cols-1 w-full items-center justify-center gap-10 p-8 font-inter-tight mt-8">
          {caseStudy.technologies && caseStudy.technologies.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-medium opacity-70 uppercase text-xs text-black/70">
                Technologies
              </h3>
              <ul className="text-sm flex items-center justify-center flex-wrap gap-1">
                {caseStudy.technologies.map((item, index) => (
                  <li
                    className="bg-white w-fit border border-[#c6c6c6]/30 whitespace-nowrap rounded-full px-2.5 py-1 text-sm text-center text-black font-inter-tight"
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {caseStudy.credits && caseStudy.credits.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <h3 className="font-medium opacity-70 uppercase text-xs text-black/70">
                Credits
              </h3>
              <ul className="flex flex-wrap max-w-100 items-center justify-center gap-3">
                {caseStudy.credits.map((credit, index) => (
                  <li
                    key={index}
                    className=" text-black/80 font-inter-tight flex flex-col items-center gap-1"
                  >
                    <span className="font-medium text-black mr-2 text-xs">
                      {credit.role}
                    </span>
                    <span className="text-sm">{credit.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
