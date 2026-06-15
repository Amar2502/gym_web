import Image from "next/image";
import { getWhatsAppUrl, petersGym } from "@/content/peters-gym";
import { Reveal } from "./Reveal";

const { hero } = petersGym;
const whatsappUrl = getWhatsAppUrl();

export function Hero() {
  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden noise-overlay"
      aria-label="Hero"
    >
      <Image
        src={hero.backgroundImage}
        alt="Peters Gym interior — heavy training floor"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-8">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="rounded border border-accent/30 bg-background/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display text-[clamp(4rem,14vw,9rem)] leading-[0.9] uppercase tracking-wider text-gradient-subtle">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-foreground/90 md:text-2xl">
            {hero.tagline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {hero.primaryCta.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={hero.secondaryCta.href} className="btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce" aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
