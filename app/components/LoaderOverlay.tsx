"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoaderOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 -z-0 flex items-center justify-center bg-transparent"
      >
        <h2
          className={`text-3xl font-braille self-center text-[#5C88DA] justify-self-end ${isVisible ? "animate-pulse" : ""}`}
        >
          Ayuba Alexander
        </h2>
      </motion.div>
    </AnimatePresence>
  );
}
