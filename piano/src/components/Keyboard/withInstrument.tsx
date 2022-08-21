import { useAudioContext } from "../AudioContextProvider";
import { renderKeyboard } from "../../adapters";
import { useInstrument } from "../../state/Instrument";
import { SoundfontProvider } from "../../adapters";

export const KeyboardWithInstrument = () => {
    const AudioContext = useAudioContext()!;
    const {instrument} = useInstrument();
    //const {loading, current, play, stop, load} = useSoundfont({AudioContext});

    return (
        <SoundfontProvider 
            AudioContext={AudioContext}
            instrument={instrument}
            render={renderKeyboard}
        />


    )

   /* useEffect(() => {
        if (!loading && current !== instrument) {
            load(instrument)
        }

    }, [load, loading, current, instrument])

    return <Keyboard loading={loading} play={play} stop={stop} /> */
}