"use client";

import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";
import { useMobileNav } from "@/hooks/useMobileNav";
import { useStickyTopbar } from "@/hooks/useStickyTopbar";
import { NAV_LEFT, NAV_MOBILE, NAV_RIGHT, SITE } from "@/lib/site";

export function SiteHeader() {
  const stuck = useStickyTopbar();
  const { open, toggle, close } = useMobileNav();

  const topbarClass = [
    "topbar",
    stuck ? "stuck" : "",
    open ? "navopen" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={topbarClass}>
        <ul className="navlist">
          {NAV_LEFT.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <Link href="/" aria-label={SITE.name}>
          <LogoMark />
        </Link>
        <ul className="navlist navlist--r">
          {NAV_RIGHT.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={["burger", open ? "on" : ""].filter(Boolean).join(" ")}
          aria-label="Menu"
          aria-expanded={open}
          onClick={toggle}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={["mobilenav", open ? "open" : ""].filter(Boolean).join(" ")}
        aria-hidden={!open}
      >
        {NAV_MOBILE.map((link) => (
          <a key={link.label} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <div className="mn-foot">
          <Button href="#" variant="primary" onClick={close}>
            Wat is mijn huis waard?
          </Button>
          <span>
            {SITE.phone} &nbsp;·&nbsp; {SITE.email}
          </span>
        </div>
      </nav>
    </>
  );
}
