import { IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonBackButton } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import NewContainer from '../components/NewContainer';

import './New.css';

const New: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>New Counter</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"><IonIcon slot="icon-only" icon={arrowBack}></IonIcon></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">New Counter</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <NewContainer />
            </IonContent>
        </IonPage>
    );
};

export default New;
