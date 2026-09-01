"use client";

import { memo, useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { NavLinks } from "../data/constant";
import works from "../data/work";

// Hoisted static transition (rendering-hoist-jsx)
const navTransition: Transition = {
  duration: 0.3,
  ease: [0, 0, 1, 1],
};

// Hoisted O(1) lookup map for works (js-index-maps / js-combine-iterations)
const worksMap = new Map<string, (typeof works)[number]>();
for (let i = 0; i < works.length; i++) {
  const w = works[i];
  if (w.slug) worksMap.set(w.slug.toLowerCase(), w);
  worksMap.set(String(w.id), w);
  worksMap.set(w.title.toLowerCase().replace(/\s+/g, "-"), w);
  if (w.caseStudyUrl) worksMap.set(w.caseStudyUrl.toLowerCase(), w);
}

function NavbarComponent() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeReappeared, setActiveReappeared] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const isNearRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);

  // Derived menu state memoization (rerender-derived-state)
  const { menuItems, activeItem } = useMemo(() => {
    const isWorkDetailPage = pathname.startsWith("/work/");
    const currentWorkSlug = isWorkDetailPage
      ? pathname.split("/work/")[1]?.split("/")[0]?.toLowerCase()
      : null;

    const currentWork = currentWorkSlug ? worksMap.get(currentWorkSlug) : null;

    const workTitle =
      currentWork?.title ||
      (currentWorkSlug
        ? currentWorkSlug
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ")
        : "Work");

    const items = NavLinks.menu.map((item) => {
      if (isWorkDetailPage && (item.link === "/works" || item.id === 2)) {
        return {
          ...item,
          title: workTitle,
          link: pathname,
        };
      }
      return item;
    });

    const active = isWorkDetailPage
      ? items.find((item) => item.link === pathname) || items[1]
      : items.find((item) => {
          if (item.link === "/") return pathname === "/";
          return pathname.startsWith(item.link);
        }) || items[0];

    return { menuItems: items, activeItem: active };
  }, [pathname]);

  // Derived media query listener instead of continuous resize events (rerender-derived-state)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const updateMobile = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setMobileMenuOpen(false);
      }
    };
    updateMobile(mql);
    mql.addEventListener("change", updateMobile);
    return () => mql.removeEventListener("change", updateMobile);
  }, []);

  // Passive scroll listener (client-passive-event-listeners)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 50);
      if (scrollPos <= 50) {
        setMobileMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateCachedRect = useCallback(() => {
    if (navRef.current) {
      cachedRectRef.current = navRef.current.getBoundingClientRect();
    }
  }, []);

  // Proximity detection for cursor on desktop with rAF throttling & cached rect (js-batch-dom-css / client-passive-event-listeners)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;

      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        let rect = cachedRectRef.current;
        if (!rect && navRef.current) {
          rect = navRef.current.getBoundingClientRect();
          cachedRectRef.current = rect;
        }

        let near = false;
        if (rect) {
          const proximityY = 85;
          const proximityX = 80;
          const isCloseY =
            e.clientY >= Math.max(0, rect.top - proximityY) &&
            e.clientY <= rect.bottom + proximityY;
          const isCloseX =
            e.clientX >= rect.left - proximityX &&
            e.clientX <= rect.right + proximityX;
          near = (isCloseY && isCloseX) || e.clientY <= 75;
        } else {
          near = e.clientY < 90;
        }

        if (isNearRef.current !== near) {
          isNearRef.current = near;
          setIsNear(near);
        }
      });
    },
    [isMobile],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", updateCachedRect, { passive: true });
    window.addEventListener("resize", updateCachedRect, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateCachedRect);
      window.removeEventListener("resize", updateCachedRect);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleMouseMove, updateCachedRect]);

  // Collapse state:
  // - On desktop: collapsed when scrolled past 50px AND cursor is NOT near or hovering navbar
  // - On mobile: collapsed when scrolled past 50px AND mobile menu is not open
  const isCollapsed = isMobile
    ? isScrolled && !mobileMenuOpen
    : isScrolled && !isNear && !isHovered;

  // Active link animates out alongside all items, then reappears shortly after
  useEffect(() => {
    if (!isCollapsed) return;
    const timer = setTimeout(() => {
      setActiveReappeared(true);
    }, 250);
    return () => {
      clearTimeout(timer);
      setActiveReappeared(false);
    };
  }, [isCollapsed]);

  return (
    <header className="w-full fixed top-0 left-0 flex items-start md:items-center justify-start md:justify-center z-50 p-3 md:p-5 pointer-events-none">
      <div
        ref={navRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto relative max-w-fit"
      >
        <motion.nav
          layout
          aria-label="Main Navigation"
          transition={navTransition}
          className="bg-[#c6c6c6]/30 backdrop-blur-md flex items-center max-w-fit font-inter-tight capitalize p-0.5 rounded-full text-black/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-white/20"
        >
          <motion.ul
            layout
            transition={navTransition}
            className="items-center text-base md:text-sm font-medium w-full flex gap-0.5"
          >
            <AnimatePresence initial={false}>
              {menuItems.map((item) => {
                const isActive = item.id === activeItem.id;
                const isVisible = !isCollapsed || isActive;

                if (!isVisible) return null;

                const isHiddenDuringCollapse =
                  isCollapsed && !activeReappeared && isActive;

                return (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{
                      opacity: 0,
                      filter: "blur(8px)",
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: isHiddenDuringCollapse ? 0 : 1,
                      filter: isHiddenDuringCollapse
                        ? "blur(8px)"
                        : "blur(0px)",
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(8px)",
                      scale: 0.95,
                    }}
                    transition={navTransition}
                    className="flex-shrink-0"
                  >
                    <Link
                      href={item.link}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-2.5 py-0.5 cursor-pointer flex whitespace-nowrap items-center bg-white rounded-full transition-colors duration-200 ${
                        isActive
                          ? "text-black font-semibold shadow-xs"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                );
              })}

              {/* Mobile Menu Trigger Button (Gooey In on Mobile when Scrolled & Collapsed) */}
              {isMobile && isScrolled && activeReappeared && (
                <motion.li
                  key="mobile-menu-btn"
                  layout
                  initial={{
                    opacity: 0,
                    filter: "blur(8px)",
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    filter: "blur(8px)",
                    scale: 0.95,
                  }}
                  transition={navTransition}
                  className="shrink-0"
                >
                  <button
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle Menu"
                    aria-expanded={mobileMenuOpen}
                    className="px-2.5 py-1 cursor-pointer flex whitespace-nowrap items-center gap-1.5 bg-white rounded-full text-black/70 hover:text-black transition-colors"
                  >
                    <span className="text-sm font-inter-tight capitalize tracking-wider font-semibold">
                      {mobileMenuOpen ? "Close" : "Menu"}
                    </span>
                    <div className="flex flex-col gap-0.5 items-center justify-center w-3 h-3">
                      <motion.span
                        animate={
                          mobileMenuOpen
                            ? { rotate: 45, y: 2 }
                            : { rotate: 0, y: 0 }
                        }
                        transition={{ duration: 0.2 }}
                        className="w-2.5 h-[1.5px] bg-black/70 rounded-full block"
                      />
                      <motion.span
                        animate={
                          mobileMenuOpen
                            ? { rotate: -45, y: -2 }
                            : { rotate: 0, y: 0 }
                        }
                        transition={{ duration: 0.2 }}
                        className="w-2.5 h-[1.5px] bg-black/70 rounded-full block"
                      />
                    </div>
                  </button>
                </motion.li>
              )}
            </AnimatePresence>
          </motion.ul>
        </motion.nav>

        {/* Mobile Dropdown Menu when opened on mobile */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              role="menu"
              aria-label="Mobile Navigation"
              initial={{
                opacity: 0,
                y: -8,
                filter: "blur(10px)",
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                filter: "blur(8px)",
                scale: 0.95,
              }}
              transition={navTransition}
              className="absolute left-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl border border-black/5 rounded-2xl p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 flex flex-col gap-1"
            >
              {menuItems.map((item) => {
                const isActive = item.id === activeItem.id;
                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-1.5 rounded-xl font-inter-tight text-sm flex items-center justify-between transition-colors ${
                      isActive
                        ? "bg-[#c6c6c6]/20 text-black font-semibold"
                        : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    <span>{item.title}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

const Navbar = memo(NavbarComponent);
export default Navbar;
