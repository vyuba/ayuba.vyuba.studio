"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface PortalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function PortalOverlay({
  isOpen,
  onClose,
  children,
}: PortalOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHoveringBackdrop, setIsHoveringBackdrop] = useState(false);
  const hasHovered = useRef(false);

  // Springs for smooth, physics-based cursor following
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#c6c6c6]/5 backdrop-blur-xs "
            onClick={onClose}
            onMouseMove={(e) => {
              const targetX = e.clientX - 24;
              const targetY = e.clientY - 24;
              if (!hasHovered.current) {
                cursorXSpring.jump(targetX);
                cursorYSpring.jump(targetY);
                hasHovered.current = true;
              }
              cursorX.set(targetX);
              cursorY.set(targetY);
              if (!isHoveringBackdrop) setIsHoveringBackdrop(true);
            }}
            onMouseEnter={(e) => {
              const targetX = e.clientX - 24;
              const targetY = e.clientY - 24;
              cursorXSpring.jump(targetX);
              cursorYSpring.jump(targetY);
              cursorX.set(targetX);
              cursorY.set(targetY);
              hasHovered.current = true;
              setIsHoveringBackdrop(true);
            }}
            onMouseLeave={() => {
              setIsHoveringBackdrop(false);
              hasHovered.current = false;
            }}
            aria-hidden="true"
          >
            {/* Custom "X" Cursor */}
            <motion.div
              className="pointer-events-none fixed top-0 left-0 w-12 h-12 border-[0.5px] border-[#c6c6c6]/30 bg-white text-black cursor-pointer  rounded-full flex items-center justify-center z-50"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHoveringBackdrop ? 1 : 0.8,
                opacity: isHoveringBackdrop ? 1 : 0,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            {children}
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
