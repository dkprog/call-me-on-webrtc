import {
  IonPage,
  IonContent,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import Header from "../components/Header";
import { videocam, mic, exit } from "ionicons/icons";

function CallSessionPage() {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="container">
          <video playsInline autoPlay className="video remote" />
          <video playsInline autoPlay muted className="video local" />
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon icon={videocam} />
            </IonButton>
            <IonButton>
              <IonIcon icon={mic} />
            </IonButton>
            <IonButton color="danger">
              <IonIcon icon={exit} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default CallSessionPage;
