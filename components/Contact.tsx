import { getMapEmbedUrl, getWhatsAppUrl, petersGym } from "@/content/peters-gym";
import { IconWhatsapp } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./ui";

const { site, contact } = petersGym;
const whatsappUrl = getWhatsAppUrl();
const mapEmbedUrl = getMapEmbedUrl();

const infoCards = [
  {
    label: "Visit",
    title: site.address,
    detail: site.city,
    href: undefined as string | undefined,
  },
  {
    label: "Call",
    title: site.phone,
    detail: "Tap to call the front desk",
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Follow",
    title: "@petersgymmumbai",
    detail: "Daily training updates & transformations",
    href: site.instagram,
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 mesh-bg" aria-labelledby="contact-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={contact.label}
            title={<span id="contact-heading">{contact.title}</span>}
            description={contact.description}
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <Reveal delay={100} className="lg:col-span-2">
            <div className="gradient-border relative flex h-full flex-col justify-between overflow-hidden bg-surface-elevated p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-secondary/10 blur-3xl" />

              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                  <IconWhatsapp className="h-8 w-8" />
                </div>
                <h3 className="font-display text-4xl uppercase leading-none tracking-wide">
                  {contact.whatsappCta.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {contact.whatsappCta.description}
                </p>
              </div>

              <div className="relative mt-10 space-y-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(37,211,102,0.35)]"
                >
                  <IconWhatsapp className="h-5 w-5" />
                  {contact.whatsappCta.buttonLabel}
                </a>
                <p className="text-center text-xs text-muted">
                  Typical reply within a few hours
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-2">
            {infoCards.map((card, i) => (
              <Reveal key={card.label} delay={150 + i * 80}>
                <div className="card-premium flex h-full flex-col border border-border bg-surface p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide transition-colors hover:text-accent"
                    >
                      {card.title}
                    </a>
                  ) : (
                    <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-wide">
                      {card.title}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted">{card.detail}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={350} className="sm:col-span-2">
              <div className="card-premium flex h-full flex-col border border-border bg-surface p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Hours</p>
                <ul className="mt-4 space-y-3" role="list">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                      <span className="font-display text-xl uppercase tracking-wide">{h.day}</span>
                      <span className="text-sm font-medium text-muted">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={300}>
          <div className="mt-8 overflow-hidden border border-border shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
            <iframe
              src={mapEmbedUrl}
              title="Peters Gym location on Google Maps — Oshiwara, Mumbai"
              className="h-72 w-full lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
