import { IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';

import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Time Since</IonTitle>
                    <IonButtons slot="end">
                        <IonButton><IonIcon slot="icon-only" icon={menuOutline}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Time Since</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer />
            </IonContent>
        </IonPage>
    );
};

export default Home;
