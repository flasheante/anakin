"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navItems } from "@/data/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Desktop: HOME | MÚSICA | ... bar. Mobile: a no-JS <details> "[ MENU ]" list, stuck to the top while scrolling. */
export function SiteNav() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (menu.current) menu.current.open = false;
  };

  return (
    <nav aria-label="Principal" className="sticky top-0 z-50 border-y border-paper bg-ink md:static">
      <ul className="hidden flex-wrap items-center justify-center gap-y-1 px-2 py-1 md:flex">
        {navItems.map((item, i) => (
          <li key={item.href} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="px-1 text-ash">
                |
              </span>
            )}
            <Link href={item.href} className="nav-link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <details ref={menu} className="group md:hidden">
        <summary className="pixel flex cursor-pointer list-none items-center justify-between px-4 py-1 text-2xl [&::-webkit-details-marker]:hidden">
          <span>
            [ <span className="group-open:hidden">MENU</span>
            <span className="hidden group-open:inline">CERRAR</span> ]
          </span>
          <span aria-hidden="true" className="text-dust">
            <span className="group-open:hidden">▼</span>
            <span className="hidden group-open:inline">▲</span>
          </span>
        </summary>
        <ul className="grid max-h-[calc(100dvh-3rem)] gap-2 overflow-y-auto border-t border-ash px-4 pt-3 pb-4">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className="nav-link block py-1 text-2xl"
                >
                  [ {item.label} ]{active && <span aria-hidden="true"> ◄</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </details>
    </nav>
  );
}
