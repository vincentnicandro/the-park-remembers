import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'

const RECRUITMENT = `Not the rides. Not the paint. Something older, the part of a place that remembers why it was built at all.

That happens every so often. A feeling this old just needs tending now and then or else it drifts, the way embers do if nobody stirs them for a while.`

export default function Intro({ onBegin }) {
  const history = useHistory()

  const begin = () => {
    onBegin()
    history.replace('/home')
  }

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="intro-wrap">
          <p className="intro-title">
            Something in this park<br />has come loose.
          </p>
          <StoryText text={RECRUITMENT} />
          <button className="continue-btn" onClick={begin}>
            <span className="continue-label">CONTINUE</span>
            <span className="continue-arrow">→</span>
          </button>
        </div>
      </IonContent>
    </IonPage>
  )
}
