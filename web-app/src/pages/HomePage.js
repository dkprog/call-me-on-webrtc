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
} from '@ionic/react'
import { videocam, mic } from 'ionicons/icons'
import Header from '../components/Header'

function HomePage() {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="container">
          <IonText>
            <h2>Call a partner</h2>
          </IonText>
          <IonList>
            <IonItem>
              <IonLabel position="fixed">Your ID:</IonLabel>
              <IonInput type="text" readonly value="sample-id-101" />
              <IonButton>Copy</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">Partner ID:</IonLabel>
              <IonInput type="text" placeholder="Type the partner ID" />
            </IonItem>
            <div
              className="ion-padding-top ion-justify-content-center"
              style={{ display: 'flex' }}
            >
              <IonButton>
                <IonIcon icon={videocam} />
              </IonButton>
              <IonButton>
                <IonIcon icon={mic} />
              </IonButton>
            </div>
          </IonList>
        </div>
        <IonAlert
          isOpen
          header={'Incoming call'}
          message="There is a incoming call from <em>partner-102</em>"
          buttons={[
            { text: 'Accept with video', role: 'video' },
            { text: 'Accept with audio only', role: 'audio' },
            { text: 'Decline it', role: 'decline' },
          ]}
        />
      </IonContent>
    </IonPage>
  )
}

export default HomePage
