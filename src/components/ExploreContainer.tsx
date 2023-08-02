import { useIonRouter, IonItem, IonLabel, IonList, IonReorderGroup, IonChip, IonReorder, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add, time } from 'ionicons/icons';
import './ExploreContainer.css';
import { CounterContext } from '../contexts/CounterContexts';
import { useContext, useEffect, useState, useRef } from 'react';
import {getTimePassedFromUnixTimestamp} from '../utils/funcs'; 

interface ContainerProps { }

type LiveCounterType = {
    [key: string]: string
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const router = useIonRouter();
    const { counters, setCounters } = useContext(CounterContext);
    const interval = useRef<NodeJS.Timeout>();

    // Initialize liveCounters (state) 
    const [liveCounters, setLiveCounters] = useState<LiveCounterType>(() => {
        const initialLiveCounters: LiveCounterType = {};

        // By default, parse all the timestamps of currently open timers.
        for (const counter in counters) {
            const timestamp = counters[counter].timestamp;
            initialLiveCounters[timestamp] = getTimePassedFromUnixTimestamp(timestamp);
        }
        return initialLiveCounters;
    });

    // We need to update the live counters every second (explore tab)
    useEffect(() => {
        const updateCounters = () => {
            setLiveCounters((prevLiveCounters) => {
                const updatedCounters: LiveCounterType = {};
          
                for (const counter in prevLiveCounters) {
                  const timestamp = Number(counter);
                  updatedCounters[counter.toString()] = getTimePassedFromUnixTimestamp(timestamp);
                }
          
                return updatedCounters;
              });
        };

        interval.current = setInterval(updateCounters, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(interval.current);
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
