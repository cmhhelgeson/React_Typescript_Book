import {Component, ComponentType} from "react"
import Soundfont, {InstrumentName, Player} from "soundfont-player"
import { MidiValue } from "../domain/note"


type InjectedProps = {
    loading: boolean
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

export const withInstrument<
    TProps extends InjectedProps = InjectedProps>
    (WrappedComponent: ComponentType<TProps>) {

        

}
