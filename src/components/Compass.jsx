/**
 * The Compass — a four-pointed star whose diamond tips represent the four
 * founding embers. Each point corresponds to a land at a cardinal direction.
 * As embers are recovered, their diamond lights up from dim to glowing.
 * Land names are displayed around the compass at their respective positions.
 * Tapping a diamond navigates to that land's clue.
 */
import { LAND_COLORS } from '../data/landColors'

// The four lands mapped to compass directions (clockwise from top)
const POINTS = [
  { id: 'frontierland', label: 'Frontierland', angle: 0 },
  { id: 'adventureland', label: 'Adventureland', angle: 90 },
  { id: 'fantasyland', label: 'Fantasyland', angle: 180 },
  { id: 'tomorrowland', label: 'Tomorrowland', angle: 270 },
].map((p) => ({
  ...p,
  color: LAND_COLORS[p.id],
  dimColor: LAND_COLORS[p.id] + '40', // 25% opacity hex
}))

export default function Compass({ collected = {}, onSelect }) {
  const size = 240
  const center = size / 2
  const outerRadius = 90
  const innerRadius = 22
  const labelRadius = 108

  const buildDiamond = (angle) => {
    const rad = (a) => (a - 90) * (Math.PI / 180)
    const tipX = center + outerRadius * Math.cos(rad(angle))
    const tipY = center + outerRadius * Math.sin(rad(angle))
    const innerX = center + innerRadius * Math.cos(rad(angle))
    const innerY = center + innerRadius * Math.sin(rad(angle))
    const sideOffset = 12
    const perpAngle1 = rad(angle + 90)
    const perpAngle2 = rad(angle - 90)
    const midRadius = (outerRadius + innerRadius) / 2
    const midX = center + midRadius * Math.cos(rad(angle))
    const midY = center + midRadius * Math.sin(rad(angle))
    const side1X = midX + sideOffset * Math.cos(perpAngle1)
    const side1Y = midY + sideOffset * Math.sin(perpAngle1)
    const side2X = midX + sideOffset * Math.cos(perpAngle2)
    const side2Y = midY + sideOffset * Math.sin(perpAngle2)

    return `M${tipX},${tipY} L${side1X},${side1Y} L${innerX},${innerY} L${side2X},${side2Y} Z`
  }

  const getLabelPos = (angle) => {
    const rad = (angle - 90) * (Math.PI / 180)
    return {
      x: center + labelRadius * Math.cos(rad),
      y: center + labelRadius * Math.sin(rad),
    }
  }

  return (
    <div className="compass" aria-label="Compass showing ember recovery progress">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: '260px', display: 'block', margin: '0 auto' }}
      >
        <defs>
          <radialGradient id="compass-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c29e90" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c29e90" stopOpacity="0" />
          </radialGradient>
          {POINTS.map((point) => (
            <filter key={`glow-${point.id}`} id={`glow-${point.id}`}>
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor={point.color} floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Ambient center glow */}
        <circle cx={center} cy={center} r="80" fill="url(#compass-glow)" />

        {/* Thin ring */}
        <circle
          cx={center}
          cy={center}
          r="75"
          fill="none"
          stroke="#c29e90"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Cross marks at 45-degree intervals */}
        {[45, 135, 225, 315].map((a) => {
          const rad = (a - 90) * (Math.PI / 180)
          const r1 = 70
          const r2 = 80
          return (
            <line
              key={a}
              x1={center + r1 * Math.cos(rad)}
              y1={center + r1 * Math.sin(rad)}
              x2={center + r2 * Math.cos(rad)}
              y2={center + r2 * Math.sin(rad)}
              stroke="#c29e90"
              strokeWidth="0.5"
              opacity="0.25"
            />
          )
        })}

        {/* Diamond points — interactive */}
        {POINTS.map((point) => {
          const lit = !!collected[point.id]
          return (
            <path
              key={point.id}
              d={buildDiamond(point.angle)}
              fill={lit ? point.color : point.dimColor}
              stroke={lit ? point.color : point.dimColor}
              strokeWidth="1"
              opacity={lit ? 1 : 0.8}
              filter={lit ? `url(#glow-${point.id})` : undefined}
              className={`compass-point ${lit ? 'compass-point--lit' : 'compass-point--dim'}`}
              role="button"
              aria-label={`${point.label}${lit ? ' (recovered)' : ''}`}
              tabIndex={0}
              onClick={() => onSelect && onSelect(point.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect && onSelect(point.id)
                }
              }}
              style={{ cursor: 'pointer', '--point-color': point.dimColor }}
            />
          )
        })}

        {/* Center dot */}
        <circle cx={center} cy={center} r="4" fill="#c29e90" opacity="0.6" />

        {/* Land name labels — also tappable */}
        {POINTS.map((point) => {
          const pos = getLabelPos(point.angle)
          const lit = !!collected[point.id]
          return (
            <text
              key={point.id + '-label'}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={lit ? point.color : '#6b7394'}
              fontSize="8"
              fontFamily="'Della Respira', Georgia, serif"
              letterSpacing="1"
              className="compass-label"
              role="button"
              tabIndex={0}
              onClick={() => onSelect && onSelect(point.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect && onSelect(point.id)
                }
              }}
              style={{ cursor: 'pointer', transition: 'fill 0.6s ease' }}
            >
              {point.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
