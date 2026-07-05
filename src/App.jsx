import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Clue from './pages/Clue'
import Hub from './pages/Hub'
import Finale from './pages/Finale'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const progress = useProgress()

  return (
    <IonApp>
      <IonReactRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <IonRouterOutlet>
          <Route
            exact
            path="/"
            render={() =>
              progress.started ? <Redirect to="/home" /> : <Intro onBegin={progress.begin} />
            }
          />
          <Route
            exact
            path="/home"
            render={() => (progress.started ? <Home progress={progress} /> : <Redirect to="/" />)}
          />
          <Route exact path="/clue/:id" render={() => <Clue progress={progress} />} />
          <Route exact path="/hub" render={() => <Hub />} />
          <Route exact path="/finale" render={() => <Finale progress={progress} />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
