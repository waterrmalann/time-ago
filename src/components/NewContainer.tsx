import React, { useContext, useRef } from 'react';
import {Counter, CounterContext} from '../contexts/CounterContexts';

import { useIonRouter, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonInput } from '@ionic/react';
import {chevronForward} from 'ionicons/icons';
import './NewContainer.css';

interface ContainerProps { }

const NewContainer: React.FC<ContainerProps> = () => {
    const {counters, setCounters} = useContext(CounterContext);
    const inputRef = useRef<HTMLIonInputElement>(null);
    const router = useIonRouter();

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

    return (
        <>
            <IonItem>
                <IonLabel position="floating">Counter Name:</IonLabel>
                <IonInput ref={inputRef}></IonInput>
            </IonItem>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton color="danger" onClick={createCounter}>
                    <IonIcon icon={chevronForward}></IonIcon>
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default NewContainer;
