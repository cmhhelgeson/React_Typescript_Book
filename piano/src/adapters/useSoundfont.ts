import {useState, useRef} from "react"
import Soundfont, {InstrumentName, Player} from "soundfont-player"
import { MidiValue } from "../domain/note"
import {Optional} from "../domain/types"

import {AudioNodesRegistry, DEFAULT_INSTRUMENT} from "../domain/sound"


//Describes what the useSoundfont adapter requires as arguments
//Although we have type soundfont, right now we are only asking for
//An AudioContextType, which is the typed version of the WEB API AudioContext
type Settings = {
  AudioContext: AudioContextType;
}

//Use an interface here. Kind of like a class. 
interface Adapted {
  //Flag that disables keyboard while audio is loading
  loading: boolean
  //Current instrument
  current: Optional<InstrumentName>

  //Asynchronous load and play functions to match asynchronous
  //API
  load(instrument?: InstrumentName): Promise<void>
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

export function useSoundfont({AudioContext}: Settings): Adapted {
  //activeNodes not defined using useState since we don't want it to rerender
  //every time new nodes are added
  let activeNodes: AudioNodesRegistry = {}
  const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState<Optional<Player>>(null);
  const audio = useRef(new AudioContext());


  async function load(
    instrument: InstrumentName = DEFAULT_INSTRUMENT
  ) {
    setLoading(true);
    const player = await Soundfont.instrument(
      audio.current, instrument);
    setCurrent(instrument);
    setPlayer(player);
    setLoading(false);

  }

  //Function will choose to either resume the audio or resolve
  //the function with Promise.resolve
  async function resume() {
    return audio.current.state === "suspended" ? 
      await audio.current.resume() : Promise.resolve();
  }

  async function play(note: MidiValue) {
    //Check that 
    await resume();
    if (!player) return;
    const node = player.play(note.toString());
    activeNodes = {...activeNodes, [note]: node}
    
  }
  async function stop(note: MidiValue) {
    await resume();
    if (!activeNodes[note]) return

    activeNodes[note]!.stop();
    activeNodes = {...activeNodes, [note]: null}
  }
  return {
    loading, 
    current,
    load,
    play, 
    stop
  }

}

