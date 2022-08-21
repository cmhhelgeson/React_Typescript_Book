import clsx from "clsx";
import { NoteType } from "../../domain/note";
import { usePressObserver } from "../PressObserver/PressObserver";
import styles from "./Key.module.css"


type PressCallback = () => void;

type KeyProps = {
  type: NoteType
  label: string
  disabled?: boolean
  onUp: PressCallback
  onDown: PressCallback
}

export const Key = ({type, label, disabled, onDown, onUp}: KeyProps) => {

  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp
  })


  return (
    <button
      className={clsx(styles.key, styles[type], pressed && styles["is-pressed"])}
      type="button"
      onMouseDown={onDown}
      onMouseUp={onUp}>
      {label}
    </button>
  )
}