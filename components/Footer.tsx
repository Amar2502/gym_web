import { getWhatsAppUrl, petersGym } from "@/content/peters-gym";
import { LogoMark } from "./ui";

const { site, nav, footer } = petersGym;

export function Footer() {
  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#" className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <div>
                <span className="font-display text-3xl uppercase tracking-wider">
                  {site.displayName}
                </span>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  {footer.tagline}
                </p>
              </div>
            </a>
            <div className="mt-8 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted transition-all hover:border-accent hover:text-accent"
              >
                Instagram
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted transition-all hover:border-accent hover:text-accent"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Navigate</p>
              <ul className="mt-4 space-y-3" role="list">
                {nav.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Visit Us</p>
              <address className="mt-4 space-y-1 text-sm not-italic text-muted">
                <p>{site.address}</p>
                <p>{site.city}</p>
                <p className="pt-3">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Join Today</p>
            <p className="mt-4 text-sm text-muted">
              Ready to train? Message us on WhatsApp to get started.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex text-sm"
            >
              Join Now
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center text-xs text-muted">
          <p>
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
