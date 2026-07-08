export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mk" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(66% 0.140 237)" />
          <stop offset="1" stopColor="oklch(60% 0.180 293)" />
        </linearGradient>
      </defs>
      {/* orbit ring */}
      <circle cx="16" cy="16" r="11.5" stroke="url(#mk)" strokeWidth="1.6" opacity="0.45" />
      {/* nucleus */}
      <rect x="9.5" y="9.5" width="13" height="13" rx="4.4" fill="url(#mk)" />
      <rect x="9.5" y="9.5" width="13" height="13" rx="4.4" fill="oklch(100% 0 0 / 0.14)" />
      {/* north-star satellite */}
      <circle cx="26" cy="7.5" r="3" fill="oklch(72% 0.150 70)" />
      <circle cx="26" cy="7.5" r="3" stroke="oklch(99% 0.004 252)" strokeWidth="1.4" />
    </svg>
  );
}

export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <Mark size={size} />
      <span
        style={{
          fontWeight: 800,
          fontSize: size * 0.74,
          letterSpacing: "-0.045em",
          color: "var(--ink)",
        }}
      >
        omyt
      </span>
    </span>
  );
}
