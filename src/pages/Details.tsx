import { IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonBackButton } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import DetailsContainer from '../components/DetailsContainer';

import './Details.css';

const New: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>View Counter</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"><IonIcon slot="icon-only" icon={arrowBack}></IonIcon></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">View Counter</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <DetailsContainer/>
            </IonContent>
        </IonPage>
    );
};

export default New;
