import Image from "next/image";
import type { ReactNode } from "react";
import { petersGym } from "@/content/peters-gym";

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <p className={`section-label mb-5 ${align === "center" ? "justify-center" : ""}`}>
        {label}
      </p>
      <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] uppercase">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
