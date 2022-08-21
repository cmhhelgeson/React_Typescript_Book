import { useInstrument } from "../../state/Instrument"
import { ChangeEvent, useRef} from "react";
import { InstrumentName } from "soundfont-player";
import styles from "./InstrumentSelector.module.css"
import { options } from "./options";



export const InstrumentSelector = () => {
    const {instrument, setInstrument} = useInstrument();

    const selectRef = useRef<HTMLSelectElement>(null);


    //Tells 
    const updateValue = ({target}: ChangeEvent<HTMLSelectElement>) => {
        setInstrument(target.value as InstrumentName);
        selectRef.current?.blur();
    }

    return (
        <select
            ref={selectRef}
            className={styles.instruments}
            onChange={updateValue}
            value={instrument}
        >
            {options.map( ({label, value}) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )
}