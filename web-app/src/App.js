import { IonApp } from '@ionic/react'
import { useEffect } from 'react'
// import CallSessionPage from "./pages/CallSessionPage";
import HomePage from './pages/HomePage'

import { useDispatch } from 'react-redux'
import client from './client'
import { initialized, reset } from './features/webrtc/webrtcSlice'

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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dispatch) {
      return
    }

    const onConnect = () => console.log('Socket connected')
    const onDisconnect = () => dispatch(reset())

    const onPeerId = (payload) => dispatch(initialized(payload))

    client.on('connect', onConnect)
    client.on('disconnect', onDisconnect)
    client.on('peer-id', onPeerId)

    return () => {
      client.off('connect', onConnect)
      client.off('disconnect', onDisconnect)
      client.off('peer-id', onPeerId)
    }
  }, [dispatch])

  return (
    <IonApp>
      <HomePage />
      {/* <CallSessionPage /> */}
    </IonApp>
  )
}

export default App
