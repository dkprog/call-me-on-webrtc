import { IonApp } from '@ionic/react'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import './theme/global.css'

import HomePage from './pages/HomePage'
// import CallSessionPage from "./pages/CallSessionPage";

function App() {
  return (
    <IonApp>
      <HomePage />
      {/* <CallSessionPage /> */}
    </IonApp>
  )
}

export default App
