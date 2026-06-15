import Image from "next/image";
import { petersGym } from "@/content/peters-gym";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const { testimonials } = petersGym;

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 mesh-bg" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={testimonials.label}
            title={<span id="testimonials-heading">{testimonials.title}</span>}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <blockquote className="card-premium flex h-full flex-col border border-border bg-surface p-8">
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border">
                    <Image
                      src={item.image}
                      alt={`${item.name} — Peters Gym member`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <cite className="not-italic">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-muted">{item.detail}</p>
                    </cite>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
