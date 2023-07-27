import { useIonRouter, IonItem, IonLabel, IonList, IonReorderGroup, IonChip, IonReorder, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import './ExploreContainer.css';
import { CounterContext } from '../contexts/CounterContexts';
import { useContext, useEffect, useState } from 'react';

interface ContainerProps { }

type LiveCounterType = {
    [key: string]: string
}

function getTimePassedFromUnixTimestamp(unixTimestamp: number): string {
    const currentTime = Date.now() / 1000; // Convert to seconds
    const timePassedInSeconds = Math.abs(currentTime - (unixTimestamp / 1000));

    const hours = Math.floor(timePassedInSeconds / 3600);
    const minutes = Math.floor((timePassedInSeconds % 3600) / 60);
    const seconds = Math.floor(timePassedInSeconds % 60);

    const formattedTime = `${hours}h:${minutes}m:${seconds}s`;
    return formattedTime;
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const router = useIonRouter();
    const { counters, setCounters } = useContext(CounterContext);
    const [liveCounters, setLiveCounters] = useState<LiveCounterType>(() => {
        const initialLiveCounters: LiveCounterType = {};

        for (const counter in counters) {
            const timestamp = counters[counter].timestamp;
            initialLiveCounters[timestamp] = getTimePassedFromUnixTimestamp(timestamp);
        }
        return initialLiveCounters;
    });

    useEffect(() => {
        const updateCounters = () => {
            const updatedCounters: LiveCounterType = {};

            for (const counter in liveCounters) {
                const timestamp = Number(counter);
                updatedCounters[counter.toString()] = getTimePassedFromUnixTimestamp(timestamp);
            }
            console.log(liveCounters);
            setLiveCounters(prev => updatedCounters);

        };

        const intervalId = setInterval(updateCounters, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [liveCounters]);

    useEffect(() => {
        const updatedLiveCounters: LiveCounterType = {};

        for (const counter in counters) {
            const timestamp = counters[counter].timestamp;
            updatedLiveCounters[timestamp] = getTimePassedFromUnixTimestamp(timestamp);
        }

        setLiveCounters(prev => updatedLiveCounters);
    }, [counters])

    return (
        <>
            <IonList>
                <IonReorderGroup disabled={true}>
                    {counters.map(counter => {
                        return (
                            <IonItem onClick={() => {router.push(`/details/${counter.timestamp}`)}} key={counter.timestamp}>
                                <IonLabel><IonChip>{liveCounters[counter.timestamp.toString()]}</IonChip> {counter.title}</IonLabel>
                                <IonReorder slot="end"></IonReorder>
                            </IonItem>
                        )
                    })}
                </IonReorderGroup>
            </IonList>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton routerLink="/new" color="danger">
                    <IonIcon icon={add}></IonIcon>
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default ExploreContainer;
