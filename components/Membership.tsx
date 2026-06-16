import { getWhatsAppUrl, petersGym } from "@/content/peters-gym";
import { IconCheck } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const { membership } = petersGym;

export function Membership() {
  return (
    <section id="membership" className="relative py-24 lg:py-32" aria-labelledby="membership-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={membership.label}
            title={<span id="membership-heading">{membership.title}</span>}
            description={membership.description}
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-xl text-center text-sm text-accent-secondary">
            {membership.disclaimer}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {membership.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 100}>
              <article
                className={`card-premium relative flex h-full flex-col p-8 ${
                  tier.featured
                    ? "gradient-border bg-surface-elevated lg:scale-105 lg:shadow-[0_0_60px_var(--accent-glow)]"
                    : "border border-border bg-surface"
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Best Value
                  </span>
                )}
                <h3 className="font-display text-2xl uppercase tracking-wide">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="font-display text-5xl text-accent">{tier.price}</span>
                  <span className="mb-1 text-sm text-muted">{tier.period}</span>
                </div>
                <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-border pt-8" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-accent/15">
                        <IconCheck className="h-3 w-3 text-accent" />
                      </span>
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppUrl(petersGym, tier.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full text-center ${tier.featured ? "btn-primary" : "btn-secondary"}`}
                >
                  {tier.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
