"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MediaCard from "@/app/components/MediaCard";
import { CaseStudyData, CaseStudyMediaItem } from "@/lib/works";
import ArrowIcon from "@/app/components/icons/ArrowIcon";

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

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!expandedId) return;
    setIsNavigatingCarousel(true);
    const idx = carouselIds.indexOf(expandedId.toString());
    if (idx !== -1 && idx < carouselIds.length - 1) {
      setExpandedId(carouselIds[idx + 1]);
    } else {
      setExpandedId(carouselIds[0]);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!expandedId) return;
    setIsNavigatingCarousel(true);
    const idx = carouselIds.indexOf(expandedId.toString());
    if (idx > 0) {
      setExpandedId(carouselIds[idx - 1]);
    } else {
      setExpandedId(carouselIds[carouselIds.length - 1]);
    }
  };

  const handleExpand = (id?: string | number) => {
    setIsNavigatingCarousel(false);
    setExpandedId(id);
  };

  const getMediaCardProps = (id: string) => {
    const idx = carouselIds.indexOf(id);
    return {
      isExpanded: expandedId === id,
      onExpand: handleExpand,
      onClose: () => {
        setIsNavigatingCarousel(false);
        setExpandedId(undefined);
      },
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
      <div className="w-full flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#c6c6c6]/40 text-black/80 hover:text-black hover:border-black/30 transition-colors text-xs font-inter-tight font-medium shadow-2xs"
        >
          <span className="rotate-180 flex items-center justify-center size-3">
            <ArrowIcon />
          </span>
          Back to works
        </Link>
      </div>

      {/* Header */}
      <div className="w-full flex flex-col gap-10 items-center justify-center min-h-[75dvh] h-fit relative">
        {caseStudy.headerMedia && caseStudy.headerMedia.length > 0 && (
          <div className="flex flex-col md:flex-row gap-3 w-full">
            {caseStudy.headerMedia.map((media, index) => {
              const cardId = `header-${index + 1}`;
              return (
                <motion.div
                  key={cardId}
                  initial={{ backdropFilter: "blur(30px)", opacity: 0.5 }}
                  animate={{ backdropFilter: "blur(0px)", opacity: 1 }}
                  transition={{ type: "tween", duration: 0.6, damping: 0 }}
                  className="w-full md:w-1/3"
                >
                  <MediaCard
                    id={cardId}
                    backgroundImage={media.backgroundImage}
                    centerMedia={media.centerMedia}
                    aspectRatio={media.aspectRatio || "portrait"}
                    className="w-full"
                    // {...getMediaCardProps(cardId)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="w-full max-w-4xl text-center flex flex-col gap-3">
          <h1 className="self-center text-black py-0.5 px-3 font-inter-tight bg-white rounded-full text-base border-2 border-[#c6c6c6]/30">
            {caseStudy.title}
          </h1>

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
      <div className="w-full flex flex-col gap-5 font-inter-tight mt-10">
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
                  className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-3"
                >
                  {section.title && (
                    <h2 className="text-2xl font-medium text-black opacity-80 max-w-[90%]">
                      {section.title}
                    </h2>
                  )}
                  {section.description && (
                    <p className="leading-relaxed text-sm text-black">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 font-inter-tight border-t border-black/5 mt-8">
          {caseStudy.technologies && caseStudy.technologies.length > 0 && (
            <div className="flex flex-col items-center md:items-start gap-2">
              <h3 className="font-medium opacity-70 uppercase text-xs text-black/70">
                Technologies
              </h3>
              <ul className="text-sm flex flex-wrap gap-1">
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
            <div className="flex flex-col items-center md:items-start gap-2">
              <h3 className="font-medium opacity-70 uppercase text-xs text-black/70">
                Credits
              </h3>
              <ul className="text-sm flex flex-col gap-1.5">
                {caseStudy.credits.map((credit, index) => (
                  <li
                    key={index}
                    className="text-xs text-black/80 font-inter-tight"
                  >
                    <span className="font-medium text-black mr-2">
                      {credit.role}:
                    </span>
                    {credit.name}
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
