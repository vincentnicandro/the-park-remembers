import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonText,
} from '@ionic/react'
import { useParams, useHistory } from 'react-router-dom'
import { useState } from 'react'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'
import { EMBER_BY_ID, TOTAL_EMBERS, isCorrect, arrivalText } from '../data/hours'

export default function Clue({ progress }) {
  const { id } = useParams()
  const history = useHistory()
  const ember = EMBER_BY_ID[id]
  const alreadyDone = !!progress.collected[id]

  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  // view: 'clue' → 'capture' → 'reveal'. Re-reading a caught ember jumps to 'reveal'.
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

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="clear-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="night">
        <Starfield />
        <div className="clue-wrap">
          {view === 'clue' && (
            <>
              <p className="arrival">{arrivalText(ember.land)}</p>

              <p className="clue-label">The clue</p>
              <p className="clue-text">{ember.clue}</p>

              {hintShown && (
                <p className="hint-text">
                  <span className="hint-note">A small compromise has been noted.</span>
                  {ember.hint}
                </p>
              )}

              <div className="gate">
                <p className="gate-label">When you are standing where it fell:</p>
                <p className="gate-q">{ember.gate}</p>
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
                    <p className="gate-wrong">That isn’t what this ember remembers. Look again.</p>
                  </IonText>
                )}
                <IonButton expand="block" className="cta" onClick={submit} disabled={!value.trim()}>
                  Catch the ember
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
              <div className="capture-glyph">✦</div>
              <p className="capture-title">Ember found</p>
              <p className="capture-land">{ember.land}</p>
              <p className="capture-quote">
                “Something old just caught, for a moment, right where you were standing.”
              </p>
              <IonButton
                fill="clear"
                className="ghost-btn"
                onClick={() => setView('reveal')}
              >
                Tap to hear what it remembers →
              </IonButton>
            </div>
          )}

          {view === 'reveal' && (
            <div className="reveal page-turn">
              <p className="reveal-title">{ember.title}</p>
              <p className="reveal-land">{ember.land}</p>
              <StoryText text={ember.ember} />
              <IonButton expand="block" className="cta" onClick={() => history.replace('/home')}>
                {progress.count >= TOTAL_EMBERS ? 'Return to the hub' : 'Keep following the light'}
              </IonButton>
            </div>
          )}
        </div>

        {/* Hint cost prompt */}
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
