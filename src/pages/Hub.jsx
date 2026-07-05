import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useRef, useState } from 'react'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'

const HUB = `You're standing where you started.

It doesn't look the same, does it.`

const HOLD_MS = 2500

export default function Hub() {
  const history = useHistory()
  const [held, setHeld] = useState(0) // 0..1 progress of the hold
  const timerRef = useRef(null)
  const rafRef = useRef(null)

  const start = () => {
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / HOLD_MS)
      setHeld(p)
      if (p >= 1) {
        history.replace('/finale')
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (timerRef.current) clearTimeout(timerRef.current)
    setHeld(0)
  }

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="hub-wrap">
          <StoryText text={HUB} />

          <div
            className="hold"
            onPointerDown={start}
            onPointerUp={stop}
            onPointerLeave={stop}
            onPointerCancel={stop}
          >
            <svg viewBox="0 0 120 120" className="hold-ring">
              <circle cx="60" cy="60" r="52" className="hold-track" />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="hold-fill"
                style={{
                  strokeDasharray: 2 * Math.PI * 52,
                  strokeDashoffset: 2 * Math.PI * 52 * (1 - held),
                }}
              />
            </svg>
            <span className="hold-label">{held > 0 ? 'Hold…' : 'Hold here'}</span>
          </div>

          <p className="hub-hint">Press and hold. Stay where you are.</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
