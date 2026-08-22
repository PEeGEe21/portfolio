"use client";

import type { ReactNode } from "react";

type ScrollLinkProps = {
  children: ReactNode;
  className?: string;
  targetId: string;
};

export function ScrollLink({ children, className, targetId }: ScrollLinkProps) {
  function scrollToTarget() {
    const target = document.getElementById(targetId);
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <button type="button" className={`cursor-pointer ${className ?? ""}`} onClick={scrollToTarget}>
      {children}
    </button>
  );
}
