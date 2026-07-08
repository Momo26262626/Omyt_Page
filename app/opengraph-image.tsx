import { ImageResponse } from "next/og";

export const alt = "omyt — the operating layer for go-to-market";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card in the light Daylight Ops palette. Uses next/og's default
// font for reliability; brand identity comes from color, mark, and composition.
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
          padding: "76px 80px",
          backgroundColor: "#f6f7fb",
          backgroundImage:
            "radial-gradient(900px 500px at 88% -10%, rgba(124,92,240,0.16), transparent), radial-gradient(700px 460px at 6% 110%, rgba(42,166,224,0.14), transparent), radial-gradient(500px 360px at 60% 120%, rgba(232,163,61,0.12), transparent)",
          fontFamily: "sans-serif",
          color: "#1b2030",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", display: "flex", width: 60, height: 60 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                backgroundImage: "linear-gradient(135deg, #2aa6e0, #7c5cf0)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 20,
                height: 20,
                borderRadius: 20,
                backgroundColor: "#e8a33d",
                border: "3px solid #f6f7fb",
              }}
            />
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -2 }}>omyt</div>
          <div
            style={{
              marginLeft: 6,
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: "#5b4ad6",
              padding: "8px 16px",
              borderRadius: 999,
              backgroundColor: "rgba(124,92,240,0.10)",
            }}
          >
            Sales OS
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>
            The operating layer for&nbsp;<span style={{ color: "#6a4ff0" }}>go-to-market.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#494f63", maxWidth: 900, lineHeight: 1.35 }}>
            Outreach, pipeline, automations, and strategy on one surface — that tells you exactly where to act.
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#1b2030" }}>omyt.ai</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#3b8e63" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: "#2faa6a", display: "flex" }} />
            Always running
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
