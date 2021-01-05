import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

function Header() {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Call me on WebRTC</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;
