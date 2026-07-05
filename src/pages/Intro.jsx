import { IonContent, IonPage, IonButton } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import StoryText from '../components/StoryText'
import Starfield from '../components/Starfield'

const RECRUITMENT = `Something in this park is coming loose.

Not the rides. Not the paint. Something older — the part of a place that remembers why it was built at all. That happens, every so often. Not because anything's wrong. A feeling this old just needs tending now and then, or it drifts — the way embers do, if nobody stirs them for a while.

You were chosen for this. Not randomly, and not because you're the first to stand here. The park has been watching for a particular kind of person for a long time: the ones who read the windows above the shops instead of just the shop names. The ones who crouch to see what a low wall actually says. The ones who notice a detail is missing before they can explain why it matters.

It has a memory of everyone who has ever looked at it that closely — everyone who cared enough to notice it, and kept it the way it wanted to be kept, whether or not anyone ever thanked them. That memory is how it found you.

Some people navigate by the map. Some navigate by whatever's still lit. Call it a dreamer's habit, a doer's habit, the kind of thing an explorer just can't help doing. None of those are titles. They're only what it looks like from the outside when someone keeps following the light instead of the directions.

Four embers of a story have come loose from four corners of this place. They won't come find you. You have to go stand where they fell — and in each of them, if you look, something is still faintly glowing.

Start walking. It doesn't matter where. It never has.`

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
          <div className="intro-glyph">✦</div>
          <StoryText text={RECRUITMENT} flicker />
          <IonButton expand="block" className="cta" onClick={begin}>
            Start walking
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}
