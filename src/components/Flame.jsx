/**
 * The Lamplighter's flame. Four tongues — one per founding ember — curl up
 * from a single wick and join into one flame. This is the finale's assembling
 * visual: not a clock reforming, but a lamp catching light, one tongue at a
 * time. `lit` controls how many tongues have caught (defaults to all four).
 */
export default function Flame({ lit = 4 }) {
  // Tongues fanned around vertical; the outer pair sit shorter so the whole
  // reads as one flame rather than four separate ones.
  const tongues = [
    { rot: -22, scale: 0.7 },
    { rot: -8, scale: 0.96 },
    { rot: 8, scale: 0.96 },
    { rot: 22, scale: 0.7 },
  ]
  // A teardrop flame, tip up, drawn around the wick at the origin (0,0).
  const flamePath = 'M0,-96 C 26,-58 30,-30 18,-8 C 10,6 -10,6 -18,-8 C -30,-30 -26,-58 0,-96 Z'

  return (
    <svg
      viewBox="-120 -170 240 260"
      width="100%"
      className="flame"
      role="img"
      aria-label="Four embers joined into a single flame."
    >
      <defs>
        <radialGradient id="flame-core" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#fff6df" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#f2c14e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f2c14e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tongue-fill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d5aa45" />
          <stop offset="55%" stopColor="#f2c14e" />
          <stop offset="100%" stopColor="#ffe9a8" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <circle cx="0" cy="-46" r="112" fill="url(#flame-core)" className="flame-glow" />

      {/* The four tongues, curling up from one wick */}
      <g className="flame-tongues">
        {tongues.map((t, i) => (
          <path
            key={i}
            d={flamePath}
            fill="url(#tongue-fill)"
            transform={`rotate(${t.rot}) scale(${t.scale})`}
            opacity={i < lit ? 0.9 : 0.14}
          />
        ))}
        {/* Bright inner core */}
        <path d={flamePath} fill="#fff6df" transform="scale(0.48)" opacity="0.92" className="flame-inner" />
      </g>

      {/* Wick and a small deco lamp vessel */}
      <g className="flame-lamp">
        <line x1="0" y1="2" x2="0" y2="16" stroke="#8a6a1f" strokeWidth="3" strokeLinecap="round" />
        <path d="M-26,18 L26,18 L18,42 L-18,42 Z" fill="#141c33" stroke="var(--wf-gold)" strokeWidth="1.5" />
        <ellipse cx="0" cy="18" rx="26" ry="5" fill="#1a2340" stroke="var(--wf-gold)" strokeWidth="1.5" />
      </g>
    </svg>
  )
}
