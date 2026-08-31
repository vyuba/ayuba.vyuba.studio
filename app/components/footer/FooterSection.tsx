"use client";

import { motion } from "framer-motion";
import { useRef, MouseEvent } from "react";

const footerLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexander-preye-i-271aa7257/",
  },
  {
    label: "Contra",
    href: "https://contra.com/alexander_ayuba_preye_3fnoen2o?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=alexander_ayuba_preye_3fnoen2o",
  },
  { label: "GitHub", href: "https://github.com/vyuba" },
  { label: "Twitter", href: "https://x.com/vyuba_" },
  { label: "Instagram", href: "https://www.instagram.com/vyuba_/" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <footer className="w-full pt-5 pb-8 flex flex-col justify-center gap-6 [content-visibility:auto] [contain-intrinsic-size:0_300px] min-h-[30vh] relative">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-fit self-center relative group p-2"
        // style={{
        //   backgroundImage:
        //     "radial-gradient(#5C88DA40 2.5px, transparent 2.5px), radial-gradient(#FBFBFB40 2.5px, transparent 2.5px)",
        //   backgroundSize: "12px 12px",
        //   backgroundPosition: "-23px -10px, 5px 5px",
        // }}
      >
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#5C88DA 2.5px, transparent 2.5px), radial-gradient(#FBFBFB 2.5px, transparent 2.5px)",
            backgroundSize: "12px 12px",
            backgroundPosition: "-23px -10px, 5px 5px",
            maskImage:
              "radial-gradient(22px circle at var(--mouse-x, 0) var(--mouse-y, 0), black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(22px circle at var(--mouse-x, 0) var(--mouse-y, 0), black 0%, transparent 100%)",
          }}
        />
        <h2 className="text-3xl font-braille text-[#5C88DA] relative z-10 pointer-events-none">
          Ayuba Alexander
        </h2>
      </div>
      <ul className="flex gap-0 p-0.5 self-center font-inter-tight text-sm text-black/60 bg-[#c6c6c6]/30 rounded-full relative z-10">
        {footerLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="px-2.5 py-0.5 cursor-pointer flex whitespace-nowrap items-center bg-white rounded-full hover:text-black transition-all"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        href={"https://cal.com/vyuba.studio/30min"}
        className="self-center text-sm px-2.5 py-0.5 w-fit text-white cursor-pointer flex whitespace-nowrap items-center bg-black rounded-full hover:text-white transition-all"
      >
        Schedule a Call
      </motion.a>
    </footer>
  );
}
