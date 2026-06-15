"use client";

import { useEffect, useState } from "react";
import { getWhatsAppUrl, petersGym } from "@/content/peters-gym";
import { IconClose, IconMenu } from "./Icons";
import { LogoMark } from "./ui";

const { site, nav } = petersGym;
const whatsappUrl = getWhatsAppUrl();

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded px-5 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-2xl shadow-black/50" : "bg-transparent"
          }`}
          aria-label="Main navigation"
        >
          <a href="#" className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-none">
              <span className="font-display text-2xl tracking-wider">{site.displayName}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Mumbai
              </span>
            </div>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp"
              className="btn-primary py-3 px-5 text-sm"
            >
              Join Now
            </a>
          </div>

          <button
            type="button"
            className="rounded p-2.5 text-foreground transition-colors hover:bg-white/5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="flex h-full flex-col px-6 pt-28 pb-8">
            <ul className="flex flex-col gap-1">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded px-4 py-4 font-display text-3xl uppercase tracking-wider transition-colors hover:text-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Join Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
