import { IonContent, IonPage, IonModal, IonButton } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'
import Compass from '../components/Compass'
import { TOTAL_EMBERS } from '../data/hours'

const MIDPOINT = `You're carrying more than you came in with.

Whatever led you here, it wasn't luck — you keep looking where most people don't. That's the whole of it. Keep going.`

const MIDPOINT_AT = 2

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

  const handleSelect = (landId) => {
    if (allDone) {
      history.push('/hub')
    } else {
      history.push(`/clue/${landId}`)
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="park-wrap">
          <header className="park-head">
            <p className="park-tag">Follow the light.</p>
          </header>

          <Compass collected={collected} onSelect={handleSelect} />

          <p className="park-count">
            <span className="count-num">{count}</span> of {TOTAL_EMBERS} EMBERS RECOVERED
          </p>

          {allDone && (
            <div className="return-hub">
              <button className="continue-btn" onClick={() => history.push('/hub')}>
                <span className="continue-label">RETURN TO THE HUB</span>
                <span className="continue-arrow">&rarr;</span>
              </button>
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
