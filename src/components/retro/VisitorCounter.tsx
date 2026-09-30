"use client";

import { useEffect, useState } from "react";
import { visitCounter } from "@/data/site";

const SESSION_FLAG = "anakin:counted";

/**
 * Real hit counter backed by Abacus (free, no account). Each browser session
 * counts once; later page views in the same session only read the total.
 * In development it only reads, so local testing doesn't inflate the number.
 */
async function fetchVisits(): Promise<number> {
  let alreadyCounted = true;
  try {
    alreadyCounted = process.env.NODE_ENV !== "production" || sessionStorage.getItem(SESSION_FLAG) === "1";
  } catch {
    // Storage blocked: count anyway, worst case a reload counts twice.
    alreadyCounted = false;
  }

  const action = alreadyCounted ? "get" : "hit";
  const res = await fetch(`https://abacus.jasoncameron.dev/${action}/${visitCounter.namespace}/${visitCounter.key}`);
  // A "get" on a key nobody has hit yet is a 404: that's zero visits.
  if (res.status === 404) return 0;
  if (!res.ok) throw new Error(`counter ${res.status}`);

  if (!alreadyCounted) {
    try {
      sessionStorage.setItem(SESSION_FLAG, "1");
    } catch {}
  }
  const { value } = (await res.json()) as { value: number };
  return value;
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchVisits()
      .then((n) => alive && setCount(n))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  if (failed) return null;

  const digits = count === null ? "------" : String(count).padStart(6, "0");

  return (
    <p className="pixel text-xl">
      YOU ARE VISITOR{" "}
      <span
        className="inline-flex border border-ash bg-ink align-middle"
        aria-label={count === null ? "cargando contador" : `número ${count}`}
      >
        {digits.split("").map((d, i) => (
          <span key={i} aria-hidden="true" className="w-[1.1ch] border-r border-ash text-center text-acid last:border-r-0">
            {d}
          </span>
        ))}
      </span>
    </p>
  );
}
