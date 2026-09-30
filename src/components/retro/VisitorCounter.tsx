"use client";

import { useSyncExternalStore } from "react";

const KEY = "anakin:visits";
const BASE = 1337;
let visits: number | null = null;

// Counts this browser's own visits (once per page load) on top of a fake base.
// It's a joke counter: no tracking, nothing leaves the browser.
function readVisits(): number {
  if (visits === null) {
    try {
      visits = Number(localStorage.getItem(KEY) ?? 0) + 1;
      localStorage.setItem(KEY, String(visits));
    } catch {
      visits = 1;
    }
  }
  return visits;
}

const subscribe = () => () => {};

export function VisitorCounter() {
  const count = useSyncExternalStore(subscribe, readVisits, () => 1);
  const digits = String(BASE + count - 1).padStart(6, "0");

  return (
    <p className="pixel text-xl">
      YOU ARE VISITOR{" "}
      <span className="inline-flex border border-ash bg-ink align-middle" aria-label={`número ${digits}`}>
        {digits.split("").map((d, i) => (
          <span key={i} aria-hidden="true" className="w-[1.1ch] border-r border-ash text-center text-acid last:border-r-0">
            {d}
          </span>
        ))}
      </span>
    </p>
  );
}
