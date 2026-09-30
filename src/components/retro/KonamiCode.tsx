"use client";

import { useEffect, useState } from "react";

const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** ↑ ↑ ↓ ↓ ← → ← → B A — inverts the page for a moment. Never blocks anything. */
export function KonamiCode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let pos = 0;
    let timer: ReturnType<typeof setTimeout>;

    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[pos]) pos++;
      else if (key === SEQUENCE[0]) pos = pos === 2 ? 2 : 1; // "↑ ↑ ↑" still counts as the start
      else pos = 0;
      if (pos === SEQUENCE.length) {
        pos = 0;
        document.documentElement.classList.add("konami");
        setActive(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
          document.documentElement.classList.remove("konami");
          setActive(false);
        }, 3000);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-1/3 z-70 flex justify-center px-4">
      {active && (
        <p className="pixel border-2 border-ink bg-yolk px-4 py-2 text-center text-3xl text-ink sm:text-5xl">
          *** CHEAT MODE: FIESTA DISTROY ***
        </p>
      )}
    </div>
  );
}
