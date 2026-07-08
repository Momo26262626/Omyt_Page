const NODES = [
  { x: 240, y: 92, label: "Signals", hue: "var(--sky)" },
  { x: 381, y: 194, label: "Brain", hue: "var(--violet)" },
  { x: 327, y: 360, label: "Outreach", hue: "var(--indigo)" },
  { x: 153, y: 360, label: "Pipeline", hue: "var(--emerald)" },
  { x: 99, y: 194, label: "Outcomes", hue: "var(--amber)" },
];

const CX = 240;
const CY = 238;
const R = 150;

export function LoopHero() {
  return (
    <div className="loop" role="img" aria-label="The omyt loop: signals flow into the brain, which drives outreach and pipeline, producing outcomes that feed back as new signals — all orbiting your North Star goal.">
      <svg viewBox="0 0 480 480" className="loop__svg" aria-hidden="true">
        <defs>
          <linearGradient id="orbit" x1="0" y1="0" x2="480" y2="480">
            <stop offset="0" stopColor="oklch(66% 0.14 237)" />
            <stop offset="0.5" stopColor="oklch(57% 0.18 277)" />
            <stop offset="1" stopColor="oklch(60% 0.18 293)" />
          </linearGradient>
          <radialGradient id="core" cx="0.5" cy="0.42" r="0.7">
            <stop offset="0" stopColor="oklch(80% 0.13 72)" />
            <stop offset="1" stopColor="oklch(64% 0.16 52)" />
          </radialGradient>
          <radialGradient id="bloom" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="oklch(64% 0.18 285 / 0.20)" />
            <stop offset="1" stopColor="oklch(64% 0.18 285 / 0)" />
          </radialGradient>
        </defs>

        {/* atmosphere */}
        <circle cx={CX} cy={CY} r="210" fill="url(#bloom)" />

        {/* wires from core to each node */}
        {NODES.map((n) => (
          <line key={n.label} x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke="var(--line)" strokeWidth="1.25" opacity="0.7" />
        ))}

        {/* orbit ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#orbit)" strokeWidth="2"
          strokeDasharray="3 13" strokeLinecap="round" className="loop__flow" />

        {/* traveling data packets */}
        <g className="loop__spin loop__spin--a">
          <circle cx={CX} cy={CY - R} r="4.5" fill="oklch(66% 0.14 237)" />
        </g>
        <g className="loop__spin loop__spin--b">
          <circle cx={CX} cy={CY - R} r="3.5" fill="oklch(60% 0.18 293)" />
        </g>
        <g className="loop__spin loop__spin--c">
          <circle cx={CX} cy={CY - R} r="3" fill="oklch(72% 0.15 70)" />
        </g>

        {/* North Star core */}
        <g className="loop__core">
          <circle cx={CX} cy={CY} r="50" fill="oklch(99% 0.004 252)" stroke="var(--line-soft)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r="40" fill="url(#core)" />
          <circle cx={CX} cy={CY} r="40" fill="oklch(100% 0 0 / 0.12)" />
          <path d={star(CX, CY, 15, 6.2)} fill="oklch(99% 0.02 80)" />
          <circle cx={CX} cy={CY} r="50" fill="none" stroke="oklch(72% 0.15 70 / 0.5)" strokeWidth="1.5" className="loop__pulse" />
        </g>

        {/* nodes */}
        {NODES.map((n) => (
          <g key={n.label}>
            <g transform={`translate(${n.x - 52}, ${n.y - 18})`}>
              <rect width="104" height="36" rx="11" fill="oklch(99.4% 0.003 245)"
                stroke="var(--line-soft)" strokeWidth="1" filter="url(#none)"
                style={{ filter: "drop-shadow(0 6px 14px oklch(40% 0.04 270 / 0.12))" }} />
              <circle cx="20" cy="18" r="4.5" fill={n.hue} />
              <text x="34" y="23" fontSize="14" fontWeight="600" fill="var(--ink)"
                fontFamily="var(--font-sans)" letterSpacing="-0.01em">{n.label}</text>
            </g>
          </g>
        ))}
      </svg>

      <span className="loop__cap">
        <span className="loop__cap-k">north star</span>
        <span className="loop__cap-v">6-month goal</span>
      </span>
    </div>
  );
}

// 4-point sparkle star path
function star(cx: number, cy: number, R: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const ang = (Math.PI / 4) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(2)},${(cy + rad * Math.sin(ang)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}
