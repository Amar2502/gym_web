"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,rgba(230,57,70,0.18)_0%,transparent_55%),linear-gradient(to_bottom,#141418_0%,#0e0e12_100%)]"
      aria-hidden
    />
  ),
});

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <HeroScene isVisible={isVisible} />
      {/* Spotlight behind headline only — sides & bottom stay clear for equipment */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,rgba(8,8,8,0.78)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_88%,rgba(230,57,70,0.18)_0%,transparent_42%)]" />
    </div>
  );
}
