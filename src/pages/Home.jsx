import { IonContent, IonPage, IonModal, IonButton } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'
import { EMBERS, TOTAL_EMBERS } from '../data/hours'

const MIDPOINT = `You're carrying more than you came in with.

Whatever led you here, it wasn't luck — you keep looking where most people don't. That's the whole of it. Keep going.`

const MIDPOINT_AT = 2 // fires dynamically once the player has caught this many embers

export default function Home({ progress }) {
  const history = useHistory()
  const { collected, count, beatsSeen, markBeatSeen } = progress
  const allDone = count >= TOTAL_EMBERS
  const [showMidpoint, setShowMidpoint] = useState(false)

  useEffect(() => {
    if (count >= MIDPOINT_AT && !allDone && !beatsSeen.midpoint) {
      setShowMidpoint(true)
    }
  }, [count, allDone, beatsSeen.midpoint])

  const dismissMidpoint = () => {
    setShowMidpoint(false)
    markBeatSeen('midpoint')
  }

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="park-wrap">
          <header className="park-head">
            <p className="eyebrow">The Park Remembers</p>
            <p className="park-tag">
              {count === 0
                ? 'Something has come loose. Follow whatever’s still lit.'
                : allDone
                  ? 'Every ember is where it should be, except you.'
                  : 'Keep following whatever’s still glowing at the corners.'}
            </p>
            <p className="park-count">
              Embers recovered: <span className="count-num">{count}</span> of {TOTAL_EMBERS}
            </p>
          </header>

          <ul className="frag-list">
            {EMBERS.map((e) => {
              const found = !!collected[e.id]
              return (
                <li
                  key={e.id}
                  className={`frag-item ${found ? 'found' : 'unfound'}`}
                  onClick={() => history.push(`/clue/${e.id}`)}
                >
                  <span className="frag-mark">{found ? '✦' : '○'}</span>
                  <span className="frag-body">
                    <span className="frag-land">{e.land}</span>
                    <span className="frag-teaser">
                      {found ? `“${e.title}”` : 'not yet caught'}
                    </span>
                  </span>
                  <span className="frag-chevron">›</span>
                </li>
              )
            })}
          </ul>

          {allDone && (
            <div className="return-hub">
              <p className="return-line">Return to the hub.</p>
              <IonButton expand="block" className="cta" onClick={() => history.push('/hub')}>
                Go to the hub
              </IonButton>
            </div>
          )}
        </div>

        <IonModal isOpen={showMidpoint} onDidDismiss={dismissMidpoint} className="beat-modal">
          <div className="beat-wrap night">
            <StoryText text={MIDPOINT} />
            <IonButton expand="block" className="cta" onClick={dismissMidpoint}>
              Continue exploring
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
