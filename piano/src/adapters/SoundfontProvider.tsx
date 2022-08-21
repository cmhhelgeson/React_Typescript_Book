import {
    ReactElement,
    useState, 
    useEffect, 
    useRef, 
    useCallback, 
} from "react"

import Soundfont, {
    InstrumentName, 
    Player
} from "soundfont-player"

import { MidiValue } from "../domain/note"
import { Optional } from "../domain/types"
import { Keyboard } from "../components/Keyboard"

import { 
    AudioNodesRegistry, 
    DEFAULT_INSTRUMENT 
} from "../domain/sound"

type ProvidedProps = {
    loading: boolean
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
    instrument?: InstrumentName
    AudioContext: AudioContextType
    render(props: ProvidedProps): ReactElement
}

export const renderKeyboard = ({play, stop, loading}: ProvidedProps): ReactElement  => {
    return <Keyboard play={play} stop={stop} loading={loading}/>;
}

export const SoundfontProvider = ({instrument, AudioContext, render}: ProviderProps) => {
    let activeNodes: AudioNodesRegistry = {}
    const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [player, setPlayer] = useState<Optional<Player>>(null);
    const audio = useRef(new AudioContext());

    //Creates a memoized loadInstrument function that only gets
    //recalculated when the instrument changes.
    const loadInstrument = 
        useCallback(() => load(instrument), [instrument]);

    useEffect(() => {
        if (!loading && current !== instrument) {
            loadInstrument();
        }
    }, [loadInstrument, loading, instrument, current])

    async function load(instrument: InstrumentName = DEFAULT_INSTRUMENT) {
        setLoading(true);
        const player = await Soundfont.instrument(audio.current, instrument);

        setPlayer(player);
        setCurrent(instrument);
        setLoading(false);
    }

    async function resume() {
        return audio.current.state === "suspended" ? 
            await audio.current.resume(): Promise.resolve()
    }

    async function play(note: MidiValue) {
        await resume();
        if (!player) return
        const sound = player.play(note.toString())
        activeNodes = {...activeNodes, [note]: sound}
    }

    async function stop(note: MidiValue) {
        await resume()
        if (!player) return
        activeNodes[note]!.stop();
        activeNodes = {...activeNodes, [note]: null}
    }

    return render({play, stop, loading});
}