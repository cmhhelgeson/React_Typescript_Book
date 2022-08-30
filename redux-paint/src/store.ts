import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { currentStroke } from "./features/currentStroke/slice";
import { strokes } from "./features/strokes/slice";
import { canvasSize } from "./features/canvasSize/slice"

export const store = configureStore({
    reducer: {
        currentStroke,
        strokes,
        canvasSize
    },
    devTools: true,
})

//Types the specific dispatch we expect from our store
export type AppDispatch = typeof store.dispatch;
