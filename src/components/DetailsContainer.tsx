import React, { useContext, useEffect, useRef, useState } from 'react';
import { Counter, CounterContext } from '../contexts/CounterContexts';
import { useParams } from 'react-router';

import { useIonRouter, IonIcon, IonTitle, IonChip, IonGrid, IonRow, IonCol, IonButton, IonCardContent, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonDatetime, IonDatetimeButton, IonModal, DatetimeChangeEventDetail } from '@ionic/react';
import { addCircle, trash, refreshOutline, calendarOutline, pause } from 'ionicons/icons';
import './DetailsContainer.css';
import {getTimePassedFromUnixTimestamp} from '../utils/funcs'; 

interface ContainerProps { }

const DetailsContainer: React.FC<ContainerProps> = () => {
    const { counters, setCounters } = useContext(CounterContext);
    const { id } = useParams<{ id: string }>(); // Get the :id parameter from the route
    const router = useIonRouter();
    const [currentCounter, setCurrentCounter] = useState(() => {
        return counters.find(val => val.timestamp.toString() === id);
    })
    const [liveCounter, setLiveCounter] = useState<string>(() => {
        return getTimePassedFromUnixTimestamp(Number(currentCounter?.timestamp));
    });

    // Update the live counter
    useEffect(() => {
        const updateCounters = () => {
            const timestamp = getTimePassedFromUnixTimestamp(Number(currentCounter?.timestamp));
            // console.groupCollapsed("Individual Counter");
            // console.log(liveCounter);
            // console.groupEnd();
            setLiveCounter(prev => timestamp);
        };

        const interval = setInterval(updateCounters, 1000);

        return () => clearInterval(interval);
    }, [currentCounter]);

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
                    setLiveCounter(getTimePassedFromUnixTimestamp(Number(newCounter.timestamp)));
                    return newCounter;
                } else {
                    return counter;
                }
            })
        })
    }

    function handlePause() {
        
    }

    function handleDateChange(e: CustomEvent<any>) {
        const date = new Date(e.detail.value).getTime();
        console.log(date);
        setCounters(prevCounters => {
            return prevCounters.map(counter => {
                if (counter.timestamp.toString() === id) {
                    let newCounter: Counter = {
                        timestamp: date,
                        title: counter.title
                    };
                    setCurrentCounter(newCounter);
                    setLiveCounter(getTimePassedFromUnixTimestamp(Number(newCounter.timestamp)));
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
                    <IonCardSubtitle><IonChip>{liveCounter}</IonChip></IonCardSubtitle>
                </IonCardHeader>
            </IonCard>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
                <IonDatetime onIonChange={handleDateChange} showDefaultButtons={true} id="datetime">
                <span slot="title">Select a new date to start from.</span>
                </IonDatetime>
            </IonModal>

            {/* First Grid */}
            <IonTitle>Actions</IonTitle>
            <IonGrid>
                <IonRow className="ion-justify-content-center ion-text-center">
                    <IonCol size="4'">
                        <IonCardContent>
                            <IonButton fill="clear" onClick={handleRestart}>
                                <IonIcon size="large" color="dark" icon={refreshOutline} />
                            </IonButton>
                            <IonLabel>Restart</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol size="4">
                        <IonCardContent>
                            <IonButton fill="clear">
                                <IonIcon color="dark" size="large" icon={calendarOutline} />
                            </IonButton>
                            <IonLabel>From Date</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol size="4">
                        <IonCardContent className="ion-justify-content-center">
                            <IonButton fill="clear">
                                <IonIcon color="dark" size="large" icon={pause} />
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
                            <IonButton fill="clear">
                                <IonIcon color="dark" size="large" icon={addCircle} />
                            </IonButton>
                            <IonLabel>Edit</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton fill="clear">
                                <IonIcon color="dark" size="large" icon={addCircle} />
                            </IonButton>
                            <IonLabel>Format</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton fill="clear" onClick={handleDeletion}>
                                <IonIcon color="dark" size="large" icon={trash} />
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
                            <IonButton fill="clear">
                                <IonIcon color="dark" size="large" icon={addCircle} />
                            </IonButton>
                            <IonLabel>Restarts</IonLabel>
                        </IonCardContent>
                    </IonCol>
                    {/* <IonCol className="ion-justify-content-center" size="4">
                        <IonCardContent>
                            <IonButton fill="clear">
                                <IonIcon color="dark" size="large" icon={addCircle} />
                            </IonButton>
                            <IonLabel>Notifications</IonLabel>
                        </IonCardContent>
                    </IonCol> */}
                </IonRow>
            </IonGrid>
        </>
    );
};

export default DetailsContainer;
