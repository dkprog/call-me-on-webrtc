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
  selectGotFailed,
  selectIsUninitialized,
  failed,
  callReceived,
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
import socket from './client'

function App() {
  const dispatch = useDispatch()
  const isUninitialized = useSelector((state) => selectIsUninitialized(state))
  const gotFailed = useSelector((state) => selectGotFailed(state))
  const errorMessage = useSelector((state) => selectErrorMessage(state))

  useEffect(() => {
    if (!dispatch) {
      return
    }

    const onConnect = () => console.log('Socket connected')
    const onDisconnect = () => dispatch(reset())
    const onPeerNotFound = () => dispatch(failed('Peer not found.'))
    const onCall = (payload) =>
      dispatch(callReceived({ peerId: payload.peerId }))

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('peer-not-found', onPeerNotFound)
    socket.on('call', onCall)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('peer-not-found', onPeerNotFound)
      socket.off('call', onCall)
    }
  }, [dispatch])

  useEffect(() => {
    if (!dispatch || !isUninitialized) {
      return
    }

    client.emit('helo', (peerId) => {
      if (peerId) {
        dispatch(initialized({ localIdentifier: peerId }))
      }
    })
  }, [dispatch, isUninitialized])

  return (
    <IonApp>
      <HomePage />
      {/* <CallSessionPage /> */}
      <IonAlert
        isOpen={gotFailed}
        onDidDismiss={() => dispatch(reset())}
        header={'Error'}
        message={errorMessage}
        buttons={['OK']}
      />
    </IonApp>
  )
}

export default App
