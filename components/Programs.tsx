import { petersGym } from "@/content/peters-gym";
import { ProgramIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const { programs } = petersGym;

export function Programs() {
  return (
    <section id="programs" className="py-24 lg:py-32 mesh-bg" aria-labelledby="programs-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={programs.label}
            title={<span id="programs-heading">{programs.title}</span>}
            description={programs.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.items.map((program, i) => (
            <Reveal key={program.title} delay={i * 80}>
              <article className="card-premium group flex h-full flex-col border border-border bg-surface p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <ProgramIcon name={program.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide">{program.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {program.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
