"use client";

import { useEffect, useRef, memo, useCallback, useSyncExternalStore } from "react";
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
  onNext?: () => void;
  onPrev?: () => void;
}

const emptySubscribe = () => () => {};

// Hoisted static Close Icon SVG (rendering-hoist-jsx)
const CloseIcon = (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SPRING_CONFIG = { damping: 25, stiffness: 700 };
const SCALE_SPRING_CONFIG = { damping: 28, stiffness: 500 };

function PortalOverlayComponent({
  isOpen,
  onClose,
  children,
  onNext,
  onPrev,
}: PortalOverlayProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // MotionValues for cursor scale/opacity - eliminates React state re-renders on mouse movement! (rerender-defer-reads)
  const cursorScaleRaw = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);
  const cursorScale = useSpring(cursorScaleRaw, SCALE_SPRING_CONFIG);

  const hasHovered = useRef(false);

  const cursorXSpring = useSpring(cursorX, SPRING_CONFIG);
  const cursorYSpring = useSpring(cursorY, SPRING_CONFIG);

  // Touch swipe tracking for mobile carousel navigation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isSwiping.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;
      const timeDiff = Date.now() - touchStartTime.current;

      touchStartX.current = null;
      touchStartY.current = null;

      // Ensure horizontal swipe: min 40px delta, horizontal dominant over vertical, duration < 800ms
      if (
        Math.abs(diffX) > 40 &&
        Math.abs(diffX) > Math.abs(diffY) * 1.2 &&
        timeDiff < 800
      ) {
        isSwiping.current = true;
        if (diffX < 0) {
          // Swipe Left -> Next
          if (onNext) onNext();
        } else {
          // Swipe Right -> Prev
          if (onPrev) onPrev();
        }
      }
    },
    [onNext, onPrev],
  );

  const handleTouchCancel = useCallback(() => {
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  }, []);

  const handleBackdropClick = useCallback(() => {
    if (isSwiping.current) {
      isSwiping.current = false;
      return;
    }
    onClose();
  }, [onClose]);

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
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#c6c6c6]/5 backdrop-blur-xs "
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
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
            }}
            onMouseEnter={(e) => {
              const targetX = e.clientX - 24;
              const targetY = e.clientY - 24;
              cursorXSpring.jump(targetX);
              cursorYSpring.jump(targetY);
              cursorX.set(targetX);
              cursorY.set(targetY);
              hasHovered.current = true;
              cursorOpacity.set(1);
              cursorScaleRaw.set(1);
            }}
            onMouseLeave={() => {
              hasHovered.current = false;
              cursorOpacity.set(0);
              cursorScaleRaw.set(0.8);
            }}
            aria-hidden="true"
          >
            {/* Custom "X" Cursor driven directly via MotionValues (0 React re-renders) */}
            <motion.button
              aria-label="Close Overlay"
              className="pointer-events-none fixed  top-0 left-0 w-12 h-12 border-[0.5px] border-[#c6c6c6]/30 bg-white text-black cursor-pointer rounded-full  hidden md:flex items-center justify-center z-50"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                scale: cursorScale,
                opacity: cursorOpacity,
              }}
            >
              {CloseIcon}
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen ? (
          <div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            {children}
          </div>
        ) : null}
      </AnimatePresence>
    </>,
    document.body,
  );
}

const PortalOverlay = memo(PortalOverlayComponent);
export default PortalOverlay;
