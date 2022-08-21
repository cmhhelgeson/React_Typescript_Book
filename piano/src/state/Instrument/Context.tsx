import {createContext, useContext, useState} from "react"
import {InstrumentName} from "soundfont-player"
import { DEFAULT_INSTRUMENT } from "../../domain/sound"

type InstrumentContextProps = {
    instrument: InstrumentName
    setInstrument: (instrument: InstrumentName) => void
}

const InstrumentContext = createContext<InstrumentContextProps>(
    {} as InstrumentContextProps
);


type InstrumentContextProviderProps = {
    children: React.ReactNode
} 




export const InstrumentContextProvider = ({children}: InstrumentContextProviderProps) => {
    const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);

    return (
        <InstrumentContext.Provider value={{instrument, setInstrument}}>
            {children}
        </InstrumentContext.Provider>
    )
}

export const useInstrument = () => useContext(InstrumentContext);

