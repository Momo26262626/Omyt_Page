import { ImageResponse } from "next/og";

export const alt = "omyt — the company brain with a persistent semantic world model";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brutalist-industrial share card: warm near-black, bone type, one amber mark.
// Uses next/og's default font for reliability.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 72px",
          backgroundColor: "#0e1016",
          color: "#e6e9f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", letterSpacing: 3, fontSize: 20, color: "#44c5e4" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 40, height: 34, alignItems: "center", gap: 3 }}>
              <div style={{ width: 12, height: 34, transform: "skewX(26deg)", background: "linear-gradient(180deg,#44c5e4,#2f86c6)" }} />
              <div style={{ width: 12, height: 34, transform: "skewX(26deg)", background: "linear-gradient(180deg,#4ea7de,#8b82d3)" }} />
              <div style={{ width: 8, height: 8, borderRadius: 8, background: "#8f8bd8" }} />
            </div>
            <span style={{ color: "#e6e9f0", fontWeight: 800, letterSpacing: 0, fontSize: 30 }}>omyt</span>
          </div>
          <span>// COMPANY_BRAIN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
            Persistent
          </div>
          <div style={{ fontSize: 116, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
            Semantic
          </div>
          <div style={{ fontSize: 116, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: "uppercase" }}>
            World<span style={{ color: "#6b7280" }}>_</span>Model<span style={{ color: "#44c5e4" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 22, color: "#8b93a3", letterSpacing: 1 }}>
          <span style={{ maxWidth: 620, color: "#aeb6c6", fontSize: 24, lineHeight: 1.3 }}>
            The company brain. Reads every signal, remembers it, reasons over it — tells you the next move.
          </span>
          <span style={{ letterSpacing: 3 }}>omyt.ai</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
