/** omyt brand mark — two forward chevrons + node, cyan→blue→indigo gradient. */
export function Mark({ size = 22 }: { size?: number }) {
  const w = Math.round((size * 80) / 64);
  return (
    <svg width={w} height={size} viewBox="24 14 80 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="omk-a" x1="15" y1="22" x2="75" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#44c5e4" />
          <stop offset="0.58" stopColor="#2f86c6" />
          <stop offset="1" stopColor="#285a9c" />
        </linearGradient>
        <linearGradient id="omk-b" x1="48" y1="20" x2="90" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4ea7de" />
          <stop offset="0.56" stopColor="#3e78bd" />
          <stop offset="1" stopColor="#8b82d3" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M31 21 L57 46 L31 71" stroke="url(#omk-a)" strokeWidth="8" />
        <path d="M53 21 L79 46 L53 71" stroke="url(#omk-b)" strokeWidth="8" />
      </g>
      <circle cx="91" cy="46" r="6" fill="#8f8bd8" />
    </svg>
  );
}

export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11, color: "inherit" }}>
      <Mark size={size} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: size * 0.92,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        omyt
      </span>
    </span>
  );
}
