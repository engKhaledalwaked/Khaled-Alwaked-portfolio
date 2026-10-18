import { ImageResponse } from "next/og";

export const alt = "Khaled M Alwaked — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colors mirror the tokens in globals.css.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0e0e0d",
          color: "#eceae4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a09c93" }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#d6b082" }} />
          Software developer · Irbid, Jordan
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 64, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          <span>I build web and mobile products</span>
          <span style={{ color: "#a09c93" }}>that businesses rely on every day.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30 }}>Khaled M Alwaked · Next.js · React · Flutter</div>
      </div>
    ),
    size,
  );
}
