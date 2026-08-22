"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-[70] h-1 origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
