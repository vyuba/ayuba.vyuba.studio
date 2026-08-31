"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CompanyHighlightProps extends HTMLMotionProps<"a"> {
  name?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
}

export default function CompanyHighlight({
  name,
  href,
  children,
  className = "",
  style,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: CompanyHighlightProps) {
  const content = name || children;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ textDecorationColor: "var(--primary)", ...style }}
        className={`inline hover:italic cursor-pointer text-black font-medium underline underline-offset-4 decoration-2 hover:opacity-80 transition-all ${className}`}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ textDecorationColor: "var(--primary)", ...style }}
      className={`inline cursor-pointer text-black font-medium underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity ${className}`}
      {...(props as HTMLMotionProps<"span">)}
    >
      {content}
    </motion.span>
  );
}
