import { changeCanvasSize } from "./features/canvasSize/slice"
import { beginStroke, updateStroke, setStrokeColor } from "./features/currentStroke/slice"
import { undo, redo } from "./features/historyIndex/slice"
import { endStroke } from "./features/sharedActions"
import { changeWindowSize } from "./features/windowSize/slice"

export type AppAction = 
    typeof changeCanvasSize | 
    typeof beginStroke | 
    typeof updateStroke | 
    typeof setStrokeColor | 
    typeof endStroke |
    typeof undo |
    typeof redo |
    typeof changeWindowSize
