import { arrayBuffer } from "stream/consumers"

export type NoteType = "natural" | "flat" | "sharp"
export type NotePitch = "A" | "B" | "C" | "D" | "E" | "F" | "G"
export type OctaveIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type MidiValue = number
export type PitchIndex = number

export type Note = {
    midi: MidiValue  //number in Octave Notation
    type: NoteType  // natural or sharp

    pitch: NotePitch //representation of a note's pitch
    index: PitchIndex  //an index of a note in an octave
    octave: OctaveIndex  //an octave index of a given note
}

export const SEMITONES_IN_OCTAVE = 12;

const C1_MIDI = 24
const C4_MIDI = 60
const B5_MIDI = 83

export const LOWER_NOTE = C4_MIDI
export const HIGHER_NOTE = B5_MIDI

//Array of natural notes
export const NATURAL_PITCH_INDICES : PitchIndex[] = [
    0, 
    2, 
    4, 
    5, 
    7, 
    9, 
    11
]

export const PITCHES_REGISTRY: Record<PitchIndex, NotePitch> = {
    0: "C", 
    1: "C", 
    2: "D", 
    3: "D", 
    4: "E", 
    5: "F", 
    6: "F", 
    7: "G", 
    8: "G", 
    9: "A", 
    10: "A",
    11: "B",
}

export function fromMidi(midi: MidiValue): Note {
    const pianoRange = midi - C1_MIDI;
    const octave = (Math.floor(pianoRange / SEMITONES_IN_OCTAVE) + 1) as
        OctaveIndex;
    const index = pianoRange % SEMITONES_IN_OCTAVE;
    const pitch = PITCHES_REGISTRY[index];

    const isSharp = !NATURAL_PITCH_INDICES.includes(index);
    const type = isSharp ? "sharp" : "natural";
    return {octave, pitch, index, type, midi}

}

type NotesGeneratorSettings = {
    fromNote?: MidiValue,
    toNote?: MidiValue
}

export function generateNotes({
    fromNote = LOWER_NOTE,
    toNote = HIGHER_NOTE
}: NotesGeneratorSettings = {}): Note[] {
    return Array(toNote - fromNote + 1).fill(0).map((val, idx) => {
         return fromMidi(fromNote + idx)
    })
}

export const notes = generateNotes();

//SIDE NOTE: Files put into domain refer to the target subject of the program.
//Since the target subject of this program is sound, all sound related code
//should probably go here