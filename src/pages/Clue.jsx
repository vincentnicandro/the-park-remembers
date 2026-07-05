import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonText,
} from '@ionic/react'
import { useParams, useHistory } from 'react-router-dom'
import { useState } from 'react'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'
import CipherGrid from '../components/CipherGrid'
import { EMBER_BY_ID, TOTAL_EMBERS, isCorrect, arrivalText } from '../data/hours'
import { LAND_COLORS } from '../data/landColors'

const MIDPOINT_AT = 2

const MIDPOINT_TEXT = `You're carrying more than you came in with.

Whatever led you here, it wasn't luck — you keep looking where most people don't. That's the whole of it. Keep going.`

export default function Clue({ progress }) {
  const { id } = useParams()
  const history = useHistory()
  const ember = EMBER_BY_ID[id]
  const alreadyDone = !!progress.collected[id]

  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  // views: 'clue' → 'capture' → 'reveal' → (optionally) 'midpoint' → home
  const [view, setView] = useState(alreadyDone ? 'reveal' : 'clue')
  const [hintOpen, setHintOpen] = useState(false)
  const [hintShown, setHintShown] = useState(false)

  if (!ember) {
    return (
      <IonPage>
        <IonContent className="night ion-padding">Nothing is glowing here.</IonContent>
      </IonPage>
    )
  }

  const submit = () => {
    if (isCorrect(ember, value)) {
      setWrong(false)
      progress.collect(ember.id)
      setView('capture')
    } else {
      setWrong(true)
    }
  }

  const takeHint = () => {
    setHintShown(true)
    setHintOpen(false)
    progress.addCompromise(ember.id)
  }

  const handleRevealContinue = () => {
    // Show midpoint interstitial after the 2nd ember is recovered (and not previously seen)
    if (progress.count === MIDPOINT_AT && !progress.beatsSeen.midpoint) {
      setView('midpoint')
    } else {
      history.replace('/home')
    }
  }

  const handleMidpointContinue = () => {
    progress.markBeatSeen('midpoint')
    history.replace('/home')
  }

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="clue-wrap">
          <button className="clue-back" onClick={() => history.replace('/home')}>
            <span className="clue-back-arrow">&larr;</span>
            <span className="clue-back-label">BACK</span>
          </button>
          {view === 'clue' && (
            <>
              <p className="clue-land-title">{ember.land}</p>

              <p className="clue-text" style={{ whiteSpace: 'pre-line' }}>{ember.clue}</p>

              {ember.id === 'fantasyland' && <CipherGrid />}

              {hintShown && (
                <p className="hint-text">
                  <span className="hint-note">A small compromise has been noted.</span>
                  {ember.hint}
                </p>
              )}

              <div className="gate">
                {ember.gate && <p className="gate-q">{ember.gate}</p>}
                <IonInput
                  className="gate-input"
                  placeholder="Your answer"
                  value={value}
                  onIonInput={(e) => {
                    setValue(e.detail.value ?? '')
                    setWrong(false)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                />
                {wrong && (
                  <IonText color="warning">
                    <p className="gate-wrong">That isn't what this ember remembers. Look again.</p>
                  </IonText>
                )}
                <IonButton expand="block" className="cta" onClick={submit} disabled={!value.trim()}>
                  Submit
                </IonButton>

                {!hintShown && (
                  <button className="ask-link" onClick={() => setHintOpen(true)}>
                    The park is listening. Ask for help?
                  </button>
                )}
              </div>
            </>
          )}

          {view === 'capture' && (
            <div className="capture">
              <div className="capture-glyph">
                <svg
                  viewBox="0 0 60 120"
                  width="60"
                  height="120"
                  style={{ filter: `drop-shadow(0 0 20px ${LAND_COLORS[ember.id]}) drop-shadow(0 0 40px ${LAND_COLORS[ember.id]}80)` }}
                >
                  <path
                    d="M30,0 L48,60 L30,120 L12,60 Z"
                    fill={LAND_COLORS[ember.id]}
                  />
                </svg>
              </div>
              <p className="capture-title" style={{ color: LAND_COLORS[ember.id] }}>Ember recovered</p>
              <p className="capture-land" style={{ color: LAND_COLORS[ember.id] }}>{ember.land}</p>
              <p className="capture-quote">
                &ldquo;Something old just caught, for a moment, right where you were standing.&rdquo;
              </p>
              <button className="continue-btn" onClick={() => setView('reveal')}>
                <span className="continue-label">CONTINUE</span>
                <span className="continue-arrow">&rarr;</span>
              </button>
            </div>
          )}

          {view === 'reveal' && (
            <div className="reveal page-turn">
              <div className="reveal-ember">
                <svg
                  viewBox="0 0 60 120"
                  width="30"
                  height="60"
                  style={{ filter: `drop-shadow(0 0 12px ${LAND_COLORS[ember.id]}) drop-shadow(0 0 24px ${LAND_COLORS[ember.id]}60)` }}
                >
                  <path
                    d="M30,0 L48,60 L30,120 L12,60 Z"
                    fill={LAND_COLORS[ember.id]}
                  />
                </svg>
              </div>
              <p className="reveal-title">{ember.title}</p>
              <p className="reveal-land">{ember.land}</p>
              <blockquote className="reveal-quote">
                &ldquo;{ember.dedication}&rdquo;
              </blockquote>
              <StoryText text={ember.ember} />
              <button className="continue-btn" onClick={handleRevealContinue}>
                <span className="continue-label">CONTINUE</span>
                <span className="continue-arrow">&rarr;</span>
              </button>
            </div>
          )}

          {view === 'midpoint' && (
            <div className="reveal page-turn">
              <StoryText text={MIDPOINT_TEXT} />
              <button className="continue-btn" onClick={handleMidpointContinue}>
                <span className="continue-label">CONTINUE EXPLORING</span>
                <span className="continue-arrow">&rarr;</span>
              </button>
            </div>
          )}
        </div>

        {hintOpen && (
          <div className="ask-overlay" onClick={() => setHintOpen(false)}>
            <div className="ask-card" onClick={(e) => e.stopPropagation()}>
              <p className="ask-copy">
                Asking for help costs something. The park will remember that you asked.
              </p>
              <IonButton expand="block" className="cta" onClick={takeHint}>
                Ask anyway
              </IonButton>
              <button className="ask-link" onClick={() => setHintOpen(false)}>
                Never mind
              </button>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}
