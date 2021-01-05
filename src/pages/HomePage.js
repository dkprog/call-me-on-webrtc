import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Call me on WebRTC</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">Hello, World!</div>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
