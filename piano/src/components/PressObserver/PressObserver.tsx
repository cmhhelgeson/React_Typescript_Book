import {useEffect, useState} from "react"
import {Key as KeyLabel} from "../../domain/keyboard"

type IsPressed = boolean;
type EventCode = string;
type CallbackFunction = () => void


type Settings = {
    watchKey: string,
    onStartPress: CallbackFunction,
    onFinishPress: CallbackFunction
}


const fromEventCode = (code: EventCode) => {
    const preKeyRegex = /Key|Digit/gi
    //replaces all instances of Key or Digit with nothing
    return code.replace(preKeyRegex, "");
}

const keyEqual = (watchKey: KeyLabel, eventCode: EventCode): boolean => {
    return watchKey.toUpperCase() === fromEventCode(eventCode).toUpperCase()   
}

export const usePressObserver = (
    { watchKey, 
        onStartPress, 
        onFinishPress

}: Settings): IsPressed => {
    const [pressed, setPressed] = useState<IsPressed>(false);

    useEffect(() => {
        const handlePressStart = ({code}: KeyboardEvent): void => {
            if (pressed || !keyEqual(watchKey, code)) return;
            setPressed(true);
            onStartPress();
        }

        const handlePressEnd = ({code}: KeyboardEvent): void => {
            if (!pressed || !keyEqual(watchKey, code)) return;
            setPressed(false);
            onFinishPress();
        }

        document.addEventListener("keydown", handlePressStart);
        document.addEventListener("keyup", handlePressEnd)

        return () => {
            document.removeEventListener("keydown", handlePressStart);
            document.removeEventListener("keyup", handlePressEnd);
        }
    })

    return pressed;

}