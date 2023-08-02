import React, { useContext, useMemo, useRef } from 'react';
import {Counter, CounterContext} from '../contexts/CounterContexts';

import { useIonRouter, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonInput, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import {chevronForward} from 'ionicons/icons';
import './NewContainer.css';
import { getRandomElement } from '../utils/funcs';

interface ContainerProps { }

const NewContainer: React.FC<ContainerProps> = () => {
    const {counters, setCounters} = useContext(CounterContext);
    const inputRef = useRef<HTMLIonInputElement>(null);
    const router = useIonRouter();

    const placeholderText = useMemo(() => {
        const labelPlaceholders = [
            "alcohol free",
            "on relationship",
            "single",
            "caffeine free",
            "social media detox",
            "workout streak",
            "vegan days",
            "productive days",
            "no fast food",
            "meditation streak",
            "reading streak",
            "no junk food",
            "morning jog streak",
            "positive thoughts",
            "no sugary drinks",
            "walking streak",
            "yoga streak",
            "no soda days"
          ];
        return getRandomElement(labelPlaceholders)!;
    }, []);

    function createCounter() {
        const inputValue = inputRef.current!.value ?? "Untitled Counter";
        let newCounter: Counter = {
            title: inputValue as string,
            timestamp: Date.now()
        };
        setCounters(currentCounters => {
            return [...currentCounters, newCounter]
        });
        router.push('/', 'root', 'replace');
    }

    function handleDateChange(e: CustomEvent<any>) {
        console.log(e.detail.value);
    }

    return (
        <>
            <IonItem className="added-padding">
                <IonLabel position="floating">Counter Name:</IonLabel>
                <IonInput placeholder={placeholderText} ref={inputRef}></IonInput>
            </IonItem>
            <IonDatetimeButton className="ion-padding-vertical" datetime="newDatetime"></IonDatetimeButton>

            <IonModal keepContentsMounted={true}>
                <IonDatetime value={new Date().toISOString()} onIonChange={handleDateChange} showDefaultButtons={true} id="newDatetime">
                <span slot="title">Select a new date to start from.</span>
                </IonDatetime>
            </IonModal>

            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton color="danger" onClick={createCounter}>
                    <IonIcon icon={chevronForward}></IonIcon>
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default NewContainer;
