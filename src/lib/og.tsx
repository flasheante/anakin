import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "ANAKIN — Mendoza / Argentina";

const INK = "#0b0b0a";
const PAPER = "#ebe6d6";
const BLOOD = "#ff3b2e";
const YOLK = "#ffd21a";
const ACID = "#a8ff1a";

/** 1200x630 share card: photocopied black flyer with the sheep logo. */
export async function renderOgImage() {
  const font = await readFile(join(process.cwd(), "src/assets/fonts/VT323-Regular.ttf"));
  const rule = "=".repeat(64);
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "36px 56px",
          background: INK,
          backgroundImage: "radial-gradient(rgba(235,230,214,0.13) 1.5px, transparent 1.5px)",
          backgroundSize: "9px 9px",
          color: PAPER,
          fontFamily: "VT323",
          border: `12px solid ${BLOOD}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#9a968b" }}>
          <span>{`http://www.${site.url.replace(/^https?:\/\//, "")}/~anakin/`}</span>
          <span style={{ color: YOLK }}>56K MODEM FRIENDLY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 34, color: "#34322d", letterSpacing: 2 }}>{rule}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 40, margin: "10px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
            <img src={logoSrc} width={380} height={265} alt="" style={{ transform: "rotate(-4deg)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", position: "relative", fontSize: 210, lineHeight: 1 }}>
                <span style={{ position: "absolute", left: -7, top: 3, color: BLOOD }}>ANAKIN</span>
                <span style={{ position: "absolute", left: 6, top: -2, color: ACID }}>ANAKIN</span>
                <span style={{ position: "relative" }}>ANAKIN</span>
              </div>
              <span style={{ fontSize: 56 }}>MENDOZA / ARGENTINA</span>
            </div>
          </div>
          <span style={{ fontSize: 34, color: "#34322d", letterSpacing: 2 }}>{rule}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 44 }}>
          <span style={{ color: BLOOD }}>ROCK</span>
          <span>/</span>
          <span style={{ color: YOLK }}>PUNK</span>
          <span>/</span>
          <span style={{ color: ACID }}>FUNK</span>
          <span>/</span>
          <span>PSYCHO</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "VT323", data: font, style: "normal", weight: 400 }] },
  );
}
