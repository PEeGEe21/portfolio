"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/content";

type ProjectMediaProps = {
  project: Project;
};

function getEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);

    if (url.hostname === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
    }

    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : videoUrl;
    }

    if (url.hostname.includes("vimeo.com")) {
      return `https://player.vimeo.com/video/${url.pathname.split("/").filter(Boolean).at(-1)}`;
    }
  } catch {
    return null;
  }

  return null;
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenshots = project.screenshots;

  if (project.useVideo && project.videoUrl) {
    const embedUrl = getEmbedUrl(project.videoUrl);

    if (embedUrl) {
      return (
        <div className="aspect-video overflow-hidden rounded-lg border border-border bg-bg-surface">
          <iframe
            src={embedUrl}
            title={`${project.title} project video`}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <video
        src={project.videoUrl}
        controls
        preload="metadata"
        poster={screenshots[0]?.src}
        className="aspect-video w-full rounded-lg border border-border bg-bg-surface"
      >
        Your browser does not support embedded video.
      </video>
    );
  }

  if (screenshots.length === 0) {
    return (
      <div className="grid aspect-[16/8] place-items-center overflow-hidden rounded-lg border border-border bg-bg-surface p-8 text-center">
        <div>
          <p className="font-display text-2xl font-semibold">{project.title}</p>
          <p className="mt-2 font-mono text-xs tracking-[0.16em] text-text-muted uppercase">Case study · visual preview pending</p>
        </div>
      </div>
    );
  }

  const hasMultipleScreenshots = screenshots.length > 1;

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + screenshots.length) % screenshots.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % screenshots.length);
  }

  return (
    <div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-border bg-bg-surface">
        {screenshots.map((screenshot, index) => (
          <Image
            key={screenshot.src}
            src={screenshot.src}
            alt={index === activeIndex ? screenshot.alt : ""}
            fill
            sizes="(min-width: 1400px) 1336px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)"
            priority={index === 0}
            aria-hidden={index !== activeIndex}
            className={`object-contain transition-opacity duration-300 ${index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          />
        ))}
        {hasMultipleScreenshots ? (
          <div className="absolute inset-x-4 top-1/2 z-20 flex -translate-y-1/2 justify-between">
            <button type="button" onClick={showPrevious} aria-label="Show previous screenshot" className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-bg-main/90 text-xl text-text-primary shadow-lg backdrop-blur transition-colors hover:border-text-muted items-center justify-center">←</button>
            <button type="button" onClick={showNext} aria-label="Show next screenshot" className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-bg-main/90 text-xl text-text-primary shadow-lg backdrop-blur transition-colors hover:border-text-muted items-center justify-center">→</button>
          </div>
        ) : null}
      </div>
      {hasMultipleScreenshots ? (
        <div className="mt-4 flex items-center justify-center gap-2" aria-label={`Screenshot ${activeIndex + 1} of ${screenshots.length}`}>
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show screenshot ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2 cursor-pointer rounded-full transition-[width,background-color] ${index === activeIndex ? "w-7 bg-accent" : "w-2 bg-border hover:bg-text-muted"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
