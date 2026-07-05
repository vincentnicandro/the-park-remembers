import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import Starfield from '../components/Starfield'
import Compass from '../components/Compass'
import { TOTAL_EMBERS } from '../data/hours'

export default function Home({ progress }) {
  const history = useHistory()
  const { collected, count } = progress
  const allDone = count >= TOTAL_EMBERS

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
      </IonContent>
    </IonPage>
  )
}
