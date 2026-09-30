import type { Metadata } from "next";
import Link from "next/link";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { GlitchText } from "@/components/retro/GlitchText";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <RetroWindow title="NETSCAPE — ERROR" className="mx-auto max-w-xl">
        <p className="pixel text-2xl text-dust">C:\ANAKIN&gt; GET /???</p>
        <h1 className="pixel mt-4 text-7xl text-blood">
          <GlitchText text="ERROR 404" />
        </h1>
        <p className="pixel mt-4 text-3xl">THE INTERNET IS BROKEN.</p>
        <p className="mt-3">La página que buscás no existe (o se la llevó el módem).</p>
        <p className="pixel mt-8 text-3xl">
          <Link href="/">&gt; BACK TO ANAKIN</Link>
        </p>
      </RetroWindow>
    </div>
  );
}
