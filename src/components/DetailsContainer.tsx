import React, { useContext, useRef, useState } from 'react';
import { Counter, CounterContext } from '../contexts/CounterContexts';
import { useParams } from 'react-router';

import { useIonRouter, IonIcon, IonTitle, IonChip, IonGrid, IonRow, IonCol, IonButton, IonCardContent, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { addCircle, trash, refreshOutline, calendarOutline, pause } from 'ionicons/icons';
import './DetailsContainer.css';

interface ContainerProps { }

const DetailsContainer: React.FC<ContainerProps> = () => {
    const { counters, setCounters } = useContext(CounterContext);
    const { id } = useParams<{ id: string }>(); // Get the :id parameter from the route
    const router = useIonRouter();
    const [currentCounter, setCurrentCounter] = useState(() => {
        return counters.find(val => val.timestamp.toString() === id);
    })

    function handleDeletion() {
        setCounters(prev => prev.filter(val => val.timestamp.toString() !== id));
        router.push('/');
    }

    function handleRestart() {
        setCounters(prevCounters => {
            return prevCounters.map(counter => {
                if (counter.timestamp.toString() === id) {
                    let newCounter: Counter = {
                        timestamp: Date.now(),
                        title: counter.title
                    };
                    setCurrentCounter(newCounter);
                    return newCounter;
                } else {
                    return counter;
                }
            })
        })
    }

    return (
        <>
            <IonCard className="ion-text-center">
                <IonCardHeader>
                    <IonCardTitle>{currentCounter?.title}</IonCardTitle>
                    <IonCardSubtitle><IonChip>{currentCounter?.timestamp}</IonChip></IonCardSubtitle>
                </IonCardHeader>
            </IonCard>

            {/* First Grid */}
            <IonTitle>Actions</IonTitle>
            <IonGrid>
                <IonRow className="ion-justify-content-center ion-text-center">
                    <IonCol size="4'">
                        <IonCardContent>
                            <IonButton onClick={handleRestart}>
                                <IonIcon icon={refreshOutline} />
                            </IonButton>
                            <IonLabel>Restart</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol size="4">
                        <IonCardContent>
                            <IonButton>
                                <IonIcon icon={calendarOutline} />
                            </IonButton>
                            <IonLabel>From Date</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol size="4">
                        <IonCardContent className="ion-justify-content-center">
                            <IonButton>
                                <IonIcon icon={pause} />
                            </IonButton>
                            <IonLabel>Stop</IonLabel>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid>

            {/* Second Grid */}
            <IonTitle>Options</IonTitle>
            <IonGrid>
                <IonRow className="ion-justify-content-center ion-text-center">
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton>
                                <IonIcon icon={addCircle} />
                            </IonButton>
                            <IonLabel>Edit</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton>
                                <IonIcon icon={addCircle} />
                            </IonButton>
                            <IonLabel>Format</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton onClick={handleDeletion}>
                                <IonIcon icon={trash} />
                            </IonButton>
                            <IonLabel>Delete</IonLabel>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid>

            {/* Third Grid */}
            <IonTitle>Extras</IonTitle>
            <IonGrid>
                <IonRow className="ion-justify-content-center ion-text-center">
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton>
                                <IonIcon icon={addCircle} />
                            </IonButton>
                            <IonLabel>Restarts</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton>
                                <IonIcon icon={addCircle} />
                            </IonButton>
                            <IonLabel>Notifications</IonLabel>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </>
    );
};

export default DetailsContainer;
