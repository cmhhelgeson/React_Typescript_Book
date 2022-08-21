import {useRef} from "react"
import { Optional } from "../domain/types"
import { accessAudioContext } from "../domain/audio"

export function useAudioContext(): Optional<AudioContextType> {
    //each instance of main component will have a local audioContext
    const audioContext = useRef(accessAudioContext());
    //will return either the audioContext or null;
    return audioContext.current;
}