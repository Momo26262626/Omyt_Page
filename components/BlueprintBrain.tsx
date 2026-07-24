/**
 * BlueprintBrain — a bespoke technical line-drawing of a brain, annotated like
 * an engineering spec sheet. Monochrome, matte, draws itself in on load.
 * Region labels map to omyt's pipeline (reason / model / perceive / memory / act).
 * Pure SVG + CSS — no image, so it can never read as stock or "AI render".
 */
export function BlueprintBrain() {
  return (
    <svg className="bp" viewBox="0 0 640 620" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* corner crop marks */}
      <g className="bp-hair">
        <path className="draw" pathLength={1} d="M18 18 h30 M18 18 v30" />
        <path className="draw" pathLength={1} d="M622 18 h-30 M622 18 v30" />
        <path className="draw" pathLength={1} d="M18 602 h30 M18 602 v-30" />
        <path className="draw" pathLength={1} d="M622 602 h-30 M622 602 v-30" />
      </g>

      {/* faint construction geometry */}
      <g className="bp-ghost">
        <circle className="draw" pathLength={1} cx={312} cy={306} r={214} />
        <path className="draw" pathLength={1} d="M312 78 v16 M312 518 v16 M84 306 h16 M540 306 h16" />
      </g>

      {/* ── brain ─────────────────────────────────────────────────────── */}
      <g className="bp-line" style={{ ["--gs" as string]: "0.15s" }}>
        {/* cerebrum outline (lateral, frontal at left) */}
        <path
          className="draw"
          pathLength={1}
          d="M120 316
             C112 236 170 184 248 182
             C300 170 360 172 410 188
             C476 200 516 246 512 310
             C526 362 492 404 442 406
             C434 444 394 456 360 438
             C338 474 284 474 260 440
             C224 456 172 444 156 408
             C130 404 122 360 120 316 Z"
        />
        {/* cerebellum */}
        <path className="draw" pathLength={1} d="M442 406 C500 404 520 466 468 486 C472 512 424 518 412 488 C390 490 390 448 418 444 C422 422 428 408 442 406 Z" />
        {/* brainstem */}
        <path className="draw" pathLength={1} d="M412 488 C410 526 405 560 394 582 C408 570 424 522 428 484" />
        {/* lateral fissure */}
        <path className="draw" pathLength={1} d="M168 392 C244 410 336 412 416 388 C440 380 460 366 470 348" />
        {/* central sulcus */}
        <path className="draw" pathLength={1} d="M322 194 C312 240 316 292 342 346" />
        {/* gyri */}
        <path className="draw sul" pathLength={1} d="M150 258 C244 226 360 226 472 258" />
        <path className="draw sul" pathLength={1} d="M160 296 C256 270 372 272 480 300" />
        <path className="draw sul" pathLength={1} d="M204 208 C200 258 202 308 218 360" />
        <path className="draw sul" pathLength={1} d="M254 190 C250 244 250 306 264 368" />
        <path className="draw sul" pathLength={1} d="M382 190 C378 246 384 308 402 372" />
        <path className="draw sul" pathLength={1} d="M436 200 C444 250 452 300 462 336" />
        <path className="draw sul" pathLength={1} d="M182 348 C232 372 306 378 366 364" />
        <path className="draw sul" pathLength={1} d="M420 360 C446 360 462 346 470 330" />
      </g>

      {/* ── region labels (mapped to omyt's pipeline) — top/right zone ─── */}
      <g className="bp-anno" style={{ ["--gs" as string]: "1.1s" }}>
        {LABELS.map((l) => (
          <g key={l.t}>
            <circle className="draw dot" pathLength={1} cx={l.x} cy={l.y} r={3.2} />
            <path className="draw lead" pathLength={1} d={`M${l.x} ${l.y} L${l.ex} ${l.ey} L${l.tx} ${l.ey}`} />
            <text className="bp-txt" x={l.tx + (l.left ? -8 : 8)} y={l.ey + 4} textAnchor={l.left ? "end" : "start"}>{l.t}</text>
          </g>
        ))}
        {/* unlabeled annotation points (reason / memory / act) — dots only */}
        <circle className="draw dot" pathLength={1} cx={176} cy={250} r={3.2} />
        <circle className="draw dot" pathLength={1} cx={262} cy={430} r={3.2} />
        <circle className="draw dot" pathLength={1} cx={456} cy={480} r={3.2} />
      </g>

      {/* corner stamp — top-right of the plate, clear of the headline */}
      <g className="bp-anno" style={{ ["--gs" as string]: "1.5s" }}>
        <text className="bp-txt bp-txt--acc" x={604} y={44} textAnchor="end">FIG.01</text>
        <text className="bp-txt bp-dim" x={604} y={62} textAnchor="end">CEREBRAL CORTEX · 1:1</text>
      </g>
    </svg>
  );
}

const LABELS = [
  { t: "// MODEL", x: 322, y: 196, ex: 338, ey: 106, tx: 338, left: false },
  { t: "// PERCEIVE", x: 498, y: 292, ex: 584, ey: 232, tx: 592, left: false },
];
