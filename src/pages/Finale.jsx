import { IonContent, IonPage, IonButton, IonInput } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import Flame from '../components/Flame'
import Starfield from '../components/Starfield'
import StoryText from '../components/StoryText'
import { TOTAL_EMBERS } from '../data/hours'

// Beat 1 — Assembly. The four embers reconstruct the spirit of the dedication.
const ASSEMBLY = `Welcome. That's the whole first word, and it still is.

You are standing in the place someone once decided belonged to everyone who ever found their way to it — which, today, includes you.

Here the past didn't disappear. It just got quieter — tapped out in walls, hidden in rivers, waiting for someone patient enough to notice. And here the future never actually arrived; it just kept being unfinished, on purpose, so there'd always be room for the next person to add to it.

Between those two — between what already happened and what hasn't yet — there's a strip of ground where people kept building things anyway. Not because they knew it would work. Because they wished it would, hard enough, out loud, together.

Notice what you were actually following, all day, without anyone telling you to. A lantern at a bend in a path. A torch left burning near a river. A beacon lit for a night no one had reached yet. A star nobody could prove was still lit. You didn't need a map today. You just kept walking toward whatever was still glowing.

That's what you were really carrying. Not four pieces of a story. One promise, still being kept, one visitor at a time.`

// Beat 3 — The Naming. The first and only time "Lamplighter" is spoken.
const NAMING = `Someone told you, at the start of today, that you might be a dreamer, or a doer, or an explorer — whatever word felt closest. All of them were true. None of them were the whole word.

There's an older one, for the people who don't just follow the light but keep coming back to tend it — the ones the park remembers because they noticed a detail nobody pointed out, and looked at this place from an angle it doesn't usually get looked at from. It isn't on any plaque. Nobody put it in a brochure.

Lamplighter. Not because you carry fire — because you're willing to come back, every so often, and check that it hasn't gone out.

You were chosen tonight the same way every Lamplighter before you was: not for anything you did today, but for the way you were already looking before you knew there was anything to find.`

export default function Finale({ progress }) {
  const history = useHistory()
  const [name, setNameLocal] = useState(progress.name || '')

  const share = async () => {
    const text = `I followed the light all the way around and came back. Embers: ${progress.count}/${TOTAL_EMBERS}. — a Lamplighter`
    try {
      if (navigator.share) await navigator.share({ title: 'The Wayfinder’s Reckoning', text })
      else await navigator.clipboard?.writeText(text)
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  }

  const saveName = (v) => {
    setNameLocal(v)
    progress.setName(v)
  }

  return (
    <IonPage>
      <IonContent fullscreen className="night">
        <Starfield />
        <div className="finale-wrap">
          <div className="assemble">
            <Flame lit={TOTAL_EMBERS} />
          </div>

          <StoryText text={ASSEMBLY} />

          {/* Beat 2 — the pause, then Beat 3 — the naming */}
          <div className="naming">
            <p className="naming-word">Lamplighter</p>
            <StoryText text={NAMING} />
          </div>

          <p className="closing-line">
            Welcome home, Lamplighter. Come back whenever you’re ready to help keep it.
          </p>

          <div className="wayfinder-card">
            <p className="eyebrow">Lamplighter</p>
            <IonInput
              className="name-input"
              placeholder="A Lamplighter, newly noticed"
              value={name}
              onIonInput={(e) => saveName(e.detail.value ?? '')}
            />
            <dl className="stats">
              <div>
                <dt>Embers carried</dt>
                <dd>
                  {progress.count} of {TOTAL_EMBERS}
                </dd>
              </div>
              <div>
                <dt>Compromises made</dt>
                <dd>{progress.compromises.length}</dd>
              </div>
            </dl>
            <div className="card-actions">
              <IonButton fill="clear" className="ghost-btn" onClick={() => history.replace('/home')}>
                Relive your path
              </IonButton>
              <IonButton fill="clear" className="ghost-btn" onClick={share}>
                Share
              </IonButton>
            </div>
          </div>

          <IonButton
            fill="clear"
            className="ghost-btn dim"
            onClick={() => {
              progress.reset()
              history.replace('/')
            }}
          >
            Let the embers come loose again
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}
