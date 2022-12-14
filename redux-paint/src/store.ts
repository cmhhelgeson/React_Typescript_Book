import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { currentStroke } from "./features/currentStroke/slice";
import { strokes } from "./features/strokes/slice";
import { canvasSize } from "./features/canvasSize/slice"
import { historyIndex } from './features/historyIndex/slice';
import { windowSize } from './features/windowSize/slice';
import { toolType } from "./features/toolType/slice"




export const store = configureStore({
    reducer: {
        currentStroke,
        strokes,
        canvasSize,
        historyIndex,
        windowSize,
        toolType
    },
    devTools: true,
})

//Types the specific dispatch we expect from our store
export type AppDispatch = typeof store.dispatch;


