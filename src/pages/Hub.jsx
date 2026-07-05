import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'

const HUB = `You're standing where you started.

It doesn't look the same, does it.`

const HOLD_MS = 2500
const TICK_MS = 30

export default function Hub() {
  const history = useHistory()
  const [held, setHeld] = useState(0)
  const [pressing, setPressing] = useState(false)
  const startTime = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (pressing) {
      startTime.current = Date.now()
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime.current
        const p = Math.min(1, elapsed / HOLD_MS)
        setHeld(p)
        if (p >= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          history.replace('/finale')
        }
      }, TICK_MS)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setHeld(0)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [pressing, history])

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="hub-wrap">
          <StoryText text={HUB} />

          <div
            className="hold"
            onTouchStart={() => setPressing(true)}
            onTouchEnd={() => setPressing(false)}
            onTouchCancel={() => setPressing(false)}
            onMouseDown={() => setPressing(true)}
            onMouseUp={() => setPressing(false)}
            onMouseLeave={() => setPressing(false)}
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
