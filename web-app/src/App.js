import { IonApp } from '@ionic/react'
import { useEffect } from 'react'
// import CallSessionPage from "./pages/CallSessionPage";
import HomePage from './pages/HomePage'

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
import client from './client'

function App() {
  useEffect(() => {
    const onConnect = () => console.log('Socket connected')
    const onDisconnect = () => console.log('Socket disconnected')
    client.on('connect', onConnect)
    client.on('disconnect', onDisconnect)

    return () => {
      client.off('connect', onConnect)
      client.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <IonApp>
      <HomePage />
      {/* <CallSessionPage /> */}
    </IonApp>
  )
}

export default App
