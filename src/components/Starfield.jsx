/**
 * Ambient night sky. A fixed layer of parallax star fields that drift slowly
 * upward at different speeds, with a faint gold aurora breathing near the top.
 * Purely decorative: pointer-events are off and it sits behind page content.
 * Honors prefers-reduced-motion (stars stay, motion stops) — see app.css.
 */
export default function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      <div className="star-layer star-layer--far" />
      <div className="star-layer star-layer--mid" />
      <div className="star-layer star-layer--near" />
      <div className="star-glow" />
    </div>
  )
}
