"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { petersGym } from "@/content/peters-gym";
import { IconClose } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const { gallery } = petersGym;

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? null : (i + 1) % gallery.images.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + gallery.images.length) % gallery.images.length
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close]);

  const activeImage = activeIndex !== null ? gallery.images[activeIndex] : null;

  return (
    <section id="gallery" className="py-24 lg:py-32" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={gallery.label}
            title={<span id="gallery-heading">{gallery.title}</span>}
            description={gallery.description}
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {gallery.images.map((image, i) => (
            <Reveal key={image.src} delay={i * 60}>
              <button
                type="button"
                className="group relative aspect-[4/3] w-full overflow-hidden border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setActiveIndex(i)}
                aria-label={`View larger: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-background/40 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100">
                  {image.alt}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded p-2 text-foreground transition-colors hover:bg-white/10"
            onClick={close}
            aria-label="Close lightbox"
          >
            <IconClose className="h-8 w-8" />
          </button>

          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded border border-border bg-surface p-3 text-2xl hover:border-accent"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex - 1 + gallery.images.length) % gallery.images.length);
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded border border-border bg-surface p-3 text-2xl hover:border-accent"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex + 1) % gallery.images.length);
            }}
            aria-label="Next image"
          >
            ›
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-muted">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
