import React, { useState, SetStateAction, Dispatch, useEffect } from "react";

export type Counter = {
    title: string
    timestamp: number,
}

export interface CounterContextInterface {
    counters: Array<Counter>,
    setCounters: Dispatch<SetStateAction<Array<Counter>>>
}

const defaultContext = {
    counters: [],
    setCounters: (counters: Array<Counter>) => { }
} as CounterContextInterface;

export const CounterContext = React.createContext(defaultContext);

type CounterProviderProps = {
    children: React.ReactNode
}

export default function CounterProvider({ children }: CounterProviderProps) {
    const [counters, setCounters] = useState<Array<Counter>>(() => {
        const data = localStorage.getItem("counters");
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("counters", JSON.stringify(counters));
    }, [counters]);

    return (
        <CounterContext.Provider value={{ counters, setCounters }}>
            {children}
        </CounterContext.Provider>
    )
}