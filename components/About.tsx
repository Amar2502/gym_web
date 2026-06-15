import Image from "next/image";
import { petersGym } from "@/content/peters-gym";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const { founder } = petersGym;

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/5 blur-2xl" />
              <div className="relative aspect-square overflow-hidden border border-border">
                <Image
                  src={founder.image}
                  alt={`${founder.name} — founder of Peters Gym`}
                  fill
                  className="object-cover"
                  sizes="100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 border border-accent/30 bg-surface p-5 lg:-right-8">
                <p className="font-display text-3xl uppercase text-accent">IFBB</p>
                <p className="font-display text-3xl uppercase">Athlete</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeader
                align="left"
                label="About the Founder"
                title={
                  <>
                    {founder.name}
                    <span className="block text-gradient">Champion of Champions</span>
                  </>
                }
                description={founder.bio}
              />
            </Reveal>

            <Reveal delay={150}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2" role="list">
                {founder.titles.map((title) => (
                  <li
                    key={title}
                    className="flex items-center gap-3 border border-border bg-surface px-4 py-3"
                  >
                    <span className="h-2 w-2 shrink-0 bg-accent" aria-hidden />
                    <span className="text-sm font-semibold uppercase tracking-wide">{title}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={250}>
              <blockquote className="mt-10 border-l-4 border-accent pl-6">
                <p className="text-lg leading-relaxed text-muted italic">
                  &ldquo;{founder.philosophy}&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
