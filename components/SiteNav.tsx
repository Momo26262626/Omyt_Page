"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

const APP_URL = "https://app.omyt.ai";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link href="/" aria-label="omyt home" className="nav__brand">
          <Wordmark size={25} />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav__link ${pathname === l.href ? "is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={APP_URL} className="nav__signin">Sign in</a>
          <a href="/#waitlist" className="nav__cta">
            <span>Join waitlist</span> ↗
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`nav__sheet ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="nav__sheet-link">{l.label}</Link>
        ))}
        <a href="/#waitlist" className="btn btn--primary" style={{ marginTop: 8 }}>
          Join waitlist <span className="arr">↗</span>
        </a>
      </div>
    </header>
  );
}
