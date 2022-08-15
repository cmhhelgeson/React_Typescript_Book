import {Optional} from "./types"




export function accessAudioContext(): Optional<AudioContextType> {
    return window.AudioContext || null 
}