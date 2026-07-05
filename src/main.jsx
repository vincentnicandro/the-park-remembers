import React from 'react'
import { createRoot } from 'react-dom/client'
import { setupIonicReact } from '@ionic/react'
import App from './App'

/* Core Ionic CSS */
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/text-alignment.css'

/* Deco display face — Della Respira loaded via Google Fonts in variables.css */

/* Theme + app styles */
import './theme/variables.css'
import './theme/app.css'

setupIonicReact({ mode: 'ios' })

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
