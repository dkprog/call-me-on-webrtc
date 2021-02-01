import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsFormLocked,
  selectLocalIdentifier,
  selectIsUninitialized,
  selectIsCalling,
  callingStarted,
} from '../features/webrtc/webrtcSlice'
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonIcon,
  IonAlert,
  IonSpinner,
  IonToast,
} from '@ionic/react'
import { videocam, mic } from 'ionicons/icons'
import Header from '../components/Header'
import { useRef, useState } from 'react'

function HomePage() {
  const dispatch = useDispatch()
  const [showToast, setShowToast] = useState(false)
  const isFormLocked = useSelector((state) => selectIsFormLocked(state))
  const isUninitialized = useSelector((state) => selectIsUninitialized(state))
  const isCalling = useSelector((state) => selectIsCalling(state))
  const localIdentifier = useSelector((state) => selectLocalIdentifier(state))
  const localIdentifierEl = useRef(null)
  const [remoteIdentifier, setRemoteIdentifier] = useState('')

  const onChangeRemoteIdentifier = (event) => {
    setRemoteIdentifier(event.target.value)
  }

  const validateRemoteIdentifier = () => {
    if (!remoteIdentifier || remoteIdentifier === localIdentifier) {
      return false
    }
    return true
  }

  const onClickVideoCallButton = () => {
    if (!validateRemoteIdentifier()) {
      return
    }
    dispatch(callingStarted({ remoteIdentifier, isVideoEnabled: true }))
  }

  const onClickAudioCallButton = () => {
    if (!validateRemoteIdentifier()) {
      return
    }
    dispatch(callingStarted({ remoteIdentifier, isVideoEnabled: false }))
  }

  const onCopyYourIdText = async () => {
    if (localIdentifierEl.current) {
      const inputEl = await localIdentifierEl.current.getInputElement()
      if (inputEl) {
        inputEl.select()
        document.execCommand('copy')
        inputEl.setSelectionRange(0, 0)
        setShowToast(true)
      }
    }
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className='container'>
          <IonText>
            <h2>Call a partner</h2>
          </IonText>
          <IonList>
            <IonItem>
              <IonLabel position='fixed'>Your ID:</IonLabel>
              <IonInput
                type='text'
                readonly
                value={localIdentifier || 'Loading...'}
                disabled={isFormLocked}
                ref={localIdentifierEl}
              />
              {isUninitialized ? (
                <IonSpinner />
              ) : (
                <IonButton onClick={onCopyYourIdText}>Copy</IonButton>
              )}
            </IonItem>
            <IonItem>
              <IonLabel position='fixed'>Partner ID:</IonLabel>
              <IonInput
                type='text'
                placeholder='Type the partner ID'
                value={remoteIdentifier}
                onIonChange={onChangeRemoteIdentifier}
                disabled={isFormLocked}
              />
              {isCalling && <IonSpinner />}
            </IonItem>
            <div
              className='ion-padding-top ion-justify-content-center'
              style={{ display: 'flex' }}
            >
              <IonButton
                onClick={onClickVideoCallButton}
                disabled={isFormLocked}
              >
                <IonIcon icon={videocam} />
              </IonButton>
              <IonButton
                onClick={onClickAudioCallButton}
                disabled={isFormLocked}
              >
                <IonIcon icon={mic} />
              </IonButton>
            </div>
          </IonList>
        </div>
        <IonAlert
          isOpen={false}
          header={'Incoming call'}
          message='There is a incoming call from <em>partner-102</em>'
          buttons={[
            { text: 'Accept with video', role: 'video' },
            { text: 'Accept with audio only', role: 'audio' },
            { text: 'Decline it', role: 'decline' },
          ]}
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={'Copied to clipboard'}
          duration={1000}
        />
      </IonContent>
    </IonPage>
  )
}

export default HomePage
