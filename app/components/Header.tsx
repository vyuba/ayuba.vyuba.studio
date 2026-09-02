"use client";

import { motion, type Variants } from "framer-motion";
import CompanyHighlight from "./CompanyHighlight";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const socialLinks = [
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

function Header() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full flex flex-col"
    >
      <section className="w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-9 items-end transition-all duration-300 ease-in-out max-w-300 mx-auto p-2.5 my-10 min-h-[70dvh]">
        <div className="flex flex-col gap-4">
          <motion.h1 variants={itemVariants} className="flex flex-col gap-1">
            <span className="text-5xl md:text-6xl text-pretty font-apfel tracking-tighter">
              I&apos;m Ayuba Alexander, an Engineer who Designs.
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-black/90 text-pretty font-normal font-inter-tight leading-relaxed"
          >
            Bridging the gap between engineering, visual design, and specialized
            Shopify development to craft intuitive digital products and commerce
            experiences. Designed and built the storefront, design system, and
            omnichannel Shopify POS experience at{" "}
            <CompanyHighlight name="Meji Meji" href="https://mejimeji.co" />.
            Built the web experience and creative development for the client
            linked with Shopify GraphQL using headless for{" "}
            <CompanyHighlight
              name="1Percnt Studio"
              href="https://1percnt.com"
            />
            . Currently designing and engineering the entire product end-to-end
            at{" "}
            <CompanyHighlight name="usecosmos" href="https://usecosmos.com" />.
          </motion.p>
          <motion.nav
            variants={itemVariants}
            aria-label="Social and professional profiles"
            className="w-fit"
          >
            <ul className="flex gap-0 p-0.5 font-inter-tight text-sm text-black/60 bg-[#c6c6c6]/30 rounded-full">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Ayuba Alexander's ${link.label} profile`}
                    className="px-2.5 py-0.5 cursor-pointer flex whitespace-nowrap items-center bg-white rounded-full hover:text-black transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
        <div className="w-full h-full hidden lg:block"></div>
      </section>
      <motion.button
        variants={itemVariants}
        onClick={() =>
          document
            .getElementById("work-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="self-center cursor-pointer capitalize py-1 px-3 font-inter-tight bg-white rounded-full text-sm border-2 border-[#c6c6c6]/30"
      >
        scroll to view works
      </motion.button>
    </motion.div>
  );
}

export default Header;
