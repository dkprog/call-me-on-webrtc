import { IonAlert, IonApp } from '@ionic/react'
import { useEffect } from 'react'
// import CallSessionPage from "./pages/CallSessionPage";
import HomePage from './pages/HomePage'

import { useDispatch, useSelector } from 'react-redux'
import client from './client'
import {
  initialized,
  reset,
  selectErrorMessage,
  selectFailed,
} from './features/webrtc/webrtcSlice'

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
  const failed = useSelector((state) => selectFailed(state))
  const errorMessage = useSelector((state) => selectErrorMessage(state))

  useEffect(() => {
    if (!dispatch) {
      return
    }

    const onConnect = () => console.log('Socket connected')
    const onDisconnect = () => dispatch(reset())
    const onPeerId = (payload) => dispatch(initialized(payload))
    const onCall = (payload) => console.log('on call', payload)

    client.on('connect', onConnect)
    client.on('disconnect', onDisconnect)
    client.on('peer-id', onPeerId)
    client.on('call', onCall)

    return () => {
      client.off('connect', onConnect)
      client.off('disconnect', onDisconnect)
      client.off('peer-id', onPeerId)
      client.off('call', onCall)
    }
  }, [dispatch])

  return (
    <IonApp>
      <HomePage />
      {/* <CallSessionPage /> */}
      <IonAlert
        isOpen={failed}
        onDidDismiss={() => dispatch(reset())}
        header={'Error'}
        message={errorMessage}
        buttons={['OK']}
      />
    </IonApp>
  )
}

export default App
